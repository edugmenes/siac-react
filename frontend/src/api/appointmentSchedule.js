const backendUrl = "http://localhost:5000";

const apiAppointmentSchedule = async (scheduleFormValues) => {
    console.log('Valores passados na requisição front -> back:');
    console.log(scheduleFormValues);
    try {
        const reponse = await fetch(`${backendUrl}/appointment/schedule`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ scheduleFormValues }),
        });
    } catch (error) {
        console.log('Erro');
    }
}

module.exports = {
    apiAppointmentSchedule
};