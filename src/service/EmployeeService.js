import axios from 'axios';
import { HeaderPost } from './Headers/Header';

const baseURL = "http://distriramirez.com.com:8080/api";


export const EmployeeService ={
    

    async getAll() {
        const res = await axios.get(`${baseURL}/all`, HeaderPost);
        // console.log(res.data);
        return res.data;
    },

    async save(empleado) {
        const res = await axios.post(`${baseURL}/save`, empleado, HeaderPost);
        console.log("esto se manda",res.data)
        return res.data;
    },

    async getInfo(id) {
        const res = await axios.get(`${baseURL}/find/${id}`, HeaderPost);
        
        return res.data;
    },

    async delete(id) {
        const res = await axios.delete(`${baseURL}/delete/${id}`,  HeaderPost );
        console.log(res.data);
        return res.data;
    }
}

