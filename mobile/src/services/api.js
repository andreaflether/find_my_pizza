import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://5cbf8d0b52ff.ngrok.io/api/v1'
})

export default Api;