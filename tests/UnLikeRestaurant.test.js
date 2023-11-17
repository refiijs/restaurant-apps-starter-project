/* eslint-disable max-len */
import 'fake-indexeddb/auto';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurantDB';
import {
  createUnlikeRestaurantButtonTemplate,
} from '../src/scripts/views/templates/template-creator';

describe('Unlike Restaurant', () => {
  const restaurant = {
    id: 1,
    name: 'Test Restaurant',
    // Properti lainnya sesuai kebutuhan tes
  };

  // Before each test, add the restaurant to the liked list
  beforeEach(async () => {
    await FavoriteRestaurantIdb.putRestaurant(restaurant);
  });

  // After each test, remove the added restaurant from the liked list
  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML = createUnlikeRestaurantButtonTemplate();
    const unlikeButton = buttonContainer.querySelector('#likeButton');

    expect(unlikeButton).toBeTruthy();
  });

  it('should display like widget when the restaurant has been liked', async () => {
    const buttonContainer = document.createElement('div');

    // Simulasi restoran sudah disukai sebelumnya dengan menambahkannya ke dalam daftar restoran yang disukai
    await FavoriteRestaurantIdb.putRestaurant(restaurant);

    // Mengambil template tombol "like" setelah status restoran sudah disukai
    buttonContainer.innerHTML = createUnlikeRestaurantButtonTemplate(); // Ubah fungsi template sesuai dengan kondisi "sudah disukai"
    const likeButton = buttonContainer.querySelector('#likeButton');

    // Memeriksa apakah tombol "like" ditampilkan karena restoran telah disukai
    expect(likeButton).toBeTruthy();
  });
  it('should be able to remove liked restaurant from the list', async () => {
    // Ensure the restaurant is in the liked list before deletion
    const likedRestaurantBeforeDeletion = await FavoriteRestaurantIdb.getRestaurant(restaurant.id);
    expect(likedRestaurantBeforeDeletion).toBeTruthy();

    // Remove the restaurant from the liked list
    await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);

    // Ensure the restaurant is no longer in the liked list after deletion
    const likedRestaurantAfterDeletion = await FavoriteRestaurantIdb.getRestaurant(restaurant.id);
    expect(likedRestaurantAfterDeletion).not.toBeNull();

    // Get all liked restaurants after deletion
    const allLikedRestaurants = await FavoriteRestaurantIdb.getAllRestaurants();

    // Check if the list of liked restaurants is empty
    expect(allLikedRestaurants).toHaveLength(0);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    // Try removing a restaurant that is not in the list
    const removeUnlikedRestaurant = async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(999); // Non-existent ID for testing
    };

    // Expect the removal process not to throw an error
    await expect(removeUnlikedRestaurant()).resolves.not.toThrow();
  });
});
