import axios from "axios";

export class AdminService {
    baseUrl = "http://localhost:3001/persona/api/";
    async login() {
        const res = await axios.post(this.baseUrl + "login");
        return res.data;
    }
}
export default new AdminService();