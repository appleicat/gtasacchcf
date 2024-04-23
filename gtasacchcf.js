const s2h=(s)=>(~Bun.hash.crc32(s.toUpperCase().split('').reverse().join(''))>>>0).toString(16).padStart(8,'0').toUpperCase();
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
const hashes = [
  'DE4B237D',
  'B22A28D1',
  '5A783FAE',
  'EECCEA2B',
  '42AF1E28',
  '555FC201',
  '2A845345',
  'E1EF01EA',
  '771B83FC',
  '5BF12848',
  '44453A17',
  'FCFF1D08',
  'B69E8532',
  '8B828076',
  'DD6ED9E9',
  'A290FD8C',
  '3484B5A7',
  '43DB914E',
  'DBC0DD65',
  '00000000',
  'D08A30FE',
  '37BF1B4E',
  'B5D40866',
  'E63B0D99',
  '675B8945',
  '4987D5EE',
  '2E8F84E8',
  '1A9AA3D6',
  'E842F3BC',
  '0D5C6A4E',
  '74D4FCB1',
  'B01D13B8',
  '66516EBC',
  '4B137E45',
  '78520E33',
  '3A577325',
  'D4966D59',
  '5FD1B49D',
  'A7613F99',
  '1792D871',
  'CBC579DF',
  '4FEDCCFF',
  '44B34866',
  '2EF877DB',
  '2781E797',
  '2BC1A045',
  'B2AFE368',
  'FA8DD45B',
  '8DED75BD',
  '1A5526BC',
  'A48A770B',
  'B07D3B32',
  '80C1E54B',
  '5DAD0087',
  '7F80B950',
  '6C0FA650',
  'F46F2FA4',
  '70164385',
  '885D0B50',
  '151BDCB3',
  'ADFA640A',
  'E57F96CE',
  '040CF761',
  'E1B33EB9',
  'FEDA77F7',
  '8CA870DD',
  '9A629401',
  'F53EF5A5',
  'F2AA0C1D',
  'F36345A8',
  '8990D5E1',
  'B7013B1B',
  'CAEC94EE',
  '31F0C3CC',
  'B3B3E72A',
  'C25CDBFF',
  'D5CF4EFF',
  '680416B1',
  'CF5FDA18',
  'F01286E9',
  'A841CC0A',
  '31EA09CF',
  'E958788A',
  '02C83A7C',
  'E49C3ED4',
  '171BA8CC',
  '86988DAE',
  '2BDD2FA1'
]