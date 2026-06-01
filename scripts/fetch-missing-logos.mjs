import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import * as crypto from "node:crypto";

const MISSING = [
  { name: "A & S Manufacturing Inc.", slug: "as-manufacturing", domain: "asmanufacturinginc.com" },
  { name: "A&S MFG INC.", slug: "as-mfg", domain: "as-mfg.com" },
  { name: "Aerospace Metal Fabrication", slug: "amf", domain: "aerospacemetalfab.com" },
  { name: "Aircraft Component Repair Inc.", slug: "acr", domain: "aircraftcomponentrepair.com" },
  { name: "Alard Machine Products", slug: "alard", domain: "alard.com" },
  { name: "Asturies Manufacturing Co. Inc.", slug: "asturies", domain: "asturiesmfg.com" },
  { name: "Atomic Aerospace, LLC", slug: "atomic-aerospace", domain: "atomicaerospace.com" },
  { name: "B & B Manufacturing Co., Inc.", slug: "bb-manufacturing", domain: "bbmfg.com" },
  { name: "C&H Machine and EDM Services", slug: "ch-machine", domain: "chmachine.com" },
  { name: "David Barnes Company", slug: "barnes", domain: "davidbarnes.com" },
  { name: "DP Products", slug: "dp-products", domain: "dpproductsinc.com" },
  { name: "Francis Manufacturing Company", slug: "francis-mfg", domain: "francismfgco.com" },
  { name: "Frazier Aviation", slug: "frazier-aviation", domain: "frazieraviation.com" },
  { name: "Lansair Corporation", slug: "lansair", domain: "lansair.com" },
  { name: "Mono Engineering", slug: "mono", domain: "monoengineering.com" },
  { name: "Mooney Industries", slug: "mooney", domain: "mooneyindustries.com" },
  { name: "Performance Machine Tech. Inc.", slug: "pmt", domain: "pmtaerospace.com" },
  { name: "Prime Plating", slug: "prime-plating", domain: "primeplating.com" },
  { name: "Primus Aerospace", slug: "primus", domain: "primusaerospace.com" },
  { name: "ROMI Industries", slug: "romi", domain: "romi-usa.com" },
  { name: "RS Machining Co.", slug: "rs-machining", domain: "rsmachiningco.com" },
  { name: "TOMI Engineering Inc.", slug: "tomi", domain: "tomi-engineering.com" },
  { name: "Unified Manufacturing, Inc.", slug: "unified-mfg", domain: "unifiedmfg.com" },
  { name: "WK Engineering International, Inc.", slug: "wk-engineering", domain: "wkengineering.com" }
];

const OUT_DIR = join(process.cwd(), "public", "logos");

async function fetchLogoFromDuckDuckGo(company) {
  const query = encodeURIComponent(`${company.name} logo`);
  const url = `https://html.duckduckgo.com/html/?q=${query}`;
  
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
      }
    });
    
    if (!res.ok) return null;
    const html = await res.text();
    
    // Look for image links in the results.
    // The html version of duckduckgo has images in <img class="result__icon__img" src="//external-content.duckduckgo.com/iu/?u=..." />
    // Let's try to extract external-content URLs
    
    const regex = /src="\/\/(external-content\.duckduckgo\.com\/iu\/\?u=[^"]+)"/g;
    let match;
    const candidates = [];
    while ((match = regex.exec(html)) !== null) {
      candidates.push(`https://${match[1].replace(/&amp;/g, '&')}`);
    }
    
    // Sometimes duckduckgo doesn't show images in html search. 
    // Let's also try to just fetch the company's homepage and extract the first image that has "logo" in its src or alt.
    if (candidates.length === 0) {
      return await fetchLogoFromHomepage(company.domain);
    }
    
    // Just try the first candidate image
    for (const imgUrl of candidates) {
      try {
         const imgRes = await fetch(imgUrl, {
           headers: { "User-Agent": "Mozilla/5.0" }
         });
         if (!imgRes.ok) continue;
         const ct = imgRes.headers.get("content-type") || "";
         if (!ct.startsWith("image/")) continue;
         const buf = Buffer.from(await imgRes.arrayBuffer());
         if (buf.length < 1000) continue; // Skip tiny images
         
         const ext = ct.includes("svg") ? "svg" : ct.includes("png") ? "png" : "jpg";
         return { buf, ext, source: "duckduckgo" };
      } catch (e) {
        continue;
      }
    }
  } catch (e) {
    console.error(`Error for ${company.name}:`, e.message);
  }
  
  return await fetchLogoFromHomepage(company.domain);
}

async function fetchLogoFromHomepage(domain) {
  const protocols = ["https://www.", "https://", "http://www.", "http://"];
  for (const protocol of protocols) {
    try {
      const url = `${protocol}${domain}`;
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        signal: AbortSignal.timeout(5000)
      });
      if (!res.ok) continue;
      
      const html = await res.text();
      // Look for <img src="..." containing "logo"
      const imgRegex = /<img[^>]+src=["']([^"']+logo[^"']+)["'][^>]*>/i;
      const match = html.match(imgRegex);
      
      if (match && match[1]) {
        let imgSrc = match[1];
        if (imgSrc.startsWith("//")) imgSrc = `https:${imgSrc}`;
        else if (imgSrc.startsWith("/")) imgSrc = `${protocol}${domain}${imgSrc}`;
        else if (!imgSrc.startsWith("http")) imgSrc = `${protocol}${domain}/${imgSrc}`;
        
        const imgRes = await fetch(imgSrc, {
           headers: { "User-Agent": "Mozilla/5.0" },
           signal: AbortSignal.timeout(5000)
        });
        if (!imgRes.ok) continue;
        
        const ct = imgRes.headers.get("content-type") || "";
        if (!ct.startsWith("image/")) continue;
        
        const buf = Buffer.from(await imgRes.arrayBuffer());
        if (buf.length < 500) continue;
        
        const ext = ct.includes("svg") ? "svg" : ct.includes("png") ? "png" : "jpg";
        return { buf, ext, source: imgSrc };
      }
    } catch (e) {
      // try next protocol
    }
  }
  return null;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  
  let successCount = 0;
  
  for (const c of MISSING) {
    console.log(`Searching for ${c.name}...`);
    const got = await fetchLogoFromDuckDuckGo(c);
    
    if (got) {
      const target = join(OUT_DIR, `${c.slug}.${got.ext}`);
      await writeFile(target, got.buf);
      console.log(`✓ Found: ${c.name} (${got.source}) -> ${c.slug}.${got.ext}`);
      successCount++;
    } else {
      console.log(`✗ Failed to find: ${c.name}`);
    }
    
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log(`\nDone. Found ${successCount}/${MISSING.length} logos.`);
}

main().catch(console.error);
