export default {

  namespace: 'Referrer',

  state: {    
    query: {},
  },

  reducers: {
    setQueryState(state, action) {
      return { 
        ...state,
        query:{
          ...state.query,
          state: action.payload,
        }
      }
    },
  },  
}