import axios from 'axios';

const apiURL = process.env.VUE_APP_URL;
const apiKey = process.env.VUE_APP_API_KEY;
const apiLang = process.env.VUE_APP_LANG;
const httpClient = axios.create({
    baseURL: apiURL,
    timeout: 3000
});


export const axiosInstance = axios;

export default {
    getData(page, type){
        console.log('type: ',type)
        switch (type) {
            case 'trending':
                return httpClient.get(`/trending/all/week?api_key=${apiKey}&language=${apiLang}${page>1 ? '&page='+page : null}&vote_average.gte=8`);
            case 'movies':
                return httpClient.get(`/trending/movie/week?api_key=${apiKey}&language=${apiLang}${page>1 ? '&page='+page : null}&vote_average.gte=8`);
            case 'tvShows':
                return httpClient.get(`/trending/tv/week?api_key=${apiKey}&language=${apiLang}${page>1 ? '&page='+page : null}&vote_average.gte=8`);
        }
    },

    getMovieDetails(movieID) {
        let reqOne = httpClient.get(`/movie/${movieID}?api_key=${apiKey}&language=${apiLang}`)
        let reqTwo = httpClient.get(`/movie/${movieID}/credits?api_key=${apiKey}&language=${apiLang}`)

        return axios.all([reqOne, reqTwo])
    },

    getTvShowDetails(tvID) {
        let reqOneTV = httpClient.get(`/tv/${tvID}?api_key=${apiKey}&language=${apiLang}`)
        let reqTwoTV = httpClient.get(`/tv/${tvID}/credits?api_key=${apiKey}&language=${apiLang}`)

        return axios.all([reqOneTV, reqTwoTV])
    },

    getSearchTerm(term) {
        let reqOneMovies = httpClient.get(`/search/movie?api_key=${apiKey}&language=${apiLang}&query=${term}`)
        let reqOneTvShows = httpClient.get(`/search/tv?api_key=${apiKey}&language=${apiLang}&query=${term}`)

        return axios.all([reqOneMovies, reqOneTvShows])
    }
}
