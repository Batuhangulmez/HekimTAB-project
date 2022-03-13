import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constans/actionsConstant";

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    default:
      return posts;
  }
};
