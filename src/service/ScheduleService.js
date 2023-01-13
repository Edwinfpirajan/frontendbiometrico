import axios from 'axios';

class ScheduleService {
    baseUrl = "http://localhost:3001/api/schedule";

    async getAllSchedule() {
        const res = await axios.get(this.baseUrl);
        console.log(res.data);
        return res.data;
    }

    async saveSchedule(schedule) {
        const res = await axios.post(this.baseUrl + "save", schedule);
        console.log(res)
        return res.data;
    }

    async delete(id) {
        const res = await axios.post(this.baseUrl + "delete/" + id, null);
        console.log(res.data);
        return res.data;
    }


    
}

export default ScheduleService