<template>
  <div class="create-edit-menu">
    <el-form
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="ruleForm.description" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          @click="$emit('cancel')"
          plain
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          :loading="isSaving"
          @click="saveCategory"
        >
          Confirm
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Category from '@/models/Category'

export default {
  name: 'CreateMenu',
  props: {
    modalAction: {
      type: String,
      default: 'create'
    },
    sourceUrl: {
      type: String,
      default: null
    }
  },
  computed: {
    categories () {
      return Category.all()
    },
    toEditCategory () {
      return this.$store.getters['admin/selectedCategory']
    }
  },
  watch: {
    // watch if selected food menu is changed
    toEditCategory: {
      handler (val) {
        if (val) {
          this.ruleForm = JSON.parse(JSON.stringify(val))
        }
      },
      deep: true,
      immediate: true
    },
    // watch modalAction value and assign the correct data value
    modalAction (val) {
      if (val === 'edit') {
        this.ruleForm = JSON.parse(JSON.stringify(this.toEditCategory))
      } else {
        this.resetForm()
      }
    }
  },
  data () {
    return {
      isSaving: false,
      imageUrl: null,
      ruleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please select a category name',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    saveCategory () {
      this.isSaving = true
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          try {
            if (this.modalAction === 'create') {
              await Category.api().createCategory(this.ruleForm)
              this.$message({
                type: 'success',
                message: 'Category created successfully!'
              })
            } else {
              await Category.api().updateCategory(this.ruleForm)
              this.$message({
                type: 'success',
                message: 'Category updated successfully!'
              })
            }
            this.resetForm()
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
    },
    resetForm () {
      this.ruleForm = {
        name: '',
        description: ''
      }
    }
  }
}
</script>
