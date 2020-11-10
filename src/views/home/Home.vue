<template>
    <main class="ui container" @mouseenter="setSearchResultsVisible(false)">
        <h2 class="ui dividing header">Featured Today</h2>
        <featured/>

        <div class="ui hidden divider"></div>

        <h2 class="ui dividing header right">Discover {{maxResultsToLoad}} Top Rated Productions</h2>
        <div class="spacer">
            <p>Discover movies by different types of data like average rating, number of votes, genres and
                certifications.</p>
        </div>
        <div class="ui four doubling cards" v-if="trending">
            <card v-for="movie in trending.results" :key="movie.id" v-bind:movie="movie" v-bind:mediatype="movie.media_type"/>
            <button class="fluid ui light button" v-if="trending.results.length < maxResultsToLoad" @click="getTrending">Weitere Filme</button>
        </div>



        <!-- loading indicator -->
        <div class="ui four doubling cards" v-if="!trending">
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
    import Featured from '../../components/featured/featured'
    import {mapState} from "vuex";

    export default {
        name: 'Home',
        components: {
            Card,
            Featured
        },
        data() {
            return {
                maxResultsToLoad : 60
            }
        },
        mounted() {
            this.getTrending();
        },
        methods: {
            setSearchResultsVisible(value) {
                this.$store.commit('SET_SEARCH_RESULTS_VISIBLE', value);
            },
            getTrending() {
                this.$store.dispatch('loadTmdbData', {'type': 'trending', 'max': this.maxResultsToLoad});
            }
        },
        computed: {
            ...mapState(['trending'])
        }
    }
</script>
