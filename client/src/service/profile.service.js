import axios from 'axios'

export default class ProfileService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    editPsych = info => this.apiHandler.put('/edit-psych', info)
    editPatient = info => this.apiHandler.put('/edit-patient', info)
    deleteUser = () => this.apiHandler.put(`/delete`)
}