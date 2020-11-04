<template>
    <card-details :id="id" :mediatype="mediatype" />
</template>

<script>
    import CardDetails from '../../components/card-details/card-details'

    export default {
        name: 'Details',
        components: {
            CardDetails
        },
        props: ['id', 'mediatype']
    }
</script>

<style lang="scss" scoped>
    .details-view {
        top: 0 !important;
        width: 100vw;
        margin: 0 !important;
    }
</style>
