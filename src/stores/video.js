import { defineStore } from 'pinia'

export const useVideoStore = defineStore('video', {
  state: () => ({
    videos: JSON.parse(localStorage.getItem('videos')) || []
  }),
  actions: {
    getVideoById(id) {
      return this.videos.find(video => video.id == id) || null
    },
    addReview(videoId, review) {
      const video = this.getVideoById(videoId)
      if (video) {
        video.reviews.push(review)
        this.saveVideos()
      }
    },
    saveVideos() {
      localStorage.setItem('videos', JSON.stringify(this.videos))
    }
  }
})
