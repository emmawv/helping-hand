import axios from 'axios'

export default class PsychService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getAllPsych = () => this.apiHandler.get('/psych/')
    getOnePsych = psychId => this.apiHandler.get(`/psych/${psychId}`)
}
