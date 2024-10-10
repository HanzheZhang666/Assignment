<script setup>
import { ref } from 'vue';
import axios from 'axios';

const emailData = ref({
    to: '',
    subject: '',
    text: '',
    attachment: null,
    attachmentFilename: '',
});

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            emailData.value.attachment = reader.result.split(',')[1]; // Base64 data
            emailData.value.attachmentFilename = file.name;
        };
        reader.readAsDataURL(file); // Convert file to Base64 format
    }
};

const sendEmail = async () => {
    try {
        const response = await axios.post('https://us-central1-week7-hanzhe.cloudfunctions.net/sendEmail', {
            to: emailData.value.to,
            subject: emailData.value.subject,
            text: emailData.value.text,
            attachment: emailData.value.attachment, // base64 encoded file content
            attachmentFilename: emailData.value.attachmentFilename,
        });

        alert('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send email');
    }
};
</script>
<template>
    <div class="container mt-5">
        <h2 class="display-6 fw-bold text-center mb-4">Email Contact</h2>
        <div class="card">
            <div class="card-body">
                <form @submit.prevent="sendEmail">
                    <div class="mb-3">
                        <label for="email" class="form-label">Recipient's Email</label>
                        <input
                            type="email"
                            class="form-control"
                            id="email"
                            v-model="emailData.to"
                            placeholder="Enter recipient's email"
                            value="zysky007@gmail.com"
                            required
                        />
                    </div>

                    <div class="mb-3">
                        <label for="subject" class="form-label">Subject</label>
                        <input
                            type="text"
                            class="form-control"
                            id="subject"
                            v-model="emailData.subject"
                            placeholder="Enter the subject"
                            required
                        />
                    </div>

                    <div class="mb-3">
                        <label for="message" class="form-label">Message</label>
                        <textarea
                            class="form-control"
                            id="message"
                            v-model="emailData.text"
                            placeholder="Write your question you want to consult here"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="attachment" class="form-label">Attachment</label>
                        <input
                            type="file"
                            class="form-control"
                            id="attachment"
                            @change="handleFileUpload"
                        />
                    </div>

                    <button type="submit" class="btn btn-primary w-100">Send Email</button>
                </form>
            </div>
        </div>
    </div>
</template>