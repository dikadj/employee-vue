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
                    <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                    <li class="breadcrumb-item"><router-link to="/employee">Employee</router-link></li>
                    <li class="breadcrumb-item active">Update</li>
                </ol>
                </div>
            </div><!-- /.container-fluid -->
        </section>

      <div class="container-fluid mx-3">
            <div class="row">
                <div class="col-md-4">

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><strong>Update</strong> Employee</h3>
                        </div>

                        <form>
                            <div class="card-body">
                                <div class="card bg-danger">
                                    <div class="card-body py-2 px-3">
                                        Alert Message
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" id="nik" placeholder="NIK" v-model="nik" disabled>
                                    <input type="text" class="form-control my-3" id="fullname" placeholder="Fullname" v-model="fullname">
                                    <input type="text" class="form-control my-3" id="join_date" placeholder="Join Date" @focus="joinDateFocus" @blur="joinDateBlur" v-model="join_date">
                                    <input type="text" class="form-control" id="salary" placeholder="Salary" v-model="salary">
                                </div>
                                <div class=" d-flex justify-content-end">
                                    <button type="button" class="btn btn-secondary px-3 py-1 mx-2" @click="cancel">Cancel</button>
                                    <button type="submit" class="btn btn-dark px-4 py-1" @click.stop.prevent="updateEmployee">Save</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
                <div class="col-md-8">
                    <p>{{ test }}</p>
                </div>
            </div>
        </div>

  </div>
  <footer class="main-footer" style="background: #f4f6f9;">
    <span>Copyright &copy; 2023</span>
  </footer>
</div>
</template>

<script>

import NavBar from "@/components/NavBar.vue"
import SideBar from "@/components/SideBar.vue"

import { useEmployeesStore } from "@/stores/employees"

const store = useEmployeesStore()

export default {
    name: "AddEmployee",
    data() {
        return {
            test: store.employees,
            nik: this.$route.params.id,
            fullname: store.employees.filter(e => e.nik === this.$route.params.id)[0].fullname,
            join_date: store.employees.filter(e => e.nik === this.$route.params.id)[0].join_date,
            salary: store.employees.filter(e => e.nik === this.$route.params.id)[0].salary,
        }
    },
    components: {
        NavBar,
        SideBar,
    },
    methods: {
        joinDateFocus(e) {
            e.target.type = "date"
        },
        joinDateBlur(e) {
            if (e.target.value === "") e.target.type = "text"
        },
        updateEmployee() {
            store.employees = store.employees.map(e => {
                if (e.nik === this.nik) {
                    return {
                        nik: this.nik,
                        fullname: this.fullname,
                        join_date: this.join_date,
                        salary: this.salary, 
                    }
                } else {
                    return e
                }
            })
            this.$router.push("/employee")
        },
        cancel() {
            this.$router.push('/employee')
        },
    },
    created() {

    }
}
</script>

  