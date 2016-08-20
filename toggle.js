jQuery(document).ready(function($) {

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

});


var jqueryHelpers = {
  reloadPartial: function (url, locals, space) {
    $.ajax({
      url: url,
      data: locals,
      complete: function (data) {
        space.html(data.responseText);
      }
    })
  },

  getAttrHash: function (element) {
     var attrs = element.attributes;
     var length = attrs.length;

     var outHash = {}
     for(var i = 0; i < length; i++) {
       outHash[attrs[i].name] = attrs[i].value
     }
     return outHash
   },


  togglePanel: function (mess, element, speed, type, link, panelGroup){
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
  },

  doEach: function (arrayOfElements, nameSpace, interationFunction) {
    $.each(arrayOfElements, function(index, val) {
      val.setAttribute('holder-for-iteration', val.id);
      val.id = 'sequence-of' + index;
    });

    $.each(arrayOfElements, function(index, val) {
      var element = $('#' + val.id);
      interationFunction(element, index, nameSpace);
    });

    $.each(arrayOfElements, function(index, val) {
      val.setAttribute('holder-for-iteration', val.id);
      val.id = 'sequence-of' + index;
    });
  },

  addToBank: function (context, bankElement) {
    var id = context.attr('data-id');
    var name = context.attr('data-name');

    bankElement.prepend('<div class="panel panel-default brokerage-bank-listing-item" id="brokerage-bank-listing-item_' + id + '"><input class="brokerage-bank-input" id="brokers_' + id + '" id_seq="' + id + '" name="brokers[' + id + ']" type="hidden" value="' + id + '"><div class="panel-body">' + name + '<a href="#" class="btn btn-sm btn-danger remove-from-bank">Remove</a></div></div>');

    $('#brokerage-bank-listing-item_' + id).fadeIn(500);
  },

  toggleElement: function (element, mess2, type) {
    var mess1 = $(this).text();
    if (element.css('display') == 'block') {
      element.slideUp(500);
      if (this != 'null') {
        $(this).text(mess1);
        if (type == 'panel') {
          $(this).css({
            'background': 'white',
            'text-shadow': '0 1px 0 #fff',
            'background-image': 'linear-gradient(to bottom,#fff 0,#e0e0e0 100%)',
            'border-color': '#ccc',
            'color': 'black'
          });
        };
      };
    } else {
      if (type == 'panel') {
        $('.panel-slider').slideUp(500);
        $('.brokerage-list-controls .btn-p').css({
          'background': 'white',
          'text-shadow': '0 1px 0 #fff',
          'background-image': 'linear-gradient(to bottom,#fff 0,#e0e0e0 100%)',
          'border-color': '#ccc',
          'color': 'black'
        });
      };

      element.slideDown(500);
      if (this != 'null') {
        if (type == 'panel') {
          $(this).css({
            'background': 'green',
            'color': 'white'
          });
        };
        $(this).text(mess2);
      }
    };
  }
}
