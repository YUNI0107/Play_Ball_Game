<script>
export default {
    props: ["bg"],
    computed:{
       
    },
    methods:{
        toTop(){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }
}
</script>

<template src="./template.html"></template>
<style scoped src="./style.css"></style>