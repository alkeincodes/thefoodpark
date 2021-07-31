<template>
  <div class="create-edit-menu">
    <el-form
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item label="Category" prop="category_id">
        <el-select v-model="ruleForm.category_id">
          <el-option
            v-for="item in categories"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Product Name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="Price" prop="price">
        <vue-numeric
          v-model="ruleForm.price"
          class="el-input mt-4"
          currency="₱"
          separator=","
          :precision="2"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="$emit('cancel')">Cancel</el-button>
        <el-button type="primary" :loading="isSaving" @click="createMenu">Confirm</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Category from '@/models/Category'
import Menu from '@/models/Menu'
import VueNumeric from 'vue-numeric'

export default {
  name: 'CreateMenu',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    modalAction: {
      type: String,
      default: 'create'
    }
  },
  components: {
    VueNumeric
  },
  computed: {
    categories () {
      return Category.all()
    },
    toEditMenu () {
      return this.$store.getters['admin/selectedMenu']
    }
  },
  watch: {
    modalAction (val) {
      if (val === 'edit') {

      } else {

      }
    }
  },
  data () {
    return {
      isSaving: false,
      ruleForm: {
        category_id: null,
        name: '',
        price: 0
      },
      rules: {
        category_id: [
          { required: true, message: 'Please select a category', trigger: 'blur' }
        ],
        name: [
          { required: true, message: 'Please enter a Product Name', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    createMenu () {
      this.isSaving = true
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          try {
            // const { response: { data } } =
            await Menu.api().createMenu(this.ruleForm)
            // Menu.inserOrUpdate({ data })
            this.$message({
              type: 'success',
              message: 'Food menu created successfully!'
            })
            this.$emit('success')
          } catch (e) {
            console.log('error: ', e.response.data)
            this.$message({
              type: 'error',
              message: 'Something went wrong!'
            })
          } finally {
            this.isSaving = false
          }
        }
      })
    }
  }
}
</script>
