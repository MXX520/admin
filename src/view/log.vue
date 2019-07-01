<template>
  <div class="app-container">
   {{msg}}
   <button @click="open">切换</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
        msg:'0000'
    }
  },
  filters: {
   
  },
  created() {
      console.log("dayjs----",this.$dayjs);
  },
  methods: {
    open(){
      this.msg = "时间"+this.$dayjs()
    }
  }
}
</script>
