import axios from 'axios';

class ScheduleService {
    baseUrl = "http://localhost:3001/api/schedule/";

    async getAllSchedule() {
        const res = await axios.get(this.baseUrl + "all");
        return res.data
    }

    async saveSchedule(schedule) {
        const res = await axios.post(this.baseUrl + "save", schedule);
        console.log(res.data)
        return res.data;
    }

    async delete(id) {
        try {
          const res = await axios.delete(`http://localhost:3001/api/schedule/delete/${id}`);
          if (res.status === 204) {
            return true;
          } else {
            throw new Error('Error al eliminar el registro');
          }
        } catch (error) {
          throw error;
        }
      }
}

export default ScheduleService