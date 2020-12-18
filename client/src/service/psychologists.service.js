import axios from 'axios'

export default class PsychService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/psych',
            withCredentials: true
        })
    }

    getAllPsych = () => this.apiHandler.get('/')
    getOnePsych = psychId => this.apiHandler.get(`/${psychId}`)
}
