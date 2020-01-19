var form,
    action,
    method,
    data;

function Form(id) {
    form = document.getElementById(id);
    action = form.action;
    method = form.method;
}

Form.prototype = {
    submit: function(callback) {
        if (form && typeof callback === 'function') {
            form.onsubmit = function(){
                data = new FormData(this);

                callback = callback.bind(this);

                callback({
                    action: action,
                    method: method,
                    data: data
                });

                return false;
            };
        }
    },

    getForm: function() {
        return form;
    }
};

var teste = new Form('teste');

teste.submit(function( arg ){
    console.log(this, arg);
});