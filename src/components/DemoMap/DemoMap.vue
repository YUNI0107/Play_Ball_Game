<template>
  <div class="demo_map">
    <video
      src="../../assets/GoogleMap/ball_video.mp4"
      autoplay
      loop
      muted
    ></video>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.demo_map {
  width: 100%;
  height: 100%;
}

.demo_map video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
