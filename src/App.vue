<template>
    <main>
        <PxHeader :links="links" />
        <router-view class="container px-5 sm:px-20 py-20 flex justify-center" />
    </main>
</template>

<script>
    import PxHeader from './components/PxHeader.vue';
   
    export default {
        name: 'App',
        components: {
            PxHeader
        },
        data(){
            return {
                links: [
                    {
                        title: 'BTC',
                        to: { name: 'coin-details', params: { id: 'bitcoin' } }
                    },
                    {
                        title: 'ETH',
                        to: { name: 'coin-details', params: { id: 'ethereum' } }
                    },
                    {
                        title: 'BNB',
                        to: { name: 'coin-details', params: { id: 'binance-coin' } }
                    }
                ]
            }
        }
    }
    
</script>

<style>



</style>
