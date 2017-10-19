import { HttpInput } from '../../../src/api/common/HttpInput';

const PersonSchema = require('./schema/Person.json');
const AddressSchema = require('./schema/Address.json');
const Obama = require('./schema/Obama.json');


let personSchema;
let addressSchema;
let obama;
beforeEach(() => {
  personSchema = Object.assign({}, PersonSchema);
  addressSchema = Object.assign({}, AddressSchema);
  obama = Object.assign({}, Obama);
});

test('Validation fails when votes is a string', () => {
  const input = new HttpInput(
    obama,
    [addressSchema], // array of referenced schema definitions
    personSchema, // the final schema to validate against
  );
  expect(input.isValid()).toBe(false);
  expect(input.getValidationErrors()).toHaveLength(1);
  expect(input.getValidationErrorString()).toEqual(expect.stringContaining("'votes'"));
});

test('Validation passes when votes is a number', () => {
  obama.votes = 100;
  const input = new HttpInput(
    obama,
    [addressSchema], // array of referenced schema definitions
    personSchema, // the final schema to validate against
  );
  expect(input.isValid()).toBe(true);
  expect(input.getValidationErrors()).toHaveLength(0);
  expect(input.getValidationErrorString()).toEqual('');
});
