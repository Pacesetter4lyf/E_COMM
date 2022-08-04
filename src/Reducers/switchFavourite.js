import featured from "../Data/featured.json";

const switchFavourite = (state = featured, action) => {
  switch (action.type) {
    case "change":
      let copy = state[action.position];
      copy = { ...copy, favorite: !copy.favorite };
      state[action.position] = copy;
      return state;
    default:
      return state;
  }
};

export default switchFavourite;
