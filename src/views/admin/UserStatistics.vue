<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const ageDistribution = ref(null)
const educationDistribution = ref(null)

const ageChartOptions = {
  chart: {
    id: 'age-distribution',
  },
  xaxis: {
    categories: [],
  },
}

const educationChartOptions = {
  chart: {
    id: 'education-distribution',
  },
  labels: [],
}

const ageChartSeries = ref([])
const educationChartSeries = ref([])

const fetchUserStatistics = async () => {
  try {
    const response = await axios.get('https://us-central1-week7-hanzhe.cloudfunctions.net/getUserStatistics')
    if (response.status === 200) {
      ageDistribution.value = response.data.ageDistribution
      educationDistribution.value = response.data.educationDistribution

      // Prepare data for age distribution chart
      ageChartOptions.xaxis.categories = Object.keys(ageDistribution.value)
      ageChartSeries.value = [{ name: 'Users', data: Object.values(ageDistribution.value) }]

      // Prepare data for education distribution chart
      educationChartOptions.labels = Object.keys(educationDistribution.value)
      educationChartSeries.value = Object.values(educationDistribution.value)
    }
    console.log(ageDistribution.value)
  } catch (error) {
    console.error('Error fetching user statistics:', error)
  }
}

onMounted(() => {
  fetchUserStatistics()
})
</script>

<template>
  <div class="container">
    <h2 class="display-6 fw-bold text-center mb-4">User Statistics</h2>
    <div class="row">
      <div class="col-md-6 mb-4">
        <h4 class="text-center">Age Distribution</h4>
        <apexchart
          v-if="ageDistribution"
          type="bar"
          :options="ageChartOptions"
          :series="ageChartSeries"
          class="w-100"
        />
      </div>
      <div class="col-md-6 mb-4">
        <h4 class="text-center">Education Distribution</h4>
        <apexchart
          v-if="educationDistribution"
          type="pie"
          :options="educationChartOptions"
          :series="educationChartSeries"
          class="w-100"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
