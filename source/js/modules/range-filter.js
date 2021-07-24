import noUiSlider from './../vendor/nouislider';

const initRangeSlider = () => {
  const filter = document.querySelector('.search-filter');
  if (!filter) {
    return;
  }

  const priceRange = filter.querySelector('.search-filter__range-item--price');
  const squareRange = filter.querySelector('.search-filter__range-item--square');

  noUiSlider.create(priceRange, {
    start: [5500000, 18900000],
    connect: true,
    range: {
      'min': 0,
      'max': 35000000,
    },
  });

  noUiSlider.create(squareRange, {
    start: [33, 123],
    connect: true,
    range: {
      'min': 0,
      'max': 250,
    },
  });
};

export {initRangeSlider};
