const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  async translate(locale, text) {
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
    const keys1 = Object.keys(americanOnly)
    const keys2 = Object.keys(americanToBritishSpelling)
    const keys3 = Object.keys(americanToBritishTitles)

    let lowKText = separated.map(n => n.toLowerCase()).join(' ')

    keys1.map((k) => {
      if (lowKText.includes(k)) {
        const start = lowKText.indexOf(k)
        const end = lowKText.indexOf(k) + k.length
        console.log(americanOnly[k]);
        lowKText = lowKText.replace(lowKText.slice(start, end), `<span class="highlight"> ${americanOnly[k]}</span>`)
      }
    })
   

    separated.map((word, idx) => {
      console.log(keys1.indexOf(word.toLowerCase()), word.toLowerCase());
      if (keys2.includes(word.toLowerCase())) {
        separated[idx] = `<span class="highlight"> ${americanToBritishSpelling[word.toLowerCase()]}</span>`
      }
      if (keys1.includes(word.toLowerCase())) {
        separated[idx] = `<span class="highlight"> ${americanOnly[word.toLowerCase()]}</span>`
      }
    })
    let response = separated.join(' ')
    return lowKText
  }

}

module.exports = Translator;