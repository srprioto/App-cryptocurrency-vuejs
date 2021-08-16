<template>

    <PxLoad v-if="loading" />

    <div class="flex-col" v-if="!loading">
        <div v-if="asset.id">
            <div class="flex flex-col sm:flex-row justify-around items-center">
                <div class="flex flex-col items-center">
                    <img
                        :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
                        :alt="asset.name"
                        class="w-20 h-20 mr-5"
                    />
                    <h1 class="text-5xl">
                        {{ asset.name }}
                        <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
                    </h1>
                </div>

                <div class="my-10 flex flex-col">
                    <ul>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase">Ranking</b>
                            <span>#{{ asset.rank }}</span>
                        </li>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
                            <span>{{ useDolarFilter(asset.priceUsd) }}</span>
                        </li>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
                            <span>{{ min }}</span>
                        </li>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
                            <span>{{ max }}</span>
                        </li>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
                            <span>{{ avg }}</span>
                        </li>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
                            <span>{{ usePercentFilter(asset.changePercent24Hr) }}</span>
                        </li>
                    </ul>
                </div>

                <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
                    <button
                        v-on:click="toggleConverter"
                        class="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >{{ fromUsd ? `USD a ${asset.symbol}`: `${asset.symbol} a USD` }}
                    </button>

                    <div class="flex flex-row my-5">
                        <label class="w-full" for="convertValue">
                            <input
                                v-model="convertValue"
                                id="convertValue"
                                type="number"
                                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                                :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
                            />
                        </label>
                    </div>

                    <span class="text-xl">
                        {{ convertResult }} 
                        {{ fromUsd ? asset.symbol: 'USD' }}
                    </span>
                </div>

            </div>

            <!-- grafico de charts -->

            <line-chart 
                class="my-10 container"
                :data="history.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
                :colors="['#b00', '#666']"
                :min="min"
                :max="max"
            />

            <!-- Exchanges -->
            
            <div class="container">

                <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
                <table class="table-exchange">
                    <tr v-for="m in markets" :key="`${m.exchangeId}-${m.priceUsd}`" class="border-b">
                        <td>
                            <b>{{ m.exchangeId }}</b>
                        </td>
                        <td>{{ useDolarFilter(m.priceUsd) }}</td>
                        <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
                        <td class="item-link-url-exchange">
                            <PxButton 
                                
                                v-if="!m.url"
                                v-on:custom-click="getWebsite(m)"
                            >
                                <slot>Obtener link</slot>
                            </PxButton>

                            <div v-else class="link-url-exchange">
                                <a target="_blanck">{{m.url}}</a>
                            </div>

                        </td>
                    </tr>
                </table>

            </div>


        </div>
    </div>
</template>

<script>

    import api from '@/api.js'
    import { dolarFilter, percentFilter } from '@/filter.js';
    import PxLoad from '@/components/PxLoad';
    import PxButton from '@/components/PxButton';

    export default {
        name: "CoinDetail",
        components: {
            PxLoad,
            PxButton
        },
        data() {
            return {
                asset: {},
                history: [],
                loading: true,
                markets: [],
                fromUsd: true,
                convertValue: null
            }
        },
        created() {
            this.getCoin();
        },

        watch: {
            $route(){
                this.getCoin()
            }
        },
        
        computed: {
            min() {
                return Math.min(
                    ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
                )
            },
            max(){
                return Math.max(
                    ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
                )
            },
            avg(){
                return Math.abs(
                    ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
                )
            },
            convertResult (){
                if (!this.convertValue) {
                    return 0
                }

                const result = this.fromUsd 
                ? this.convertValue / this.asset.priceUsd 
                : this.convertValue * this.asset.priceUsd

                return result.toFixed(4)
            }
        },

        methods: {

            toggleConverter(){
                this.fromUsd = !this.fromUsd
                
            },

            useDolarFilter(value){
                return dolarFilter(value);
            },

            usePercentFilter(value){
                return percentFilter(value);
            },

            getWebsite(exchange){
                return api.getExchange(exchange.exchangeId)
                .then((res) => { 
                    exchange.url = res.exchangeUrl;
                    // this.$set(exchange, "url",  res.exchangeUrl)
                })
            },

            getCoin() {
                
                const id = this.$route.params.id;

                this.loading = true;

                Promise.all([
                    api.getAseet(id),
                    api.getAssetHistory(id),
                    api.getMarkets(id)
                ])
                .then(([asset, history, markets]) => {
                    this.asset = asset;
                    this.history = history;
                    this.markets = markets;
                })
                .finally(() => {this.loading = false})

            }
        }
    }
</script>

<style>
    .table-exchange {
        width: 100%;
        margin: 0 0 70px 0;
    }

    .link-url-exchange {
        display: inline-block;
        box-sizing: border-box;
        padding: 9px 0;
    }

</style>