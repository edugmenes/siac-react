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

module.exports = {
    formatDate,
    getDayOfWeek
};