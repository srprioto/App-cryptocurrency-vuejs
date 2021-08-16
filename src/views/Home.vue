<template>
    <PxLoad v-if="loading"></PxLoad>
    <PxAssetsTable v-if="!loading" v-bind:assets="assets" />
</template>

<script>
    import api from '@/api' 
    import PxAssetsTable from '@/components/PxAssetsTable.vue';
    import PxLoad from '@/components/PxLoad.vue';

    export default {
        name: "Home",
        components: {
            PxAssetsTable,
            PxLoad
        },
        data() {
            return {
                url: "https://api.coincap.io/v2/assets?limit=20",
                assets: [],
                loading: true,
            }
        },
        created() {

            this.loading = true;

            api.getAssets(this.url)
            .then(assets => (this.assets = assets))
            .finally(() => this.loading = false);
            
        },
    }
</script>

<style>

</style>