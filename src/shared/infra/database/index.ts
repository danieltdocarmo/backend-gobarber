import { createConnections } from 'typeorm';

const connections = ()=> {
    createConnections()
        .then(connections => { console.log("connection stabileshed") })
        .catch(error => { console.log(error) });
}

export default connections;
