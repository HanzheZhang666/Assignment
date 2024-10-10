<script setup>
import { ref, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken =
  'TOKEN'

const searchQuery = ref('')
const places = ref([])
let map

onMounted(() => {
  // Initialize the map
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [145.134, -37.9105],
    zoom: 12
  })

  // Add navigation controls
  map.addControl(new mapboxgl.NavigationControl())
})

// Function to search for places based on user input
const searchPlaces = async () => {
  if (searchQuery.value) {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxgl.accessToken}`
    )
    const data = await response.json()
    places.value = data.features.map((feature) => ({
      id: feature.id,
      name: feature.place_name,
      coordinates: feature.geometry.coordinates
    }))
  } else {
    places.value = []
  }
}

// Function to navigate to selected place
const navigateToPlace = (place) => {
  map.flyTo({
    center: place.coordinates,
    essential: true,
    zoom: 14
  })

  // Add marker to the selected place
  new mapboxgl.Marker()
    .setLngLat(place.coordinates)
    .setPopup(new mapboxgl.Popup().setText(place.name))
    .addTo(map)
}
</script>

<template>
  <div>
    <h2 class="display-6 fw-bold text-center mb-4">Consult Activity Map</h2>
    <div class="mb-1">
      <label class="fw-bold">Activity Place Keyword: </label>
      <input v-model="searchQuery" @input="searchPlaces" placeholder="Search for activities..." />
      <ul>
        <li v-for="place in places" :key="place.id" @click="navigateToPlace(place)">
          {{ place.name }}
        </li>
      </ul>
    </div>
    <div id="map" style="height: 500px; width: 100%"></div>
  </div>
</template>

<style>
#map {
  width: 100%;
  height: 400px;
}
</style>
