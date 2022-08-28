import { createApp } from 'vue';
import App from './App.vue';
import { Button, Card, List, Upload, DatePicker, Pagination , Statistic, Modal, Affix, Switch, Badge, Checkbox, Radio, Space, Empty, Tabs, Avatar, PageHeader, Menu, Row, Col, Input, Form, Layout, Result,Divider,Tooltip, Dropdown } from "ant-design-vue";
import router from './router';
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())

app.use(Pagination)
app.use(Upload)
app.use(Tabs)
app.use(DatePicker)
app.use(Badge)
app.use(Avatar)
app.use(Button)
app.use(List)
app.use(router)
app.use(PageHeader)
app.use(Menu)
app.use(Row)
app.use(Col)
app.use(Input)
app.use(Form)
app.use(Layout)
app.use(Result)
app.use(Divider)
app.use(Tooltip)
app.use(Dropdown)
app.use(Card)
app.use(Statistic)
app.use(Space)
app.use(Empty)
app.use(Affix)
app.use(Modal)
app.use(Radio)
app.use(Switch)
app.use(Checkbox)

app.mount('#app')
