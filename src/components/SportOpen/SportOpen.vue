<script>
export default {
    props:[
        "misson"
    ],
    methods:{
        missonClose(){
            this.$emit('missonClose', this.misson.misson_date, this.misson.misson_time)
        },
        missonDone(){
            let check = confirm(`你確定完成「${this.misson.misson_name}」這項相揪活動了嗎？🤨`)
            if(check){
                this.$store.commit('missonDone', [this.misson.misson_date, this.misson.misson_time])
                this.$emit('pointsAnimation');
            }
        },
        missonDelete(){
            let check = confirm(`你確定要刪除這項活動了嗎？🤨`)
            if(check){
                this.$store.commit('missonDelete', [this.misson.misson_date, this.misson.misson_time])
            }
        },
        missonEdit(){
            this.$emit('missonEdit', [this.misson.misson_date, this.misson.misson_time])
            this.missonClose();
        }
    }
}
</script>

<template src="./template.html"></template>
<style scoped src="./style.css"></style>