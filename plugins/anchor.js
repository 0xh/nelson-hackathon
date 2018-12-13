import anchor from 'anchor'
import Vue from 'vue'
import svgIcon from 'vue-svgicon'

import 'anchor/dist/anchor.css'

const { Components, Icons } = anchor

svgIcon.register(Icons)

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})
