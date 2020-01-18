/**
 * @name Page
 * @description File that handle paginators.
 * 
 * Classes:
 * 
 * page-prev    Close current page and go back previous page.
 * page-next    Open next page indicate on href link.
 */
(function( doc ){
    'use strict';

    var links,
        page_stack;

    /**
     * Function that initialize variables.
     */
    function init() {
        links = doc.querySelectorAll( '.page-prev, .page-next' );
        page_stack = [];

        click_on_link();
    }

    /**
     * Function that run an action on click on link.
     */
    function click_on_link() {
        if (links.length > 0) {
            links.forEach(function(link) {
                link.onclick = function() {
                    if (this.className.indexOf('page-next') > -1) {
                        get_next_page( this );
                    } else if (this.className.indexOf('page-prev') > -1) {
                        get_back_page( this );
                    } else {
                        console.warn('It is a any link.');
                    }

                    return false;
                };
            });
        }
    }

    /**
     * Function that open the next page.
     * 
     * @param {Node} link Element HTML <a>
     */
    function get_next_page( link ) {
        var current_page = link.closest('.page'),
            next_page = link.href ? link.href.replace(/^(.*)#/, ''): null;
        
        if (current_page && next_page) {
            page_stack.push(current_page.getAttribute('data-page'));

            current_page.classList.add('open-overlay');
            
            doc.querySelector(`[data-page="${next_page}"]`).classList.add('active');
        } else {
            console.warn('Current page or next page not exists.');
        }
    }

    /**
     * Function that close the current page and go back previous page.
     * 
     * @param {Node} link Element HTML <a>
     */
    function get_back_page( link ) {
        var current_page = link.closest('.page'),
            prev_page = page_stack.pop();
        
        if (current_page && prev_page) {
            doc.querySelector(`[data-page="${prev_page}"]`).classList.remove('open-overlay');
    
            current_page.classList.remove('active');
        } else {
            console.warn('Current page or previous page not exists.');
        }
    }

    doc.addEventListener('DOMContentLoaded', init);
})(document);