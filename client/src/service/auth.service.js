import axios from 'axios'

export default class AuthService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    signup = credentials => this.apiHandler.post('/signup', credentials)
    psychSignup = credentials => this.apiHandler.post('/psychsignup', credentials)
    login = credentials => this.apiHandler.post('/login', credentials)
    logout = () => this.apiHandler.post('/logout')
    isLoggedIn = () => this.apiHandler.get('/loggedin')
}