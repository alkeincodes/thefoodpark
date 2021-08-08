import axios from 'axios'
// import createAuthRefreshInterceptor from 'axios-auth-refresh'

const instance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.VUE_APP_API_URL}/api`
})

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  req.headers.accept = 'application/json'

  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }

  return req
})

// const refreshAuthLogic = (failedRequest) => axios.get('/sanctum/csrf-cookie').then((response) => Promise.resolve())

// createAuthRefreshInterceptor(axios, refreshAuthLogic, { statusCodes: [419] })

export default instance
