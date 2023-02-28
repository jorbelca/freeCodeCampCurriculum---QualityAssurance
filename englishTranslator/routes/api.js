'use strict';
import 'regenerator-runtime/runtime'
const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post(async (req, res) => {
      const { locale, text } = req.body


      if (!locale || !text) return res.status(400).json('Required field(s) missing')
      if (text == '' || text == '\n') return res.status(400).json({ error: 'No text to translate' })
      if (locale != 'american-to-british' && locale != 'british-to-american') return res.status(400).json({ error: 'Invalid value for locale field' })

      let response = await translator.translate(locale, text)
      if (response) return res.status(200).json({ translation: response })
    });
};
