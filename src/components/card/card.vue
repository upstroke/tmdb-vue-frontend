<template src="./template.html"/>
<style lang="scss" src="./styles.scss"/>

<script>
    import mixins from '../../shared/utils'

    export default {
        name: 'card',
        props: ['id', 'movie','mediatype'],
        mixins: [mixins]
    }
</script>
