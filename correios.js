const http = require('http');
const printError = (e) => console.error(e.message);

const getAddress = cep => {
    try {
        //Function to print message to console
        const imprimeEnd = (bairro, cidade, logradouro) => {
            const msg = `Este cep fica localizado no ${bairro} na cidade de ${cidade}. Seu logradouro fica em ${logradouro}`;
            console.log(msg);
        }

        //Connect to the API URL 
        const req = http.get(`http://api.postmon.com.br/v1/cep/${cep}`, res => {
            if (res.statusCode === 200) {  
                let body = "";
                //Read the data
                res.on('data',data => {
                    body += data.toString();
                });
                res.on('end', () => {
                    try {
                        //Parse the data
                        const endereco = JSON.parse(body);
                        //Print the data
                        imprimeEnd(endereco.bairro, endereco.cidade, endereco.logradouro);
                    } catch(e) {
                        printError(e);
                    }
                });
            }  
            else {
                const message = `Houve um erro ao tentar acessar o cep: ${cep} (${http.STATUS_CODES[res.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }
        });
        req.on('error',printError);
    }
    catch(e) {
        printError(e);
    }    
}
      
module.exports.getAddress = getAddress;



