import { createConnection } from 'typeorm';

const connection = ()=> {
    createConnection()
        .then(connection => { console.log("connection stabileshed") })
        .catch(error => { console.log(error) });
}

export default connection;
