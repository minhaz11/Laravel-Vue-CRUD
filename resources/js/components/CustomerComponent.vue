<template>
    <div id="customer">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header mt-1">
                        <h4 class="card-title">Customers</h4>
                        <div
                            class="card-tools"
                            style="position:absolute; right:1rem; top: .5rem;"
                        >
                            <button
                                @click="create"
                                class="btn btn-success"
                                type="button"
                            >
                                Add New
                            </button>
                            <button
                                @click="reload"
                                class="btn btn-primary"
                                type="button"
                            >
                                Reload
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-md-2">
                                    <h4 class="mt-1">
                                        <strong>Search by:</strong>
                                    </h4>
                                </div>
                                <div class="col-md-3">
                                    <select
                                        v-model="queryField"
                                        class="form-control"
                                        id="fileds"
                                    >
                                        <option value="name">Name</option>
                                        <option value="email">Email</option>
                                        <option value="phone">Phone</option>
                                        <option value="address">Address</option>
                                        <option value="total">Total</option>
                                    </select>
                                </div>
                                <div class="col-md-7">
                                    <input
                                        v-model="query"
                                        type="text"
                                        class="form-control"
                                        placeholder="Search.."
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table
                                class="table table-hover table-bordered table-striped"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Total</th>
                                        <th scope="col" class="text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-show="customers.length"
                                        v-for="(customer, index) in customers"
                                        :key="customer.id"
                                    >
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td>{{ customer.name }}</td>
                                        <td>{{ customer.email }}</td>
                                        <td>{{ customer.phone }}</td>
                                        <td>{{ customer.total }}</td>
                                        <td>
                                            <div
                                                class="btn-group"
                                                role="group"
                                                aria-label="Basic example"
                                            >
                                                <button
                                                    type="button"
                                                    class="btn btn-info btn-sm"
                                                >
                                                    info
                                                </button>
                                                <button
                                                    @click="edit(customer)"
                                                    type="button"
                                                    class="btn btn-primary btn-sm"
                                                >
                                                    edit
                                                </button>
                                                <button
                                                    @click="destroy(customer)"
                                                    type="button"
                                                    class="btn btn-danger btn-sm"
                                                >
                                                    delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-show="!customers.length">
                                        <td colspan="6">
                                            <div
                                                class="alert alert-secondary"
                                                role="alert"
                                            >
                                                Sorry! No Data Found :(
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            v-if="pagination.last_page > 1"
                            :pagination="pagination"
                            :offset="5"
                            @paginate="query === '' ? getData() : searchData()"
                        ></Pagination>
                    </div>
                </div>
            </div>
        </div>
        <!--modal-->
        <div
            class="modal fade"
            id="createModalLong"
            tabindex="-1"
            role="dialog"
            aria-labelledby="createModalLongTitle"
            aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="background:#3490DC;color:white">
                        <h5 class="modal-title" id="createModalLongTitle">
                           <strong> {{editMode ? "Edit":"Add"}} Customer</strong>
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <!--modal-->
                    <form
                        @submit.prevent="editMode ? update():store() "
                        @keydown="form.onKeydown($event)"
                    >
                        <div class="modal-body">
                            <alert-error :form="form"></alert-error>
                            <div class="form-group">
                                <label>Name</label>
                                <input
                                    v-model="form.name"
                                    type="text"
                                    name="name"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('name')
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="name"
                                ></has-error>
                            </div>

                            <div class="form-group">
                                <label>Email</label>
                                <input
                                    v-model="form.email"
                                    type="email"
                                    name="email"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('email')
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="email"
                                ></has-error>
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input
                                    v-model="form.phone"
                                    type="text"
                                    name="phone"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('phone')
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="phone"
                                ></has-error>
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <input
                                    v-model="form.address"
                                    type="text"
                                    name="address"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('address')
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="address"
                                ></has-error>
                            </div>
                            <div class="form-group">
                                <label>Total</label>
                                <input
                                    v-model="form.total"
                                    type="number"
                                    name="total"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('total')
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="total"
                                ></has-error>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                :disabled="form.busy"
                                type="submit"
                                class="btn btn-primary"
                            >
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <vue-progress-bar></vue-progress-bar>
        <vue-snotify></vue-snotify>
    </div>
</template>

<script>
export default {
    data() {
        return {
            query: "",
            queryField: "name",
            customers: [],
            form: new Form({
                id: "",
                name: "",
                email: "",
                phone: "",
                address: "",
                total: ""
            }),
            pagination: {
                current_page: 1
            },
            editMode:false
        };
    },
    watch: {
        query: function(newQuery, old) {
            if (newQuery === "") {
                this.getData();
            } else {
                this.searchData();
            }
        }
    },
    mounted() {
        console.log("Component mounted.");
        this.getData();
    },
    methods: {
        getData() {
            this.$Progress.start();
            axios
                .get("/api/customers?page=" + this.pagination.current_page)
                .then(res => {
                    this.customers = res.data.data;
                    this.pagination = res.data.meta;
                    this.$Progress.finish();
                })
                .catch(e => {
                    console.log(e);
                    this.$Progress.fail();
                });
        },
        searchData() {
            this.$Progress.start();
            axios
                .get(
                    "/api/search/customers/" +
                        this.queryField +
                        "/" +
                        this.query +
                        "?page=" +
                        this.pagination.current_page
                )
                .then(res => {
                    this.customers = res.data.data;
                    this.pagination = res.data.meta;
                    this.$Progress.finish();
                })
                .catch(e => {
                    console.log(e);
                    this.$Progress.fail();
                });
        },
        reload() {
            this.getData();
            this.query = "";
            this.queryField = "name";
            this.$snotify.success("Data Reloaded", "reloaded");
        },
        create() {
            this.editMode = false
            this.form.reset();
            this.form.clear();
            $("#createModalLong").modal("show");
        },
        store() {
            this.$Progress.start();
            this.form.busy = true;
            this.form
                .post("/api/customers")
                .then(res => {
                    this.getData();
                    $("#createModalLong").modal("hide");
                    if (this.form.successful) {
                        this.$Progress.finish();
                        this.$snotify.success(
                            "Customer Added Successfully",
                            "Success"
                        );
                    } else {
                        this.$Progress.fail();
                        this.$snotify.error("Something went wrong", "Error");
                    }
                })
                .catch(e => {
                    console.log(e);
                    this.$Progress.fail();
                });
        },
        edit(customer){
            this.editMode = true
            this.form.reset()
            this.form.clear()
            this.form.fill(customer)
            $("#createModalLong").modal("show");

        },
        update(){
            this.$Progress.start();
            this.form.busy = true;
            this.form
                .put("/api/customers/"+this.form.id)
                .then(res => {
                    this.getData();
                    $("#createModalLong").modal("hide");
                    if (this.form.successful) {
                        this.$Progress.finish();
                        this.$snotify.success(
                            "Updated Successfully",
                            "Updated"
                        );
                    } else {
                        this.$Progress.fail();
                        this.$snotify.error("Something went wrong", "Error");
                    }
                })
                .catch(e => {
                    console.log(e);
                    this.$Progress.fail();
                });
        },
    destroy(customer) {
      this.$snotify.clear();
      this.$snotify.warning(
        "You will not be able to recover this data!",
        "Want to delete?",
        {
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          buttons: [
            {
              text: "Yes",
              action: toast => {
                this.$snotify.remove(toast.id);
                this.$Progress.start();
                axios
                  .delete("/api/customers/" + customer.id)
                  .then(response => {
                    this.getData();
                    this.$Progress.finish();
                    this.$snotify.success(
                      "Customer Successfully Deleted",
                      "Success"
                    );
                  })
                  .catch(e => {
                    this.$Progress.fail();
                    console.log(e);
                  });
              },
              bold: true
            },
            {
              text: "No",
              action: toast => {
                this.$snotify.remove(toast.id);
              },
              bold: true
            }
          ]
        }
      );
    }
  }
};
</script>
