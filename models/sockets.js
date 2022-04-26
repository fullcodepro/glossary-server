const MessagesList = require("./MessagesList");


class Sockets {

    constructor(io){
        this.io = io;
        this.socketEvents();
        this.messagesList = new MessagesList();
    };


    socketEvents(){
        this.io.on('connection', socket => {
            console.log('New User: ', socket.id);

            // Enviar todas las bandas al cliente
            socket.emit('current-message', this.messagesList.getMessages())

            // Añadir nueva banda
            socket.on('new-message', ({user, message}) => {
                this.messagesList.messageAdd(user, message);
                this.io.emit('new-message', this.messagesList.getMessages());
            })
            
            socket.on('get-messages', () => {
                this.io.emit('new-message', this.messagesList.getMessages());
            })


            // Actualizar nombre de banda
            // socket.on('update-name', ({id, name}) => {
            //     this.messagesList.bandEdit(id, name);
            //     this.io.emit('current-bands', /*this.messagesList.getBands()*/);
            // })

            // Eliminar banda
            // socket.on('remove-band', (id) => {
            //     this.messagesList.bandRemove(id);
            //     this.io.emit('current-bands', /*this.messagesList.getBands()*/);
            // });

            // Incrementar votos
            // socket.on('increase-vote', id => {
            //     this.messagesList.increaseVotes(id);
            //     this.io.emit('current-bands', /*this.messagesList.getBands()*/);
            // })
        })
    };
}

module.exports = Sockets;