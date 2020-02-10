<template>
  <div class="headers">
    <div class="container">
      <h1>Daftar Visitors</h1>
      <div
        class="alert alert-success alert-add"
        role="alert"
        v-show="add"
      >Data Visitor berhasil ditambahkan</div>
      <div
        class="alert alert-success alert-edit"
        role="alert"
        v-show="edit"
      >Data Visitor berhasil diupdate</div>
      <div
        class="alert alert-success alert-del"
        role="alert"
        v-show="del"
      >Data Visitor berhasil dihapus</div>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="dataPostVisitor.name"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="dataPostVisitor.email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Address</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="dataPostVisitor.address"
          />
        </div>
        <button type="submit" class="btn btn-success" v-on:click.prevent="addVisitor()">Add Visitor</button>
      </form>
      <nav aria-label="Page navigation example">
        <ul class="pagination d-flex justify-content-center">
          <li class="page-item" v-bind:class="[{disabled:!links.prev}]">
            <a
              class="page-link disabled"
              href="#"
              v-on:click.prevent="makePagination(links.prev)"
            >Previous</a>
          </li>
          <li class="page-item disabled">
            <a class="page-link">{{meta.current_page}} of {{meta.last_page}}</a>
          </li>
          <li class="page-item" v-bind:class="[{disabled:!links.next}]">
            <a class="page-link" href="#" v-on:click.prevent="makePagination(links.next)">Next</a>
          </li>
        </ul>
      </nav>
      <div class="card card-body">
        <ul class="list-group">
          <li
            class="list-group-item d-flex justify-content-between"
            v-for="visitor in allVisitors"
            v-bind:key="visitor.id"
          >
            {{visitor.name}}
            <div class="btn btn-group-sm">
              <button
                class="badge badge-primary badge-pill"
                data-target="#modalDetail"
                data-toggle="modal"
                v-on:click="setVisitor(visitor.id)"
              >detail</button>
              <button
                class="badge badge-info badge-pill"
                data-target="#modalEdit"
                data-toggle="modal"
                v-on:click="setVisitor(visitor.id)"
              >edit</button>
              <button
                class="badge badge-danger badge-pill"
                data-target="#modalDelete"
                data-toggle="modal"
                v-on:click="setID(visitor.id)"
              >delete</button>
            </div>
          </li>
        </ul>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="modalDetail"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Detail Data Visitor</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ul class="list-group">
                <li class="list-group-item">ID : {{visitor.id}}</li>
                <li class="list-group-item">Name : {{visitor.name}}</li>
                <li class="list-group-item">Email : {{visitor.email}}</li>
                <li class="list-group-item">Address : {{visitor.address}}</li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">Tutup</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="modalEdit"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Data Visitor</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input type="email" class="form-control" v-bind:value="visitor.name" ref="name" />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email</label>
                  <input type="email" class="form-control" v-bind:value="visitor.email" ref="email" />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Address</label>
                  <input
                    type="email"
                    class="form-control"
                    v-bind:value="visitor.address"
                    ref="address"
                  />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    v-on:click.prevent="editVisitor"
                  >Edit visitor</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="modalDelete"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog delete" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Delete Data Visitor</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <p>Yakin mau menghapus data visitor?</p>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    v-on:click.prevent="delVisitor"
                  >Delete visitor</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Jquery from "jquery";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      name: "",
      email: "",
      address: "",
      dataPostVisitor: {
        name: "",
        email: "",
        address: ""
      },
      id: "",
      add: false,
      del: false,
      edit: false
    };
  },
  computed: {
    ...mapGetters(["allVisitors", "meta", "links", "getId", "visitor"])
  },
  methods: {
    ...mapActions([
      "fetchVisitors",
      "getVisitor",
      "postVisitor",
      "deleteVisitor",
      "updateVisitor"
    ]),
    ...mapMutations(["setVisitorId"]),
    makePagination(url) {
      this.fetchVisitors(url);
    },
    setVisitor(id) {
      this.setVisitorId(id);
      this.getVisitor(this.getId);
      this.id = id;
    },
    editVisitor() {
      this.updateVisitor({
        id: this.id,
        name: this.$refs.name.value,
        email: this.$refs.email.value,
        address: this.$refs.address.value
      }).then(() => {
        this.edit = true;
        this.fetchVisitors();
        setTimeout(function() {
          Jquery(".alert-edit").alert("close");
        }, 2500);
        Jquery("#modalEdit").modal("hide");
      });
    },
    addVisitor() {
      this.postVisitor({
        name: this.dataPostVisitor.name,
        email: this.dataPostVisitor.email,
        address: this.dataPostVisitor.address
      }).then(() => {
        this.fetchVisitors();
        this.add = true;
        this.dataPostVisitor.name = "";
        this.dataPostVisitor.email = "";
        this.dataPostVisitor.address = "";
        setTimeout(function() {
          Jquery(".alert-add").alert("close");
        }, 2500);
      });
    },
    setID(id) {
      this.id = id;
    },
    delVisitor() {
      this.deleteVisitor(this.id).then(() => {
        this.fetchVisitors();
        this.del = true;
        setTimeout(function() {
          Jquery(".alert-del").alert("close");
        }, 2500);
        Jquery("#modalDelete").modal("hide");
      });
    }
  },
  created() {
    this.fetchVisitors();
  },
  Updated() {
    Jquery(".alert").alert("close");
  }
};
</script>
<style lang="css" scoped>
</style>
