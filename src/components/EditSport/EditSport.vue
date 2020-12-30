<script>
import { mapState } from "vuex";
export default {
  props:[
    "editing_misson",
  ],
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
    // Misson 用時間加上日期當作ID editing_misson[0]：日期 editing_misson[1]：時間
    misson(){
      return this.all_misson.filter(item=>{
        return item.misson_date == this.editing_misson[0] && item.misson_time == this.editing_misson[1];
      })
    },
    ...mapState(["all_misson"]),
  },
  methods: {
    editSportClose() {
      this.$emit("editSportClose");
    },
    editSport() {
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
        this.$store.commit("editSport", [misson,this.editing_misson]);
        this.editSportClose();
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
    resetShow(){
        this.ball_check = false;
        this.member_check = false;
        this.name_check = false;
        this.date_check = false;
        this.place_check = false;
    }
  },
  mounted(){
    // 初始化v-model資料
    this.misson_name = this.misson[0].misson_name;
    this.misson_member = this.misson[0].misson_member;
    this.misson_date = this.misson[0].misson_date;
    this.misson_time = this.misson[0].misson_time;
    this.misson_place = this.misson[0].misson_place;
    this.desc = this.misson[0].desc;
    this.ball = this.misson[0].ball;
  }
};
</script>

<template src="./template.html"></template>
<style scoped src="./style.css"></style>
