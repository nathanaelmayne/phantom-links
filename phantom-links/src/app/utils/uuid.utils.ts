/**
  * Generate a UUID with 4 parts.
  * @return {string} The UUID.
  */
export function uuidv4(): string {
  const stringArr = [];
  for (let i = 0; i < 4; i++) {
    // tslint:disable-next-line:no-bitwise
    const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    stringArr.push(S4);
  }
  return stringArr.join('-');
}
