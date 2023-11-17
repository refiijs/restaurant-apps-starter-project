import {
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
} from '../views/templates/template-creator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, favoriteRestaurant, restaurant }) {
    this.likeButtonContainer = likeButtonContainer;
    this.restaurant = restaurant;
    this.favoriteRestaurants = favoriteRestaurant;
    await this.renderButton();
  },

  async renderButton() {
    const { id } = this.restaurant;

    if (await this.isRestaurantExist(id)) {
      this.renderLiked();
    } else {
      this.renderLike();
    }
  },

  async isRestaurantExist(id) {
    const restaurant = await this.favoriteRestaurants.getRestaurant(id);
    return restaurant != null && restaurant !== undefined;
  },

  renderLike() {
    this.likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this.favoriteRestaurants.putRestaurant(this.restaurant);
      this.renderButton();
      window.alert('Restoran ditambahkan ke favorit!');
    });
  },

  renderLiked() {
    this.likeButtonContainer.innerHTML = createUnlikeRestaurantButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    const isAlreadyLiked = likeButton.classList.contains('clicked');

    likeButton.addEventListener('click', async () => {
      await this.favoriteRestaurants.deleteRestaurant(this.restaurant.id);
      this.renderButton();

      const isNowLiked = likeButton.classList.contains('clicked');

      // Tampilkan alert sesuai dengan kondisi tombol
      if (!isNowLiked) {
        window.alert('Restoran ditambahkan ke favorit!');
      } else {
        window.alert('Restoran dihapus dari favorit!');
      }
    });

    likeButton.classList.add('clicked');
  },
};

export default LikeButtonPresenter;
