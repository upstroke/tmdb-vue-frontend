<template src="./template.html"/>
<style lang="scss" src="./styles.scss"/>

<script>
    import http, {axiosInstance} from "../../service/http-client";
    import mixins from '../../shared/utils';

    export default {
        name: 'featured',
        mixins: [mixins],
        data() {
            return {
                SingleMovie: {},
                SingleMovieCast: {}
            }

        },
        props: ['movieNumber','getType'],
        created() {
            http.getDetails(this.movieNumber, this.getType).then(axiosInstance.spread((...responses) => {
                this.SingleMovie = responses[0].data;
                this.SingleMovieCast = responses[1].data;
            })).catch(e => {
                console.log('error: ', e)
            })
        }
    }

</script>
