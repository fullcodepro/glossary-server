const Messages = require("./Messages");

class MessageList {
  constructor() {
    this.arrMessages = [
      new Messages("Jhon", "Hola!"),
      new Messages("Jhon", "Bienvenid@ :)"),
    ];
  }

  getMessages() {
    return this.arrMessages;
  }

  messageAdd(name, msg) {
    this.arrMessages.push(new Messages(name, msg));
  }

  messageRemove(id) {
    this.arrMessages = this.arrMessages.filter(msg => msg.id !== id);    
  }

  increaseVotes(id) {
    // this.bands = this.bands.map((band) => {
    //   if (band.id === id) {
    //       band.votes += 1;
    //   };

    //   return band;
    // });
  }

    bandEdit(id, newBandName) {
    // this.bands = this.bands.map((band) => {
    //   if (band.id === id) {
    //       band.name = newBandName
    //   };

    //   return band;
    // });
  }
};

module.exports = MessageList;
