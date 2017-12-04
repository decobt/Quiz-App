var actions = {
 setQuiz(args){
    return {
      type: 'SET_QUIZ',
      payload: args
    }
  },

 deleteQuiz(args){
    return {
      type: 'DELETE_QUIZ',
      payload: args
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
