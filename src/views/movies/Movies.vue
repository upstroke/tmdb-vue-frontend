<template>
    <main class="ui container" @mouseenter="setSearchResultsVisible(false)">
        <h1 class="ui dividing header">Filme</h1>
        <h3 class="ui header">Top {{maxResultsToLoad}} Top Rated</h3>
        <div class="ui four doubling cards" v-if="movies">
            <card v-for="movie in movies.results" :key="movie.id" v-bind:movie="movie" v-bind:mediatype="'movie'" />
            <button class="fluid ui light button" v-if="movies.results.length < maxResultsToLoad" @click="getMovies">Weitere Filme</button>
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
    import Card from '../../components/card/card';
    import {mapState} from "vuex";

    export default {
        name: 'Movies',
        components: {
            Card
        },
        data() {
            return {
                maxResultsToLoad : 60,
            }
        },
        mounted() {
            this.getMovies();
        },
        methods: {
            setSearchResultsVisible(value){
                this.$store.commit('SET_SEARCH_RESULTS_VISIBLE', value);
            },
            getMovies() {
                this.$store.dispatch('loadTmdbData', {'type': 'movies', 'max': this.maxResultsToLoad});
            }
        },
        computed: {
            ...mapState(['movies'])
        }
    }
</script>
