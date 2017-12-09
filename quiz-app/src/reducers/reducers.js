const initialState = {
  isFetching: false,
  loggedIn: false,
  byHash:[]
}

const quizReducer = function (state = initialState, action){
  switch(action.type){
    case 'SET_QUIZ': {
      //console.log(action.payload);
      return {...state,
        byHash: {
          ...state.byHash,
          [action.payload.id]: action.payload
        }
      }
    }
    case 'FETCHING_QUIZ': {
      return { ...state, isFetching:true}
    }
    case 'FETCHED_QUIZ':{
      return {
        loggedIn: state.loggedIn,
        isFetching:false,
        byHash: action.payload.byHash
      }
    }
    case 'DELETE_QUIZ': {
      console.log(action.payload);
      console.log(state.byHash.filter(({ id }) => id !== action.data))
      return state
    }
    case 'LOGIN_USER': {
      return {...state, loggedIn:action.payload}
    }
    default:
      return state;
  }
}
export default quizReducer;
