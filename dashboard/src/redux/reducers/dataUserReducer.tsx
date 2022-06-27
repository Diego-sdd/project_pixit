import { SET_USER, RESET } from "../actions/dataUserActions";

// Initial State
const initialState = {};

// Reducers (Modifies The State And Returns A New State)
const userCompany = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        data: action.data,
      };
    }
    case RESET: {
      return initialState;
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default userCompany;
