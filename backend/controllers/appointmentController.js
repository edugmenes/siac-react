// date: "25/09/2024"
// professional: 123
// time: "10:00"

const appointmentAgenda = async (request, response) => {
    const { scheduleFormValues } = request;

    try {
        await registerAgenda(scheduleFormValues)
        return response.status(201).json({ message: 'Sucesso!' })
    } catch (error) {
        return response.status(500).json({ message: 'Erro.' })
    }
}

const appointmentHours = async (request, response) => {
    const { scheduleFormValues } = request;

    try {
        await registerHours(scheduleFormValues)
        return response.status(201).json({ message: 'Sucesso!' })
    } catch (error) {
        return response.status(500).json({ message: 'Erro.' })
    }
}

module.exports = {
    appointmentAgenda,
    appointmentHours
};