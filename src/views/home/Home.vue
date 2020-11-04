<template>
    <main class="ui container" @mouseenter="setSearchResultsVisible(false)">
        <h2 class="ui dividing header right">Discover</h2>
        <div class="spacer">
            <p>Discover movies by different types of data like average rating, number of votes, genres and certifications.</p>
        </div>
        <div class="ui four cards" v-if="trending">
            <card v-for="movie in trending" :key="movie.id" v-bind:movie="movie" v-bind:mediatype="movie.media_type"/>
        </div>

        <!-- loading indicator -->
        <div class="ui four cards" v-if="!trending">
            <div class="card" v-for='index in 4' :key='index'>
                <div class="content">
                    <div class="ui active inverted dimmer">
                        <div class="ui text loader">Loading</div>
                    </div>
                    <img class="ui wireframe image" src="../../assets/not-available.png">
                </div>
            </div>
        </div>

        <h2 class="ui dividing header">Featured Today</h2>
        <featured />
    </main>
</template>

<script>
    import http from '../../service/http-client'
    import Card from '../../components/card/card'
    import Featured from '../../components/featured/featured'

    export default {
        name: 'Home',
        components: {
            Card,
            Featured
        },

        data() {
            return {
                trending: null
            }
        },
        created() {
            http.getTrending().then((response) => {
                this.trending = response.data.results;
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
