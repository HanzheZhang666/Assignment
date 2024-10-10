<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10">
        <h2 class="display-6 fw-bold text-center mb-4">Contact Us</h2>
        <p class="text-center mb-5">
          At Elder Wellness Organization, we provide essential resources and personalized consultation services to support elder care. Feel free to reach out to us with any questions or requests for assistance!
        </p>

        <form @submit.prevent="handleSubmit" class="shadow p-4 bg-light rounded">
          <div class="mb-3">
            <label for="name" class="form-label">Full Name</label>
            <input 
              type="text" 
              v-model="formData.name" 
              id="name" 
              class="form-control" 
              placeholder="Enter your full name" 
              required 
            />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email Address</label>
            <input 
              type="email" 
              v-model="formData.email" 
              id="email" 
              class="form-control" 
              placeholder="Enter your email address" 
              required 
            />
          </div>

          <div class="mb-3">
            <label for="subject" class="form-label">Subject</label>
            <input 
              type="text" 
              v-model="formData.subject" 
              id="subject" 
              class="form-control" 
              placeholder="Enter the subject" 
              required 
            />
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">Message</label>
            <textarea 
              v-model="formData.message" 
              id="message" 
              rows="4" 
              class="form-control" 
              placeholder="Write your message here..." 
              required 
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary w-100">Submit</button>
        </form>

        <div v-if="submitted" class="alert alert-success mt-4" role="alert">
          Thank you for reaching out! We will get back to you as soon as possible.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitted = ref(false)

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)

  // Reset the form and display a success message
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  submitted.value = true

  // Hide the success message after a few seconds
  setTimeout(() => {
    submitted.value = false
  }, 5000)
}
</script>

<style scoped>
h2 {
  color: #0056b3;
}

.form-control {
  border-radius: 0.25rem;
}

.btn-primary {
  background-color: #0056b3;
  border: none;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
}
</style>
