import * as Randomstring from 'randomstring';

const getRandomString = (length: number = 7): string => {
  return Randomstring.generate({
    length,
    capitalization: 'uppercase',
    readable: true
  });
};

export { getRandomString };
