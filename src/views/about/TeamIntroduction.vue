<template>
  <div class="about container my-5">
    <!-- 1. About Us Section -->
    <section class="row align-items-center mb-5">
      <!-- Left: Image -->
      <div class="col-md-6">
        <!-- Image source: https://kindnessfp.com/elder-care-consultant-what-they-do/ -->
        <img
          src="https://kindnessfp.com/wp-content/uploads/Elder-Care-Consultant-What-Do-They-Do.png"
          class="img-fluid rounded"
          alt="Elderwell Group"
        />
      </div>
      <!-- Right: Introduction Text -->
      <div class="col-md-6">
        <h2 class="display-6 fw-bold">About us</h2>
        <p class="lead">
          Elderwell Group is dedicated to enhancing the mental well-being of the elderly. Our
          mission is to provide compassionate support, resources, and a sense of community to help
          seniors lead fulfilling lives. With a team of experienced consultants, therapists, and
          volunteers, we offer personalized consultations, access to valuable resources, and a
          platform for community engagement.
        </p>
        <p class="lead">
          We believe in the power of connection and are committed to making a positive impact on the
          lives of the elderly.
        </p>
      </div>
    </section>

    <!-- 2. Our Team Section -->
    <section>
      <h2 class="display-6 fw-bold text-center mb-4">Meet Our Team</h2>
      <div class="row g-4">
        <!-- Team Member 1 -->
        <div class="col-md-4">
          <div class="card h-100 text-center">
            <img
              src="https://powerpackelements.com/wp-content/uploads/2017/11/Team-memeber-01.png"
              class="card-img-top custom-img"
              alt="Dr. Susan Williams"
            />
            <div class="card-body">
              <h5 class="card-title">Dr. Thomas Anderson</h5>
              <p class="card-text">
                Dr. Thomas Anderson is a renowned psychologist with over 20 years of experience in
                geriatric mental health. He specializes in providing personalized support to
                elderly clients, helping them navigate through the challenges of aging with dignity
                and grace.
              </p>
            </div>
          </div>
        </div>

        <!-- Team Member 2 -->
        <div class="col-md-4">
          <div class="card h-100 text-center">
            <img
              src="https://powerpackelements.com/wp-content/uploads/2017/11/Team-memeber-2-e1510727045494.png"
              class="card-img-top custom-img"
              alt="John Smith"
            />
            <div class="card-body">
              <h5 class="card-title">John Smith</h5>
              <p class="card-text">
                John Smith is a licensed therapist and a dedicated advocate for elderly mental
                health. His approach focuses on creating a safe and supportive environment where
                seniors can openly discuss their concerns and receive the guidance they need.
              </p>
            </div>
          </div>
        </div>

        <!-- Team Member 3 -->
        <div class="col-md-4">
          <div class="card h-100 text-center">
            <img
              src="https://powerpackelements.com/wp-content/uploads/2017/11/Team-memeber-3.png"
              class="card-img-top custom-img"
              alt="Emily Davis"
            />
            <div class="card-body">
              <h5 class="card-title">Emily Davis</h5>
              <p class="card-text">
                Emily Davis brings her expertise in social work and community outreach to the
                Elderwell Group. She is passionate about connecting seniors with the resources and
                community support they need to thrive, and she leads our outreach initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about {
  padding: 20px;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-weight: bold;
  color: #0d6efd;
}

.custom-img {
  height: auto;
  max-width: 200px; 
  margin: 0 auto; 
}
</style>
