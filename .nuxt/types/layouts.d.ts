import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default"
declare module "../../node_modules/.pnpm/nuxt@3.12.4_@opentelemetry+api@1.9.0_@parcel+watcher@2.4.1_@types+node@20.14.9_encoding@0.1.1_cu6mymf3lhirgq43i47sptbq2u/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}