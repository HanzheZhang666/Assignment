<template>
  <div class="container mt-5">
    <div v-if="video" class="text-center">
      <h2 class="display-6 fw-bold mb-4">{{ video.title }}</h2>
      <iframe
        :src="`https://www.youtube.com/embed/${video.videoId}`"
        frameborder="0"
        allowfullscreen
        class="mt-5"
        style="width: 60%; height: 500px"
      ></iframe>
      <p class="mt-3">
        <small class="text-muted">Average Rating: {{ averageRating }} / 5</small>
      </p>
      <h3 class="mt-4">Leave a Rating and Comment</h3>
      <form @submit.prevent="submitRating" class="text-start mx-auto" style="max-width: 600px">
        <div class="mb-3">
          <label for="rating" class="form-label">Experience Satisfaction</label>
          <div>
            <label class="form-check-label me-2" v-for="n in 5" :key="n">
              <input
                type="radio"
                :value="n"
                v-model="newRating"
                class="form-check-input"
                :id="`rating-${n}`"
              />{{ n }}
            </label>
          </div>
        </div>
        <div class="mb-3">
          <label for="comment" class="form-label">Feedback</label>
          <textarea
            id="comment"
            v-model="newComment"
            class="form-control"
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <h4 class="mt-4">User Comments</h4>
      <ul class="list-unstyled text-start mx-auto" style="max-width: 600px">
        <li v-for="(review, index) in video.reviews" :key="index" class="border rounded p-3 mb-3">
          <p>
            <strong>Rating:</strong> <span class="badge bg-success">{{ review.rating }} / 5</span>
          </p>
          <p><strong>Comment:</strong> {{ review.comment }}</p>
        </li>
      </ul>
    </div>
    <div v-else class="text-center">
      <p>Loading video details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useVideoStore } from '@/stores/video'

const route = useRoute()
const videoStore = useVideoStore()
const videoId = route.params.id

const video = ref(null)
const newRating = ref(1)
const newComment = ref('')

const averageRating = computed(() => {
  if (!video.value || video.value.reviews.length === 0) return 0
  const total = video.value.reviews.reduce((sum, review) => sum + review.rating, 0)
  return (total / video.value.reviews.length).toFixed(1)
})

const fetchVideo = () => {
  const videoData = videoStore.getVideoById(videoId)
  video.value = videoData
}

const submitRating = () => {
  if (video.value) {
    videoStore.addReview(videoId, { rating: newRating.value, comment: newComment.value })
    newRating.value = 1
    newComment.value = ''
    fetchVideo()
  }
}

onMounted(fetchVideo)
</script>
