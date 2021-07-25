const MIN_PAGE_Y_OFFSET = 250; // px

const initScrollUp = () => {
  const scrollUpBtn = document.querySelector('.apartment-search__scroll-up-btn');

  if (!scrollUpBtn) {
    return;
  }

  const onScroll = () => {
    if (window.pageYOffset >= MIN_PAGE_Y_OFFSET) {
      scrollUpBtn.classList.remove('hidden');
    } else {
      scrollUpBtn.classList.add('hidden');
    }
  };

  const onScrollUpBtnClick = () => {
    window.scrollTo(0, 0);
  };

  window.addEventListener('scroll', onScroll);
  scrollUpBtn.addEventListener('click', onScrollUpBtnClick);
};

export {initScrollUp};
