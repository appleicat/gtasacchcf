const data = Bun.file("./data/data.json");
const json = (await data.exists())
  ? JSON.parse(await data.text())
  : process.exit();
const file = Bun.file("./data/data.tsv");
const write = [`HASH\tCHEATS`];
for (const [hash, cheats] of Object.entries(json))
  write.push(`${hash}\t${cheats.join(` `)}`);
Bun.write(file, write.join(`\n`));
