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
        <div class="el-input">
          <vue-numeric
            v-model="ruleForm.price"
            class="el-input__inner"
            currency="₱"
            separator=","
            :precision="2"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <input type="file" class="form-control-file" id="book_cover" name="selected_cover" @change="onFileChange">
        <p class="text-hint">Image preview will show below.</p>
        <div v-if="typeof ruleForm.image == 'object'">
          <img v-if="imageUrl" :src="imageUrl" height="150" width="150" />
        </div>
        <div v-else>
          <img :src="`${sourceUrl}/menus/${ruleForm.image}`" height="150" width="150" />
        </div>
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
    modalAction: {
      type: String,
      default: 'create'
    },
    sourceUrl: {
      type: String,
      default: null
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
    // watch if selected food menu is changed
    toEditMenu: {
      handler (val) {
        if (val) {
          this.ruleForm = val
        }
      },
      deep: true,
      immediate: true
    },
    // watch modalAction value and assign the correct data value
    modalAction (val) {
      if (val === 'edit') {
        this.ruleForm = this.toEditMenu
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
        category_id: null,
        name: '',
        price: 0,
        image: null
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
            const fd = new FormData()

            fd.append('category_id', this.ruleForm.category_id)
            fd.append('name', this.ruleForm.name)
            fd.append('price', this.ruleForm.price)

            // update the image if it is actually a File instance
            if (this.ruleForm.image instanceof File) {
              fd.append('image', this.ruleForm.image)
            }

            await Menu.api().createMenu(fd)
            // Menu.inserOrUpdate({ data })
            this.$message({
              type: 'success',
              message: 'Food menu created successfully!'
            })
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
    onFileChange (e) {
      const file = e.target.files[0]
      this.imageUrl = URL.createObjectURL(file)
      this.ruleForm.image = file
    },
    resetForm () {
      this.ruleForm = {
        category_id: null,
        name: '',
        price: 0,
        image: null
      }
    }
  }
}
</script>
