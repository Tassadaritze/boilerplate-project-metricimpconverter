function ConvertHandler() {

    this.getNum = function(input) {
        const unitIndex = input.search(/[a-z]/i);

        // if input has no unit, return null
        if (unitIndex === -1) return null;

        let result = input.substring(0, unitIndex);

        // if input has a unit but no numbers, default to 1
        if (result === "") result = "1";

        result = result.split("/");
        
        // if fraction input has more than one divisor, return null
        if (result.length > 2) return null;
        // if input is a fraction, convert to decimal
        else if (result.length === 2) result = result[0] / result[1];

        return +result.toString();
    };

    this.getUnit = function(input) {
        const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];

        const unitIndex = input.search(/[a-z]/i);

        // if input has no unit, return null
        if (unitIndex === -1) return null;

        let result = input.substring(unitIndex).toLowerCase();

        // fix case for litres
        if (result === "l") result = result.toUpperCase();

        // if detected unit is invalid, return null
        if (!validUnits.includes(result)) return null;

        return result;
    };

    this.getReturnUnit = function(initUnit) {
        const unitConversions = {
            gal: "L",
            L: "gal",
            mi: "km",
            km: "mi",
            lbs: "kg",
            kg: "lbs"
        };

        let result = unitConversions[initUnit];

        // if input is not a valid unit, return null
        if (result === undefined) return null;
        
        return result;
    };

    this.spellOutUnit = function(unit) {
        const unitSpellings = {
            gal: "gallons",
            L: "litres",
            mi: "miles",
            km: "kilometers",
            lbs: "pounds",
            kg: "kilograms"
        };

        let result = unitSpellings[unit];

        // if input is not a valid unit, return null
        if (result === undefined) return null;
        
        return result;
    };

    this.convert = function(initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;

        let result = initNum;

        switch (initUnit) {
            case "gal":
                result *= galToL;
                break;
            case "L":
                result /= galToL;
                break;
            case "lbs":
                result *= lbsToKg;
                break;
            case "kg":
                result /= lbsToKg;
                break;
            case "mi":
                result *= miToKm;
                break;
            case "km":
                result /= miToKm;
                break;
            default:
                return null;
        }

        result = +result.toFixed(5);

        return result;
    };

    this.getString = function(initNum, initUnit, returnNum, returnUnit) {
        let result;

        result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;

        return result;
    };

}

module.exports = ConvertHandler;
