module.exports = {
  apps: [
    {
      name: 'TemplateNuxt',
      port: '9095',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}