const Script = (function(){
    'use strict';
    
    function Script() {
        
    }

    Script.prototype = {
        /**
         * Função que adiciona uma tag <script> ao final do documento.
         * 
         * @param String src    URL do script a ser adicionado.
         * @param Function load Função que será executada após o script ser 
         *                      completamente carregado.
         * 
         * @return \Object
         */
        add: function( src, load ) {
            let script = document.createElement('script');
            
            script.src = src;
            script.setAttribute('defer', 'defer');
            
            if (typeof load === 'function')
                script.onload = load.bind(this);
            
            document.body.appendChild(script);
            
            return this;
        },
        
        /**
         *
         * Função que adiciona um conjunto de scripts.
         * 
         * @param Array scripts Array de objetos que contêm a URL do script a
         *                      ser adicionado e uma função que será executada
         *                      quando o script for completamente carredado
         *
         */
        addArray: function( scripts ) {
            let instance = this;
            
            if (Array.isArray(scripts) && scripts.length > 0) {
                scripts.forEach(function( script ){
                    if (typeof script.src !== 'string')
                        throw 'The script src is not a string.';
                    
                    if (typeof script.load !== 'function')
                        throw 'The script load is not a function.';
                    
                    instance.add(script.src, script.load);
                });
            }
        },
        
        /**
         * 
         * Função que executa scripts assim que o documento é completamente
         * carregado.
         * 
         */
        lazy: function(){
            window.addEventListener("load", function() {
                let scripts = document.querySelectorAll('script[data-src]');
                
                scripts.forEach(function( script ){
                    script.setAttribute('src', script.getAttribute('data-src'));
                });
            });
        }
    };
    
    return new Script;
})();
