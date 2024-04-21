const s2h=(s)=>(~Bun.hash.crc32(s.toUpperCase().split('').reverse().join(''))>>>0).toString(16);
