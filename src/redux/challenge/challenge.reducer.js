import challengeActionTypes from "./challenge.types";
import { checkStatus } from "./challenge.utils";
const INITIAL_STATE = {
  currChallenge: {
    challengeCode: "123456",
    description: "hey There this is a test game yall!",
    id: 3,
    start: new Date(2021, 6, 16, 10),
    end: new Date(2021, 6, 18, 10),
    // note: y, m, d, h (month is from 0 to 6)
  },
  challengeStatus: {
    status: null,
    message: null,
  },

  // can be waiting, ongoing, and finished
};

const challengeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case challengeActionTypes.UPDATE_STATUS:
      return {
        ...state,
        challengeStatus: checkStatus(
          state.currChallenge.start,
          state.currChallenge.end
        ),
      };
    default:
      return state;
  }
};

export default challengeReducer;
