(function(global){
    'use strict';

    var count = 0;
    
    function Page( id ) {
        this.element = document.querySelector(`[data-page="${id}"]`);
        this.links = document.querySelectorAll(`[href="#${id}"]`);
    }

    Page.prototype = {
        onload: function(callback) {
            var self = this;

            if (count == 0) {
                count++;

                global.addEventListener('DOMContentLoaded', function(){
                    if (self.element && self.element.className.indexOf('active') > -1) {
                        callback();
                    }
                });
            } else {
                throw 'Load event already exists.';
            }

            return this;
        },

        request: function(callback) {
            if (this.links) {
                this.links.forEach(function(link) {
                    link.addEventListener('click', function() {
                        if (typeof callback === 'function') {
                            callback();
                        }

                        return false;
                    });
                });
            }
        }
    };

    global.Page = Page;
})(window);
click link
    console.info('Voce clicou no link da pagina SUPERSERVIÇOS.');
})
