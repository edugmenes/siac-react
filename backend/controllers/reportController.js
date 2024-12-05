const  reportModel = require('../models/reportModel')
const  UserModel = require('../models/userModel')

const validacaoReport = async (req, res) => {
    try {
        var User = req.session.User;
        var usuarioLogado = await UserModel.getUserById(User.idUser);
        var [reports, users] = await reportModel.getDadosReport(usuarioLogado)
        console.log("reports e users: ", reports, users)
        res.status(200).json({message: "Reports e Users: ", reports: reports, users: users})
       
    } catch (error) {
        console.error("Erro ao validar:", error);
        res.status(500).json({ success: false, message: "Erro no servidor." });
    }
};

const getEstagiarioProfessor = async(req,res)=>{
    try{
        
    }
    catch(error){

    }
}
module.exports = { validacaoReport };
