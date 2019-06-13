import addFavorite from "./addFavorite";
import removeFavorite from "./removeFavorite";

const Events = function Events({ eventType, action }) {
  switch (eventType) {
    case "addFavorite":
      return addFavorite({ action });
    case "removeFavorite":
      return removeFavorite({ action });
    default:
      return null;
  }
};

export default Events;
