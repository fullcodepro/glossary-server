const { v4:uuidv4 } = require('uuid');

class Messages {
    
        constructor(name, message){
            this.id = uuidv4();
            this.user = name;
            this.message = message;
        }
};

module.exports = Messages;