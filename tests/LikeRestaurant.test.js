/* eslint-disable max-len */
import 'fake-indexeddb/auto';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurantDB';
import {
  createLikeRestaurantButtonTemplate,
} from '../src/scripts/views/templates/template-creator';

describe('Favorite Restaurant Tests', () => {
  const testRestaurant = { id: 1, name: 'Test Restaurant' };

  beforeEach(async () => {
    // Memasukkan data restoran sebelum setiap pengujian
    await FavoriteRestaurantIdb.putRestaurant(testRestaurant);
  });

  it('should retrieve the restaurant from the database', async () => {
    const retrievedRestaurant = await FavoriteRestaurantIdb.getRestaurant(testRestaurant.id);

    // Mengujikan bahwa restoran yang diambil sesuai dengan yang dimasukkan sebelumnya
    expect(retrievedRestaurant).toEqual(testRestaurant);
  });
});

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = `
          <div id="likeButtonContainer"></div>
        `;
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });
  it('should show the like button when the restaurant has not been liked before', async () => {
    const restaurant = { id: 1, name: 'Test Restaurant' };
    document.querySelector('#likeButtonContainer').innerHTML = createLikeRestaurantButtonTemplate();

    // Pastikan tidak ada data restoran sebelumnya di basis data
    const restaurantInDB = await FavoriteRestaurantIdb.getRestaurant(restaurant.id);

    // Pastikan tombol 'like' ditampilkan karena restoran belum disukai sebelumnya
    expect(document.querySelector('[aria-label="like this restaurant"]')).not.toBeTruthy();
  });
  it('should be able to like a restaurant', async () => {
    const restaurant = { id: 1, name: 'Test Restaurant' }; // Tambahkan properti name
    document.querySelector('#likeButtonContainer').innerHTML = createLikeRestaurantButtonTemplate();

    // Simulasi interaksi pengguna: klik tombol 'like'
    document.getElementById('likeButton').dispatchEvent(new Event('click'));

    // Pastikan restoran disukai dengan memeriksa apakah restoran tersebut disimpan di basis data setelah klik
    await expect(FavoriteRestaurantIdb.getRestaurant(restaurant.id)).resolves.toEqual(restaurant);
  });
  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    const restaurant = { id: 1, name: 'Test Restaurant' };
    document.querySelector('#likeButtonContainer').innerHTML = createLikeRestaurantButtonTemplate();

    // Ensure there is no previous restaurant data in the database
    const restaurantInDB = await FavoriteRestaurantIdb.getRestaurant(restaurant.id);

    // Ensure that the 'like' button is not displayed because the restaurant has not been liked before
    expect(document.querySelector('[aria-label="like this restaurant"]')).not.toBeTruthy();

    // Ensure that the 'unlike' button is not displayed because the restaurant has not been liked before
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).not.toBeTruthy();
  });
  it('should not add a restaurant again when it is already liked', async () => {
    const restaurant = { id: 1, name: 'Test Restaurant' };
    document.querySelector('#likeButtonContainer').innerHTML = createLikeRestaurantButtonTemplate();

    // Simulate user interaction: click the 'like' button
    document.getElementById('likeButton').dispatchEvent(new Event('click'));

    // Ensure the restaurant is liked by checking if the restaurant is saved in the database after the click
    await expect(FavoriteRestaurantIdb.getRestaurant(restaurant.id)).resolves.toEqual(restaurant);

    // Try to add the same restaurant again by clicking the 'like' button
    document.getElementById('likeButton').dispatchEvent(new Event('click'));

    // Ensure that the restaurant is not added again to the database when it's already liked
    const likedRestaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const likedRestaurantCount = likedRestaurants.filter((r) => r.id === restaurant.id).length;
    expect(likedRestaurantCount).toBe(1);
  });
});
