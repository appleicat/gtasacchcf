const data = Bun.file("./data/data.json");
const json = (await data.exists())
  ? JSON.parse(await data.text())
  : process.exit();
const file = Bun.file("./data/data.tsv");
const write = [[`HASH`, `CHEATCODE`].join(`\t`)];
for (const [hash, cheats] of Object.entries(json))
  for (const cheat of cheats) write.push([hash, cheat].join(`\t`));
Bun.write(file, write.join(`\n`));
