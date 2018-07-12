const correios = require('./correios');

const address = process.argv.slice(2);   
address.forEach(correios.getAddress);