const ConvertHandler = {

  getNum: function (input) {
    let result;
    const regex = new RegExp(/([0-9.]+)/)
    const regexFrac = new RegExp(/[\/]/g)

    if (regexFrac.test(input)) {
      if (input.match(regexFrac).length >= 2) { return { Error: 'invalid number' } }
      let num1 = input.split('/')[0]
      let num2 = input.split('/')[1]
      return result = parseFloat(+num1 / Number(regex.exec(num2)[0]))
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
    result = regex.exec(input)[0].toLowerCase()
    if (result == 'l') result = "L"
    return result;
  },

  getReturnUnit: function (initUnit) {
    let result = {
      km: 'mi',
      KM: 'mi',
      mi: 'km',
      gal: 'L',
      L: 'gal',
      kg: 'lbs',
      lbs: 'kg',
      MI: 'km',
      GAL: 'L',
      l: 'gal',
      KG: 'lbs',
      LBS: 'kg'
    }
    if (!result[initUnit]) return { Error: 'invalid unit' }
    return result[initUnit];
  },

  spellOutUnit: function (unit) {
    let units = {
      km: 'kilometers',
      KM: 'kilometers',
      mi: 'miles',
      MI: 'miles',
      gal: 'gallons',
      GAL: 'gallons',
      L: 'liters',
      l: 'liters',
      kg: 'kilograms',
      KG: 'kilograms',
      lbs: 'pounds',
      LBS: 'pounds'
    }

    return units[unit];
  },

  convert: function (initNum, initUnit) {
    // return result;
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit === 'gal' || initUnit === 'GAL') {
      result = (initNum * galToL).toFixed(5)
    } else if (initUnit === 'l' || initUnit === 'L') {
      result = (initNum / galToL).toFixed(5)
    }

    if (initUnit === 'lbs' || initUnit === 'LBS') {
      result = (initNum * lbsToKg).toFixed(5)
    } else if (initUnit === 'kg' || initUnit === 'KG') {
      result = (initNum / lbsToKg).toFixed(5)
    }

    if (initUnit === 'mi' || initUnit === 'MI') {
      result = (initNum * miToKm).toFixed(5)
    } else if (initUnit === 'km' || initUnit === 'KM') {
      result = (initNum / miToKm).toFixed(5)
    }

    return parseFloat(result);
  },


  getString: function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    return result;
  },


}

module.exports = ConvertHandler;
