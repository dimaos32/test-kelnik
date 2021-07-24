import {formatPrice} from './utils';
import {loadData} from './backend';

const searchResult = document.querySelector('.search-result');
const resultList = searchResult.querySelector('.search-result__list');

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

const cbLoadDataSuccess = (data) => {
  resultList.innerHTML = '';

  data.forEach((apartment) => {
    renderApartmentCard(apartment);
  });
};

const cbLoadDataError = (data) => {
  renderErrorMessage(data);
};

const initSearchResult = () => {
  const filter = document.querySelector('.search-filter');

  if (!searchResult) {
    return;
  }

  loadData(cbLoadDataSuccess, cbLoadDataError);
};

export {initSearchResult, loadData, cbLoadDataSuccess, cbLoadDataError};
