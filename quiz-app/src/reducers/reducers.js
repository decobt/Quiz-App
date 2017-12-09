import Cookies from 'universal-cookie';

//define and check for cookie
const cookies = new Cookies();
var status = cookies.get('status');
if (status === undefined){
  status = {loggedIn:false};
}

//define initial state variables
const initialState = {
  isFetching: false,
  loggedIn: status.loggedIn,
  byHash:[]
}

const quizReducer = function (state = initialState, action){
  switch(action.type){
    case 'SET_QUIZ': {
      //console.log(action.payload);
      return {...state,
        byHash: {
          ...state.byHash,
          [state.byHash.length]: action.payload
        }
      }
    }
    case 'FETCHING_QUIZ': {
      return { ...state, isFetching:true}
    }
    case 'FETCHED_QUIZ':{
      return {
        isFetching:false,
        loggedIn: state.loggedIn,
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
