<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const stats = ref({
  totalUsers: 0,
  userTypeCounts: {
    user: 0,
    consultant: 0,
    admin: 0
  }
})

const consultationsData = ref({
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  series: [10, 12, 15, 8, 20, 5, 18] // Example consultation counts for each day
})

const consultationsChartOptions = {
  chart: {
    id: 'consultations-trend',
    type: 'line'
  },
  xaxis: {
    categories: consultationsData.value.labels
  },
  title: {
    text: 'Daily Consultations for Current Week',
    align: 'center'
  }
}

const fetchUserDashboardStats = async () => {
  try {
    const response = await axios.get(
      'https://us-central1-week7-hanzhe.cloudfunctions.net/getUserDashboardStats'
    )
    if (response.status === 200) {
      stats.value = response.data
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
  }
}

onMounted(() => {
  fetchUserDashboardStats()
})
</script>

<template>
  <div class="container">
    <h2 class="text-center mb-4">User Dashboard</h2>
    <div class="row">
      <div class="col-md-3 mb-4">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Total Users</h5>
            <p class="card-text">{{ stats.totalUsers }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Users</h5>
            <p class="card-text">{{ stats.userTypeCounts.user }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Consultants</h5>
            <p class="card-text">{{ stats.userTypeCounts.consultant }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Admins</h5>
            <p class="card-text">{{ stats.userTypeCounts.admin }}</p>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12">
          <apexchart
            type="line"
            :options="consultationsChartOptions"
            :series="[{ name: 'Consultations', data: consultationsData.series }]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
}
</style>
