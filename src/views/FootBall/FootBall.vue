<script>
import FooterDown from "../../components/Footer_others/FooterColor";
import SkeletonNews from "../../components/SkeletonNews/SkeletonNews";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import Loading from "../../components/Loading/Loading";
import AddSport from "../../components/AddSport/AddSport";
import BackTop from "../../components/BackTop_ball/BackTop"
import DemoMap from "../../components/DemoMap/DemoMap"

// import GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// import Swiper styles
import "swiper/swiper-bundle.css";
// import Swiper JS
// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import { mapState } from "vuex";

// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Autoplay]);

export default {
  data() {
    return {
      ball_type: "football",
      infoList: null,
      newsList: [],
      warn_text: "資訊加載中，請稍候",
      fail: false,
      swiper: {},
      add_open: false,
      bg_tl: null,
      // 檢查前面寬度
      old_width: null,
      now_width: null,
    };
  },
  computed: {
    newsListUpdate() {
      let list = [];
      this.newsList.map((item) => {
        // 處理多餘的字
        item.title =
          item.title.length > 25
            ? item.title.substr(0, 25) + "..."
            : item.title;
        item.description =
          item.description.length > 40
            ? item.description.substr(0, 40) + "..."
            : item.description;
        item.author =
          item.author.length > 10
            ? item.author.substr(0, 15) + "..."
            : item.author;
        //處理怪怪英文
        let indexT = item.publishedAt.indexOf("T");
        item.publishedAt =
          item.publishedAt.substring(0, indexT) +
          " " +
          item.publishedAt.substring(indexT + 1);
        let indexZ = item.publishedAt.indexOf("Z");
        item.publishedAt =
          item.publishedAt.substring(0, indexZ) +
          item.publishedAt.substring(indexZ + 1);
        item.publishedAt = item.publishedAt.substring(
          0,
          item.publishedAt.length - 3
        );
        list.push(item);
      });
      return list;
    },
    // 檢查地圖是不是準備好了
    pos() {
      return this.$store.state.pos;
    },
    ...mapState(["login_state"]),
  },
  components: {
    FooterDown,
    SkeletonNews,
    GoogleMap,
    Loading,
    AddSport,
    BackTop,
    DemoMap,
  },
  methods: {
    openNews(web) {
      window.open(web);
    },
    imageDisappear(e){
      e.target.style.display = 'none';
    },
    addSportToogle() {
      this.add_open = !this.add_open;
    },
    peopleGsap() {
      this.old_width = window.innerWidth;
      
      //  打籃球的人，動態效果

      this.bg_tl
        .from(".white_back", {
          duration: 1,
          x: -1000,
          ease: "circ.out",
        })
        .from(
          ".ani_ballpost",
          {
            duration: 0.5,
            x: -800,
            ease: "circ.out",
          },
          0.5
        )
        .from(
          ".ani_people",
          {
            duration: 0.5,
            rotate: -50,
            x: -1000,
            ease: "circ.out",
          },
          0.2
        )
        .from(
          ".ball_type",
          {
            duration: 0.5,
            scale: 0,
            ease: "back.out(2)",
          },
          0.5
        );
    },
    resizeGsap(){
      this.now_width = window.innerWidth;
      if((this.now_width  < 1070 && this.old_width  > 1070 && (this.old_width - this.now_width) > 0) 
      || (this.now_width  > 1070 && this.old_width  < 1070 && (this.old_width - this.now_width) < 0)){
        console.log('change');
        this.bg_tl.set(".ani_ballpost", {clearProps:"transform"}); 
        this.bg_tl.set(".ani_people", {clearProps:"transform"}); 
        this.bg_tl.set(".white_back", {clearProps:"transform"}); 
        this.bg_tl.set(".ball_type", {clearProps:"scale"}); 
        this.peopleGsap();
      }
    },
  },
  mounted() {
    // 設定好Nav
    this.$store.commit("whiteBackChange", false);
    this.$store.commit("NowWhiteBackChange", false);
    this.$store.commit("loginColorChange", "white");

    // 抓精選新聞 NewsAPI
     // https://newsapi.org/v2/everything?q="要搜尋的球類"&language=zh&apiKey="我的APIKEY"
    this.axios
      .get(
        'football.json'
      )
      .then((res) => {
        res.data.articles.forEach((item, index) => {
          if (index < 6) this.newsList.push(item);
        });
        this.$nextTick(() => {
          this.swiper = new Swiper(".swiper-container", {
            loop: true,
            autoplay: {
              delay: 2000,
              disableOnInteraction: false,
            },
            pagination: {
              el: ".swiper-pagination",
              dynamicBullets: true,
              clickable: true,
              renderBullet: function(index, className) {
                return '<span class="' + className + '"></span>';
              },
            },
          });
        });
      }).catch(err=>{
        console.log(err.response);
      })

    // 即時新聞 之後開
    const cors = 'https://cors-anywhere.herokuapp.com/';
    this.axios.get(cors+"https://isports.sa.gov.tw/Api/Rest/V1/Activity.svc/GetActivityList?activityKind=1&paging=false").then(res=>{
      this.infoList = [];
      res.data.data.forEach((item,index)=>{
        if(index < 3) this.infoList.push(item);
      })
    }).catch(err=> {
      console.log(err);
      this.warn_text = "資料加載失敗，非常抱歉😥";
      this.fail = true;
    });
    this.bg_tl = gsap.timeline();
    this.peopleGsap();
    // 判斷是否重新更新大小
    window.addEventListener("resize", this.resizeGsap);

    ScrollTrigger.matchMedia({
      "(min-width: 1070px)": function(){
        let tl = gsap.timeline({
          scrollTrigger:{
            trigger: ".banner_section",
            // toggleActions: "start pause reverse start",
            // markers: true,
            start: `${window.innerHeight / 2}px ${window.innerHeight / 2}px`,
            end: `bottom ${window.innerHeight / 2}px`,
            scrub: true,
            pin: true,
          },
        })
    
        tl.to("#ball",{
          x: 350,
          repeat: 3,
          yoyo: true,
        })
        .to('#bottom',{
          x: 100,
          rotate: -5,
          repeat: 1,
          yoyo: true,
        }, 0)
        .to('#bottom',{
          x: 100,
          y: -50,
          rotate: 5,
          repeat: 1,
          yoyo: true,
        }, 1)
        .to('#top',{
          x: 100,
          scaleY: 0.95,
          repeat: 3,
          yoyo: true,
        },0)
        .to("#head",{
          x: 110,
          y: -5,
          rotate: 5,
          repeat: 1,
          yoyo: true,
        },0)
        .to("#head",{
          x: 100,
          y: 6,
          rotate: -5,
          repeat: 1,
          yoyo: true,
        },1)
        .to("#left_hand",{
          x: 70,
          y: 60,
          rotate: -40,
          transformOrigin:"50% 0%",
          repeat: 3,
          yoyo: true,
        },0)
        .to("#back_hand",{
          x: 15,
          y: 15,
          rotate: 10,
          transformOrigin:"50% 0%",
          repeat: 3,
          yoyo: true,
        },0)
        .to("#eye",{
          x: 108,
          rotate: 5,
          repeat: 1,
          yoyo: true,
        },0)
        .to("#eye",{
          x: 113,
          y: 3,
          rotate: -5,
          scaleY: 0.5,
          repeat: 1,
          yoyo: true,
        },1)
        .to("#shink",{
          x: 100,
          rotate: 25,
          y: -20,
          transformOrigin:"100% 100%",
          repeat: 3,
          yoyo: true,
        },0)
        .to("#back_dark",{
          x: 100,
          scale: 0.9,
          repeat: 3,
          yoyo: true,
        },0)
        .to("#front_dark",{
          x: 100,
          scale: 0.8,
          repeat: 3,
          yoyo: true,
        },0)
        .to("#ball_dark",{
          x: 350,
          repeat: 3,
          yoyo: true,
        },0)
      }
      
    })
  },
  created(){
    document.title = "足球 - 全民來相揪"
  },
  destroyed(){
        window.removeEventListener('resize', this.resizeGsap)
        ScrollTrigger.clearMatchMedia("(min-width: 1070px)") ;
    }
};

</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
