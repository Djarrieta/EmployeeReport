export const factory = () => {
  // eslint-disable-next-line
  const { useRef } = require('react');
  return { useInView: () => ({ ref: useRef(), inView: true }) };
};
