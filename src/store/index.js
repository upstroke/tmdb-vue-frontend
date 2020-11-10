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
        },
        movies: {
            page: 0,
            total_pages: 0,
            resultsAll: [],
            results: []
        },
        tvShows: {
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
        SAVE_DATA(state, obj) {
            state[obj.type].resultsAll = [...this.state[obj.type].resultsAll,...obj.resultsAll]
            state[obj.type].results = [...this.state[obj.type].results, ...obj.results.slice(0, 4)];
            state[obj.type].page = state[obj.type].page++;
            state[obj.type].total_pages = obj.total_pages;
        },
        GET_MORE(state, obj){
            state[obj.type].results = [
                ...state[obj.type].results,
                ...state[obj.type].resultsAll.slice(state[obj.type].results.length, state[obj.type].results.length + 4)
            ]
        }
    },
    getters: {
        searchResultsVisible: state => state.searchResultsVisible,
    },
    actions: {
        loadTmdbData({commit}, obj) {

            let maxResultsToLoad = obj.max;
            let type = obj.type;

            if (this.state[type].page <= this.state[type].total_pages && this.state[type].results < this.state[type].resultsAll) {
                commit('GET_MORE', {type: type});
            }
            else if(this.state[type].results.length < maxResultsToLoad){
                http.getData(this.state[type].page+1, type).then((response) => {
                    commit('SAVE_DATA', {
                        type: type,
                        resultsAll: response.data.results,
                        results: response.data.results.slice(0, 4),
                        page: this.state[type].page++,
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
