let debug = (function () {


    let $debug = $('div#debugMessage');
    $debug.addClass("debug");

    function row(message) {
        return `<div class="row">${message}</div>`;
    }

    function Print() {
        this.$debug = $debug;
        this.count = 0;

        this.print = function(message) {
            this.$debug.html(message);
        }
        this.addRow = function(message) {
            this.count += 1;
            this.$debug.append(row( this.count + '. ' + message));
        }
        this.clear = function () {
            this.debug.html('');
        }
    }
    
    return new Print();
})();