var urlLocal = `http://localhost:5000`
const ValidacaoReport = async () => {
    try {
        const response = await fetch('http://localhost:5000/report/validacaoReport', {
            method: 'GET',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        console.log("data: ", data);

        return data;
    } catch (error) {
        console.error("erro: ", error);
    }
};

const getEstagiarioProfessor = async() =>{
    try{
        const response = await fetch(`${urlLocal}/reports/getEstagiarioProfessor`,{
            method: 'GET',
            credentials: 'include', 
            headers: {
                'contentType':'application/json'
            }
        })

        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        console.log("data: ", data);
        return data;
    }
    catch(error){
        console.error("Erro: ", error);
    }
}

export {
    ValidacaoReport,
    getEstagiarioProfessor
};
