/**
 * @name LocalDB
 * @description File that define object that handle o localStorage.
 */
(function( global ){
    'use strict';

    var localDB;

    function LocalDB() {
        localDB = global.localStorage;
    }

    LocalDB.prototype = {
        set: function( key, data ) {
            localDB.setItem(key, JSON.stringify( data ));
        },

        get: function(key) {
            return this.exists( key ) ? JSON.parse( localDB.getItem(key) ): null;
        },

        create: function( key ) {
            this.set(key, '');
        },

        update: function( key, value ) {
            if (this.exists(key)) {
                this.set(key, value);

                return true;
            }

            return false;
        },

        remove: function( key ) {
            if (this.exists(key)) {
                localDB.removeItem(key);

                return true;
            }

            return false;
        },

        clear: function() {
            localDB.clear();
        },

        empty: function( key ) {
            if (this.exists(key)) {
                this.set(key, '');
            }
        },

        isEmpty: function( key ) {
            if (this.exists(key)) {
                return this.get(key).length == 0;
            }

            return true;
        },

        exists: function( key ) {
            return (typeof localDB[key] !== 'undefined' && localDB[key]);
        }
    };

    global.localDB = new LocalDB;
})(window);