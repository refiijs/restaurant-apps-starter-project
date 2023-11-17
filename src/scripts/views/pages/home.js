/* eslint-disable implicit-arrow-linebreak */
import RestaurantDbSource from '../../data/restaurantDB';
import { createRestaurantItemTemplate, createLoadingTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <div class="content" tabindex="0">
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

      const restaurants = await RestaurantDbSource.Home();

      // Render the restaurant items
      restaurantsContainer.innerHTML = restaurants.map((restaurant) =>
        createRestaurantItemTemplate(restaurant, false, null)).join('');
    } catch (error) {
      // Handle error by showing an error message
      restaurantsContainer.innerHTML = createErrorTemplate('Failed to fetch restaurant data');
      console.error('Error fetching restaurant data:', error);
    }
  },
};

export default Home;
