<script>
import {mapState} from "vuex";
export default {
  props: ["misson"],
  computed:{
    ...mapState(["all_misson"])
  },
  methods: {
    missonClose() {
      this.$emit(
        "missonClose",
        this.misson.misson_date,
        this.misson.misson_time
      );
    },
    missonDone() {
      let check = confirm(
        `你確定完成「${this.misson.misson_name}」這項相揪活動了嗎？🤨`
      );
      if (check) {
        this.$store.commit("missonDone", [
          this.misson.misson_date,
          this.misson.misson_time,
        ]);
        this.$emit("pointsAnimation");
        this.missonLocal();
      }
    },
    missonDelete() {
      let check = confirm(`你確定要刪除這項活動了嗎？🤨`);
      if (check) {
        this.$store.commit("missonDelete", [
          this.misson.misson_date,
          this.misson.misson_time,
        ]);
        this.missonLocal();
      }
    },
    missonEdit() {
      this.$emit("missonEdit", [
        this.misson.misson_date,
        this.misson.misson_time,
      ]);
      this.missonLocal();
      this.missonClose();
    },
    missonLocal() {
      localStorage.setItem("sport_missonList", JSON.stringify(this.all_misson));
    },
  },
};
</script>

<template src="./template.html"></template>
<style scoped src="./style.css"></style>
