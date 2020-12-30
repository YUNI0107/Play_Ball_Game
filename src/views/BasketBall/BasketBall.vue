<script>
import FooterDown from "../../components/Footer_others/FooterColor";
import SkeletonNews from "../../components/SkeletonNews/SkeletonNews";
import GoogleMap from "../../components/GoogleMap/GoogleMap";

// import Swiper styles
import "swiper/swiper-bundle.css";
// import Swiper JS
// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";

// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Autoplay]);

export default {
  data() {
    return {
      infoList: null,
      newsList: [],
      warn_text: "資訊加載中，請稍候",
      fail: false,
      swiper: {},
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
  },
  components: {
    FooterDown,
    SkeletonNews,
    GoogleMap,
  },
  methods: {
    openNews(web) {
      window.open(web);
    },
  },
  mounted() {
    // 設定好Nav
    this.$store.commit("whiteBackChange", false);
    this.$store.commit("NowWhiteBackChange", false);
    this.$store.commit("loginColorChange", "white");

    // 抓精選新聞 NewsAPI
    this.axios
      .get(
        'https://newsapi.org/v2/everything?q="籃球"&language=zh&apiKey=0cfedf3ca1f2486bbbc0c57d7e9639cf'
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
      });

    // 即時新聞 之後開
    // const cors = 'https://cors-anywhere.herokuapp.com/';
    // this.axios.get(cors+"https://isports.sa.gov.tw/Api/Rest/V1/Activity.svc/GetActivityList?activityKind=1&paging=false").then(res=>{
    //   this.infoList = [];
    //   console.log(res);
    //   res.data.data.forEach((item,index)=>{
    //     if(index < 3) this.infoList.push(item);
    //   })
    // }).catch(err=> {
    //   console.log(err);
    //   this.warn_text = "資料加載失敗，非常抱歉😥";
    //   this.fail = true;
    // });
  },
};

// APIId：
// 16
// APIKey：
// nt25gwi2z2g6sgzl
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
