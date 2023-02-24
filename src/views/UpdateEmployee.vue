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
                    <li class="breadcrumb-item"><router-link :to="linkTo('/')">Home</router-link></li>
                    <li class="breadcrumb-item"><router-link :to="linkTo('/employee')">Employee</router-link></li>
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

                        <Form @submit="onSubmit">
                            <div class="card-body">
                                <div :class="`card ${isNotError() ? 'bg-success' : 'bg-danger'}`">
                                    <span :class="`py-2 px-3 ${isNotError() ? 'd-block' : 'd-none'}`">Looks good!</span>
                                    <ErrorMessage name="nik" class="py-2 px-3" />
                                    <ErrorMessage name="fullname" class="py-2 px-3" />
                                    <ErrorMessage name="join_date" class="py-2 px-3" />
                                    <ErrorMessage name="salary" class="py-2 px-3" />
                                </div>
                                <div class="form-group">
                                    <Field name="nik" type="text" class="form-control" id="nik" placeholder="NIK" :rules="validateNik" v-model="nik" disabled />

                                    <Field name="fullname" type="text" class="form-control my-3" id="fullname" placeholder="Fullname" :rules="validateFullname" v-model="fullname" required />

                                    <Field name="join_date" type="text" class="form-control my-3" id="join_date" placeholder="Join Date" @focus="joinDateFocus" :max="`${y}-${m()}-${d}`" @blur="joinDateBlur" :rules="validateJoinDate" v-model="joinDate" required />

                                    <Field name="salary" type="text" class="form-control" id="salary" placeholder="Salary" :rules="validateSalary" v-model="salary" required />
                                </div>
                                <div class=" d-flex justify-content-end">
                                    <button type="button" class="btn btn-secondary px-3 py-1 mx-2" @click="cancel">Cancel</button>
                                    <button type="submit" class="btn btn-dark px-4 py-1">Save</button>
                                </div>
                            </div>

                        </Form>
                    </div>
                </div>
                <!-- Data view to test -->
                <!-- <div class="col-md-8">
                    <p>{{ currentEmployee }}</p>
                </div> -->
            </div>
        </div>

  </div>
  <footer class="main-footer" style="background: #f4f6f9;">
    <span>Copyright &copy; 2023</span>
  </footer>
</div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate"
import axios from "axios"
import toastr from "toastr"

import NavBar from "@/components/NavBar.vue"
import SideBar from "@/components/SideBar.vue"

import { useEmployeesStore } from "@/stores/employees"

const store = useEmployeesStore()

export default {
    name: "UpdateEmployee",
    data() {
        return {
            test: store.employees,
            y: new Date().getFullYear(),
            m() {
                const mon = new Date().getMonth() + 1
                return (mon < 10) ? "0" + mon : mon
            },
            d: new Date().getDate(),
            nik: "",
            fullname: "",
            joinDate: "",
            salary: "",
            nikClear: true,
            fullnameClear: true,
            joinDateClear: true,
            salaryClear: true,
        }
    },
    components: {
        NavBar,
        SideBar,
        Form,
        Field,
        ErrorMessage,
    },
    methods: {
        linkTo(path) { // change base when needed
            // return '/employee-vue' + path
            return path
        },
        joinDateFocus(e) {
            e.target.type = "date"
        },
        joinDateBlur(e) {
            if (e.target.value === "") e.target.type = "text"
        },
        async onSubmit(val) {
            await axios.put(`https://63929998b750c8d178e16014.mockapi.io/api/employee/${this.$route.params.id}`, {
                id: val.nik,
                nik: this.$route.params.id,
                fullname: val.fullname,
                join_date: val.join_date,
                salary: val.salary
            }).then(() => {
                store.employees = store.employees.map(e => {
                    if (e.id === val.nik) {
                        return {
                            id: val.nik,
                            nik: this.$route.params.id,
                            fullname: val.fullname,
                            join_date: val.join_date,
                            salary: val.salary,
                        }
                    } else {
                        return e
                    }
                })
                toastr.success(`Employee ${val.nik} has been updated.`)
                this.$router.push("/employee")
            })
        },
        cancel() {
            this.$router.push('/employee')
        },
        isNotError() {
            return this.nikClear && this.fullnameClear && this.joinDateClear && this.salaryClear
        },
        validateNik() {
            // if (!val) {
            //     this.nikClear = false
            //     return "- NIK is required"
            // }

            // const regex = /^[0-9]{16}$/g
            // if (!regex.test(parseInt(val))) {
            //     this.nikClear = false
            //     return "- NIK must be a 16-digit number"
            // }

            this.nikClear = true
            return true
        },
        validateFullname(val) {
            if (!val) {
                this.fullnameClear = false
                return "- Fullname is required"
            }

            const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{1,50}$/u
            if (!regex.test(parseInt(val))) {
                this.fullnameClear = false
                return "- Fullname must be valid"
            }

            if (val.length > 50) {
                this.fullnameClear = false
                return "- Fullname must be 50 characters or less"
            }

            this.fullnameClear = true
            return true
        },
        validateJoinDate(val) {
            if (!val) {
                this.joinDateClear = false
                return "- Join Date is required"
            }

            this.joinDateClear = true
            return true
        },
        validateSalary(val) {
            if (!val) {
                this.salaryClear = false
                return "- Salary is required"
            }

            if (parseInt(val) < 3000000 || parseInt(val) > 30000000) {
                this.salaryClear = false
                return "- Salary must be between 3.000.000 to 30.000.000"
            }

            this.salaryClear = true
            return true
        }
    },
    async created() {
        if (store.employees.length < 1) { // prevent new fetching when store is not empty
            await axios.get(
                `https://63929998b750c8d178e16014.mockapi.io/api/employee/${this.$route.params.id}`,
                { headers: { "Accept": "application/json" } }
            )
            .then(res => {
                this.nik = res.data.id
                this.fullname = res.data.fullname
                this.joinDate = res.data.join_date
                this.salary = res.data.salary
            })
        } else {
            const currentEmployee = store.employees.filter(e => parseInt(e.nik) === parseInt(this.$route.params.id))[0]
            this.nik = currentEmployee.id
            this.fullname = currentEmployee.fullname
            this.joinDate = currentEmployee.join_date
            this.salary = currentEmployee.salary
        }
    }
}
</script>

  