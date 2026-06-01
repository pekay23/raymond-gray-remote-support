// Download logos for all companies in the Representative Client List
// Uses Clearbit Logo API (https://logo.clearbit.com/{domain}) as primary source
// with Google Favicon as fallback.

import { writeFile, mkdir, access } from "node:fs/promises";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "public", "logos");

// Map of source name in profile-content.ts -> { slug, domain, alt }
const COMPANIES = [
  { name: "A & S Manufacturing Inc.",        slug: "as-manufacturing",     domain: "asmanufacturinginc.com" },
  { name: "A&S MFG INC.",                    slug: "as-mfg",               domain: "as-mfg.com" },
  { name: "Absolute Technologies, Inc.",     slug: "absolute-technologies", domain: "absolutetechnologies.com" },
  { name: "Aero Bending Co. Inc.",           slug: "aero-bending",         domain: "aerobending.com" },
  { name: "Aero Plating, Inc.",              slug: "aero-plating",         domain: "aeroplating.com" },
  { name: "Aerospace Metal Fabrication",     slug: "amf",                  domain: "aerospacemetalfab.com" },
  { name: "Aircraft Component Repair Inc.",  slug: "acr",                  domain: "aircraftcomponentrepair.com" },
  { name: "Alard Machine Products",          slug: "alard",                domain: "alard.com" },
  { name: "Asturies Manufacturing Co. Inc.", slug: "asturies",             domain: "asturiesmfg.com" },
  { name: "Atomic Aerospace, LLC",           slug: "atomic-aerospace",     domain: "atomicaerospace.com" },
  { name: "B & B Manufacturing Co., Inc.",   slug: "bb-manufacturing",     domain: "bbmfg.com" },
  { name: "C&H Machine and EDM Services",    slug: "ch-machine",           domain: "chmachine.com" },
  { name: "Crissair Incorporated",           slug: "crissair",             domain: "crissair.com" },
  { name: "David Barnes Company",            slug: "barnes",               domain: "davidbarnes.com" },
  { name: "Donaldson Co. Inc.",              slug: "donaldson",            domain: "donaldson.com" },
  { name: "DP Products",                     slug: "dp-products",          domain: "dpproductsinc.com" },
  { name: "Eaton Aerospace",                 slug: "eaton",                domain: "eaton.com" },
  { name: "Francis Manufacturing Company",   slug: "francis-mfg",          domain: "francismfgco.com" },
  { name: "Frazier Aviation",                slug: "frazier-aviation",     domain: "frazieraviation.com" },
  { name: "Hutchinson U.S.A Aerospace",      slug: "hutchinson",           domain: "hutchinson.com" },
  { name: "Integrated Panel Systems",        slug: "ips",                  domain: "integratedpanel.com" },
  { name: "Kurt Manufacturing Company",      slug: "kurt",                 domain: "kurtworkholding.com" },
  { name: "Lansair Corporation",             slug: "lansair",              domain: "lansair.com" },
  { name: "Mar Engineering",                 slug: "mar-engineering",      domain: "mareng.com" },
  { name: "Meggitt Defense Systems, Inc.",   slug: "meggitt",              domain: "meggitt.com" },
  { name: "Mono Engineering",                slug: "mono",                 domain: "monoengineering.com" },
  { name: "Mooney Industries",               slug: "mooney",               domain: "mooneyindustries.com" },
  { name: "Performance Machine Tech. Inc.",  slug: "pmt",                  domain: "pmtaerospace.com" },
  { name: "Pneudraulics, Inc.",              slug: "pneudraulics",         domain: "pneudraulics.com" },
  { name: "Precision Engine Controls Corporation", slug: "pecc",          domain: "peccorp.com" },
  { name: "Prime Plating",                  slug: "prime-plating",        domain: "primeplating.com" },
  { name: "Primus Aerospace",                slug: "primus",               domain: "primusaerospace.com" },
  { name: "ROMI Industries",                 slug: "romi",                 domain: "romi-usa.com" },
  { name: "RS Machining Co.",                slug: "rs-machining",         domain: "rsmachiningco.com" },
  { name: "S&H Machine",                     slug: "sh-machine",           domain: "shmachine.com" },
  { name: "Safran Electrical Components USA",slug: "safran",               domain: "safran-group.com" },
  { name: "Thomas CNC Machining",            slug: "thomas-cnc",           domain: "thomascnc.com" },
  { name: "TOMI Engineering Inc.",           slug: "tomi",                 domain: "tomi-engineering.com" },
  { name: "True Position Tech., Inc.",       slug: "tpt",                  domain: "truepositiontech.com" },
  { name: "Unified Manufacturing, Inc.",     slug: "unified-mfg",          domain: "unifiedmfg.com" },
  { name: "WK Engineering International, Inc.", slug: "wk-engineering",    domain: "wkengineering.com" },
  { name: "Woodward HRT",                    slug: "woodward",             domain: "woodward.com" },
];

// Logo sources to try, in order
const SOURCES = [
  (domain) => `https://logo.clearbit.com/${domain}`,
  (domain) => `https://www.google.com/s2/favicons?sz=128&domain=${domain}`,
];

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function fetchLogo(domain) {
  for (const build of SOURCES) {
    const url = build(domain);
    try {
      const res = await fetch(url, {
        redirect: "follow",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        },
      });
      if (!res.ok) continue;
      const ct = res.headers.get("content-type") || "";
      if (!ct.startsWith("image/")) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      // Filter Clearbit's 1x1 fallback and Google's transparent/default
      if (buf.length < 500) continue;
      const ext =
        ct.includes("svg") ? "svg" :
        ct.includes("png")  ? "png" :
        ct.includes("jpeg")||ct.includes("jpg") ? "jpg" :
        "png";
      return { buf, ext, source: url };
    } catch {
      // try next
    }
  }
  return null;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const results = [];
  for (const c of COMPANIES) {
    const target = join(OUT_DIR, `${c.slug}.png`);
    if (await fileExists(target)) {
      results.push({ ...c, status: "exists" });
      console.log(`✓ ${c.name}  (already exists)`);
      continue;
    }
    const got = await fetchLogo(c.domain);
    if (got) {
      await writeFile(target, got.buf);
      results.push({ ...c, status: "ok", ext: got.ext, source: got.source });
      console.log(`✓ ${c.name}  <-  ${got.source}`);
    } else {
      results.push({ ...c, status: "missing" });
      console.log(`✗ ${c.name}  (no logo found for ${c.domain})`);
    }
    await sleep(150); // be polite
  }

  const ok       = results.filter((r) => r.status === "ok" || r.status === "exists").length;
  const missing  = results.filter((r) => r.status === "missing");

  console.log(`\n--- Summary ---`);
  console.log(`Downloaded/exists: ${ok}/${COMPANIES.length}`);
  if (missing.length) {
    console.log(`Missing (${missing.length}):`);
    for (const m of missing) console.log(`  - ${m.name}  (${m.domain})`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
