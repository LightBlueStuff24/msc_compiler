
class Decorator {
    constructor(target) {

        //Adds Decorator type so that msc knows that it should know what to treat it as

        target.Decorator = { type: this.name }
    }
}

module.exports = { Decorator }