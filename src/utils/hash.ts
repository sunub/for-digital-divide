function asciiToBinary(num: number): string {
  return num.toString(2).padStart(8, '0');
}

function addingBitMod448(str: string, bit: string[]): string {
  let bitIndex = 0;
  while (str.length % 512 !== 448) {
    bitIndex = (bitIndex + 1) % 100;
    str += bit[bitIndex];
  }
  return str;
}

function addingBit64(str: string, bit: string[]): string {
  let result = '';
  let bitIndex = 0;
  while (str.length + result.length < 64) {
    bitIndex = (bitIndex + 1) % 100;
    result += bit[bitIndex];
  }
  return result + str;
}

function stringSplit(str: string, chunkSize: number): string[] {
  const chunks = [];
  for (let i = 0; i < str.length; i += chunkSize) {
    chunks.push(str.slice(i, i + chunkSize));
  }
  return chunks;
}

function leftRotate(n: number, d: number): number {
  return ((n << d) | (n >>> (32 - d))) >>> 0;
}

function binaryToInt(binary: string): number {
  return parseInt(binary, 2);
}

function intToBinary(int: number, length: number = 32): string {
  return int.toString(2).padStart(length, '0');
}

const utils = {
  and: (a: number, b: number): number => a & b,
  or: (a: number, b: number): number => a | b,
  xor: (a: number, b: number): number => a ^ b,
  not: (a: number): number => ~a,
  leftRotate: (n: number, d: number): number => (n << d) | (n >>> (32 - d)),
  binaryAddition: (a: number, b: number): number => (a + b) >>> 0,
  truncate: (n: number, bits: number): number => n & ((1 << bits) - 1),
};

/**
 * @param {string} str
 */
function encrypt(str: string): string {
  const asciCodes = str.split('').map(char => char.charCodeAt(0));
  const binary8Bit = asciCodes.map(num => asciiToBinary(num));
  let binaryStr = binary8Bit.join('');

  let bit = Array.from({ length: 100 }, (_, i) =>
    i % 11 == 0 || i % 5 == 0 || i % 12 === 0 || i % 22 === 0 ? '0' : '1'
  );
  binaryStr = addingBitMod448(binaryStr, bit);

  const length = binary8Bit.join('').length;
  let binaryLength = asciiToBinary(length);

  bit = Array.from({ length: 100 }, (_, i) => (i % 3 == 0 || i % 7 == 0 || i % 31 === 0 || i % 22 === 0 ? '0' : '1'));
  binaryLength = addingBit64(binaryLength, bit);

  binaryStr += binaryLength;
  const chunk = stringSplit(binaryStr, 512);
  const chunkWords = chunk.map(chunk => stringSplit(chunk, 32));

  const words80 = chunkWords.map(chunk => {
    const words = chunk.map(binaryToInt);

    for (let i = 16; i < 80; i++) {
      const wordA = words[i - 3];
      const wordB = words[i - 8];
      const wordC = words[i - 14];
      const wordD = words[i - 16];

      const xorA = wordA ^ wordB;
      const xorB = xorA ^ wordC;
      const xorC = xorB ^ wordD;

      const newWord = leftRotate(xorC, 1);

      words.push(newWord);
    }

    return words.map(word => intToBinary(word));
  });

  let h0 = binaryToInt('01100111010001010010001100000001');
  let h1 = binaryToInt('11101111110011011010101110001001');
  let h2 = binaryToInt('10011000101110101101110011111110');
  let h3 = binaryToInt('00010000001100100101010001110110');
  let h4 = binaryToInt('11000011110100101110000111110000');

  for (let i = 0; i < words80.length; i++) {
    const words = words80[i].map(binaryToInt);

    let a = h0;
    let b = h1;
    let c = h2;
    let d = h3;
    let e = h4;

    for (let j = 0; j < 80; j++) {
      let f: number, k: number;

      if (j < 20) {
        f = utils.or(utils.and(b, c), utils.and(utils.not(b), d));
        k = 0x5a827999;
      } else if (j < 40) {
        f = utils.xor(utils.xor(b, c), d);
        k = 0x6ed9eba1;
      } else if (j < 60) {
        f = utils.or(utils.or(utils.and(b, c), utils.and(b, d)), utils.and(c, d));
        k = 0x8f1bbcdc;
      } else {
        f = utils.xor(utils.xor(b, c), d);
        k = 0xca62c1d6;
      }

      const temp = utils.binaryAddition(
        utils.binaryAddition(utils.binaryAddition(utils.leftRotate(a, 5), f), utils.binaryAddition(e, words[j])),
        k
      );

      e = d;
      d = c;
      c = utils.leftRotate(b, 30);
      b = a;
      a = temp;
    }

    h0 = utils.binaryAddition(h0, a);
    h1 = utils.binaryAddition(h1, b);
    h2 = utils.binaryAddition(h2, c);
    h3 = utils.binaryAddition(h3, d);
    h4 = utils.binaryAddition(h4, e);
  }

  const finalHash = [h0, h1, h2, h3, h4].map(h => h.toString(16).padStart(8, '0')).join('');

  return finalHash;
}

export { encrypt };
