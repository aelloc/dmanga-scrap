export default {
  files: [
    'test/**/*.ts'
  ],
  sources: [
    'src/**/*.ts'
  ],
  compileEnhancements: false,
  verbose: true,
  extensions: [
    'ts'
  ],
  require: [
    'ts-node/register'
  ]
}