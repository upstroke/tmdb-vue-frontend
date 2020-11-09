<template>
    <main class="ui container" @mouseenter="setSearchResultsVisible(false)">
        <h1 class="ui dividing header">Filme</h1>
        <h3 class="ui header">Top Rated</h3>
        <div class="ui four doubling cards" v-if="movies">
            <card v-for="movie in movies" :key="movie.id" v-bind:movie="movie" v-bind:mediatype="'movie'" />
        </div>

        <!-- loading indicator -->
        <div class="ui four cards" v-if="!movies">
            <div class="card" v-for='index in 4' :key='index'>
                <div class="content">
                    <div class="ui active inverted dimmer">
                        <div class="ui text loader">Loading</div>
                    </div>
                    <img class="ui wireframe image" src="../../assets/not-available.png">
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import http from '../../service/http-client'
    import Card from '../../components/card/card'

    export default {
        name: 'Movies',
        components: {
            Card
        },

        data() {
            return {
                movies: null
            }
        },
        created() {
            http.getMovies().then((response) => {
                this.movies = response.data.results;
            }).catch(e => {
                console.log('error: ',e)
            })
        },
        methods: {
            setSearchResultsVisible(value){
                this.$store.commit('SET_SEARCH_RESULTS_VISIBLE', value);
            }
        }
    }
</script>
