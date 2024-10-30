const agendaController = async (request, response) => {
    const { agendas } = request.body;

    agendas.forEach((agenda) => {
        const { data, horaInicio, horaFim, diaSemana } = agenda;
        console.log(data, horaInicio, horaFim, diaSemana);
    });
}

module.exports = {
    agendaController
};
