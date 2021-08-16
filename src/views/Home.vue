<template>
    <PxAssetsTable v-bind:assets="assets" />
</template>

<script>
    import api from '@/api'
    import PxAssetsTable from '@/components/PxAssetsTable.vue';

    export default {
        name: "Home",
        components: {
            PxAssetsTable
        },
        data() {
            return {
                url: "https://api.coincap.io/v2/assets?limit=20",
                assets: []
            }
        },
        created() {
            api.getAssets(this.url)
            .then(assets => (this.assets = assets))
            
        },
    }
</script>

<style>

</style>