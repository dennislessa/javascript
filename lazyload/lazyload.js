(function( $ ){
  var attrs = {};
  
  function is_on_viewport( elem ) {
    var _window = $(window),
        window_height = _window.height(),
        window_scroll = _window.scrollTop(),
      	elem_offset = elem.offset().top;
    
    return ((elem_offset - attrs.offset) < (window_height + window_scroll)) ? true : false ;
  }
  
  function show( elem ) {
    elem.each(function(){
      if ( is_on_viewport($(this)) && (typeof $(this).attr('src') === 'undefined') ) {
        $(this).attr('src', $(this).attr(attrs.attribute));
      }
    });
  }

  $.fn.lazyload = function( opt ){
    var _instance = $(this);
    
    attrs = $.extend({
      attribute: 'data-src',
      offset: 500
    }, opt);

    // Show instances when the plugin is called.
    show( _instance );
    
    // Show instances on window scroll.
    $(window).scroll(function(){
      show( _instance );
    });
  };
})(jQuery);
