import axios from 'axios'

export default class PsychService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getAllPsych = () => this.apiHandler.get('/')
    getOnePsych = psychId => this.apiHandler.get(`/${psychId}`)
}
