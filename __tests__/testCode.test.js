import { TestScheduler } from 'jest';
import testCode from './../src/test-code.js';

describe('testCode', () => {

  test('should correctly return helloworld', () => {
    let output = testCode();
    expect(output).toEqual("hello world");
  });       
});