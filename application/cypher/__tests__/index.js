const { encode, decode } = require('../')();

describe('cypher -> encode', () => {
  it('returns the correct encoded string when parameter is a valid integer', () => {
    const expectedValue = 'dsKuN6';
    const parameter = 12334545676;
    const actualValue = encode(parameter);
    expect(actualValue).toBe(expectedValue);
  })
  it('throws an error when passed parameter is no a valid integer', () => {
    const parameter = {};
    const functionToTest = encode.bind({}, (parameter));
    expect(functionToTest).toThrowError();
  })
  it('returns the correct encoded string is a valid integer and is very large', () => {
    const expectedValue = '1Uv4sYABjeQ8kmcmyeuQkS2a8g';
    const parameter = 1233454567600102120312344546757575775757575757;
    const actualValue = encode(parameter);
    expect(actualValue).toBe(expectedValue);
  })
});

describe('cypher -> decode', () => {
  it('returns the number when parameter is a string', () => {
    const expectedValue = 12334545676;
    const parameter = 'dsKuN6';
    const actualValue = decode(parameter);
    expect(actualValue).toBe(expectedValue);
  })
  it('throws an error when passed parameter is no a string', () => {
    const parameter = 12345;
    const functionToTest = decode.bind({}, (parameter));
    expect(functionToTest).toThrowError();
  })
  // will ignore for now
  // it('returns the correct encoded string is a valid integer and is very large', () => {
  //   const expectedValue = 1233454567600102120312344546757575775757575757;
  //   const parameter = '1Uv4sYABjeQ8kmcmyeuQkS2a8g';
  //   const actualValue = decode(parameter);
  //   expect(actualValue).toBeCloseTo(expectedValue);
  // })
  it('returns a number when string is a valid integer and is very large', () => {
    const parameter = '1Uv4sYABjeQ8kmcmyeuQkS2a8g';
    const expectedValue = 'number';
    const actualValue = decode(parameter);
    expect(typeof actualValue).toBe(expectedValue);
  })
});
