import axios from 'axios'

export default class ProfileService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    editPsych = info => this.apiHandler.put('/edit-psych', info)
    editPatient = info => this.apiHandler.put('/edit-patient', info)
    deleteUser = userId => this.apiHandler.put(`/delete/${userId}`)
}