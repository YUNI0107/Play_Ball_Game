<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "white_back",
      "now_white_back",
      "ham_open",
      "login_state",
      "login_color",
    ]),
  },
  methods: {
    hamHandle() {
      let show_back = document.querySelector(".nav_right");
      let ham = document.querySelector(".ham");
      let logo = document.querySelector(".logo");

      //阻止連續點擊
      ham.style.pointerEvents = "none";
      setTimeout(() => {
        ham.style.pointerEvents = "auto";
      }, 500);

      if (!this.ham_open) {
        this.$store.commit("hamOpenChange", true);
        this.$store.commit("whiteBackChange", true);
        show_back.classList.add("open");
        this.$refs.nav_right.classList.remove("none");
        logo.style.opacity = 1;
        logo.style.transition = ".5s";
      } else {
        ham.classList.add("ham_change");
        this.$store.commit("hamOpenChange", false);
        logo.style.opacity = 0;
        logo.style.transition = ".5s";
        if (this.now_white_back == false) {
          setTimeout(() => {
            this.$store.commit("whiteBackChange", false);
            ham.classList.remove("ham_change");
          }, 500);
        } else {
          setTimeout(() => {
            this.$store.commit("whiteBackChange", true);
            ham.classList.remove("ham_change");
          }, 500);
        }
        setTimeout(() => {
          show_back.classList.add("none");
        }, 500);
        show_back.classList.remove("open");
      }
    },
    hamClose() {
      let show_back = document.querySelector(".nav_right");
      let ham = document.querySelector(".ham");
      ham.classList.add("ham_change");
      this.$store.commit("hamOpenChange", false);
      show_back.classList.remove("open");
      this.logoShow();
      setTimeout(() => {
        show_back.classList.add("none");
      }, 500);
    },
    logoShow() {
      let logo = document.querySelector(".logo");
      if (document.body.clientWidth > 1070) {
        logo.style.opacity = 1;
        logo.style.transition = ".5s";
      } else {
        logo.style.opacity = 0;
        logo.style.transition = "0s";
      }
      if (this.ham_open) {
        logo.style.opacity = 1;
        logo.style.transition = ".5s";
      }
    },
    navHover() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let nav = document.querySelector(".nav");
      if (scrollTop > 100 && document.body.clientWidth > 1070) {
        nav.style.backgroundPosition = "top";
      } else {
        nav.style.backgroundPosition = "bottom";
      }
    },
    logToogle() {
      if (this.login_state) {
        this.$store.commit("loginStateChange", false);
        this.$store.commit("loginColorChange", "");
        this.$router.push({ name: "Login" });
      } else {
        if (this.$route.name !== "Login") {
          this.$router.push({ name: "Login" });
        }
      }
    },
  },
  mounted() {
    // LOGO
    this.logoShow();
    this.navHover();
    window.addEventListener("resize", () => {
      this.logoShow();
      this.navHover();
    });
    // 高度變色
    window.addEventListener("scroll", this.navHover);
    let mql = window.matchMedia("(max-width: 1070px)");
    let vue_this = this;

    if (mql.matches) {
      vue_this.$refs.nav_right.classList.add("none");
    } else {
      vue_this.$refs.nav_right.classList.remove("none");
    }

    mql.addEventListener("change", (e) => {
      if (e.matches) {

        vue_this.$refs.nav_right.classList.add("none");
      } else {

        vue_this.$refs.nav_right.classList.remove("none");
      }
    });
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
