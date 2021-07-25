const API_URL = 'https://dimaos32.github.io/test-kelnik/data/apartments.json';
const MILISECONDS_IN_SECOND = 1000; // ms
const TIMEOUT = 10000; // ms

const StatusCode = {
  OK: 200,
};

const checkboxes = document.querySelectorAll('.search-filter__room input');
const rangeFilters = document.querySelectorAll('.search-filter__range-item');

const disableFilters = () => {
  if (checkboxes.length) {
    checkboxes.forEach((checkbox) => {
      checkbox.disabled = true;
    });
  }

  if (rangeFilters.length) {
    rangeFilters.forEach((rangeFilter) => {
      rangeFilter.setAttribute('disabled', true);
    });
  }
};

const enableFilters = () => {
  if (checkboxes.length) {
    checkboxes.forEach((checkbox) => {
      checkbox.disabled = false;
    });
  }

  if (rangeFilters.length) {
    rangeFilters.forEach((rangeFilter) => {
      rangeFilter.removeAttribute('disabled');
    });
  }
};

const loadData = (onSuccess, onError) => {
  disableFilters();

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.timeout = TIMEOUT;

  xhr.open('GET', API_URL);
  xhr.send();

  xhr.addEventListener('load', () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });
  xhr.addEventListener('timeout', function () {
    onError(`Запрос не успел выполниться за ${xhr.timeout / MILISECONDS_IN_SECOND} с`);
  });

  enableFilters();
};

export {loadData};
