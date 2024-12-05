// Função para formatar a data
const formatDate = (date) => {
    const [day, month, year] = date.split('/').map(Number); // Divide a data
    const formattedDate = new Date(year, month - 1, day); // Cria uma nova data

    // Formata a data no formato 'YYYY-MM-DD' para o banco de dados
    return formattedDate.toISOString().split('T')[0];
};

// Função para obter o dia da semana em português
const getDayOfWeek = (date) => {
    const daysOfWeek = [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado'
    ];

    // Divide a data em dia, mês e ano
    const [day, month, year] = date.split('/');

    // Cria um objeto Date com o formato YYYY-MM-DD
    const parsedDate = new Date(`${year}-${month}-${day}T00:00:00`);

    // Obtém o número do dia da semana (0-6) e retorna o nome correspondente
    return daysOfWeek[parsedDate.getDay()];
};

// Função para calcular a hora de término
const calculateEndTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const endTime = new Date();

    endTime.setHours(hours);
    endTime.setMinutes(minutes + 50);

    return endTime.toTimeString().slice(0, 5);
};

// Função para calcular horários de consultas a partir dos horários de uma agenda
const calculateTimeIntervals = (agendas) => {
    const agendasCounter = agendas.length;

    for (let i = 0; i < agendasCounter; i++) {
        const startTime = agendas[i].horaInicio;
        const endTime = agendas[i].horaFim;
        const hourIntervals = [];

        let currentDateTime = new Date(`01/01/2000 ${startTime}:00`);
        const endDateTime = new Date(`01/01/2000 ${endTime}:00`);

        while (currentDateTime < endDateTime) {
            const hours = currentDateTime.getHours();
            const minutes = currentDateTime.getMinutes();

            hourIntervals.push(`${hours}:${minutes === 0 ? '00' : minutes < 10 ? '0' + minutes : minutes}`);

            currentDateTime.setMinutes(currentDateTime.getMinutes() + 60);
        }

        agendas[i].intervalos = hourIntervals;
    }
    return agendas;
}

module.exports = {
    formatDate,
    getDayOfWeek,
    calculateEndTime,
    calculateTimeIntervals
};