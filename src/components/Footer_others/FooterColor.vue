<script>
export default {
  props: ["footcolor"],
  data(){
      return{

      }
  },
  computed: {
    backcolor() {
        return this.footcolor;
    },
  },
  mounted(){

  }
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
