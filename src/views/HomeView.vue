<template>
  <div>
    <!-- Navbar -->
    <NavBar />
    <!-- /.navbar -->

    <!-- SideBar -->
    <SideBar />
    <!-- /.SideBar -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header mb-4" style="background: #fff;">
            <div class="container-fluid mx-3">
                <div class="row">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item active">Home</li>
                </ol>
                </div>
            </div><!-- /.container-fluid -->
        </section>

      <h1 class="mx-4 pb-4">This is home page</h1>
  </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'

export default {
  name: "HomeView",
  components: {
    NavBar,
    SideBar,
  }
}
</script>