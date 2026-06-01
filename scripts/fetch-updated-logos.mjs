import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const TASKS = [
  { slug: "as-mfg", url: "https://as-manufacturing.com/" },
  { slug: "amf", url: "https://tqfab.com/industries/aerospace/" },
  { slug: "acr", url: "https://acr.aero/" },
  { slug: "alard", imgUrl: "https://media.licdn.com/dms/image/v2/C510BAQEPqj8AXWkycA/company-logo_200_200/company-logo_200_200/0/1631312583768?e=1781740800&v=beta&t=ayakO6lTirfCAihVgjmTBkTX4f-1zhKoSWSw9geff3M" },
  { slug: "asturies", url: "https://www.asturiesmanufacturing.com/" },
  { slug: "atomic-aerospace", url: "https://www.ga-asi.com/" },
  { slug: "ch-machine", url: "https://www.c-hmachine.com/" },
  { slug: "barnes", url: "https://www.dbceng.com/" },
  { slug: "dp-products", url: "https://dpprod.com/" },
  { slug: "francis-mfg", imgUrl: "https://media.licdn.com/dms/image/v2/C4D0BAQHOvYiSAw6djA/company-logo_200_200/company-logo_200_200/0/1631351329134?e=1781740800&v=beta&t=Stae-nWXqY39HBqSc5Hvn0KOcpXlASfTo6-lQsrLBpU" },
  { slug: "lansair", url: "https://www.lansairco.com/" },
  { slug: "mono", url: "http://www.monoengineering.com/" },
  { slug: "mooney", url: "https://mooney.com/" },
  { slug: "pmt", url: "https://pmtinc.org/" },
  { slug: "prime-plating", url: "https://prime-plating.com/" },
  { slug: "primus", url: "https://primusaero.com/" },
  { slug: "romi", url: "https://www.romiusa.com/" },
  { slug: "rs-machining", imgUrl: "https://mma.prnewswire.com/media/2873085/R_S_Machining_Logo.jpg?p=publish" },
  { slug: "tomi", url: "https://tomiengineering.com/" },
  { slug: "wk-engineering", url: "https://wkesl.co.uk/" }
];

const OUT_DIR = join(process.cwd(), "public", "logos");

async function downloadDirect(imgUrl) {
  const imgRes = await fetch(imgUrl, {
     headers: { "User-Agent": "Mozilla/5.0" },
     signal: AbortSignal.timeout(10000)
  });
  if (!imgRes.ok) throw new Error("Failed to download image");
  const ct = imgRes.headers.get("content-type") || "";
  const ext = ct.includes("svg") ? "svg" : ct.includes("png") ? "png" : "jpg";
  const buf = Buffer.from(await imgRes.arrayBuffer());
  return { buf, ext };
}

async function scrapeLogo(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    signal: AbortSignal.timeout(10000)
  });
  if (!res.ok) throw new Error("Failed to fetch page");
  const html = await res.text();
  
  // Basic regex to find logos
  const imgRegex = /<img[^>]+src=["']([^"']*(?:logo)[^"']*)["'][^>]*>/i;
  const match = html.match(imgRegex);
  
  if (match && match[1]) {
    let imgSrc = match[1];
    
    // Convert relative to absolute
    if (imgSrc.startsWith("//")) {
      imgSrc = `https:${imgSrc}`;
    } else if (imgSrc.startsWith("/")) {
      const urlObj = new URL(url);
      imgSrc = `${urlObj.protocol}//${urlObj.host}${imgSrc}`;
    } else if (!imgSrc.startsWith("http")) {
      imgSrc = `${url.replace(/\/$/, '')}/${imgSrc}`;
    }
    
    return await downloadDirect(imgSrc);
  }
  
  // Try fetching favicon or site icon if logo not found
  const iconRegex = /<link[^>]+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']+)["'][^>]*>/i;
  const iconMatch = html.match(iconRegex);
  if (iconMatch && iconMatch[1]) {
    let iconSrc = iconMatch[1];
    if (iconSrc.startsWith("//")) iconSrc = `https:${iconSrc}`;
    else if (iconSrc.startsWith("/")) {
      const urlObj = new URL(url);
      iconSrc = `${urlObj.protocol}//${urlObj.host}${iconSrc}`;
    } else if (!iconSrc.startsWith("http")) iconSrc = `${url.replace(/\/$/, '')}/${iconSrc}`;
    
    return await downloadDirect(iconSrc);
  }
  
  return null;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  
  let count = 0;
  for (const t of TASKS) {
    console.log(`Processing ${t.slug}...`);
    try {
      let result = null;
      if (t.imgUrl) {
        result = await downloadDirect(t.imgUrl);
      } else if (t.url) {
        result = await scrapeLogo(t.url);
      }
      
      if (result) {
        const target = join(OUT_DIR, `${t.slug}.${result.ext}`);
        await writeFile(target, result.buf);
        console.log(`✓ Saved ${t.slug}.${result.ext}`);
        count++;
      } else {
        console.log(`✗ No logo found on page for ${t.slug}`);
      }
    } catch (e) {
      console.log(`✗ Error for ${t.slug}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log(`\nDone. Successfully got ${count}/${TASKS.length} logos.`);
}

main().catch(console.error);
