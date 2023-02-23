<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <router-link to="/" class="brand-link d-flex justify-content-center">
      <span class="brand-text font-weight-light"><strong>NDS Challenge</strong></span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <router-link to="/" href="#" :class="'nav-link ' + ($route.name === 'home' ? 'active' : '')">
              <i class="nav-icon fas fa-home"></i>
              <i class=""></i>
              <p>
                Dashboard
              </p>
            </router-link>
          </li>
          <li class="nav-header"><strong>MASTER</strong></li>
          <li class="nav-item">
            <router-link to="/employee" href="#" :class="'nav-link ' + (
              $route.name === 'add_employee' || $route.name === 'employee' || $route.name === 'update_employee' ? 'active' : '')">
              <i class="nav-icon fas fa-user"></i>
              <p>
                Employee
              </p>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- <i class="right fas fa-angle-left text-light"></i> -->
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {
  name: 'SideBar',
}
</script>
