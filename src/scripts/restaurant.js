/* eslint-disable max-len */
// import data from '../public/data/DATA.json';

// function createRestaurantHTML(restaurant) {
//   return `
//         <div class="restaurant" tabindex="0">
//             <img src="${restaurant.pictureId}" alt="${restaurant.name}" class="restaurant-image">
//             <div class="restaurant-info">
//                 <h2 class="restaurant-name">${restaurant.name}</h2>
//                 <p class="restaurant-city">${restaurant.city}</p>
//                 <p class="restaurant-description">${restaurant.description}</p>
//                 <div class="restaurant-rating">
//                     <span class="rating-stars">&#9733;</span>${restaurant.rating}
//                 </div>
//             </div>
//         </div>
//     `;
// }

// function renderRestaurantList() {
//   const restaurantList = document.getElementById('restaurant-list');
//   const ratingFilter = document.getElementById('rating-filter');
//   const locationFilter = document.getElementById('location-filter');

//   restaurantList.innerHTML = '';

//   data.restaurants.forEach((restaurant) => {
//     if (
//       (ratingFilter.value === '' || restaurant.rating >= parseFloat(ratingFilter.value))
//             && (locationFilter.value === '' || restaurant.city.toLowerCase().includes(locationFilter.value.toLowerCase()))
//     ) {
//       const restaurantHTML = createRestaurantHTML(restaurant);
//       restaurantList.innerHTML += restaurantHTML;
//     }
//   });
// }

// document.getElementById('rating-filter').addEventListener('input', renderRestaurantList);
// document.getElementById('location-filter').addEventListener('input', renderRestaurantList);

// renderRestaurantList();
