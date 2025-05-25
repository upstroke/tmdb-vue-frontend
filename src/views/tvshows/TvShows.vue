<template>
    <transition name="fade" mode="out-in" appear>
        <div @mouseenter="setSearchResultsVisible(false)">
            <featured movieNumber="2566" getType="tv" />

            <main class="ui container">
                <h2 class="ui ividing header">Top {{maxResultsToLoad}} Top Rated</h2>
                <div class="ui four doubling cards" v-if="tvShows">
                    <card v-for="movie in tvShows.results" :key="movie.id" v-bind:movie="movie" v-bind:mediatype="'tv'" />
                    <button class="fluid ui button" v-if="tvShows.results.length < maxResultsToLoad" @click="getTvShows">Weitere Filme</button>
                </div>

                <!-- loading indicator -->
                <div class="ui four cards" v-if="!tvShows">
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
        </div>
    </transition>
</template>

<script>
    import Card from '../../components/card/card';
    import Featured from '../../components/featured/featured';
    import {mapState} from "vuex";


    export default {
        name: 'TvShows',
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
            this.getTvShows();
        },
        methods: {
            setSearchResultsVisible(value) {
                this.$store.commit('SET_SEARCH_RESULTS_VISIBLE', value);
            },
            getTvShows() {
                this.$store.dispatch('loadTmdbData', {'type': 'tvShows', 'max': this.maxResultsToLoad});
            }
        },
        computed: {
            ...mapState(['tvShows'])
        }
    }
</script>
