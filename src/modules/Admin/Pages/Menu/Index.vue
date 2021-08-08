<template>
  <div class="menu-list">
    <!-- <router-view></router-view> -->
    <el-button type="primary" icon="el-icon-plus" class="mb-2" @click="openCreateModal"
      >Create Menu</el-button
    >
    <h1 class="site-title mb-2">Food Menu</h1>
    <el-table :data="menus" style="width: 100%">
      <el-table-column prop="name" label="Name" width="180"> </el-table-column>
      <el-table-column label="Image">
        <template slot-scope="props">
          <img :src="`s${sourceUrl}/menus/${props.row.image}`" :alt="props.row.name" />
        </template>
      </el-table-column>
      <el-table-column label="Price">
        <template slot-scope="props">
          <vue-numeric
            v-model="props.row.price"
            currency="₱"
            separator=","
            :precision="2"
            read-only
          />
        </template>
      </el-table-column>
      <el-table-column label="Category">
        <template slot-scope="props">
          {{ props.row.category.name }}
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="props">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click.native="openEditModal(props.row)"
            circle
            plain
          />
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            circle
            plain
            @click="deleteMenu(props.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="`${modalAction} Menu`" :visible.sync="showModal" width="30%">
      <create-edit
        :modal-action="modalAction"
        :source-url="sourceUrl"
        @cancel="showModal = false"
        @success="showModal = false"
      />
    </el-dialog>
  </div>
</template>

<script>
import Menu from '@/models/Menu'
import VueNumeric from 'vue-numeric'
const CreateEdit = () =>
  import(
    /* webpackChunkName: "menu-create-edit" */ '@/modules/Admin/Pages/Menu/CreateEdit'
  )

export default {
  name: 'MenuList',
  components: {
    VueNumeric,
    CreateEdit
  },
  computed: {
    menus () {
      return Menu.query().with('category').get()
    },
    sourceUrl () {
      return `${process.env.VUE_APP_API_URL}/storage/`
    }
  },
  data () {
    return {
      showModal: false,
      modalAction: 'create'
    }
  },
  methods: {
    openCreateModal () {
      this.modalAction = 'create'
      this.showModal = !this.showModal
    },
    openEditModal (item) {
      this.modalAction = 'edit'
      this.$store.commit('admin/SET_SELECTED_MENU', item)
      this.showModal = !this.showModal
    },
    deleteMenu (item) {
      this.$confirm('Are you sure?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(async () => {
        await Menu.api().deleteMenu(item)
        Menu.delete(item.id)
      })
    }
  }
}
</script>
