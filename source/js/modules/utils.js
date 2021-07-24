const formatPrice = (num) => {
  return num < 1000
    ? num.toString()
    : `${formatPrice(num.toString().slice(0, -3))} ${num.toString().slice(-3)}`;
};

export {formatPrice};
