<template>
  <div class="container mt-5">
    <div v-if="article" class="row">
      <div class="col-md-12">
        <h2 class="display-6 fw-bold text-center mb-4">{{ article.title }}</h2>
        <img :src="article.image" class="img-fluid mb-4" :alt="article.title" />
        <p class="lead">{{ article.summary }}</p>
        <p>{{ article.content }}</p>
        <p class="text-muted">By {{ article.author }}</p>
        <p class="text-muted">{{ article.date }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const article = ref(null)

const fetchArticle = async (id) => {
  try {
    const response = await fetch('/articles.json')
    if (!response.ok) throw new Error('Failed to fetch articles')
    const articles = await response.json()
    article.value = articles.find((a) => a.id === parseInt(id))
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchArticle(route.params.id)
})
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
