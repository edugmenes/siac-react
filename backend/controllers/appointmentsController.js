const appointmentSchedule = async (request, response) => {
    const { scheduleFormValues } = request;
    console.log('A solicitação chegou no backend meu chapa!')
    console.log(scheduleFormValues);
    try {
        return response.status(201).json({ message: 'Sucesso!' })
    } catch (error) {
        return response.status(500).json({ message: 'Erro.' })
    }
}

module.exports = {
    appointmentSchedule
};