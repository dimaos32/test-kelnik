import {formatPrice} from './utils';
import {loadData} from './backend';

const FIRST_LOAD = 5; // apartments
const LOAD_MORE = 20; // apartments

let currentData = [];

const searchResult = document.querySelector('.search-result');
const resultList = searchResult.querySelector('.search-result__list');
const loadMoreBtn = searchResult.querySelector('.search-result__load-more-btn');

const checkboxGroup = document.querySelector('.search-filter__rooms');
const checkboxes = checkboxGroup.querySelectorAll('.search-filter__room input');
const filterMinPrice = document.querySelector('#filter-min-price');
const filterMaxPrice = document.querySelector('#filter-max-price');
const filterMinSquare = document.querySelector('#filter-min-square');
const filterMaxSquare = document.querySelector('#filter-max-square');

const apartmentTemplate = document.querySelector('#apartment-card')
    .content
    .querySelector('.apartment-card');
const errorMessageTemplate = document.querySelector('#error-request-response')
    .content
    .querySelector('.error-request-response');

const renderApartmentCard = (data) => {
  const {img, title, square, floor, price} = data;
  const listItem = document.createElement('li');
  const card = apartmentTemplate.cloneNode(true);
  const cardImg = card.querySelector('.apartment-card__img img');
  const cardTitle = card.querySelector('.apartment-card__title');
  const cardSquare = card.querySelector('.apartment-card__square');
  const cardFloor = card.querySelector('.apartment-card__floor');
  const cardPrice = card.querySelector('.apartment-card__price');

  cardImg.src = `img/${img.location}/${img.file}`;
  cardImg.alt = img.altText;
  cardTitle.textContent = title;
  cardSquare.textContent = square.toString().replace('.', ',');
  cardFloor.innerHTML = `<span>${floor.current}</span> из ${floor.total}`;
  cardPrice.textContent = formatPrice(price);

  listItem.classList.add('search-result__item');
  listItem.append(card);
  resultList.append(listItem);
};

const renderErrorMessage = (message) => {
  const listItem = document.createElement('li');
  const errorMessage = errorMessageTemplate.cloneNode(true);

  errorMessage.textContent = message;

  listItem.classList.add('search-result__item');
  listItem.append(errorMessage);
  resultList.append(listItem);
};

const renderNextNCards = (quantity = LOAD_MORE) => {
  const startIndex = resultList.children.length;
  const endIndex = currentData.length - startIndex < quantity ?
    currentData.length :
    startIndex + quantity;

  for (let i = startIndex; i < endIndex; i++) {
    renderApartmentCard(currentData[i]);
  }

  if (endIndex < currentData.length) {
    loadMoreBtn.classList.remove('hidden');
  } else {
    loadMoreBtn.classList.add('hidden');
  }
};

const cbLoadDataSuccess = (data) => {
  let roomsFilterIsActive = false;

  for (let checkbox of checkboxes) {
    if (checkbox.checked) {
      roomsFilterIsActive = true;
    }
  }

  currentData = data.filter((apartment) => {
    const currentCheckbox = checkboxGroup.querySelector(`[data-rooms="${apartment.rooms}"]`);

    return apartment.price >= filterMinPrice.value &&
      apartment.price <= filterMaxPrice.value &&
      apartment.square >= filterMinSquare.value &&
      apartment.square <= filterMaxSquare.value &&
      (!roomsFilterIsActive || currentCheckbox.checked);
  });

  resultList.innerHTML = '';

  renderNextNCards(FIRST_LOAD);
};

const onLoadMoreBtnClick = () => {
  console.log('load more');
  renderNextNCards(LOAD_MORE);
};

const cbLoadDataError = (data) => {
  renderErrorMessage(data);
};

const initSearchResult = () => {
  const filter = document.querySelector('.search-filter');

  if (!filter) {
    return;
  }

  loadData(cbLoadDataSuccess, cbLoadDataError);

  loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
};

export {initSearchResult, cbLoadDataSuccess, cbLoadDataError};
