import { createConnections } from 'typeorm';

const connection = ()=> {
    createConnections().then(connection => { console.log("connection stabileshed") })
    .catch(error => { console.log(error) });

}

export default connection;
