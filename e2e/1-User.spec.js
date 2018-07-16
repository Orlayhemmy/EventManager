const path = require('path');

const APP_BASE_URL = 'http://localhost:3000';
module.exports = {
  'User should be able to see the landing page': browser => {
    browser
      .url(APP_BASE_URL)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${APP_BASE_URL}/`)
      .pause(2000);
  },
  'User should see the buttons on the navigation bar': browser => {
    browser.assert
      .visible('#mainNav')
      .pause(2000)
      .assert.visible('.nav-item')
      .assert.containsText('#home', 'Home')
      .assert.visible('#view-centers')
      .assert.containsText('#view-centers', 'Centers')
      .assert.visible('#about')
      .assert.containsText('#about', 'About Us')
      .assert.visible('#signIn')
      .assert.containsText('#signIn', 'Sign In');
  },
  'User should see footer': browser => {
    browser.assert
      .visible('#footer')
      .pause(2000)
      .assert.visible('p')
      .assert.containsText('.footer-text', 'eCenter 2017');
  },
  'User should be able to see the signup': browser => {
    browser
      .pause(3000)
      .assert.visible('#signup-form')
      .pause(1000)
      .setValue('#fullname', 'Dennis')
      .pause(500)
      .setValue('#email', 'dennisdmenace@test.com')
      .pause(500)
      .setValue('#password', 'menace')
      .pause(500)
      .setValue('#retypePass', 'menace')
      .click('#signup')
      .pause(5000);
  },
  'User should be able to add event': browser => {
    browser
      .url(`${APP_BASE_URL}/dashboard`)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${APP_BASE_URL}/dashboard`)
      .url(`${APP_BASE_URL}/add-event`)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${APP_BASE_URL}/add-event`)
      .pause(5000)
      .click('#centerId')
      .setValue('#centerId', 'Ibis')
      .setValue('#bookedDate', '21-08-2018')
      .pause(1000)
      .click('#add-date')
      .pause(1000)
      .setValue('#eventTitle', 'Pizza Party')
      .pause(2000)
      .setValue('#description', 'Just for me and my friends only')
      .pause(2000)
      .click('#submit-event')
      .pause(2000);
  },
  'User should be able to modify event': browser => {
    browser
      .click('h2')
      .pause(3000)
      .clearValue('#bookedDate')
      .setValue('#bookedDate', '21-08-2018')
      .pause(1000)
      .click('#modify-date')
      .pause(1000)
      .clearValue('#eventTitle')
      .setValue('#eventTitle', 'Get together')
      .pause(2000)
      .clearValue('#description')
      .setValue('#description', 'A two day vacation for me and my friends')
      .pause(2000)
      .click('#edit-event')
      .pause(4000);
  },
  'User should be able to delete event': browser => {
    browser.assert
      .visible('i')
      .click('#delete-1')
      .assert.visible('#delete-content')
      .pause(2000)
      .assert.visible('#yes')
      .pause(500)
      .click('#yes')
      .pause(2000);
  },
  'User should be view and edit his details on profile page': browser => {
    browser
      .url(`${APP_BASE_URL}/profile`)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${APP_BASE_URL}/profile`)
      .pause(5000)
      .click('#show-form')
      .pause(2000)
      .click('#changePassword')
      .pause(2000)
      .setValue('#oldPassword', 'menace')
      .pause(2000)
      .click('#check-password')
      .pause(2000)
      .setValue('#newPassword', 'qwerty')
      .pause(2000)
      .setValue('#retypePass', 'qwerty')
      .pause(2000)
      .clearValue('#fullname')
      .setValue('#fullname', 'Dennis Menace')
      .pause(2000)
      .click('#updateDetails')
      .pause(20000);
  }
};
