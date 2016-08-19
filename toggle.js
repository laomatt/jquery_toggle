$('body').on('click', '.toggle-link', function(event) {
  event.preventDefault();
  var type = $(this).attr('toggle-type');
  var target = $(this).attr('toggle-target');
  var element = $('#' + target);
  var speed = $(this).attr('toggle-speed');
  var close = $(this).attr('close-message');
  var group = element.attr('panel-group');

  togglePanel(close, element, speed, type, $(this), group);
});

function togglePanel(mess, element, speed, type, link, panelGroup){
  if (type == 'fade') {
    $('.' + panelGroup).fadeOut(speed);
  } else {
    $('.' + panelGroup).slideUp(speed);
  };

  if (element.css('display') == 'none') {
    var origText = link.text();
    link.attr('originalText', origText);
    link.text(mess);

    if (type == 'fade') {
      element.fadeIn(speed);
    } else {
      element.slideDown(speed);
    };
  } else {
    var origText = link.attr('originalText');
    link.text(origText);
    if (type == 'fade') {
      element.fadeOut(speed);
    } else {
      element.slideUp(speed)
    };
  };
}

// frame work for looping through jquery class array

