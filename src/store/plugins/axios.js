import axios from 'axios'
import app from '@/main'

export default function axiosPlugin() {
    return store => {
        store.$axios = axios.create({
            baseURL: '/'
        })

        store.$axios.interceptors.request.use(request => {
            app.$Progress.start()

            return request
        })

        store.$axios.interceptors.response.use(
            response => {
                app.$Progress.finish()

                return response
            },
            error => {
                app.$Progress.fail()

                return Promise.reject(error)
            }
        )
    }
}
