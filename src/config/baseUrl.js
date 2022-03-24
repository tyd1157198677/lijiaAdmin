// const baseUrl = process.env.NODE_ENV === 'production' ? '/' : '/'
const baseUrl =
    process.env.NODE_ENV === 'production' ?
    'https://test-fanxing-api.lijiazhengli.com' :
    'api/'
export default baseUrl