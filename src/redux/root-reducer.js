import { combineReducers } from "redux";

import "./user/user.reducer";
import userReducer from "./user/user.reducer";
import challengeReducer from "./challenge/challenge.reducer";
import questionReducer from "./question/question.reducer";
// import directoryReducer from "./directory/directory.reducer";
// import shopReducer from "./shop/shop.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  challenge: challengeReducer,
  question: questionReducer,
  //   cart: cartReducer,
  //   directory: directoryReducer,
  //   shop: shopReducer,
});

export default rootReducer;
