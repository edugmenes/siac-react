const promisePool = require('../config/databaseConfig');

const getDadosReport = async (userLogado) => {
    try {
        console.log("userlogado: ", userLogado);
        if (userLogado.perfil === 'administrador') {
            const query = 'SELECT * FROM report';
            const [reports] = await promisePool.query(query);

            const query2 = 'SELECT * FROM usuario WHERE idPerfil = ?';
            const params = [6];
            const [UserEstagiarios] = await promisePool.query(query2, params);
            console.log("Userestagiarios", [UserEstagiarios])
            return [reports,UserEstagiarios]

        } else {
            const query = 'SELECT * FROM report WHERE idEstagiario = ?';
            const params = [userLogado.data.idUser];
            const [reports] = await promisePool.query(query, params);

            return [reports]
        }
    } catch (error) {
        throw new Error(error)   
    }
};

const getEstagiarioProfessor = async()=>{
    try{
        var query = `SELECT * FROM usuario where idPerfil = ?`
        var resultado = promisePool.query(query, [6]);

        

        var query2 = `SELECT * FROM usuario where idPerfil = ?`
        var resultado2 = promisePool.query(query2, [4]);

        return [resultado, resultado2]
    }
    catch(error){

    }
}
const registerReport = async (values) => {
    try {
        var obj = {
            ok: false,
            mensagem: ""
        };

        var query = `INSERT INTO report(idEstagiario, idSupervisor, area_atuacao, atividades_realizadas, feedback_supervisor) values(?,?,?,?,?)`;
        var [resultado] = await promisePool.query(query, [values.internName, values.supervisor, values.area, values.activities, values.feedback]);
        console.log("resultado: ", resultado);

        if (resultado.affectedRows > 0) {
            obj.ok = true;
            obj.mensagem = "Relatório Inserido com Sucesso";
        }
        return obj;  // Corrigido
    } catch (error) {
        console.log("erro: ", error);
        return { ok: false, mensagem: "Erro ao inserir relatório" };  // Retorna um objeto em caso de erro
    }
};

module.exports = {
    getDadosReport,
    getEstagiarioProfessor,
    registerReport
};
