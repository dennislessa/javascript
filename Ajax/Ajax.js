/**
 * @name Ajax
 * @description File that define object for handle AJAX request.
 * 
 * Object: ajax
 * 
 * Methods:
 * 
 * post     AJAX Request POST
 * get      AJAX Request GET
 */
(function( global ){
    'use strict';

    var xhr,
        settings = {
            url: '',
            data: {},
            headers: {},

            beforeSend: function(){},
            complete: function(){}
        };

    /**
     * Function that extend a object with other object values.
     * 
     * @param {Object} a Template
     * @param {Object} b Values
     * @return {Object} First extended param
     */
    function extend(a, b) {
        for(var key in b) {
            if(b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }

        return a;
    }

    /**
     * Function that configure the feedback for user.
     * 
     * @param {Object} config Set the before send function and complete function.
     */
    function set_config( config ) {
        xhr.onreadystatechange = function(e) {
            if (3 === this.readyState && typeof settings.beforeSend === 'function') {
                settings.beforeSend();
            } else if (4 === this.readyState && 200 === this.status && typeof settings.complete === 'function') {
                settings.complete(this.response, this.status);
            }
        };
    }

    /**
     * Function that set headers for ajax request.
     * 
     * @param {Object} headers AJAX request headers
     */
    function set_headers( headers ) {
        for(var header in headers) {
            xhr.setRequestHeader(header, headers[header]);
        }
    }

    /**
     * Main AJAX Function
     */
    function AJAX() {
        if (global.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }

    AJAX.prototype = {
        post: function( config ) {
            settings = extend(settings, config);

            set_config( settings );

            xhr.open('POST', settings.url, true);
            
            set_headers( settings.headers );
            
            xhr.send(settings.data ? settings.data: null);
        },

        get: function( config ) {
            settings = extend(settings, config);

            set_config( settings );

            xhr.open('GET', settings.url, true);
            
            set_headers( settings.headers );
            
            xhr.send();
        }
    };

    global.ajax = new AJAX;
})(window);
