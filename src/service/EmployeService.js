import axios from 'axios';

export class EmployeService {
    baseUrl = "http://localhost:3001/api/";

    async getAll() {
        const res = await axios.get(this.baseUrl + "all");
        return res.data;
    }

    async save(empleado) {
        const res = await axios.post(this.baseUrl + "save", empleado);
        console.log(res)
        return res.data;
    }

    async getInfo(id) {
        const res = await axios.get(this.baseUrl + `find/${id}`);
        return res.data;
    }

    async delete(id) {
        const res = await axios.post(this.baseUrl + "delete/" + id, null);
        return res.data;
    }

    
}

export default EmployeService