import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Nav樣式判斷
    white_back: false,
    now_white_back: true,
    ham_open: false,
    login_color: '',
    // 是否登入判斷
    login_state: true,
    all_misson:[
      {
          misson_name: "研究生學弟妹團約學弟妹團約",
          ball: "volley",
          misson_date: "2020-08-07",
          misson_place: "北科大",
          misson_time: "14:00",
          misson_location: "",
          misson_member: "Jacky、Kinda",
          desc:"平日積極規劃多元體適能活動和復健課程。",
          open: false,
          done: false,
      },
      {
          misson_name: "運動中心社團的約",
          ball: "tennis",
          misson_date: "2020-08-10",
          misson_place: "北科大",
          misson_time: "13:20",
          misson_location: "",
          misson_member: "勳勳、佩佩",
          desc:"運動健身習慣養成。",
          open: false,
          done: true,
      },
      {
          misson_name: "搶大草皮的位子",
          ball: "football",
          misson_date: "2020-08-22",
          misson_place: "華山大草原",
          misson_time: "04:00",
          misson_location: "",
          misson_member: "Ginny、Jacky、Kinda",
          desc:"要搶第一呀！！！",
          open: false,
          done: false,
      },
      {
          misson_name: "去大學打桌球",
          ball: "table",
          misson_date: "2020-05-07",
          misson_place: "桌球室",
          misson_time: "20:00",
          misson_location: "",
          misson_member: "勳勳、Kinda",
          desc:"還缺一個人要找，不然要二打一了嗚嗚",
          open: false,
          done: true,
      },
      {
          misson_name: "打籃球的約約",
          ball: "basketball",
          misson_date: "2020-08-27",
          misson_place: "運動公園籃球場",
          misson_time: "10:00",
          misson_location: "",
          misson_member: "Kinda",
          desc:"大概7:00要去搶位子",
          open: false,
          done: false,
      },
    ],
    city: "您的位置",
    pos: null,
  },
  mutations: {
    whiteBackChange(state,playload){
      state.white_back = playload;
    },
    NowWhiteBackChange(state,playload){
      state.now_white_back = playload;
    },
    hamOpenChange(state,playload){
      state.ham_open = playload;
    },
    loginStateChange(state,playload){
      state.login_state = playload;
    },
    loginColorChange(state,playload){
      state.login_color = playload;
    },
    // Misson 用時間加上日期當作ID playload[0]：日期 playload[1]：時間
    missonClose(state,playload){
      let index = state.all_misson.findIndex(item=>{
        return item.misson_date == playload[0] && item.misson_time == playload[1]
      })
      state.all_misson[index].open= false;
    },
    missonOpen(state,playload){
      let index = state.all_misson.findIndex(item=>{
        return item.misson_date == playload[0] && item.misson_time == playload[1]
      })
      state.all_misson[index].open= true;
    },
    missonDone(state,playload){
      let index = state.all_misson.findIndex(item=>{
        return item.misson_date == playload[0] && item.misson_time == playload[1]
      });
      state.all_misson[index].done= true;
      state.all_misson[index].open= false;
    },
    missonDelete(state,playload){
      let index = state.all_misson.findIndex((item)=>{
        return item.misson_date == playload[0] && item.misson_time == playload[1]
      })
      state.all_misson.splice(index,1);
    },
    //新增運動區
    addSport(state,misson){
      state.all_misson.push(misson);
    },
    //修改運動區 playload[0]修改後任務包 playload[1]原本任務的識別陣列
    editSport(state,playload){
      let index = state.all_misson.findIndex((item)=>{
        return item.misson_date == playload[1][0] && item.misson_time == playload[1][1]
      })
      state.all_misson.splice(index,1,playload[0])
    },
    //設置經緯度
    setPos(state,playload){
      state.pos = playload;
    },
    //其他
    setLocation(state,playload){
      state.city = playload;
    }
  },
  actions: {
    getlocation({commit},playload){
      commit("setLocation",playload)
    },
    posLocation({commit},playload){
      commit("setPos",playload)
    }
  },
  modules: {
  }
})