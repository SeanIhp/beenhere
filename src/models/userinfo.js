export default {

  namespace: 'userInfo',

  state: {
  },

  reducers: {
    setUserInfo(state, action) {
      return { ...action.payload };
    },
  },
}
