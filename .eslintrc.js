module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-unused-vars': ['error', { vars: "all", args: 'none' }],
    'no-useless-return': ['error'],
    'no-plusplus': ['warn'],
    'class-methods-use-this': ['warn'],
  },
  plugins: [
    'import'
  ],
}
