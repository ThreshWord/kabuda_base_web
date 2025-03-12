import type { App, Directive } from 'vue'
import { permission } from './modules/permission'

interface Directives {
  [key: string]: Directive
}

const directivesList: Directives = {
  permission,
}

const setDirectives = {
  install(app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key])
    })
  },
}

export default setDirectives
