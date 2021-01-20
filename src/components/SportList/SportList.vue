<script>
import SportOpen from '../../components/SportOpen/SportOpen'
export default {
    props:[
        "misson",
    ],
    components:{
        SportOpen,
    },
    data(){
        return{

        }
    },
    computed:{
        misson_name_cut(){
            if(this.misson.misson_name.length > 15){
                return `${this.misson.misson_name.slice(0,15)}...`
            }else{
                return this.misson.misson_name
            }
        },
    },
    methods:{
        missonClose(missondate , missontime){
            this.$store.commit('missonClose',[missondate , missontime])
        },
        missonOpen(){
            this.$store.commit('missonOpen',[this.misson.misson_date, this.misson.misson_time])
        },
        missonDelete(){
            let check = confirm(`你確定要刪除這項活動了嗎？🤨`)
            if(check){
                this.$store.commit('missonDelete', [this.misson.misson_date, this.misson.misson_time])
            }
        },
        pointsAnimation(){
            this.$emit('pointsAnimation');
        },
        missonEdit(playload){
            this.$emit('missonEdit', playload)
        },
        openLink(){
            window.open(`https://www.google.com/maps/search/?api=1&query=${this.misson.misson_place}`);
        }
    },
    mounted(){

    }
}

</script>

<template src="./template.html"></template>
<style scoped src="./style.css"></style>