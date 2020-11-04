import { createStore } from 'vuex'

export default createStore({
  state: {
    searchResultsVisible: false
  },
  mutations: {
    SET_SEARCH_RESULTS_VISIBLE(state, value) {
      state.searchResultsVisible = value;
    }
  },
  getters: {
    searchResultsVisible: () => this.state.searchResultsVisible
  },
  actions: {
  },
  modules: {
  }
})
