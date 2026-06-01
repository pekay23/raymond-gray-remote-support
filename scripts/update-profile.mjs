import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const COMPANIES = [
  { name: "A & S Manufacturing Inc.", slug: "as-manufacturing" },
  { name: "A&S MFG INC.", slug: "as-mfg" },
  { name: "Absolute Technologies, Inc.", slug: "absolute-technologies" },
  { name: "Aero Bending Co. Inc.", slug: "aero-bending" },
  { name: "Aero Plating, Inc.", slug: "aero-plating" },
  { name: "Aerospace Metal Fabrication", slug: "amf" },
  { name: "Aircraft Component Repair Inc.", slug: "acr" },
  { name: "Alard Machine Products", slug: "alard" },
  { name: "Asturies Manufacturing Co. Inc.", slug: "asturies" },
  { name: "Atomic Aerospace, LLC", slug: "atomic-aerospace" },
  { name: "B & B Manufacturing Co., Inc.", slug: "bb-manufacturing" },
  { name: "C&H Machine and EDM Services", slug: "ch-machine" },
  { name: "Crissair Incorporated", slug: "crissair" },
  { name: "David Barnes Company", slug: "barnes" },
  { name: "Donaldson Co. Inc.", slug: "donaldson" },
  { name: "DP Products", slug: "dp-products" },
  { name: "Eaton Aerospace", slug: "eaton" },
  { name: "Francis Manufacturing Company", slug: "francis-mfg" },
  { name: "Frazier Aviation", slug: "frazier-aviation" },
  { name: "Hutchinson U.S.A Aerospace", slug: "hutchinson" },
  { name: "Integrated Panel Systems", slug: "ips" },
  { name: "Kurt Manufacturing Company", slug: "kurt" },
  { name: "Lansair Corporation", slug: "lansair" },
  { name: "Mar Engineering", slug: "mar-engineering" },
  { name: "Meggitt Defense Systems, Inc.", slug: "meggitt" },
  { name: "Mono Engineering", slug: "mono" },
  { name: "Mooney Industries", slug: "mooney" },
  { name: "Performance Machine Tech. Inc.", slug: "pmt" },
  { name: "Pneudraulics, Inc.", slug: "pneudraulics" },
  { name: "Precision Engine Controls Corporation", slug: "pecc" },
  { name: "Prime Plating", slug: "prime-plating" },
  { name: "Primus Aerospace", slug: "primus" },
  { name: "ROMI Industries", slug: "romi" },
  { name: "RS Machining Co.", slug: "rs-machining" },
  { name: "S&H Machine", slug: "sh-machine" },
  { name: "Safran Electrical Components USA", slug: "safran" },
  { name: "Thomas CNC Machining", slug: "thomas-cnc" },
  { name: "TOMI Engineering Inc.", slug: "tomi" },
  { name: "True Position Tech., Inc.", slug: "tpt" },
  { name: "Unified Manufacturing, Inc.", slug: "unified-mfg" },
  { name: "WK Engineering International, Inc.", slug: "wk-engineering" },
  { name: "Woodward HRT", slug: "woodward" }
];

async function main() {
  const logosDir = join(process.cwd(), "public", "logos");
  const files = await readdir(logosDir);
  
  const clientObjects = COMPANIES.map(c => {
    // Find a file that starts with the slug + '.'
    const file = files.find(f => f.startsWith(`${c.slug}.`));
    return {
      name: c.name,
      logoUrl: file ? `/logos/${file}` : null
    };
  });
  
  // Sort alphabetically by name
  clientObjects.sort((a, b) => a.name.localeCompare(b.name));
  
  const contentPath = join(process.cwd(), "src", "lib", "profile-content.ts");
  let content = await readFile(contentPath, "utf-8");
  
  // Replace the old string array with the new object array
  const oldRegex = /export const representativeList = \[\s*[\s\S]*?\];/;
  
  const newArrayStr = `export const representativeList = [\n` + 
    clientObjects.map(c => `  { name: ${JSON.stringify(c.name)}, logoUrl: ${c.logoUrl ? JSON.stringify(c.logoUrl) : 'null'} }`).join(",\n") + 
    `\n];`;
    
  if (oldRegex.test(content)) {
    content = content.replace(oldRegex, newArrayStr);
    await writeFile(contentPath, content);
    console.log("Updated profile-content.ts!");
  } else {
    console.log("Could not find representativeList array in profile-content.ts");
  }
}

main().catch(console.error);
