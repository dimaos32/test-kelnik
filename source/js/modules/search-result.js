const formatPrice = (num) => {
  return num < 1000
    ? num.toString()
    : `${formatPrice(num.toString().slice(0, -3))} ${num.toString().slice(-3)}`;
};

console.log(formatPrice(50000));

const initSearchResult = () => {
  const searchResult = document.querySelector('.search-result');

  if (!searchResult) {
    return;
  }

  const resultList = document.querySelector('.search-result__list');
  const apartmentTemplate = document.querySelector('#apartment-card')
      .content
      .querySelector('.apartment-card');

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

  renderApartmentCard({
    img: {
      location: 'svg',
      file: 'apartment.svg',
      altText: 'План квартиры',
    },
    title: '3-комнатная №104',
    square: 63.1,
    floor: {
      current: 1,
      total: 17,
    },
    rooms: 3,
    price: 6630500,
  });

  renderApartmentCard({
    img: {
      location: 'svg',
      file: 'apartment.svg',
      altText: 'План чердака',
    },
    title: 'Помещение на чердаке',
    square: 18.6,
    floor: {
      current: 5,
      total: 4,
    },
    rooms: 1,
    price: 369000,
  });
};

export {initSearchResult};
