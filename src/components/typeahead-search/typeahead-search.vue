<template src="./template.html"/>
<style lang="scss" src="./style.scss"/>

<script>
    import http, {axiosInstance} from '../../service/http-client'
    import moment from "moment";

    export default {
        name: 'typeahead-search',
        data() {
            return {
                term: null,
                movies: null,
                shows: null
            }

        },
        methods: {
            onSearch(event) {
                this.term = event.target.value;
                if(this.term.length > 3){
                    this.getResult();
                }else {
                    this.movies = null;
                    this.shows = null;
                    this.setSearchResultsVisible(false)
                }
            },
            getResult(){
                http.getSearchTerm(this.term)
                    .then(axiosInstance.spread((...responses) => {
                        this.movies = responses[0].data;
                        this.shows = responses[1].data;
                })).then(
                    () => {
                        if(this.movies.total_results < 1 && this.shows.total_results < 1){
                            this.setSearchResultsVisible(false)
                        }else {
                            this.setSearchResultsVisible(true)
                        }
                    }
                    )
                    .catch(e => {
                    console.log('error: ', e)
                })
            },
            setSearchResultsVisible(value){
                this.$store.commit('SET_SEARCH_RESULTS_VISIBLE', value);
            },
            getFormatedDate: function(dateString) {
                if(dateString !=""){
                    moment.locale('de');
                    return moment(dateString).format('DD. MM. YYYY')
                }else{
                    return 'kein Datum vorhanden'
                }

            },
            formatRating(value){
                return value.toFixed(2)
            }

        },
        computed: {
            getSearchResultsVisible() {
                return this.$store.state.searchResultsVisible;
            }
        }
    }
</script>
