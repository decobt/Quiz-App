const initialState = {
  isFetching: false,
  question: '',
  options: '',
  answer: '',
  byID:[],
  byHash:[]
}

const quizReducer = function (state = initialState, action){
  switch(action.type){
    case 'SET_QUIZ': {
      //console.log(action.payload);
      return {
        byID: [ ...state.byID, action.payload.id],
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
        isFetching:false,
        byID: action.payload.byId,
        byHash: action.payload.byHash
      }
    }
    case 'DELETE_QUIZ': {
      console.log(action.payload);
      break;
    }
    case 'UPDATE_QUIZ': {
      console.log(action.payload);
      break;
    }
    default:
      return state;
  }
}
export default quizReducer;
