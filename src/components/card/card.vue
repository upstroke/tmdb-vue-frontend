<template src="./template.html"/>
<style lang="scss" src="./styles.scss"/>

<script>
    import moment from "moment";

    export default {
        name: 'card',
        props: ['id', 'movie','mediatype'],
        methods: {
            getFormatedDate: function(dateString) {
                moment.locale('de');
                return moment(dateString).format('Do MM. YYYY')
            }
        }

    }
</script>
