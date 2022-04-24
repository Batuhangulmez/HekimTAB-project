import {
  FETCH_ALL,
  CREATE,
  DELETE,
  FETCH_ALL_USER_POSTS,
} from "../constans/actionsConstant";

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case FETCH_ALL_USER_POSTS:
      return action.payload;

    case CREATE:
      return [...posts, action.payload];

    case DELETE:
      return posts.filter((post) => post._id !== action.payload);

    default:
      return posts;
  }
};
