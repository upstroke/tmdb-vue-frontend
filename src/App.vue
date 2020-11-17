<template>
    <div class="ui top fixed inverted menu">
        <ul class="ui container" role="navigation">
            <li>
                <router-link class="item" to="/">
                    <i class="home icon"></i> Home
                </router-link>
            </li>
            <li>
                <router-link class="item" to="/movies">
                    <i class="film icon"></i> Filme
                </router-link>
            </li>
            <li>
                <router-link class="item" to="/tvshows">
                    <i class="tv icon"></i> TV-Shows
                </router-link>
            </li>
            <!-- typeahead search -->
            <div class="right menu searchbar">
                <div class="item">
                    <type-ahead-search/>
                </div>
            </div>
        </ul>
    </div>

    <!--<router-view :key="$route.fullPath" v-slot="slotProps" #match="{ component, params }">
        <transition name="fade" mode="out-in">
            <component :is="slotProps.Component" />
        </transition>
    </router-view>-->

    <router-view :key="$route.fullPath"></router-view>

    <main-footer/>

</template>

<script>
    import TypeAheadSearch from '@/components/typeahead-search/typeahead-search';
    import MainFooter from '@/components/footer/footer';

    export default {
        name: 'App',
        components: {
            TypeAheadSearch,
            MainFooter
        }
    }
</script>

<style lang="scss">
    $icons-font-path: '~semantic-ui-sass/icons';
    $flags-image-path: '~semantic-ui-sass/images';
    @import "~semantic-ui-sass/semantic-ui";

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s ease-in-out;
    }

    .fade-enter-from,
    .fade-leave-active {
        opacity: 0;
    }

    #app {
        /* You can add global styles to this file, and also import other style files */
        .fixed.menu {
            z-index: 1000;

            .router-link-active {
                background: rgba(255, 255, 255, .15);
                color: rgb(255, 255, 255) !important;
            }

            ul.ui.container {
                margin: 0;

                li {
                    display: flex;
                }
            }
        }

        a > *:not(a):not(i) {
            color: initial
        }
    ;

        .ui.divider {
            margin: 2rem 0;
        }

        .ui.light.button {
            background: rgba(0, 0, 0, .04);

            &:hover {
                background: rgba(0, 0, 0, .06);
            }
        }

        main {
            position: relative;
            top: 6rem;
            padding-bottom: 12rem;
        }

        .spacer {
            margin: 1em 0;
            padding: 1em 0;
            position: relative;
        }

        .small {
            font-size: 80%;
        }

        .ui.cards > .card {
            &:focus {
                outline: none;
            }

            .content > .meta + .description {
                height: 140px;
                overflow: auto;
                overflow-x: hidden;
            }

            .content.media-type {
                max-height: 35px;
                font-weight: bold;
                padding-top: 0;
                padding-bottom: 0;
                margin: .5rem 0;
            }

            .image {
                cursor: pointer;
                background: transparent url('assets/not-available.png') 0 0 no-repeat;
                background-size: cover;

                > img {
                    width: 100%;
                    height: 140px;
                    object-fit: cover;
                }
            }
        }

        .ui.masthead.segment {
            padding: 0;
            margin-top: 39px;
            margin-bottom: -39px;
            position: relative;
            text-shadow: 0 2px 2px rgba(0, 0, 0, 0.6);

            .masthead-image {
                img {
                    min-width: 800px;
                    width: 100%;
                    height: 100%;
                    max-height: 1000px;
                    object-fit: cover;
                    opacity: .5;
                }
            }

            .header {
                position: relative;
                font-size: 3.5em;
                font-weight: normal;
                line-height: 1;

                .poster {
                    width: 100%;
                    position: absolute;
                    bottom: 130%;
                    right: 0;
                    left: 0;

                    > img {
                        width: 12vw;
                        min-width: 160px;
                        box-shadow: 1px 0 5px 2px rgba(0, 0, 0, 0.4);
                        border: 2px solid white;
                    }
                }
            }

            .ui.text.container {
                position: absolute;
                bottom: 5%;
                left: 0;
                right: 0;
                width: 80vw !important;
                max-width: 80vw !important;
            }

            ul.ui.inverted {
                list-style: none;
                margin: 20px 0 0;
                font-size: 80%;

                > li {
                    display: inline-block;
                    margin-right: 1rem;
                }

                > li.item::before {
                    padding-right: 1rem;
                    content: "•";
                    color: white;
                }

                > li:first-child {

                    &::before {
                        display: none;
                    }
                }
            }
        }

        footer {
            z-index: 1000;
            min-height: 60px;

            .ui.segment {
                flex: 1
            }

            .secondary.menu {
                justify-content: center;
            }
        }

    }
</style>
