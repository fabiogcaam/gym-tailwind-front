import axios from 'axios'

class BookingServices {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/bookings`
        })

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem('authToken')

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createBooking({ classId, bookingDate }) {
        console.log("ENTRA EN EL SERVICE", { classId, bookingDate })
        return this.api.post(`/create`, { classId, bookingDate })
    }

    finishedBooking(bookingId) {
        return this.api.post('/finished', bookingId)
    }

    deleteBooking(bookingId) {
        console.log("ESTO ES EL BOOKING SERVICES CON ", bookingId)
        return this.api.post(`/${bookingId}/delete`)
    }

}

const bookingServices = new BookingServices()
export default bookingServices