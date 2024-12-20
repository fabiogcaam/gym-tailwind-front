import { useEffect, useState } from "react"
import classService from "../../services/class.services"
import activityService from "../../services/activity.services"
import bookingServices from "../../services/booking.services"


/* eslint-disable react/prop-types */
const BookingElement = ({ id, clase, status, cancelBooking }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [classData, setClassData] = useState(null)
    const [activity, setActivity] = useState("")
    const today = new Date()

    useEffect(() => {
        getClasses()
    }, [isLoading])

    useEffect(() => {
        if (status !== "Finished" && today > classData?.dates) {
            checkIfFinished()
        }
    }, [classData])

    function getClasses() {

        console.log("ENTRO EN GETCLASSES")
        console.log(clase)
        classService.
            getClass(clase)
            .then(({ data }) => {
                console.log(data)
                setClassData(data)
                getActivityOfClass(data.trainer.activity)
            })
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))
    }

    function checkIfFinished() {

        console.log("ENTRAMOS EN FINALIZAR")

        bookingServices.finishedBooking(id)
            .then(() => console.log("Se ha acabado la clase"))
            .catch(err => console.log(err))


    }

    function getActivityOfClass(activityId) {
        activityService
            .getActivity(activityId)
            .then(({ data }) => {
                console.log("ESTO ES LA ACTIVIDAD", data)
                setActivity(data.name)
            })
            .catch(err => console.log(err))
    }

    return (
        classData ?
            <div className="bg-grey-100 border border-violet p-5 mt-5 w-3/6 rounded-xl">
                <h3>Clase de {activity} el día {classData.schedule.day} de {classData.schedule.time}</h3>
                <p>Con el profesor {classData.trainer.name}</p>
                <div className="flex justify-end">
                    {
                        status !== "Finished" ?

                            <button className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-700" onClick={() => { cancelBooking(id) }}>Cancelar</button>
                            :
                            <h3 className="text-orange-300">Finalizado</h3>
                    }

                </div>
            </div>
            :
            <h2>Cargando</h2>
    )

}

export default BookingElement