// import axios from 'axios';

// axios.defaults.debug = true;

// class AttendanceService {
//     baseUrl = "http://localhost:3001/api/";

//     async createArrival(data) {
//         console.log('Enviando datos:', data);
//         const res = await axios.post(this.baseUrl + 'register', data);
//         return res.data
//     }
// }

// export default new AttendanceService();

import axios from 'axios';

axios.defaults.debug = true;

class AttendanceService {
    baseUrl = "http://localhost:3001/api/";

    async getAllAttendance(){
        const res = await axios.get(this.baseUrl + "attendance");
        return res.data;
    }

    async createArrival(data) {
        console.log("Enviando datos:", data);
        const res = await axios.post(this.baseUrl + "register", JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Datos recibidos:", res.data);
        return res.data;
    }

    async validatePin(pin) {
        const res = await axios.get(this.baseUrl + "employes/pin/" + pin);
        return res.data;
    }
}

export default new AttendanceService();