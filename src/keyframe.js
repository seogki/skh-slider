export function slideFrame() {
  let arr = {
    last: [
      { transform: `translate(100%, 0)` },
      { transform: `translate(0%, 0)` },
    ],
    first: [
      { transform: `translate(0%, 0)` },
      { transform: `translate(-100%, 0)` },
    ],
  };

  return arr;
}
