const backendUrl = "http://localhost:5000";

const apiAppointmentScheduling = async (schedulingFormValues) => {
    console.log('Valores passados na requisição front -> back:');
    console.log(schedulingFormValues);
    try {
        const reponse = await fetch(`${backendUrl}/appointment/scheduling`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ schedulingFormValues }),
        });
    } catch (error) {
        console.log('Erro');
    }
}

module.exports = {
    apiAppointmentScheduling
};