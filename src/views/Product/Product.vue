<script>
import FooterDown from "../../components/Footer_color/FooterColor";
import BackTop from '../../components/BackTop/BackTop'

import * as d3 from "d3";
import { gsap } from "gsap";
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
      //   userBall: "basketball",
      recommendList: "",
      // 球類總量
      football_num: 0,
      basketball_num: 0,
      tennis_num: 0,
      volley_num: 0,
      table_num: 0,
      // D3
      svg_width: 500,
      font_size: 20,
      innerR: 20,
      // LOGO
      logo_list: [
        {
          image: require("@/assets/products/logo/nike.png"),
          web: "https://www.nike.com/tw/",
        },
        {
          image: require("@/assets/products/logo/adidas.png"),
          web: "https://www.adidas.com.tw/",
        },
        {
          image: require("@/assets/products/logo/babolat.png"),
          web: "https://www.babolat.us/",
        },
        {
          image: require("@/assets/products/logo/molten.png"),
          web: "http://molten.com.tw/",
        },
        {
          image: require("@/assets/products/logo/puma.png"),
          web: "http://puma.com.tw/",
        },
        {
          image: require("@/assets/products/logo/spalding.png"),
          web: "https://www.starlike.com.tw/blog/brands/spalding/",
        },
        {
          image: require("@/assets/products/logo/head.png"),
          web: "http://www.headsports.com.tw/index_tw.php",
        },
        {
          image: require("@/assets/products/logo/mikasa.png"),
          web: "https://mikasasports.co.jp/e/",
        },
        {
          image: require("@/assets/products/logo/wilson.png"),
          web: "https://www.starlike.com.tw/blog/brands/wilson-tennis/",
        },
        {
          image: require("@/assets/products/logo/butterfly.png"),
          web: "https://butterflyonline.com/",
        },
        {
          image: require("@/assets/products/logo/conti.png"),
          web: "https://www.conti.com.tw/",
        },
        {
          image: require("@/assets/products/logo/nittaku.png"),
          web: "https://www.nittaku.com/",
        },
      ],
      x: null,
      y: null,
    };
  },
  computed: {
    userBallList() {
      return [
        { ball: "football", chi_ball: "足球", num: this.football_num },
        { ball: "basketball", chi_ball: "籃球", num: this.basketball_num },
        { ball: "tennis", chi_ball: "網球", num: this.tennis_num },
        { ball: "volleyball", chi_ball: "排球", num: this.volley_num },
        { ball: "table", chi_ball: "桌球", num: this.table_num },
      ];
    },
    userBall() {
      // 比大小
      let list = this.userBallList;
      list.sort(function(a, b) {
        return b.num - a.num;
      });
      return list[0].ball;
    },
    chineseBall() {
      let eng_ball = this.userBall;
      let chi_ball = this.userBallList.filter(
        (item) => item.ball == eng_ball
      )[0].chi_ball;
      return chi_ball;
    },
    show_text() {
      if (this.login_state) {
        return "您的歷史紀錄";
      } else {
        return "未登入無紀錄";
      }
    },
    ...mapState(["all_misson", "login_state"]),
  },
  components: {
    FooterDown,
    BackTop,
  },
  methods: {
    imgrender(imgurl) {
      //   return require("@/assets/products/"+this.userBall+"/"+name+"_image.jpg");
      return require("@/assets/" + imgurl);
    },
    draw() {
      let dataset;
      if (this.login_state) {
        dataset = this.userBallList;
      } else {
        dataset = [
          { ball: "football", chi_ball: "足球", num: 1 },
          { ball: "basketball", chi_ball: "籃球", num: 1 },
          { ball: "tennis", chi_ball: "網球", num: 1 },
          { ball: "volleyball", chi_ball: "排球", num: 1 },
          { ball: "table", chi_ball: "桌球", num: 1 },
        ];
      }

      let svg = d3.select("svg");

      svg.attr("width", this.svg_width).attr("height", this.svg_width);

      svg.selectAll("*").remove();

      let arc = d3
        .arc()
        .innerRadius(this.svg_width / 3)
        .outerRadius(this.svg_width / 2);

      let pie = d3
        .pie()
        .padAngle(0.005)
        .value((d) => d.num);
      let myColor = d3.scaleOrdinal(["#3356BD", "#F95F53", "#FFC271"]);

      svg
        .selectAll("path")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr(
          "transform",
          `translate(${this.svg_width / 2}, ${this.svg_width / 2})`
        )
        .append("path")
        .attr("fill", (d) => myColor(d.data.num))
        .attr("d", arc);

      let label = d3
        .arc()
        .outerRadius(this.svg_width - (this.svg_width / 6))
        .innerRadius(0);

      let g = svg
        .append("g")
        .attr(
          "transform",
          `translate(${this.svg_width / 2}, ${this.svg_width / 2})`
        );
      let pies = g
        .selectAll("arc")
        .data(pie(dataset))
        .enter()
        .append("g");

      pies
        .append("text")
        .attr("font-size", this.font_size)
        .attr("fill", "white")
        .each(function(d) {
          let centroid = label.centroid(d);
          d3.select(this)
            .attr("x", centroid[0] - 20)
            .attr("y", centroid[1])
            .text(`${d.data.chi_ball}`);
        });

    },
    myReDraw1400(x) {
      if (x.matches) {
        // If media query matches
        this.svg_width = 400;
        this.font_size = 15;
        this.draw();
      } else {
        this.svg_width = 500;
        this.font_size = 18;
        this.draw();
      }
    },
    myReDraw450(y) {
      if (y.matches) {
        // If media query matches
        this.svg_width = 300;
        this.font_size = 12;
        this.draw();
      } else {
        this.draw();
      }
    },
  },
  mounted() {
    // 設定好Nav
    this.$store.commit("whiteBackChange", true);
    this.$store.commit("NowWhiteBackChange", true);
    this.$store.commit("loginColorChange", "blue");
    // 計算各球類總結
    if (this.login_state) {
      this.football_num = this.all_misson.filter(
        (item) => item.ball == "football"
      ).length;
      this.basketball_num = this.all_misson.filter(
        (item) => item.ball == "basketball"
      ).length;
      this.tennis_num = this.all_misson.filter(
        (item) => item.ball == "tennis"
      ).length;
      this.volley_num = this.all_misson.filter(
        (item) => item.ball == "volley"
      ).length;
      this.table_num = this.all_misson.filter(
        (item) => item.ball == "table"
      ).length;
    }

    //  畫圖表
    d3.select(".data_block")
      .append("svg")
      .attr("width", this.svg_width + 200)
      .attr("height", this.svg_width + 200)
      .append("g")
      .attr(
        "transform",
        `translate(${(this.svg_width + 100) / 2}, ${(this.svg_width + 100) /
          2})`
      );
    this.draw();

    gsap.from(".data_block", {
      scale: 0,
      duration: 1,
      ease: "bounce",
    })

    // 判斷是否重畫
    this.x = window.matchMedia("(max-width: 1400px) and (min-width: 450px)");
    this.myReDraw1400(this.x); // Call listener function at run time
    this.x.addListener(this.myReDraw1400); // Attach listener function on state changes

    this.y = window.matchMedia("(max-width: 450px)");
    this.myReDraw450(this.y);
    this.y.addListener(this.myReDraw450); // Attach listener function on state changes

    // 抓到推薦商品資料
    this.axios.get("json/recommend.json").then((res) => {
      this.recommendList = res.data[this.userBall];
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
  },
  created(){
    document.title = "推薦商品 - 全民來相揪"
  },
  destroyed(){
    window.removeEventListener('resize',this.myReDraw1400)
    window.removeEventListener('resize',this.myReDraw450)
    this.x.removeListener(this.myReDraw1400)
    this.y.removeListener(this.myReDraw450)
  }
};
</script>

<template src="./template.html"></template>
<style scoped src="./style.css"></style>
