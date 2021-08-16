<template>
    <button 
        v-on:click="butonClick"
        class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-2 border border-red-500 hover:border-transparent rounded">
        <slot></slot>
    </button>   
</template>

<script>
    export default {
        name: 'PxButton',
        methods: {
            butonClick (){
                this.$emit("custom-click")
            }
        }
    }
</script>