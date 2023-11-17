import CONFIG from '../../globals/config';

const createLoadingTemplate = () => `
  <div class="loader"></div>
`;

const createErrorTemplate = (errorMessage) => `
  <div class="error-message">${errorMessage}</div>
`;

// createRestaurantDetailTemplate
const createRestaurantDetailTemplate = (restaurant, isLoading, errorMessage) => {
  if (isLoading) {
    return createLoadingTemplate();
  }

  if (errorMessage) {
    return createErrorTemplate(errorMessage);
  }

  if (!restaurant) {
    return ''; // Menghindari error jika restaurant tidak terdefinisi
  }

  return `
    <div class="restaurant-detail">
      <h2 class="restaurant-detail-name">${restaurant.name}</h2>
      <img class="restaurant-detail-image lazyload" data-src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}" crossorigin="anonymous" alt="${restaurant.name}" />
      <div class="restaurant-detail-info">
        <h3>Informasi Restauran</h3>
        <h4>Alamat</h4>
        <p>${restaurant.address}</p>
        <h4>City</h4>
        <p>${restaurant.city}</p>
        <h4>Rating</h4>
        <p>${restaurant.rating}</p>
      </div>
      <div class="restaurant-detail-description">
        <h4>Deskripsi</h4>
        <p>${restaurant.description}</p>
        <h4 class="restaurant-detail-food">Menu Makanan</h4>
        ${restaurant.menus.foods.map((food) => `<div>${food.name}</div>`).join('')}
        <h4 class="restaurant-detail-drink">Menu Minuman</h4>
        ${restaurant.menus.drinks.map((drink) => `<div>${drink.name}</div>`).join('')}
        <h4 class="customer-review-box">Customer Reviews</h4>
        ${restaurant.customerReviews.length > 0 ? restaurant.customerReviews.map((review) => `
            <div class="customer-review-box">
              <h5>${review.name}</h5>
              <span>${review.date}</span>
              <p>${review.review}</p>
            </div>
          `).join('') : '<p>Belum ada review untuk restoran ini.</p>'}
      </div>
  </div>
  `;
};

// createRestaurantItemTemplate
const createRestaurantItemTemplate = (restaurant, isLoading, errorMessage) => {
  if (isLoading) {
    return createLoadingTemplate();
  }

  if (errorMessage) {
    return createErrorTemplate(errorMessage);
  }

  if (!restaurant) {
    return ''; // Menghindari error jika restaurant tidak terdefinisi
  }
  return `
  <div class="restaurant-item" tabindex="0">
    <img class="restaurant-item-image lazyload" alt="${restaurant.name}" data-src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}" crossorigin="anonymous">
    <div class="restaurant-item-info">
      <h2 class="restaurant-item-name"><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h2>
      <p class="restaurant-item-city">${restaurant.city}</p>
      <p class="restaurant-item-description">${restaurant.description}</p>
    </div>
    <div class="restaurant-item-rating">
      <span class="rating-stars">&#9733;</span>${restaurant.rating}
    </div>
  </div>
`;
};

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="Suka restoran ini" id="likeButton" class="like">
    <i class="icon-heart" aria-hidden="true"></i>
</button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="Batal suka restoran ini" id="likeButton" class="like">
    <i class="icon-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createLoadingTemplate,
  createErrorTemplate,
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
