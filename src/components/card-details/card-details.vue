<template src="./template.html"/>
<style lang="scss" src="./styles.scss" scoped />

<script>
    // import moment from "moment";

    import http, {axiosInstance} from "../../service/http-client";
    import mixins from '../../shared/utils'

    export default {
        name: 'card-details',
        props: ['id', 'mediatype'],
        mixins: [mixins],
        data () {
            return {
                SingleMovie: {},
                SingleMovieCast: {}
            }
        },
        mounted() {
            http.getDetails(this.id, this.mediatype).then(axiosInstance.spread((...responses) => {
                this.SingleMovie = responses[0].data;
                this.SingleMovieCast = responses[1].data;
                // console.log('SingleMovie',responses[0].data);
                // console.log('SingleMovieCast',responses[1].data);
                this.$route.meta.title = this.SingleMovie.title ? this.SingleMovie.title : this.SingleMovie.name;
                console.log(this.$route.meta.title)
            })).catch(e => {
                console.log('error: ', e)
            });



            this.scrollToTop();
        },
        methods: {
            scrollToTop() {
                window.scrollTo({top: 0, behavior: 'smooth'});
            },
            setSearchResultsVisible(value){
                this.$store.commit('SET_SEARCH_RESULTS_VISIBLE', value);
            }
        }
    }
</script>
