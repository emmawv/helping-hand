import axios from 'axios'

export default class AppointmentService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getAppointments = () => this.apiHandler.get('/getAppointments')
    makeNewAppointment = info => this.apiHandler.post('/newAppointment', info)
    deleteAppointment = id => this.apiHandler.put('/delete-appointment', id)
}