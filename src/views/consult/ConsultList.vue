<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const consults = ref([])
const loading = ref(true)
const filters = ref({
  global: { value: null },
  consultee_firstname: { value: null },
  consultee_lastname: { value: null },
  appointment_date: { value: null },
  gender: { value: null },
  consultant: { value: null }
})

// Fetch and parse consults from CSV
const fetchConsults = async () => {
  try {
    const response = await fetch('/consults.csv')
    if (!response.ok) throw new Error('Failed to fetch consults')

    const text = await response.text()
    const parsedData = parseCSV(text)
    consults.value = parsedData
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

// Function to parse CSV data
const parseCSV = (text) => {
  const rows = text.trim().split('\n')
  const headers = rows[0].split(',')

  return rows.slice(1).map((row) => {
    const values = row.split(',')
    return headers.reduce((acc, header, index) => {
      acc[header.trim()] = values[index].trim()
      return acc
    }, {})
  })
}

// Export data to CSV
const exportToCSV = () => {
  const csvContent = generateCSVContent(consults.value)
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', 'consults.csv')
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Function to generate CSV content from consult data
const generateCSVContent = (data) => {
  const headers = [
    'id',
    'consultee_firstname',
    'consultee_lastname',
    'appointment_date',
    'gender',
    'location_lat',
    'location_long',
    'consultant'
  ]
  const rows = data.map((item) => headers.map((header) => item[header] || '').join(','))
  return [headers.join(','), ...rows].join('\n')
}

onMounted(() => {
  fetchConsults()
})
</script>

<template>
  <div>
    <h2 class="display-6 fw-bold text-center mb-4">Consult List</h2>
    <div class="card">
      <DataTable
        v-model:filters="filters"
        :value="consults"
        paginator
        :rows="10"
        dataKey="id"
        :loading="loading"
        filterDisplay="row"
        :globalFilterFields="[
          'consultee_firstname',
          'consultee_lastname',
          'appointment_date',
          'gender',
          'consultant'
        ]"
      >
        <template #header>
          <div class="flex justify-between">
            <InputText v-model="filters['global'].value" placeholder="Keyword Search"/>
            <Button label="Export to CSV" @click="exportToCSV" style="float: right;"/>
          </div>
        </template>

        <template #empty> No consults found. </template>
        <template #loading> Loading consults data. Please wait. </template>

        <Column field="consultee_firstname" header="Consultee First Name" sortable :filter="true">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by First Name"
            />
          </template>
        </Column>

        <Column field="consultee_lastname" header="Consultee Last Name" sortable :filter="true">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by Last Name"
            />
          </template>
        </Column>

        <Column field="appointment_date" header="Appointment Date" sortable :filter="true">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by Appointment Date"
            />
          </template>
        </Column>

        <Column field="gender" header="Gender" sortable :filter="true">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by Gender"
            />
          </template>
        </Column>

        <Column field="consultant" header="Consultant" sortable :filter="true">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by Consultant"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin: 20px;
}
</style>
