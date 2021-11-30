const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("convertHandler should correctly read a whole number input.", () => {
        assert.equal(57, convertHandler.getNum("57gal"));
    });
    test("convertHandler should correctly read a decimal number input.", () => {
        assert.equal(34.25, convertHandler.getNum("34.25L"));
    });
    test("convertHandler should correctly read a fractional input.", () => {
        assert.equal(0.4, convertHandler.getNum("2/5mi"));
    });
    test("convertHandler should correctly read a fractional input with a decimal.", () => {
        assert.equal(0.25, convertHandler.getNum("18.75/75km"));
    });
    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", () => {
        assert.isNull(convertHandler.getNum("3/2/3lbs"));
    });
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", () => {
        assert.equal(1, convertHandler.getNum("kg"));
    });
    test("convertHandler should correctly read each valid input unit.", () => {
        assert.equal("gal", convertHandler.getUnit("57gAl"));
        assert.equal("L", convertHandler.getUnit("34.25l"));
        assert.equal("mi", convertHandler.getUnit("2/5mI"));
        assert.equal("km", convertHandler.getUnit("18.75/75Km"));
        assert.equal("kg", convertHandler.getUnit("Kg"));
        assert.isNull(convertHandler.getUnit("3/2/3krngls"));
    });
    test("convertHandler should correctly return an error for an invalid input unit.", () => {
        assert.isNull(convertHandler.getReturnUnit("drjgr"));
    });
    test("convertHandler should return the correct return unit for each valid input unit.", () => {
        assert.equal("gal", convertHandler.getReturnUnit("L"));
        assert.equal("L", convertHandler.getReturnUnit("gal"));
        assert.equal("mi", convertHandler.getReturnUnit("km"));
        assert.equal("km", convertHandler.getReturnUnit("mi"));
        assert.equal("lbs", convertHandler.getReturnUnit("kg"));
        assert.equal("kg", convertHandler.getReturnUnit("lbs"));
    });
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", () => {
        assert.equal("gallons", convertHandler.spellOutUnit("gal"));
        assert.equal("litres", convertHandler.spellOutUnit("L"));
        assert.equal("miles", convertHandler.spellOutUnit("mi"));
        assert.equal("kilometers", convertHandler.spellOutUnit("km"));
        assert.equal("pounds", convertHandler.spellOutUnit("lbs"));
        assert.equal("kilograms", convertHandler.spellOutUnit("kg"));
        assert.isNull(convertHandler.spellOutUnit("efheas"));
    });
    test("convertHandler should correctly convert gal to L.", () => {
        assert.equal(3.78541, convertHandler.convert(1, "gal"));
    });
    test("convertHandler should correctly convert L to gal.", () => {
        assert.equal(1, convertHandler.convert(3.78541, "L"));
    });
    test("convertHandler should correctly convert mi to km.", () => {
        assert.equal(1.60934, convertHandler.convert(1, "mi"));
    });
    test("convertHandler should correctly convert km to mi.", () => {
        assert.equal(1, convertHandler.convert(1.60934, "km"));
    });
    test("convertHandler should correctly convert lbs to kg.", () => {
        assert.equal(0.45359, convertHandler.convert(1, "lbs"));
    });
    test("convertHandler should correctly convert kg to lbs.", () => {
        assert.equal(1, convertHandler.convert(0.453592, "kg"));
    });
});
