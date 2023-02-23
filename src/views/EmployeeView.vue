<template>
<div class="wrapper">
  <!-- Navbar -->
  <NavBar />
  <!-- /.navbar -->

  <!-- SideBar -->
  <SideBar />
  <!-- /.SideBar -->

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header mb-4" style="background: #fff;">
      <div class="container-fluid mx-3">
        <div class="row">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
            <li class="breadcrumb-item active">Employee</li>
          </ol>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Data view to test -->
    <!-- <p>reset: {{ employeesReset }}</p>
    <p>actual: {{ employees }}</p>
    <p>by page: {{ employeesByPage }}</p> -->

    <!-- Main content -->
    <section class="content">

      <!-- Default box -->
      <div class="card mx-3">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">
            <h3 class="card-title align-middle"><strong>List</strong> Employee</h3>
  
            <router-link to="/employee/add" class="btn btn-dark btn-sm px-4">
              <strong>ADD</strong>
            </router-link>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <Form class="form-group d-flex col-6" @submit="searchEmployees">
              <div class="d-flex flex-column">
                <Field name="nik_input" type="text" id="nik_input" class="form-control" placeholder="NIK" v-model="nikSearchInput" :rules="validateNik" />
                <ErrorMessage name="nik_input" class="small text-danger px-2" />
              </div>
              <div class="d-flex flex-column mx-3">
                <Field name="fullname_input" type="text" id="fullname_input" class="form-control" placeholder="Fullname" v-model="fullnameSearchInput" :rules="validateFullname" />
                <ErrorMessage name="fullname_input" class="small text-danger px-2" />
              </div>
              <button type="submit" class="btn btn-dark btn-sm px-3">
                <strong>SEARCH</strong>
              </button>
            </Form>
          </div>
          <div class="card-body table-responsive p-0">
            <table class="table text-nowrap">
              <thead class="text-center">
                <tr>
                  <th>NIK</th>
                  <th>Fullname</th>
                  <th>Join Date</th>
                  <th>Salary</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="e in employeesByPage" :key="e.nik">
                  <td>{{ e.id }}</td>
                  <td>{{ e.fullname }}</td>
                  <td class="text-left">{{ formatDdMmYyyy(e.join_date) }} ({{ howManyYears(e.join_date) }} Years)</td>
                  <td class="text-left"><span>Rp.</span> <span>{{ rpSalary(e.salary) }}</span></td>
                  <td class="d-flex justify-content-end pr-0">
                    <router-link :to="`/employee/update/${e.nik}`" class="btn btn-primary btn-sm px-3 mx-2">
                      <strong>UPDATE</strong>
                    </router-link>
                    <Form @submit="() => { deleteEmployee(e.nik, e.id) }">
                      <button type="submit" class="btn btn-danger btn-sm px-3">
                        <strong>DELETE</strong>
                      </button>
                    </Form>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr class="my-0">
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer" style="background: #fff;">
          <div class="d-flex justify-content-between my-2">
            <div>
              <span>Page <strong>{{ currentPage }}</strong> of {{ totalPages }}</span>
            </div>
            <div>
              <button type="button" :class="`btn btn-dark btn-sm px-4 mx-2 ${currentPage === 1 ? 'disabled' : ''}`" @click= "prevPage">
                <strong>PREV</strong>
              </button>
              <button type="button" :class="`btn btn-dark btn-sm px-4 ${((currentPage === totalPages) || (totalPages === 1)) ? 'disabled' : ''}`" @click= "nextPage">
                <strong>NEXT</strong>
              </button>
            </div>
          </div>
        </div>
        <!-- /.card-footer-->
      </div>
      <!-- /.card -->

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <footer class="main-footer" style="background: #f4f6f9;">
    <span>Copyright &copy; 2023</span>
  </footer>

</div>
<!-- ./wrapper -->
</template>

<script>
import axios from "axios"
import { Form, Field, ErrorMessage } from "vee-validate"
import toastr from "toastr"
// import $ from "jquery"

