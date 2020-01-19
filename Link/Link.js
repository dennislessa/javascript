/**
 * @name Link
 * @description File that handle paginators.
 * 
 * Classes:
 * 
 * link-back    Close current page and go back previous page.
 * link-forward    Open next page indicate on href link.
 */
(function( global ){
    'use strict';

    var links,
        doc = global.document,
        page_stack;

    /**
     * Function that initialize variables.
     */
    function init() {
        links = doc.querySelectorAll( 'a' );
        page_stack = [];

        on_click();
    }

    /**
     * Function that run an action on click on link.
     */
    function on_click() {
        if (links.length > 0) {
            links.forEach(function(link) {
                link.addEventListener('click', function() {
                    if (this.className.indexOf('link-forward') > -1) {
                        on_click_forward( this );
                    } else if (this.className.indexOf('link-back') > -1) {
                        on_click_back( this );
                    } else {
                        console.warn('It is a any link.');
                    }

                    return false;
                });
            });
        }
    }

    /**
     * Function that open the next page.
     * 
     * @param {Node} link Element HTML <a>
     */
    function on_click_forward( link ) {
        var current_page = link.closest('.page'),
            next_page = link.href ? link.href.replace(/^(.*)#/, ''): null;
        
        next_page = doc.querySelector(`[data-page="${next_page}"]`);
        
        if (current_page && next_page) {
            page_stack.push(current_page.getAttribute('data-page'));

            current_page.classList.add('open-overlay');
            
            next_page.classList.add('active');
        } else {
            console.warn('Current page or next page not exists.');
        }
    }

    /**
     * Function that close the current page and go back previous page.
     * 
     * @param {Node} link Element HTML <a>
     */
    function on_click_back( link ) {
        var current_page = link.closest('.page'),
            prev_page = page_stack.pop();
        
        if (current_page && prev_page) {
            doc.querySelector(`[data-page="${prev_page}"]`).classList.remove('open-overlay');
    
            current_page.classList.remove('active');
        } else {
            console.warn('Current page or previous page not exists.');
        }
    }

    global.addEventListener('DOMContentLoaded', init);
})(window);
