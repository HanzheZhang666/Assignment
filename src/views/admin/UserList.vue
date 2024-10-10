<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import axios from 'axios'

const users = ref([])
const loading = ref(true)
const filters = ref({
  global: { value: null },
  username: { value: null },
  role: { value: null },
  gender: { value: null },
  age: { value: null },
  education: { value: null }
})

// Fetch users from Firestore using cloud function
const fetchUsers = async () => {
  try {
    const response = await axios.get('https://us-central1-week7-hanzhe.cloudfunctions.net/getAllUsers')
    if (response.status !== 200) throw new Error('Failed to fetch users')

    const data = await response.data
    users.value = data
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div>
    <h2 class="display-6 fw-bold text-center mb-4">User List</h2>
    <div class="card">
      <DataTable
        v-model:filters="filters"
        :value="users"
        paginator
        :rows="10"
        dataKey="id"
        :loading="loading"
        filterDisplay="row"
        :globalFilterFields="['username', 'role', 'gender', 'age', 'education']"
      >
        <template #header>
          <div class="flex justify-end">
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </div>
        </template>

        <template #empty> No users found. </template>
        <template #loading> Loading users data. Please wait. </template>

        <Column field="username" header="Username" sortable :filter="true">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by Username"
            />
          </template>
        </Column>

        <Column field="role" header="Role" sortable :filter="true">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by Role"
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

        <Column field="age" header="Age" sortable :filter="true">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by Age"
            />
          </template>
        </Column>

        <Column field="education" header="Education" sortable :filter="true">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by Education"
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
