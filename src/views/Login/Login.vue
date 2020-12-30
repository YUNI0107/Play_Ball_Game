<script>
import BackTop from '../../components/BackTop/BackTop'
import FooterDown from '../../components/Footer_color/FooterColor'
import {mapState} from 'vuex';
export default {
    data(){
        return{

        }
    },
    computed:{
        ...mapState([
            'white_back',
            'now_white_back',
            'ham_open',
            'login_state',
            'login_color',
        ])
    },
    components:{
        FooterDown,
        BackTop,
    },
    methods:{
        // 檢查GOOGLE帳號是否登入成功，成功跳轉失敗跳提示
        checkLogin(){
            // 先都成功，之後回來改
            this.$store.commit('loginStateChange', true)
            if(this.$store.state.login_state == true){
                this.$router.push({name: 'Record'})
            }else{
                alert('登入失敗')
            }
        },
        // Nav高度判斷
        navScroll(){
            let scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
            // 判斷高度改變顏色
            // 判斷現在的背景底色
            if(scrollTop > document.querySelector('.log_place_2').offsetTop-100){
                this.$store.commit('NowWhiteBackChange', true);
            }else{
                this.$store.commit('NowWhiteBackChange', false);
            }
            // 判斷漢堡是否開啟 & 目前高度
            if(document.body.clientWidth < 1070){
                if(!this.ham_open && scrollTop > document.querySelector('.log_place_2').offsetTop-50){
                    this.$store.commit('loginColorChange', 'yellow');
                    this.$store.commit('whiteBackChange', true);
                }else if(!this.ham_open && scrollTop < document.querySelector('.log_place_2').offsetTop-50){
                    this.$store.commit('whiteBackChange', false);
                    this.$store.commit('loginColorChange', '');
                }else{
                    this.$store.commit('whiteBackChange', true);
                }
            }else{
                this.$store.commit('whiteBackChange', false);
                this.$store.commit('NowWhiteBackChange', false);
                this.$store.commit('loginColorChange', '');
            }
        },
    },
    mounted(){        
        this.$store.state.white_back= false;
        this.$store.state.now_white_back= false;
        window.addEventListener('scroll', this.navScroll)
    },
    destroyed(){
        window.removeEventListener('scroll', this.navScroll)
    }
}
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped>