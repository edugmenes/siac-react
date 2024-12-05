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

module.exports = {
    getDadosReport,
    getEstagiarioProfessor
};
