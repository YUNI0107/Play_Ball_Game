<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
  background: magenta;
}
</style>

<script>
import { Loader } from "@googlemaps/js-api-loader";
export default {
  data() {
    return {
      map: null,
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
    },
  },
  methods: {
    getGoogleMap() {
      const loader = new Loader({
        apiKey: "AIzaSyABOQsoKBzSYhi1o4kGc7JpK-_ywlC32jM",
        version: "weekly",
      });
      loader.load().then(() => {
        this.map = new window.google.maps.Map(document.getElementById("map"), {
          center: this.pos,
          zoom: 15,
        });
      });
    },
    // searchPlace() {
    //   const service = new window.google.maps.places.PlacesService(this.map);

    //   service.nearbySearch(
    //     { location: this.pos, radius: 500, type: "籃球場" },
    //     (results, status) => {
    //       if (status !== "OK") return;
    //       this.createMarkers(results, this.map);
    //     }
    //   );
    // },

    // createMarkers(places, map) {
    //   const bounds = new window.google.maps.LatLngBounds();

    //   for (let i = 0, place; (place = places[i]); i++) {
    //     const image = {
    //       url: place.icon,
    //       size: new window.google.maps.Size(71, 71),
    //       origin: new window.google.maps.Point(0, 0),
    //       anchor: new window.google.maps.Point(17, 34),
    //       scaledSize: new window.google.maps.Size(25, 25),
    //     };
    //     new window.google.maps.Marker({
    //       map,
    //       icon: image,
    //       title: place.name,
    //       position: place.geometry.location,
    //     });
        
    //     bounds.extend(place.geometry.location);
    //   }

    //   map.fitBounds(bounds);
    // },
  },
  mounted() {
    this.getGoogleMap();
    // this.searchPlace();
  },
};
</script>
