import axios from 'axios';
import Swal from 'sweetalert2'

const baseUrl = "http://distriramirez.com.com:8080/api/attendance";

export const AttendanceService = {
    async getAllAttendance() {
        const res = await axios.get(`${baseUrl}`);
        console.log("debería llegar así:", res.data)
        return res.data;
    },
    async validate(pin) {
        try {
            await axios.get(`${baseUrl}/validate/${pin}`);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data.message
            });
            console.log(error)
            throw new Error("Error al validar")
        }

    },
    async createArrival(data) {
        try {
            const res = await axios.post(`${baseUrl}/register`, JSON.stringify(data), {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log("debería llegar así:", res.data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registro exitoso',
                showConfirmButton: false,
                timer: 1500
            })

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
            })
            console.log(error)
        }
    }

}