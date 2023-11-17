const assert = require('assert');

Feature('Unliking Restaurant');
Before(({ I }) => {
  I.amOnPage('/#/like');
});
Scenario('showing empty liked menu restaurant', ({ I }) => {
  I.dontSeeElement('.restaurant-item');
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.seeElement('.content-heading');
  I.amOnPage('/');

  I.waitForElement('.restaurant-item-name a', 30);
  I.seeElement('.restaurant-item-name a');

  const firstRestaurant = locate('.restaurant-item-name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 30);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.restaurant-item');

  const unlikedRestaurantName = await I.grabTextFrom('.restaurant-item-name a');
  assert.strictEqual(firstRestaurantName, unlikedRestaurantName);

  I.seeElement('.restaurant-item-name a');
  await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.dontSeeElement('.restaurant-item');
});
