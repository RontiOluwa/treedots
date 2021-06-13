<template>
  <div class="h-64 md:h-screen">
    <GmapMap
      :center="position"
      :zoom="12"
      style='width:100%;  height: 100%;'
  >
    <GmapMarker
        :position="position"
        :icon="{ url: require('../assets/location.svg')}"
    />
  </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  props:{
    position: { type: Array, required: false, deafult: () => [] },
  },
};
</script>