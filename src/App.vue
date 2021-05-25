<template>
  <div id="app">
   <NavBar class="nav_top"/>
   <transition name="fade" mode="out-in">
     <router-view></router-view>
   </transition>
  </div>
</template>

<script>
import smoothscroll from 'smoothscroll-polyfill';
import NavBar from './components/Navbar/NavBar'

export default {
  components: {
    NavBar,
  },
  mounted(){
    smoothscroll.polyfill();

    // 得到經緯度
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.$store.dispatch('posLocation', pos)

          // 取得位置
          // 如有使用Google Map API 服務，金鑰應放置於後台
          // this.axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&language=zh-TW&key=你的google金鑰`).then(res=>{
          //     let city = res.data.results[0].address_components.filter(item=>{
          //         return item.types[0] == "administrative_area_level_1"
          //     })[0].long_name;
          //     city = city.replace('台','臺');
          //     this.$store.dispatch('getlocation', city)
          // }).catch(err=>{
          //     console.log(err);
          // });
        })
      } else {
        console.log("取得經緯度失敗");
      }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;400;700&display=swap');

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
  font-family: 'Noto Sans TC', sans-serif;
}

#app{
  overflow: hidden;
}

body,html{
  width: 100%;
  height: 100vh;
  /* background: #3356BD; */
}

.nav_top{
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 30;
}

/* 路由動態 */
.fade-enter-active, .fade-leave-active {
  transition: all .5s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(2em) ;
}


.opc-enter-active, .opc-leave-active {
  transition: all .5s ease-in-out;
}
.opc-enter, .opc-leave-to {
  opacity: 0;
}

.opcnew-enter-active {
  transition: all .5s ease-in-out;
}
.opcnew-leave-active{
  transition: 0z;
  position: absolute;
}

.opcnew-enter, .opcnew-leave-to {
  opacity: 0;
}



</style>

