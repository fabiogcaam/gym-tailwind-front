import axios from 'axios'

class ActivityService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/activities`
        })

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem('authToken')

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getActivityList() {
        return this.api.get('/')
    }

    addActivity(activityInfo) {
        return this.api.post('/add', activityInfo)
    }

    deleteActivity(idActivity) {
        return this.api.post(`${idActivity}/delete`)
    }

    getActivity(activity) {
        console.log("Esto es el service del activity", activity)
        return this.api.get(`/getById/${activity}`)
    }

}

const activityService = new ActivityService()
export default activityService
