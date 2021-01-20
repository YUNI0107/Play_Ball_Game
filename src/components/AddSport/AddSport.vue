<script>
import {mapState} from "vuex";
export default {
  props: ["ball_type"],
  data() {
    return {
      misson_name: "",
      ball: "",
      misson_date: "",
      misson_place: "",
      misson_time: "",
      misson_member: "",
      desc: "",
      missing: [],
      // 檢查是否填寫
      name_check: false,
      ball_check: false,
      date_check: false,
      place_check: false,
      time_check: false,
      member_check: false,
    };
  },
  computed:{
    ...mapState(["all_misson"])
  },
  methods: {
    addSportClose() {
      this.$emit("addSportClose");
    },
    addSport() {
      if (
        this.misson_name &&
        this.ball &&
        this.misson_date &&
        this.misson_place &&
        this.misson_member
      ) {
        this.missing = [];
        let misson = {
          misson_name: this.misson_name,
          ball: this.ball,
          misson_date: this.misson_date,
          misson_place: this.misson_place,
          misson_time: this.misson_time,
          misson_location: "",
          misson_member: this.misson_member,
          desc: this.desc,
          open: false,
          done: false,
        };
        this.$store.commit("addSport", misson);
        console.log(this.all_misson);
        this.missonLocal();
        this.addSportClose();
      }else{
          this.missing = [];
          this.resetShow();
          if(this.ball == ""){
              this.missing.push('球類');
              this.ball_check = true;
          }
          if(this.misson_member == ""){
              this.missing.push('活動成員');
              this.member_check = true;
          }
          if(this.misson_name == ""){
              this.missing.push('活動名稱');
              this.name_check = true;
          }
          if(this.misson_date == ""){
              this.missing.push('活動日期');
              this.date_check = true;
          }
          if(this.misson_time == ""){
              this.missing.push('活動時間');
              this.time_check = true;
          }
          if(this.misson_place == ""){
              this.missing.push('活動地點');
              this.place_check = true;
          }
          alert(`您還未填寫${this.missing.join('、')}😖！`)
      }
    },
    missonLocal(){
      localStorage.setItem('sport_missonList', JSON.stringify(this.all_misson));
    },
    resetShow(){
        this.ball_check = false;
        this.member_check = false;
        this.name_check = false;
        this.date_check = false;
        this.place_check = false;
    }
  },
  mounted(){
    if(this.ball_type){
      this.ball = this.ball_type;
    }
  }
};
</script>

<template src="./template.html"></template>
<style scoped src="./style.css"></style>
