var actions = {
 fetchingQuiz(){
   return {
     type: 'FETCHING_QUIZ'
   }
 },

 fetchedQuiz(args){
   return {
     type: 'FETCHED_QUIZ',
     payload: args
   }
 },

 setQuiz(args){
    return {
      type: 'SET_QUIZ',
      payload: args
    }
  },

 deleteQuiz(args){
    return {
      type: 'DELETE_QUIZ',
      payload: {id: args}
    }
  },

  updateQuiz(args){
    return {
      type: 'UPDATE_QUIZ',
      payload: args
    }
  }
}

export default actions;
