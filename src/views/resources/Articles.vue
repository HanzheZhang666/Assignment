<template>
  <div class="container mt-5">
    <h2 class="display-6 fw-bold text-center mb-4">Articles</h2>
    <div class="row">
      <div v-for="article in articles" :key="article.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <img :src="article.image" class="card-img-top" :alt="article.title" />
          <div class="card-body">
            <h5 class="card-title">
              <router-link :to="{ name: 'article-details', params: { id: article.id } }">
                {{ article.title }}
              </router-link>
            </h5>
            <p class="card-text">{{ article.summary }}</p>
            <p class="card-text">
              <small class="text-muted">By {{ article.author }}</small>
            </p>
            <p class="card-text">
              <small class="text-muted">{{ article.date }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const articles = ref([])

// fetch from json file
const fetchArticles = async () => {
  try {
    const response = await fetch('/articles.json')
    if (!response.ok) throw new Error('Failed to fetch articles')
    articles.value = await response.json()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchArticles()
})
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
