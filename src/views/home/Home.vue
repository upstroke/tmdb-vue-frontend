<template>
    <main class="ui container" @mouseenter="setSearchResultsVisible(false)">
        <h2 class="ui dividing header">Featured Today</h2>
        <featured/>

        <div class="ui hidden divider"></div>

        <h2 class="ui dividing header right">Discover</h2>
        <div class="spacer">
            <p>Discover movies by different types of data like average rating, number of votes, genres and
                certifications.</p>
        </div>
        <div class="ui four doubling cards" v-if="trending" ref="$cards">
            <card v-for="movie in trending" :key="movie.id" v-bind:movie="movie" v-bind:mediatype="movie.media_type"/>
            <button class="fluid ui light button" @click="getMore">Weitere Filme</button>
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
                trendingAll: [],
                trending: [],
                page: 0,
                totalPages: 0
            }
        },
        created() {
            http.getTrending().then((response) => {
                this.trendingAll = response.data.results
                this.trending = this.trendingAll.slice(0, 4);
                this.page = response.data.page;
                this.totalPages = response.data.total_pages;
            }).catch(e => {
                console.log('error: ', e)
            });
        },
        mounted() {
        },
        methods: {
            setSearchResultsVisible(value) {
                this.$store.commit('SET_SEARCH_RESULTS_VISIBLE', value);
            },

            getMore() {
                // load first 20 (20 results on page 1)
                if (this.page <= this.totalPages && this.trending.length < this.trendingAll.length) {
                    this.trending = [...this.trending, ...this.trendingAll.slice(this.trending.length, this.trending.length + 4)]
                }
                // else load next 20 (but not more than 40 results total)
                else if (this.page <= this.totalPages && this.trending.length === this.trendingAll.length && this.trending.length < 40) {
                    http.getTrending(this.page + 1).then((response) => {
                        this.trendingAll = [...this.trendingAll, ...response.data.results];
                        this.page++;
                        this.trending = [...this.trending, ...this.trendingAll.slice(this.trending.length, this.trending.length + 4)]
                    }).catch(e => {
                        console.log('error: ', e)
                    });
                }
            }
        }
    }
</script>
