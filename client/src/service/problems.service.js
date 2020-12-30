import axios from 'axios'

export default class AppointmentService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getProblems = () => this.apiHandler.get('/getProblems')
}