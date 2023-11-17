const DrawerInitiator = {
  init() {
    document.addEventListener('DOMContentLoaded', () => {
      const menu = document.querySelector('.menu');
      const menuItems = document.querySelectorAll('.menu ul li');
      const mobileMenuButton = document.querySelector('.mobile-menu-button');

      const closeMenu = () => {
        menuItems.forEach((item) => {
          const menuItem = item;
          menuItem.style.display = 'block';
        });
        menu.classList.remove('active'); // Ganti 'open' menjadi 'active'
      };

      mobileMenuButton.addEventListener('click', () => {
        if (menu.classList.contains('active')) {
          closeMenu();
        } else {
          menuItems.forEach((item) => {
            const menuItem = item;
            menuItem.style.display = 'block';
          });

          menu.classList.add('active');
        }
      });

      const displayMenuOnNormalScreen = () => {
        const mediaQuery = window.matchMedia('(min-width: 769px)');
        if (mediaQuery.matches) {
          menuItems.forEach((item) => {
            const menuItem = item;
            menuItem.style.display = 'block';
          });
        } else {
          closeMenu();
        }
      };

      document.addEventListener('click', (event) => {
        const isClickInsideMenu = menu.contains(event.target);
        const isClickOnMobileMenuButton = mobileMenuButton.contains(event.target);

        if (!isClickInsideMenu && !isClickOnMobileMenuButton) {
          closeMenu();
        }
      });

      displayMenuOnNormalScreen();
      window.addEventListener('resize', displayMenuOnNormalScreen);
    });
  },
};

export default DrawerInitiator;
