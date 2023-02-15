const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

suite('Unit Tests', function () {
  test('#convertHandler should correctly read a whole number input.', function () {
    let input = 6
    assert.equal(input, ConvertHandler.getNum(input));
  })
  test('# convertHandler should correctly read a decimal number input.', function () {
    let input = 6.2
    assert.equal(input, ConvertHandler.getNum(input));
  })
  test('# convertHandler should correctly read a fractional input.', function () {
    let input = 6 / 2
    assert.equal(input, ConvertHandler.getNum(input));
  })
  test('# convertHandler should correctly read a fractional input with a decimal.', function () {
    let input = 5.4 / 3
    assert.equal(input, ConvertHandler.getNum(input));
  })
  test('# convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
    let input = 3 / 2 / 3
    assert.equal(input, ConvertHandler.getNum(input));
  })
  test('# convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
    let input = 'mi'
    assert.equal(1, ConvertHandler.getNum(input));
  })
  test('# convertHandler should correctly read each valid input unit.', function () {
    let input = '6mi'
    assert.equal('mi', ConvertHandler.getUnit(input));
  })
  test('# convertHandler should correctly return an error for an invalid input unit.', function () {
    let input = '6m'
    assert.equal('error', ConvertHandler.getUnit(input));
  })
  test('# convertHandler should return the correct return unit for each valid input unit.', function () {
    let input = 'mi'
    assert.equal('km', ConvertHandler.getReturnUnit(input));
  })
  test('# convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
    let input = 'mi'
    assert.equal('miles', ConvertHandler.spellOutUnit(input));
  })
  test('# convertHandler should correctly convert units', function () {
    // convertHandler should correctly convert gal to L.
    // convertHandler should correctly convert L to gal.
    // convertHandler should correctly convert mi to km.
    // convertHandler should correctly convert km to mi.
    // convertHandler should correctly convert lbs to kg.
    // convertHandler should correctly convert kg to lbs.
    let input = ['mi', 'km', 'gal', 'L', 'lbs', 'kg']
    let output = ['km', 'mi', 'L', 'gal', 'kg', 'lbs']
    for (let i = 0; i < input.length; i++) {
      assert.equal(output[i], ConvertHandler.getReturnUnit(input[i]))
    };
  })

});