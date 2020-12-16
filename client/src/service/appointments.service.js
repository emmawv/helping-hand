import axios from 'axios'

export default class AppointmentService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    getPatientAppointments = () => this.apiHandler.get('/getPatientAppointments')
    getDocAppointments = psychId => this.apiHandler.post('/getDocAppointments', psychId)
    makeNewAppointment = info => this.apiHandler.post('/newAppointment', info)
}