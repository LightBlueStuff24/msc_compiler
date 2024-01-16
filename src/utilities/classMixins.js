const Fuse = require('fuse.js');
exports.SetMixin =  {
    getClosestMatch:function (string) {
        const fuse = new Fuse(Array.from(this), {
            shouldSort: true,
            threshold: 0.6,
        });
        const result = fuse.search(string);
        return result.length > 0 ? result[0].item : null;
    }
}

exports.StringMixin  = {
    clean:function() {
        if (this.includes(':')){
            return this.split(':').pop()
        }
    },
    isVanilla:function(){
    return this.includes('minecraft')
    }
}