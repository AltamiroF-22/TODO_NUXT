// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules:['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app:{
    head:{
      title:'TODO',
      meta: [
        {name:'description', content:'Simple todo list'}
      ],
      link:[
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'}
      ]
    }
  }
})
