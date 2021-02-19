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

export function fadeFrame() {
  let arr = {
    last: [{ opacity: 0 }, { opacity: 1 }],
    first: [{ opacity: 1 }, { opacity: 0 }],
  };

  return arr;
}
