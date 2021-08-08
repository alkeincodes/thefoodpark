import Vue from 'vue'
import {
  Button,
  Select,
  Form,
  FormItem,
  Input,
  Collapse,
  CollapseItem,
  Checkbox,
  Dialog,
  Alert,
  Tooltip,
  Table,
  TableColumn,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Message,
  Rate,
  Menu,
  MenuItem,
  MenuItemGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Submenu,
  MessageBox,
  Option,
  Card,
  Row,
  Col
} from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'
locale.use(lang)

Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(Checkbox)
Vue.use(Dialog)
Vue.use(Alert)
Vue.use(Tooltip)
Vue.use(Table, { locale })
Vue.use(TableColumn)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Rate)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Submenu)
Vue.use(Option)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
