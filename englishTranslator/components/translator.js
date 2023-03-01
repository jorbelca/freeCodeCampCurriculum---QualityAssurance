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
    const letters = text.split(' ')
    let separated = text.split(' ')
    const keys1 = Object.keys(americanOnly)
    const keys2 = Object.keys(americanToBritishSpelling)
    const keys3 = Object.keys(americanToBritishTitles)

    // TEST AND REPLACE TIME
    separated.map((chunk, idx) => {
      if (/\d\d:\d\d/gm.test(chunk)) {
        separated[idx] = chunk.replace(/:/gm, '.')
      }
    })

    let lowKText = separated.map(n => n.toLowerCase()).join(' ')

    keys1.map((k) => {
      if (lowKText.includes(k)) {
        if (k == 'trash') k = 'trashcan'
        const start = lowKText.indexOf(k)
        const end = lowKText.indexOf(k) + k.length
        console.log(americanOnly[k], 1, k);
        lowKText = lowKText.replace(lowKText.slice(start, end), americanOnly[k])
      }
    })

    keys2.map((k) => {
      if (lowKText.includes(k)) {
        const start = lowKText.indexOf(k)
        const end = lowKText.indexOf(k) + k.length
        console.log(americanToBritishSpelling[k], 2);
        lowKText = lowKText.replace(lowKText.slice(start, end), americanToBritishSpelling[k])
      }
    })

    keys3.map((k) => {
      if (lowKText.includes(k)) {
        const start = lowKText.indexOf(k)
        const end = lowKText.indexOf(k) + k.length
        console.log(americanToBritishTitles[k], 3);
        lowKText = lowKText.replace(lowKText.slice(start, end), americanToBritishTitles[k])
      }
    })

    // PUT AGAIN THE UPPERCASE
    lowKText = lowKText.split(' ')
    letters.map((chunk, idx1) => {
      chunk.split('').map((l, idx2) => {
        if (/^[A-Z]*$/.test(l)) {

          let separated = lowKText[idx1].split('')
          if (separated[idx2] === separated[idx2].toUpperCase()) { } else {
            separated[idx2] = l
          }
          separated = separated.join('')

          lowKText[idx1] = separated
        }
      })
    })

    // GREEN COLOR

    letters.map((chunk, idx) => {
      if (chunk !== lowKText[idx]) {
        console.log(chunk, lowKText[idx]);
        lowKText[idx] = `<span class="highlight">${lowKText[idx]}</span>`
      }
    })

    lowKText = lowKText.join(' ')
    return lowKText
  }

}

module.exports = Translator;