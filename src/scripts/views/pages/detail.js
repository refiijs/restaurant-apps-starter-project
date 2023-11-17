/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable max-len */
/* eslint-disable no-alert */
import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantDB';
import { createRestaurantDetailTemplate, createLoadingTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurantDB';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
      <div id="reviewContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantContainer = document.querySelector('#restaurant');

    try {
      // Show loading indicator while waiting for the data
      restaurantContainer.innerHTML = createLoadingTemplate();

      const restaurant = await RestaurantDbSource.detailRestaurant(url.id);

      // Render the restaurant details
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant, false, null);
      // Initialize LikeButtonPresenter
      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurant: FavoriteRestaurantIdb,
        restaurant: {
          id: url.id,
          name: restaurant.name,
          city: restaurant.city,
          address: restaurant.address,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          menus: restaurant.menus,
          rating: restaurant.rating,
          customerReviews: restaurant.customerReviews,
        },
      });
    } catch (error) {
      // Handle error by showing an error message
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(null, false, 'Failed to fetch restaurant details');
      console.error('Error fetching restaurant details:', error);
    }
  },
};

export default Detail;
