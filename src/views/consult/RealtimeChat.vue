<template>
  <div class="chat-container">
    <h2 class="text-center mb-4">Realtime Consult with Gemini</h2>
    <div class="chatbox">
      <div v-for="(message, index) in messages" :key="index" class="message" :class="message.type">
        <div class="message-text">{{ message.text }}</div>
      </div>
    </div>
    <div class="input-container">
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        type="text"
        placeholder="Type your message here..."
        class="form-control"
      />
      <button @click="sendMessage" class="btn btn-primary">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const userInput = ref('')
const messages = ref([])

// Function to send a message to the Gemini API and get a response
const sendMessage = async () => {
  if (userInput.value.trim() === '') return

  // Add user message to the chat
  messages.value.push({ text: userInput.value, type: 'user' })

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=TOKEN',
      {
        contents: [
          {
            parts: [
              {
                text: `You are an elder health consultant. Respond to the following message accordingly: ${userInput.value}`
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    // Add the response from the Gemini API to the chat
    console.log(response)
    const geminiResponse = response.data.candidates[0].content.parts[0].text
    messages.value.push({ text: geminiResponse, type: 'gemini' })
  } catch (error) {
    console.error('Error communicating with Gemini API:', error)
    messages.value.push({ text: 'Error communicating with Gemini API', type: 'error' })
  }

  // Clear the user input
  userInput.value = ''
}
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
}

.chatbox {
  height: 400px;
  overflow-y: auto;
  margin-bottom: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
}

.message {
  margin: 10px 0;
  display: flex;
}

.message.user .message-text {
  background-color: #007bff;
  color: #fff;
  align-self: flex-end;
}

.message.gemini .message-text {
  background-color: #e0e0e0;
  color: #333;
}

.message.error .message-text {
  background-color: #ff4d4f;
  color: #fff;
}

.message-text {
  max-width: 80%;
  padding: 10px;
  border-radius: 5px;
}

.input-container {
  display: flex;
  gap: 10px;
}
</style>
