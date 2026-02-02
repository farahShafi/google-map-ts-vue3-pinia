declare module '*.vue' {
  import type { DefineComponent } from 'vue'                        
  const component: DefineComponent<{}, {}, any>                     
  export default component                     
}

declare module 'vue2-google-maps' {
  import { PluginFunction } from 'vue'
  export const install: PluginFunction<any>
  export function gmapApi(): any
}
