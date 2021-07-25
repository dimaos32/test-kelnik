import {formatPrice} from './utils';
import {loadData} from './backend';
import {cbLoadDataSuccess, cbLoadDataError} from './search-result';
import noUiSlider from './../vendor/nouislider';

const DefaultSettings = {
  priceRange: {
    start: [5500000, 18900000],
    step: 100000,
    range: {
      min: 0,
      max: 35000000,
    },
  },
  squareRange: {
    start: [33, 123],
    step: 1,
    range: {
      min: 10,
      max: 250,
    },
  },
};

const initRangeSlider = () => {
  const filter = document.querySelector('.search-filter');

  if (!filter) {
    return;
  }

  const checkboxGroup = filter.querySelector('.search-filter__rooms');
  const checkboxes = checkboxGroup.querySelectorAll('.search-filter__room input');

  const priceFilter = filter.querySelector('.search-filter__range--price');
  const priceRange = priceFilter.querySelector('.search-filter__range-item');
  const priceValues = priceFilter.querySelectorAll('.search-filter__range-value');
  const priceInputs = priceFilter.querySelectorAll('input');
  const squareFilter = filter.querySelector('.search-filter__range--square');
  const squareRange = squareFilter.querySelector('.search-filter__range-item');
  const squareValues = squareFilter.querySelectorAll('.search-filter__range-value');
  const squareInputs = squareFilter.querySelectorAll('input');

  const resetBtn = filter.querySelector('.search-filter__reset-btn');

  const onPriceRangeUpdate = (values, handle) => {
    priceValues[handle].textContent = formatPrice(Math.round(values[handle]));
  };

  const onSquareRangeUpdate = (values, handle) => {
    squareValues[handle].textContent = formatPrice(Math.round(values[handle]));
  };

  const onPriceRangeChange = (values, handle) => {
    priceInputs[handle].value = Math.round(values[handle]);
    loadData(cbLoadDataSuccess, cbLoadDataError);
  };

  const onSquareRangeChange = (values, handle) => {
    squareInputs[handle].value = Math.round(values[handle]);
    loadData(cbLoadDataSuccess, cbLoadDataError);
  };

  const onResetBtnClick = () => {
    priceRange.noUiSlider.set(DefaultSettings.priceRange.start);
    squareRange.noUiSlider.set(DefaultSettings.squareRange.start);

    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    setTimeout(() => {
      loadData(cbLoadDataSuccess, cbLoadDataError);
    }, 300);
  };

  const onCheckboxChange = ({target}) => {
    if (target.closest('input')) {
      loadData(cbLoadDataSuccess, cbLoadDataError);
    }
  };

  noUiSlider.create(priceRange, {
    start: DefaultSettings.priceRange.start,
    connect: true,
    step: DefaultSettings.priceRange.step,
    range: DefaultSettings.priceRange.range,
  });

  noUiSlider.create(squareRange, {
    start: DefaultSettings.squareRange.start,
    connect: true,
    step: DefaultSettings.squareRange.step,
    range: DefaultSettings.squareRange.range,
  });

  priceRange.noUiSlider.on('update', onPriceRangeUpdate);
  squareRange.noUiSlider.on('update', onSquareRangeUpdate);
  priceRange.noUiSlider.on('change', onPriceRangeChange);
  squareRange.noUiSlider.on('change', onSquareRangeChange);

  resetBtn.addEventListener('click', onResetBtnClick);
  checkboxGroup.addEventListener('change', onCheckboxChange);
};

export {initRangeSlider};
