import cheathashes from "./cheathashes.json";
const s2h = (s) =>
  (~Bun.hash.crc32(s.toUpperCase().split("").reverse().join("")) >>> 0)
    .toString(16)
    .padStart(8, "0")
    .toUpperCase();
const next = (array, alphabet) => {
  let index = array.length - 1;
  let base;
  do {
    base = array[index];
    if (array[index] == alphabet[alphabet.length - 1]) {
      array[index] = alphabet[0];
      if (index == 0) array.unshift(alphabet[0]);
    } else array[index] = alphabet[alphabet.indexOf(array[index]) + 1];
    index--;
  } while (base == alphabet[alphabet.length - 1]);
  return array;
};
const wordlist = (length, alphabet) => {
  let words = [...alphabet];
  for (let i = 1; i < length; i++)
    words = words
      .map((word) => alphabet.map((letter) => [...word, ...letter]))
      .reduce((acc, cur) => [...acc, ...cur]);
  return words;
};
const argv = Bun.argv.slice(2);
const alphabet = argv.includes("-a")
  ? argv[argv.indexOf("-a") + 1].toUpperCase()
  : argv.includes("--alphabet")
  ? argv[argv.indexOf("--alphabet") + 1].toUpperCase()
  : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const start = argv.includes("-s")
  ? argv[argv.indexOf("-s") + 1].toUpperCase()
  : argv.includes("--start")
  ? argv[argv.indexOf("--start") + 1].toUpperCase()
  : alphabet[0];
const end = argv.includes("-e")
  ? next(
      argv[argv.indexOf("-e") + 1].toUpperCase().split(""),
      alphabet.split("")
    ).join("")
  : argv.includes("--end")
  ? next(
      argv[argv.indexOf("--end") + 1].toUpperCase().split(""),
      alphabet.split("")
    ).join("")
  : undefined;
const hash = argv.includes("-H")
  ? argv[argv.indexOf("-H") + 1]
  : argv.includes("--hash")
  ? argv[argv.indexOf("--hash") + 1]
  : undefined;
const cheathash = argv.includes("-c")
  ? s2h(argv[argv.indexOf("-c") + 1])
  : argv.includes("--cheat")
  ? s2h(argv[argv.indexOf("--cheat") + 1])
  : argv.includes("-C")
  ? argv[argv.indexOf("-C") + 1].toUpperCase()
  : argv.includes("--cheat-hash")
  ? argv[argv.indexOf("--cheat-hash") + 1].toUpperCase()
  : undefined;
if (hash) {
  console.log(s2h(hash));
  process.exit();
}
const hashes = cheathash ? [cheathash] : [...cheathashes];
const file = Bun.file("./data/data.json");
let data = (await file.exists()) ? JSON.parse(await file.text()) : {};
for (
  let current = start;
  current !== end;
  current = next(current.split(""), alphabet.split("")).join("")
) {
  const hash = s2h(current);
  if (hashes.includes(hash)) {
    if (Array.isArray(data[hash])) {
      if (!data[hash].includes(current)) {
        data[hash].push(current);
        data[hash].sort();
      }
    } else {
      data[hash] = [current];
      data = Object.keys(data)
        .sort()
        .reduce((acc, cur) => ((acc[cur] = data[cur]), acc), {});
    }
    Bun.write(file, JSON.stringify(data, null, 2));
  }
}
