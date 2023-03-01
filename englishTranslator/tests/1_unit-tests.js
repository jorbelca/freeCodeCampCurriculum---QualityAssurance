import 'regenerator-runtime/runtime'
const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

const amToBrit = 'american-to-british'
const britToAm = 'british-to-american'

suite('Unit Tests', () => {
  test('#Mangoes are my favorite fruit.', async function () {
    let input = 'Mangoes are my favorite fruit.'
    let output = `Mangoes are my <span class="highlight">favourite</span> fruit.`
    assert.equal(output, await translator.translate(amToBrit, input));
  })

  test('#I ate yogurt for breakfast.', async function () {
    let input = 'I ate yogurt for breakfast.'
    let output = `I ate <span class="highlight">yoghurt</span> for breakfast.`
    assert.equal(output, await translator.translate(amToBrit, input));
  })

  test("#We had a party at my friend's condo.", async function () {
    let input = `We had a party at my friend's condo.`
    let output = `We had a party at my friend's <span class="highlight">flat.</span>`
    assert.equal(output, await translator.translate(amToBrit, input));
  })

  test("#Can you toss this in the trashcan for me?", async function () {
    let input = `Can you toss this in the trashcan for me?`
    let output = `Can you toss this in the <span class="highlight">bin</span> for me?`
    assert.equal(output, await translator.translate(amToBrit, input));
  })

  test("#The parking lot was full.", async function () {
    let input = `The parking lot was full.`
    let output = `The <span class="highlight">car</span> <span class="highlight">park</span> was full.`
    assert.equal(output, await translator.translate(amToBrit, input));
  })

  test("#Like a high tech Rube Goldberg machine.", async function () {
    let input = `Like a high tech Rube Goldberg machine.`
    let output = `Like a high tech <span class="highlight">Heath</span> <span class="highlight">Robinson</span> <span class="highlight">device.</span>`
    assert.equal(await translator.translate(amToBrit, input), output);
  })

  test("#To play hooky means to skip class or work.", async function () {
    let input = `To play hooky means to skip class or work.`
    let output = `To <span class="highlight">bunk</span> <span class="highlight">off</span> means to skip class or work.`
    assert.equal(output, await translator.translate(amToBrit, input));
  })

  test("#No Mr. Bond, I expect you to die.", async function () {
    let input = `No Mr. Bond, I expect you to die.`
    let output = `No <span class="highlight">Mr</span> Bond, I expect you to die.`
    assert.equal(output, await translator.translate(amToBrit, input));
  })

  test("#Dr. Grosh will see you now.", async function () {
    let input = `Dr. Grosh will see you now.`
    let output = `<span class="highlight">Dr</span> Grosh will see you now.`

    assert.equal(output, await translator.translate(amToBrit, input));
  })

  test("#Lunch is at 12:15 today.", async function () {
    let input = `Lunch is at 12:15 today.`
    let output = `Lunch is at <span class="highlight">12.15</span> today.`

    assert.equal(output, await translator.translate(amToBrit, input));
  })
});
