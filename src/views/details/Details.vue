<template>
    <card-details :id="id" :mediatype="mediatype" :title="title"/>
</template>

<script>
    import CardDetails from '../../components/card-details/card-details'

    export default {
        name: 'Details',
        components: {
            CardDetails
        },
        props: ['id', 'mediatype'],
        methods: {
            navigateTo(mediatype,id){
                this.$router.push({
                    name: 'details',
                    params: {mediatype:mediatype, id:id}
                });
            }
        },
        watch: {
            '$route.params': function () {
                if(this.$route.params.id !== undefined){
                    this.navigateTo(this.$route.params.mediatype,this.$route.params.id)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .details-view {
        top: 0 !important;
        width: 100vw;
        margin: 0 !important;
    }
</style>
