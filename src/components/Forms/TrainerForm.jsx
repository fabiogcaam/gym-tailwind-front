import { useEffect, useState } from "react"
import activityService from "../../services/activity.services"
import trainerService from "../../services/trainer.services"
import uploadServices from "../../services/upload.services"
import AlertForm from "./AlertForm"

const TrainerForm = () => {

    const [trainerData, setTrainerData] = useState({ name: "", age: 0, description: "", imageUrl: "", activityId: "" })
    const [activities, setActivities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        getAllActivities
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setTrainerData({ ...trainerData, [name]: value })
    }

    function handleFileUpload(e) {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setTrainerData({ ...trainerData, imageUrl: data.cloudinary_url })
                setIsLoading(false)
            })
            .catch(err => {
                setErrors(err.response.data.errorMessages)
                setIsLoading(false)
            })
    }


    const getAllActivities = () => {

        setIsLoading(true)

        activityService
            .getActivityList()
            .then(({ data }) => {
                setActivities(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

    }

    const handleCreateTrainerOnSubmit = (event) => {
        event.preventDefault()

        trainerService
            .createTrainer(trainerData)
            .then(() => console.log("SE ESTA CREANDO UN ENTRENADOR"))
            .catch(err => console.log(err))

    }



    return (
        <form onSubmit={handleCreateTrainerOnSubmit}>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    placeholder="Añada el nombre del entrenador"
                    name="name"
                    value={trainerData.name}
                    onChange={handleInputChange} />
            </div>
            <div>
                <label>Edad:</label>
                <input
                    type="number"
                    placeholder="Añada su edad"
                    name="age"
                    value={trainerData.age}
                    onChange={handleInputChange} />
            </div>
            <div>
                <label>Descripción:</label>
                <input
                    type="text"
                    placeholder="Añada su descripción"
                    name="description"
                    value={trainerData.description}
                    onChange={handleInputChange} />
            </div>
            <div>
                <label>Foto del entrenador</label>
                <input
                    type="file"
                    placeholder="Introduce la foto del entrenador"
                    name="imageUrl"
                    onChange={handleFileUpload} />
            </div>
            <div>
                <label>Actividad que enseña:</label>
                <select
                    name="activityId"
                    value={trainerData.activityId}
                    onChange={handleInputChange}>
                    {activities.map(elm => {
                        <option key={elm._id} value={elm._id}>{elm.name}</option>
                    })}
                </select>
            </div>
            {errors.length > 0 && errors.map(e => <AlertForm key={e} message={e} />)}
            <div>
                <input type="submit" disabled={isLoading} value={isLoading ? 'Uploading' : 'Create'} />
            </div>
        </form>
    )

}

export default TrainerForm 