/* eslint-disable implicit-arrow-linebreak */
import FavoriteRestaurantIdb from '../../data/favorite-restaurantDB';
import { createRestaurantItemTemplate, createLoadingTemplate, createErrorTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
      <div class="content">
      <span id="liking"></span>
        <h2 class="content-heading">List Restoran Favorit Kamu</h2>
        <div id="restaurants" class="restaurants">
 
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('#restaurants');

    try {
      // Show loading indicator while waiting for the data
      restaurantsContainer.innerHTML = createLoadingTemplate();

      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();

      if (restaurants.length === 0) {
        // When there are no favorite restaurants, display a message
        restaurantsContainer.innerHTML = '<h2>Belum ada restoran favorit.<h2>';
      } else {
        // Render the restaurant items
        restaurantsContainer.innerHTML = restaurants
          .map((restaurant) => createRestaurantItemTemplate(restaurant, false, null))
          .join('');
      }
    } catch (error) {
      // Handle error by showing an error message
      restaurantsContainer.innerHTML = createErrorTemplate('Failed to fetch favorite restaurants');
      console.error('Error fetching favorite restaurants:', error);
    }
  },
};

export default Like;
