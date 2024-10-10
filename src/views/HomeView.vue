<script setup></script>

<template>
  <div class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <!-- hero source https://elderwelladultday.com/ -->
        <img
          src="../assets/images/hero.jpg"
          class="d-block mx-lg-auto img-fluid"
          alt="ElderWell Support Image"
          width="700"
          height="500"
          loading="lazy"
        />
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold lh-1 mb-3">ElderWell Support Hub</h1>
        <p class="lead">
          Empowering the elderly through compassionate support and accessible resources. Connect
          with experienced consultants, explore enriching articles, and join our community forum to
          find the help and connection you need.
        </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <router-link to="/consult/consult" type="button" class="btn btn-primary btn-lg px-4 me-md-2">
            Consult
          </router-link>
          <router-link to="/resources/lectures" type="button" class="btn btn-outline-secondary btn-lg px-4">
            Online Lecture
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
