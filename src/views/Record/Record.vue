<script>
import FooterDown from "../../components/Footer_color/FooterColor";
import BackTop from "../../components/BackTop/BackTop";
import SportList from "../../components/SportList/SportList";
import AddSport from "../../components/AddSport/AddSport";
import EditSport from "../../components/EditSport/EditSport";
import { mapState } from "vuex";
// import axios from 'axios';
import { TimelineMax } from "gsap";

let tl = new TimelineMax();

export default {
  components: {
    FooterDown,
    BackTop,
    SportList,
    AddSport,
    EditSport,
  },
  data() {
    return {
      user_name: "YUNI0107",
      days: 120,
      weather: "",
      weather_type: 1,
      weather_short: "讀取天氣",
      points: 0,
      add_open: false,
      edit_open: false,
      missonshow_toogle: true,
      text_index: 0,
      noMisson: false,
      yellowWidth: 50,
      editing_misson: [],
      animatoin_toogle: true,
    };
  },
  computed: {
    all_meeting() {
      return this.all_misson.filter((item) => item.done == true).length;
    },
    // points() {
    //   return this.all_meeting * 20;
    // },
    missonshowList() {
      if (this.missonshow_toogle) {
        return this.all_misson.filter((item) => item.done == false);
      } else {
        return this.all_misson.filter((item) => item.done == true);
      }
    },
    date() {
      let today = new Date();
      return `${today.getMonth() + 1}/${today.getDate()}`;
    },
    text() {
      return this.running_text[this.text_index];
    },
    running() {
      return [
        {
          text: `歡迎${this.user_name}，這是您加入相揪的120天`,
          emoji: "🥰",
        },
        {
          text: `今日是${this.date}，外面天氣為${this.weather}`,
          emoji: "⭐️",
        },
        {
          text: `${
            this.weather_type == 1
              ? "今天真是好天氣！出太陽暖和和的"
              : this.weather_type == 2
              ? "涼涼的天氣也適合運動呢！"
              : "就待在家裡吧，記得帶傘出門呀～"
          }`,
          emoji: `${
            this.weather_type == 1 ? "😋" : this.weather_type == 2 ? "😚" : "😢"
          }`,
        },
      ];
    },
    ...mapState(["all_misson", "city"]),
  },
  watch: {
    city() {
      //  是初始頁面，觀察city的值更新了沒
      if (this.city !== "您的位置") {
        this.getWeather();
      }
    },
    missonshowList() {
      this.noMissonCheck();
    },
  },
  methods: {
    addSportToogle() {
      this.add_open = !this.add_open;
      this.missonshow_toogle = true;
    },
    editSportToogle() {
      this.edit_open = !this.edit_open;
      this.missonshow_toogle = true;
    },
    missonshowDone() {
      this.missonshow_toogle = false;
      this.aniDone();
    },
    missonshowUnDone() {
      this.missonshow_toogle = true;
      this.aniUndone();
    },
    missonEdit(playload) {
      this.editing_misson = playload;
      this.edit_open = true;
    },
    getWeather() {
      // 呼叫天氣API
      this.axios
        .get(
          "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-FF0BCD5F-27F8-4541-9E66-3B2BBBDDB5DA&format=JSON&locationName=&elementName=Wx&sort=time"
        )
        .then((res) => {
          let weather_list = res.data.records.location;
          let weather = weather_list.filter((item) => {
            return item.locationName == this.city;
          })[0].weatherElement[0].time[0].parameter;
          this.weather = weather.parameterName;
          //判斷類型
          if (1 <= weather.parameterValue && weather.parameterValue <= 3) {
            this.weather_type = 1;
            this.weather_short = "晴天";
          } else if (
            (4 <= weather.parameterValue && weather.parameterValue <= 7) ||
            (24 <= weather.parameterValue && weather.parameterValue <= 28)
          ) {
            this.weather_type = 2;
            this.weather_short = "多雲天";
          } else {
            this.weather_type = 3;
            this.weather_short = "雨天";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    noMissonCheck() {
      if (this.missonshowList.length == 0) {
        this.noMisson = true;
      } else {
        this.noMisson = false;
      }
    },
    pointsAnimation() {
      let startNum = this.points;
      let maxNum = this.points + 20;
      let that = this;
      function addPoint() {
        if (startNum !== maxNum) {
          that.points += 1;
          startNum += 1;
          window.requestAnimationFrame(addPoint);
        } else {
          cancelAnimationFrame(addPoint);
        }
      }
      addPoint();
    },
    yellowLineAnimation() {
      let start = 0;
      let that = this;
      function addWidth() {
        if (start < 10) {
          that.yellowWidth += 0.5;
          start += 0.5;
          window.requestAnimationFrame(addWidth);
        } else {
          cancelAnimationFrame(addWidth);
        }
      }
      addWidth();
    },
    allAnimation() {
      this.pointsAnimation();
      this.yellowLineAnimation();
    },
    aniPeople() {
      let tl_people = new TimelineMax();
      tl_people
        .from("#boy_x5F_head", {
          rotate: -4,
          y: 5,
          transformOrigin: "center",
          duration: 0.5,
          delay: 0.5,
        })
        .from(
          "#boy_x5F_righthand",
          {
            rotate: 15,
            scale: 0.98,
            y: 10,
            duration: 1,
            transformOrigin: "top",
            ease: "back",
          },
          "-=1"
        )
        .from(
          "#boy_x5F_top",
          {
            scaleY: 0.95,
            transformOrigin: "center",
          },
          "-=1"
        )
        .from(
          "#boy_x5F_leftthand",
          {
            scaleY: 0.95,
            rotate: -10,
            transformOrigin: "center",
          },
          "-=1"
        );

      tl_people
        .from(
          "#girl_x5F_bottom",
          {
            scaleY: 0.9,
            transformOrigin: "top",
            duration: 1,
          },
          "-=1"
        )
        .from(
          "#girl_x5F_top",
          {
            scaleY: 0.9,
            transformOrigin: "bottom",
            duration: 0.5,
          },
          "-=1"
        );
    },
    mouseAniPeople() {
      let tl_people = new TimelineMax();
      if (this.animatoin_toogle) {
        this.animatoin_toogle = false;
        tl_people
          .to("#girl", {
            scaleY: 0.95,
            transformOrigin: "center",
            duration: 0.3,
            yoyo: true,
            repeat: 1,
          })
          .to(
            "#girl_x5F_leg",
            {
              y: 3,
              x: -3,
              rotate: -10,
              transformOrigin: "left",
              yoyo: true,
              repeat: 1,
            },
            "-=1"
          )
          .to("#boy", {
            scaleY: 0.98,
            transformOrigin: "center",
            duration: 0.2,
            yoyo: true,
            repeat: 1,
          },
          "-=.5"
          )
          .to(
            "#boy_x5F_leftthand",
            {
              scaleY: 0.95,
              rotate: 5,
              transformOrigin: "center",
              duration: .3,
              yoyo: true,
              repeat: 1,
            },
            "-=.5"
          )
          .to(
            "#Ellipse_9,#Ellipse_10",
            {
              scaleY: 0,
              transformOrigin: "center",
              yoyo: true,
              duration: 0.2,
              repeat: 3,
            },
            "-=.3"
          )
          .to(
            "#Ellipse_1",
            {
              scaleX: 0,
              transformOrigin: "center",
              yoyo: true,
              duration: 0.2,
              repeat: 3,
            },
            "-=.3"
          );
      } else {
        return;
      }
      setTimeout(() => {
        this.animatoin_toogle = true;
      }, 1000);
    },
    aniUndone(){
      let tl = new TimelineMax();
      tl.to(".undone",{
        scale: 1.2,
        duration: .1,
        repeat: 1,
        ease: "bounce",
        yoyo: true,
      })
    },
    aniDone(){
      let tl = new TimelineMax();
      tl.to(".done",{
        scale: 1.2,
        duration: .1,
        repeat: 1,
        ease: "bounce",
        yoyo: true,
      })
    },
  },
  mounted() {
    // 設定好Nav
    this.$store.commit("whiteBackChange", true);
    this.$store.commit("NowWhiteBackChange", true);
    this.$store.commit("loginColorChange", "blue");

    // 初始檢查
    this.noMissonCheck();
    let done_misson_num = this.all_misson.filter((item) => {
      return item.done == true;
    }).length;
    this.points = done_misson_num * 20;
    this.yellowWidth = (done_misson_num / 20) * 100;

    //  如果不是初始頁面
    if (this.city !== "您的位置") {
      // this.getWeather();
    }

    // 跑馬燈文字
    setInterval(() => {
      if (this.text_index < 2) {
        this.text_index += 1;
      } else {
        this.text_index = 0;
      }
    }, 3500);

    // 開場動畫
    tl.from(".back_title", {
      scale: 0,
      ease: "back",
      duration: 1,
      delay: 0.2,
    })
      .from(
        "#girl",
        {
          x: 150,
          ease: "back",
          duration: 1,
        },
        "-=1"
      )
      .from(
        "#boy",
        {
          x: -100,
          ease: "back",
          duration: 1,
        },
        "-=1"
      )
      ;

    this.aniPeople();
  },

  destroyed() {
    // 退場動畫
    tl.to(".back_title", {
      scale: 0,
      ease: "back",
      duration: 2,
    })
      .to(
        "#girl",
        {
          x: 150,
          opacity: 0,
          ease: "back",
          duration: 1,
        },
        "-=2"
      )
      .to(
        "#boy",
        {
          x: -100,
          opacity: 0,
          ease: "back",
          duration: 1,
        },
        "-=2"
      );
  },
};
</script>

<template src="./template.html"></template>
<style scoped src="./style.css"></style>
