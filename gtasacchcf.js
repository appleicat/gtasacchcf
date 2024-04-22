const s2h=(s)=>(~Bun.hash.crc32(s.toUpperCase().split('').reverse().join(''))>>>0).toString(16);
const nextString = (string, alphabet) => {
  let index = string.length - 1;
  let base;
  do {
    base = string[index];
    let stringArray = string.split('');
    if (stringArray[index] == alphabet[alphabet.length - 1]) {
      stringArray[index] = alphabet[0];
      if (index == 0) stringArray.unshift(alphabet[0]);
    } else stringArray[index] = alphabet[alphabet.indexOf(stringArray[index]) + 1];
    string = stringArray.join('');
    index--;
  } while (base == alphabet[alphabet.length - 1]);
  return string;
};
const wordlist = (length, alphabet) => {
  let words = [...alphabet.split('')];
  for (let i = 1; i < length; i++)
    words = words
      .map((word) => alphabet.split('').map((letter) => word + letter))
      .reduce((acc, cur) => [...acc, ...cur]);
  return words;
};
