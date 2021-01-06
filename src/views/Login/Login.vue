<script>
import BackTop from '../../components/BackTop/BackTop'
import FooterDown from '../../components/Footer_color/FooterColor'
import {mapState} from 'vuex';
export default {
    data(){
        return{
            username: "",
            password: "",
            password_err: false,
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
    watch:{
        password(){
            const regex = RegExp(/^[a-z0-9_-]{0,20}$/,"g");
            
            if(!regex.test(this.password)){
                this.password_err = true;
                // this.password = this.password.replace(/[\W]/g,'')
                console.log(regex.test(this.password));
            }else{
                this.password_err = false;
                console.log(regex.test(this.password));
            }
        }
    },
    components:{
        FooterDown,
        BackTop,
    },
    methods:{
        // 檢查GOOGLE帳號是否登入成功，成功跳轉失敗跳提示
        checkLogin(){
            if(this.username !== "" && this.password !== ""){
                let username = localStorage.getItem('sport_user_name') ;
                let userpassword = localStorage.getItem('sport_user_password');
                //  帳號密碼一致
                if(username == this.username && userpassword == this.password){
                    this.$store.commit('loginStateChange', true)
                }else if(username == undefined && userpassword == undefined){
                    alert('登入失敗！你還沒建立帳戶喔😖😖')
                }else{
                    alert('登入失敗！帳戶密碼錯誤😖😖')
                }
            }
            
            if(this.$store.state.login_state == true){
                this.$router.push({name: 'Record'})
            }
        },
        createUser(){
            if(this.username !== "" && this.password !== ""){
                let username = localStorage.getItem('sport_user_name') ;
                let userpassword = localStorage.getItem('sport_user_password');
                if(username == undefined && userpassword == undefined){
                    //設定帳戶密碼
                    localStorage.setItem('sport_user_name',this.username);
                    localStorage.setItem('sport_user_password',this.password);
                    this.$store.commit('getUser');
                    this.checkLogin();
                }
                else if(username !== this.username && userpassword !== this.password){
                    let confirm_check = confirm('你要覆蓋掉你前面的帳號與資料嗎？');
                if(confirm_check){
                    // 清除資料
                    this.$store.commit('clearAllMisson')
                    //設定帳戶密碼
                    localStorage.setItem('sport_user_name',this.username);
                    localStorage.setItem('sport_user_password',this.password);
                    this.$store.commit('getUser');
                    this.checkLogin();
                }
                }else{
                    this.checkLogin();
                    alert('這個帳號你已經創立過囉！幫您做登錄😇😇')
            }
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