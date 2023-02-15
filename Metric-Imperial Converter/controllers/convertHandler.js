const ConvertHandler = {

  getNum: function (input) {
    let result;
    const regex = new RegExp(/([0-9.]+)/)
    const regexFrac = new RegExp(/([/]+)/gm)
    if (regexFrac.test(input)) {
      let num1 = input.split('/')[0]
      let num2 = input.split('/')[1]
      return result = num1 / Number(regex.exec(num2)[0])
    }

    if (regex.test(input)) {
      result = Number(regex.exec(input)[0])

    }
    if (!regex.exec(input)) {
      result = 1
    }


    return result;
  },

  getUnit: function (input) {
    let result;
    const regex = new RegExp(/([a-zA-Z]+)/gm)
    result = regex.exec(input)[0]
    return result;
  },

  getReturnUnit: function (initUnit) {
    let result = {
      km: 'mi',
      mi: 'km',
      gal: 'L',
      L: 'gal',
      kg: 'lbs',
      lbs: 'kg'
    }
    return result[initUnit];
  },

  spellOutUnit: function (unit) {
    let units = {
      km: 'kilometers',
      mi: 'miles',
      gal: 'gallons',
      L: 'liters',
      kg: 'kilograms',
      lbs: 'pounds'
    }

    return units[unit];
  },

  convert: function (initNum, initUnit) {
    const galToL = 3.78541;
    const Ltogal = 0.264172
    const lbsToKg = 0.453592;
    const KgTolbs = 2.20462
    const miToKm = 1.60934;
    const KmTomi = 1.60934
    let result;
    if (initUnit === 'gal') result = galToL * initNum
    if (initUnit === 'L') result = Ltogal * initNum
    if (initUnit === 'lbs') result = lbsToKg * initNum
    if (initUnit === 'kg') result = KgTolbs * initNum
    if (initUnit === 'mi') result = miToKm * initNum
    if (initUnit === 'km') result = KmTomi * initNum

    return result;
  },

  getString: function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    return result;
  },


}

module.exports = ConvertHandler;
