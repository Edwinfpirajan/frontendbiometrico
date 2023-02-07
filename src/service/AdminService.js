import api from './api';
import { HeaderPost } from './Headers/Header';
import Swal from 'sweetalert2'

import './service.css'

const baseURL = 'http://distriramirez.com.co:8080'

export const AdminService = {
    async login(data) {
        try {
            const res = await api.post(`${baseURL}/login`, data);
            localStorage.setItem('token', JSON.stringify(res.data.token))
            window.location.href = '/'
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error ',
                title: 'Usuario o contraseña incorrectos',
                showConfirmButton: false,
                timer: 1500
              })
        }
    },
    async logout() {
        try {
            await api.post(`${baseURL}/logout`, HeaderPost);
            localStorage.removeItem('token')
            window.location.href = '/login/admin'
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
}