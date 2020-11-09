import {createStore} from 'vuex';
import http from '../service/http-client'

export default createStore({
    state: {
        searchResultsVisible: false,
        trending: {
            page: 0,
            total_pages: 0,
            resultsAll: [],
            results: []
        }
    },
    mutations: {
        SET_SEARCH_RESULTS_VISIBLE(state, value) {
            state.searchResultsVisible = value;
        },
        SAVE_TRENDING(state, obj) {
            state.trending.resultsAll = [...this.state.trending.resultsAll,...obj.resultsAll]
            state.trending.results = [...this.state.trending.results, ...obj.results.slice(0, 4)];
            state.trending.page = state.trending.page++;
            state.trending.total_pages = obj.total_pages;
        },
        GET_MORE(state){
            if (state.trending.page <= state.trending.total_pages && state.trending.results < state.trending.resultsAll) {
                state.trending.results = [
                    ...state.trending.results,
                    ...state.trending.resultsAll.slice(state.trending.results.length, state.trending.results.length + 4)
                ]
            }
        }
    },
    getters: {
        searchResultsVisible: state => state.searchResultsVisible,
    },
    actions: {
        loadTrending({commit}, maxResultsToLoad) {
            if(this.state.trending.results.length < maxResultsToLoad){
                http.getTrending(this.state.trending.page + 1).then((response) => {
                    commit('SAVE_TRENDING', {
                        resultsAll: response.data.results,
                        results: response.data.results.slice(0, 4),
                        page: this.state.trending.page++,
                        total_pages: response.data.total_pages
                    });
                }).catch(e => {
                    console.log('error: ', e)
                });
            }

        }

    },
    modules: {}
})
