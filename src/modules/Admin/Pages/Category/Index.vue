<template>
  <div class="categories">
    <h1 class="mb-4">Categories</h1>
    <el-button type="primary">Create New Category</el-button>

    <el-table :data="categories" class="mt-4" style="width: 100%">
      <el-table-column prop="name" label="Name" width="180"> </el-table-column>
      <el-table-column prop="description" label="Desription" width="180"> </el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="props">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="openEditModal(props.row)"
            circle
            plain
          />
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteCategory(props.row)"
            circle
            plain
          />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="`${modalAction} Menu`" :visible.sync="showModal" width="30%">
      <create-edit
        :modal-action="modalAction"
        @cancel="showModal = false"
        @success="showModal = false"
      />
    </el-dialog>
  </div>
</template>

<script>
import Category from '@/models/Category'
import CreateEdit from '@/modules/Admin/Pages/Category/CreateEdit'

export default {
  name: 'Category',
  components: { CreateEdit },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    categories () {
      return Category.all()
    }
  },
  async created () {
    await Category.api().fetch()
  },
  methods: {
    openEditModal () {
      return null
    },
    deleteCategory () {
      return ''
    }
  }
}
</script>
