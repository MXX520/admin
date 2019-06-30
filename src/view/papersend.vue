<template>
    <div id="app">
        <div>{{msg}}</div>
    </div>  
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
        msg: 333
        }
    },
    created() {
        this.init();
    },
    methods: {
        init(){

        }
    },
    components: {

    }
}
</script>

<style scoped lang="less">

</style>
