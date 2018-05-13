const DEFAULT_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = (alphabet = DEFAULT_ALPHABET) => {
  const base = alphabet.length;

  const processEncoding = (number, previousEncodedChain = '') => {
    if (number < 1) return previousEncodedChain;
    const nextEncodedChain = alphabet.charAt(number % base) + previousEncodedChain;
    const nextNumber = Math.floor(number / base);
    return processEncoding(nextNumber, nextEncodedChain);
  }

  /**
   * Encodes a number into a string based on the Bijective numeration
   * @param {number} numberToEncode
   * @returns {string}
 */
  const encode = (numberToEncode = 1) => {
    if (typeof numberToEncode !== 'number') throw new Error('number to encode is not a number');
    return processEncoding(numberToEncode);
  }

    /**
   * Decodes a string back into the original number based on the Bijective numeration
   * due to javascripts precision large numbers may not be able to be decoded accurately
   * @param {string} encodedChain
   * @returns {number}
 */
  const decode = (encodedChain = '') => {
    if (typeof encodedChain !== 'string') throw new Error('encodedChain is not a string');
    let originalNumber = 0;
    for (const character of encodedChain) {
      originalNumber = originalNumber *  base + alphabet.indexOf(character);
    }
    return originalNumber;
  }

  return {
    encode,
    decode,
  }
}
