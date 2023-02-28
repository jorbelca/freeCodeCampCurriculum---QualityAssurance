const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  async translate (locale, text) {
    if (locale == 'american-to-british') {
      let res = await this.amToBrit(text)
      return res
    }
    if (locale == 'british-to-american') { this.britToAm(text) }
  }
  britToAm(text) {

  }
  amToBrit(text) {
    let separated = text.split(' ')
    const keys = Object.keys(americanToBritishSpelling)
    separated.map((word, idx) => {
      if (keys.includes(word)) {
        separated[idx] = americanToBritishSpelling[word]
      }
    })
    let response = separated.join(' ')
    return response
  }

}

module.exports = Translator;