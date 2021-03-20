// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It isn't worth it to make additional optimizations as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
// (C) 2021 Maxime Briziarelli
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

const BASE = 65521; // largest prime smaller than 65536

// const NMAX = 5552; // NMAX is the largest n such that 255n(n+1)/2 + (n+1)(BASE-1) <= 2^32-1
// Set NMAX ~ twice less than NMAX, to keep s2 in 31-bits, because we force signed ints.
// In other case %= will fail.
const NMAX = 2000;

const adler32 = (
  adler: number,
  buf: Uint8Array,
  len: number,
  pos: number,
) => {
  let s1 = (adler & 0xffff) | 0;
  let s2 = ((adler >>> 16) & 0xffff) | 0;

  while (len !== 0) {
    let n = len > NMAX ? NMAX : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) | 0;
      s2 = (s2 + s1) | 0;
    } while (--n);

    s1 %= BASE;
    s2 %= BASE;
  }

  return (s1 | (s2 << 16)) | 0;
};

export default adler32;
