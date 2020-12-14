import axios from 'axios'

export default class AppointmentService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    getAllApointments = () => this.apiHandler.get('/getAllAppointments')
    makeNewAppointment = info => this.apiHandler.post('/newAppointment')
}