<template src="./template.html"/>
<style lang="scss" src="./styles.scss"/>

<script>
    import http, {axiosInstance} from "../../service/http-client";
    import moment from 'moment';

    export default {
        name: 'featured',
        data() {
            return {
                SingleMovie: {},
                SingleMovieCast: {}
            }

        },
        created() {
            http.getMovieDetails('497582').then(axiosInstance.spread((...responses) => {
                this.SingleMovie = responses[0].data;
                this.SingleMovieCast = responses[1].data;
            })).catch(e => {
                console.log('error: ', e)
            })
        },
        methods: {
            getFormatedDate: function(dateString) {
                moment.locale('de');
                return moment(dateString).format('Do MM. YYYY')
            }
        }
    }

</script>