// @ is an alias to /src
import NavBar from "@/components/NavBar.vue"
import SideBar from "@/components/SideBar.vue"

import { useEmployeesStore } from "@/stores/employees"

const store = useEmployeesStore()

export default {
  name: 'EmployeeView',
  components: {
    NavBar,
    SideBar,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      employeesReset: store.employees,
      employees: [],
      employeesByPage: [],
      nikSearchInput: "",
      fullnameSearchInput: "",
      currentPage: 1,
      totalPages: 0,
    }
  },
  methods: {
    goToPage(p, emList) {
      this.currentPage = p
      this.setEmployeesByPage(p, emList)
      this.setTotalPages(emList)
    },
    searchEmployees() {
      this.employees = this.employeesReset
      const filteredEmployees = (
        this.employees.filter(e => e.id.toString().includes(this.nikSearchInput))
                      .filter(e => e.fullname.toString().toLowerCase().includes(this.fullnameSearchInput.toLowerCase()))
      )
      this.employees = filteredEmployees

      this.goToPage(1, filteredEmployees)
    },
    prevPage() {
      this.goToPage((this.currentPage > 1 ? (this.currentPage - 1) : this.currentPage), this.employees)
    },
    nextPage() {
      this.goToPage((this.currentPage < this.totalPages ? (this.currentPage + 1) : this.currentPage), this.employees)
    },
    setTotalPages(emList) {
      this.totalPages = emList.length%3 === 0 ? emList.length/3 : ((emList.length - (emList.length%3))/3) + 1
    },
    setEmployeesByPage(p, emList) {
      let em = []
      const startPage = ((p-1)*3)
      const endPage = ((startPage + 3) <= emList.length) ? (startPage + 3) : emList.length 
      for (let i = startPage; i < endPage; i++) {
        em.push(emList[i])
      }
      this.employeesByPage = em
    },
    validateNik(val) {
      if (val.length > 16) return "Must be 16 digits or less"
      return true
    },
    validateFullname(val) {
      if (val.length > 50) return "Must be 50 digits or less"
      return true
    },
    howManyYears(date) {
      return new Date(Date.now() - Date.parse(date)).getUTCFullYear() - 1970
    },
    formatDdMmYyyy(date) {
      const pre = num => (num) < 10 ? ("0" + num) : num
      const da = new Date(date)
      const y = da.getFullYear()
      const m = pre(da.getMonth() + 1)
      const d = pre(da.getDate())
      return `${d}/${m}/${y}`
    },
    rpSalary(s) {
      return new Intl.NumberFormat('id-ID', { maximumSignificantDigits: 3 }).format(s)
    },
    async deleteEmployee(nik, id) {
      if (confirm(`Are you sure you want to delete employee ${id}?`)) {
        await axios.delete(`https://63929998b750c8d178e16014.mockapi.io/api/employee/${nik}`)
        .then(() => {
          // updates view
          this.employeesReset = this.employeesReset.filter(e => parseInt(e.nik) !== parseInt(nik))
          this.employees = this.employees.filter(e => parseInt(e.nik) !== parseInt(nik))
          this.employeesByPage = this.employeesByPage.filter(e => parseInt(e.nik) !== parseInt(nik))
          store.employees = store.employees.filter(e => parseInt(e.nik) !== parseInt(nik))
          toastr.success(`Employee ${id} has been successfully deleted`)
        })
      }
    }
  },
  async created() {
    if (store.employees.length < 1) { // prevent new fetching when store is not empty
      await axios.get(
          "https://63929998b750c8d178e16014.mockapi.io/api/employee", 
          { headers: { "Accept": "application/json" } }
      )
      .then((res) => {
          this.employeesReset = res.data
          store.employees = res.data
          this.employees = store.employees
      })
    } else {
          this.employeesReset = store.employees
          this.employees = store.employees
    }
    this.goToPage(this.currentPage, this.employees)
  },
}
</script>
