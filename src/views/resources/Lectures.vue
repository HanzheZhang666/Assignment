<template>
  <div class="container mt-5">
    <h2 class="display-6 fw-bold text-center mb-4">Mental Health Lectures</h2>
    <div class="row">
      <div v-for="video in videos" :key="video.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <img :src="video.previewImage" class="card-img-top" :alt="video.title" />
          <div class="card-body">
            <h5 class="card-title">{{ video.title }}</h5>
            <p class="card-text">
              <small class="text-muted">Date: {{ video.date }}</small>
            </p>
            <p class="card-text">
              <small class="text-muted"
                >Average Rating: {{ getAverageRating(video.reviews) }}</small
              >
            </p>
            <button @click="viewVideo(video)" class="btn btn-primary">Watch Video</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useVideoStore } from '@/stores/video'

const router = useRouter()
const videoStore = useVideoStore()

// Fetch videos from the store
const videos = computed(() => videoStore.videos)

// calculate average rating from reviews
const getAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 'N/A'
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return (sum / reviews.length).toFixed(1)
}

// handle video click and navigate to details page
const viewVideo = (video) => {
  router.push(`/lectures/${video.id}`)
}
</script>
