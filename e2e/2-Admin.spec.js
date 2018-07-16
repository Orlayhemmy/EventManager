const path = require('path');

const APP_BASE_URL = 'http://localhost:3000';
module.exports = {
  'Admin should be able to login': browser => {
    browser
      .url(`${APP_BASE_URL}/`)
      .waitForElementVisible('body', 5000)
      .assert.visible('#logout')
      .click('#logout')
      .pause(5000)
      .assert.visible('#mainNav')
      .click('#signIn')
      .pause(2000)
      .setValue('#loginEmail', 'admin@test.com')
      .pause(1000)
      .setValue('#loginPassword', '1234567890')
      .pause(1500)
      .click('#signin-submit')
      .pause(10000);
  },
  'Admin should be able to add center': browser => {
    browser
      .url(`${APP_BASE_URL}/dashboard`)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${APP_BASE_URL}/dashboard`)
      .url(`${APP_BASE_URL}/add-center`)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${APP_BASE_URL}/add-center`)
      .pause(5000)
      .setValue('input[type="file"]', path.resolve(`${__dirname}/./andela.jpg`))
      .setValue('#centerName', 'Andela Hall')
      .pause(1000)
      .setValue('#location', 'maryland, lagos')
      .pause(1000)
      .setValue('#facilities', 'storage, dinning hall')
      .pause(2000)
      .setValue('#capacity', '5000')
      .pause(1000)
      .setValue('#cost', '1000000')
      .pause(1000)
      .setValue(
        '#description',
        'It has a fully functional Air Conditioning system, ample parking space, standby generator and a total bargain of an event centre.'
      )
      .pause(2000)
      .click('#submit-center')
      .pause(20000);
  },
  'Admin should be to view a center details and modify': browser => {
    browser
      .pause(3000)
      .click('h2')
      .pause(5000)
      .click('i')
      .pause(2000)
      .clearValue('#centerName')
      .setValue('#centerName', 'Epic Center')
      .pause(1000)
      .clearValue('#location')
      .setValue('#location', 'maryland, lagos')
      .pause(1000)
      .clearValue('#capacity')
      .setValue('#capacity', '5500')
      .pause(1000)
      .clearValue('#facilities')
      .setValue('#facilities', 'storage, dinning hall, lodge')
      .pause(2000)
      .clearValue('#cost')
      .setValue('#cost', '1800000')
      .pause(2000)
      .click('#edit-submit')
      .pause(5000);
  },
  'Admin should be able to delete center': browser => {
    browser
      .url(`${APP_BASE_URL}/admin-centers`)
      .waitForElementVisible('body', 5000)
      .pause(3000)
      .waitForElementVisible('body', 5000)
      .assert.visible('.trash')
      .click('.trash')
      .pause(2000)
      .click('#yes')
      .pause(5000)
      .assert.visible('#logout')
      .click('#logout')
      .pause(5000)
      .end();
  }
};
