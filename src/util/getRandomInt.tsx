export const getRandomInt = (max: number, min?: number) => {
  if (min && min >= max) {
    throw new Error("Min cannot be greater than max");
  } else if (min) {
    return min + Math.floor(Math.random() * Math.floor(max - min));
  }

  return Math.floor(Math.random() * Math.floor(max));
};
