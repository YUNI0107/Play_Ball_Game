<template>
  <div class="map_out">
    <div ref="map" class="map"></div>
  </div>
</template>

<style scoped>
.map_out {
  width: 100%;
  height: 100%;
}

.map {
  width: 100%;
  height: 100%;
  outline: none;
}

.content {
  padding: 5px 10px;
}


</style>

<script>
import { Loader } from "@googlemaps/js-api-loader";
export default {
  props: ["fontcolor","ball"],
  data() {
    return {
      map: null,
      loader: null,
      nowMarker: null,
    };
  },
  computed: {
    pos() {
      return this.$store.state.pos;
    },
  },
  watch: {
    pos() {
      this.getGoogleMap();
      this.searchPlace();
    },
  },
  methods: {
    getGoogleMap() {
      this.loader
        .load()
        .then(() => {
          this.map = new window.google.maps.Map(this.$refs.map, {
            center: this.pos,
            zoom: 15,
          });
          this.nowMarker = new window.google.maps.Marker({
            position: this.pos,
            map: this.map,
            icon: {
              url: 'https://i.imgur.com/74NE6Gk.png',
              scaledSize: new window.google.maps.Size(45, 67),
            },
            title: "你的目前位置",
          });

        })
        .catch((res) => {
          console.log(res);
        });
    },
    searchPlace() {
      this.loader
        .load()
        .then(() => {
          const service = new window.google.maps.places.PlacesService(this.map);
          service.nearbySearch(
            { location: this.pos, radius: 1000, keyword: this.ball },
            (results, status) => {
              if(results.length == 0){
                this.zeroMarker();
              }
              if (status !== "OK") return;
              this.createMarkers(results);
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },

    createMarkers(places) {
      this.loader.load().then(() => {
        places.forEach((place) => {
          // 建立一個新地標
          let marker = new window.google.maps.Marker({
            // 設定地標的座標
            position: place.geometry.location,
            map: this.map,
          });

          let infowindow = new window.google.maps.InfoWindow({
            // 設定想要顯示的內容
            content: `
                  <div class="content">
                    <h3 class="firstHeading" style="letter-spacing: 2px; line-height: 30px;">${place.name}</h3>
                    <p>${place.vicinity}</p>
                    <p style="display: inline-block;">Rank 評分</p>
                    <h3 style="display: inline-block; color: ${this.fontcolor};">${place.rating}</h3>
                    <br>
                    <a class="google_link" href="https://www.google.com/maps/search/?api=1&query=${place.name}" target="_blank">在 Google 地圖上查看</a>
                  </div>
                `,
          });
          marker.addListener("click", () => {
            // 指定在哪個地圖和地標上開啟訊息視窗
            infowindow.open(this.map, marker);
          });
        });
      });
    },
    zeroMarker(){
      this.loader.load().then( ()=>{
        let infowindow = new window.google.maps.InfoWindow({
          content:"附近沒有適合的球場！"
        });
        infowindow.open(this.map, this.nowMarker);
      }
      )
    }
  },
  mounted() {
    this.loader = new Loader({
      apiKey: "放置Google金鑰",
      version: "weekly",
      libraries: ["places"],
    });

    if (this.pos !== null) {
      this.getGoogleMap();
      this.searchPlace();
    }
  },
};
</script>
