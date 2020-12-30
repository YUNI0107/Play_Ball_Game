<template>
  <div>
    <div class="new_notyet" :class="{fail: fail}">
      <div class="new_left">
        <div class="place"></div>
        <div class="date"></div>
      </div>
      <div class="new_right">
        <div class="top"></div>
        <div class="bottom"></div>
      </div>
    </div>
    <div class="new_notyet" :class="{fail: fail}">
      <div class="new_left">
        <div class="place"></div>
        <div class="date"></div>
      </div>
      <div class="new_right">
        <div class="top"></div>
        <div class="bottom"></div>
      </div>
    </div>
    <div class="new_notyet" :class="{fail: fail}">
      <div class="new_left">
        <div class="place"></div>
        <div class="date"></div>
      </div>
      <div class="new_right">
        <div class="top"></div>
        <div class="bottom"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.new_notyet {
  width: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.089), rgba(255, 255, 255, 0.589), rgba(255, 255, 255, 0.089) );
  background-size: 200% auto;
  height: 80px; 
  padding: 30px 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  animation: running 2s infinite ease-in;
}

.new_notyet.fail{
  animation: none;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.543), rgba(255, 255, 255, 0.315));
}

@keyframes running{
  0%{
    background-position: -100% 0;
  }
  100%{
    background-position: 100% 0;
  }
}

.new_notyet .new_left {
  width: 150px;
  height: 50px;
  background-color: #ffffff20;
  border-radius: 50px;
  margin: 0 30px 0 0;
}

.new_notyet .new_right {
  width: 100%;
}

.new_notyet .new_right .top {
  width: 100%;
  height: 30px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.288);
  margin-bottom: 10px;
}

.new_notyet .new_right .bottom {
  width: 80%;
  height: 10px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.212);
}
</style>

<script>
export default {
  props: [
    "fail"
  ]
}
</script>
