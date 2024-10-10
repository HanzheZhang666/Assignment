<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="display-6 fw-bold text-center mb-4">User Guide</h2>

        <!-- Account Information Section -->
        <h4 class="fw-bold mt-4">Account Information</h4>
        <ul class="list-group list-group-flush mb-4">
          <li class="list-group-item">
            Admin Account: <strong>Username:</strong> admin, <strong>Password:</strong> admin123
          </li>
          <li class="list-group-item">
            Consultant Account: <strong>Username:</strong> consultant1,
            <strong>Password:</strong> abc123
          </li>
          <li class="list-group-item">
            User Account: <strong>Username:</strong> user1, <strong>Password:</strong> abc123
          </li>
        </ul>

        <!-- Registration Information Section -->
        <h4 class="fw-bold mt-4">Registration</h4>
        <p>
          Users can create a new account using the registration page. Simply provide the required
          information, and your account will be ready to use.
        </p>

        <!-- Access and Authorization Section -->
        <h4 class="fw-bold mt-4">Access and Authorization</h4>
        <p>Some components of the platform are restricted based on user roles:</p>
        <ul class="list-group list-group-flush mb-4">
          <li class="list-group-item">
            Admin: Has full access to all features, including user management and configuration.
          </li>
          <li class="list-group-item">
            Consultant: Can access consultation features and view related data.
          </li>
          <li class="list-group-item">
            User: Has access to general resources and services but limited access to restricted
            components.
          </li>
        </ul>
        <p>
          If a user tries to access a component they are not authorized for, they will be
          automatically redirected to the home page.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2,
h4 {
  color: #0056b3;
}

.list-group-item {
  background-color: #f8f9fa;
  border: none;
}

.bi-info-circle {
  color: #007bff;
  margin-right: 5px;
}
</style>
