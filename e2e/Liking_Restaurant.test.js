const assert = require('assert');

Feature('Liking Restaurant');
Scenario('showing empty liked restaurants', async ({ I }) => {
  I.amOnPage('/#/home');

  // Perbaiki selektor untuk menemukan elemen yang tepat
  I.waitForElement('.restaurant-item-name a', 10);

  I.seeElement('.restaurant-item-name a');
  const firstRestaurant = locate('.restaurant-item-name a').first();
  const firstRestaurantDetail = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.restaurant-item');
  const likedRestaurantDetail = await I.grabTextFrom('.restaurant-item-name a');

  assert.strictEqual(firstRestaurantDetail, likedRestaurantDetail);
});
