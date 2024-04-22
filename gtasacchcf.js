const s2h=(s)=>(~Bun.hash.crc32(s.toUpperCase().split('').reverse().join(''))>>>0).toString(16);
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
      .map((word) => alphabet.map((letter) => word + letter))
      .reduce((acc, cur) => [...acc, ...cur]);
  return words;
};
