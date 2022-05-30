module.exports = {
    ifCond: function(v1, v2, options) {
        if (v1 === v2) {
            return options.fn(this)
        }
        return options.inverse(this)
    },
    inc: function(value) {
        return parseInt(value) + 1
    }
}