import { addLanguageData } from '@golpasal/editor'

// import editor support language
import language_cn from '@golpasal/editor/dist/languages/zh-cn'
import language_hk from '@golpasal/editor/dist/languages/zh-hk'
import language_en from '@golpasal/editor/dist/languages/en'

// import editor css
import '@golpasal/editor/dist/styles.css'
import './pageWidgets/styles.css'

addLanguageData({
  'zh-cn': language_cn,
  'zh-hk': language_hk,
  en: language_en
})
