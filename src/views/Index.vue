
<template>
  <div id="container">
    <Top />
    <div class="block md:flex">
      <div class="w-full md:w-3/4">
        <Map :position="position" />
      </div>
      <div class="w-full h-screen overflow-x-hidden overflow-scroll md:w-1/4">
        <div class="bg-white sticky top-0 w-full p-1">
          <h3 class="m-4">Hubs Near You</h3>
        </div>
        <ul class="m-4">
          <li class="p-3 cursor-pointer hover:bg-gray-100" v-for="(item, index) in address" v-bind:key="item.id"  @click="filterHub(item.distances, item.position, index)">
            <div class="flex">
              <div class="w-10/12">
                <p class="text-xs" v-if="item.distances">{{item.distances}} KM away from you</p>
                <a>{{item.name}}</a>
              </div>
              <div class="w-12 text-right">
                <div class="round h-6 w-6 text-white rounded-full text-center float-right">
                  {{item.marker_title}}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import Map from '../components/Map.vue'
import Top from '../components/Top.vue'
import axios from "axios";
import Hub from '../json/hubs.json'
export default {
  name: 'App',
  data(){
    return{
      address :Hub.data,
      hubs: Hub['data'],
      position: []
    }
  },
  components: {
    Map, Top
  },
  methods: {
    filterHub: function(distances, position, index){
      console.log(distances)
      this.address.splice(index, 1);
      this.position = position;
    },

    hubIndex: function(index) {
      return String.fromCharCode(65 + index);
    },
    
    async AddtoHub() {

      for (let i = 0; i < this.hubs.length; i++) {
        const list = this.hubs[i];
        const baseURI = 'https://maps.googleapis.com/maps/api/geocode/json?key='+process.env.VUE_APP_API_KEY+'&address='+list.name+''
        await axios.get(baseURI)
        .then((result) => {
          list.position = result.data.results[0].geometry.location
          list.distances = Math.pow(result.data.results[0].geometry.location.lat - this.position.lat, 2) + Math.pow(result.data.results[0].geometry.location.lng - this.position.lng, 2);
        }).catch((error)=>{
          console.log('error'+ error)
        });
      }

      this.hubs.sort((a, b) => {
        return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0;
      });

      for (let i = 0; i < this.hubs.length; i++) {
        this.hubs[i].marker_title = this.hubIndex(i);
      } 
    },

    getCurrentPosition() {
      navigator.geolocation.getCurrentPosition(position => {
        this.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.AddtoHub();
      },error => {
        console.log(error.message);
      });
    },
  },
  async mounted() {
    this.getCurrentPosition();
  }
}
</script>

<style>
  .round{
    background: #f19727;
  }
</style>