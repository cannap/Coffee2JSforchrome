'use strict';
//file wide
var compileTo;
var compilr = {};


compilr.init = function () {
  $('.file-actions .btn-group').append('<a href="#" class="btn btn-sm btn-primary compile">Compile to: ' + compileTo + '</a>');
};

compilr.compileAndShow = function () {
  var rawLink = $('#raw-url').attr('href'),
    source;
  $.get(rawLink, function (data) {

    if (compileTo === 'js') {
      source = CoffeeScript.compile(data,
        {
          bare: true
        }
      );
      source = Prism.highlight(source, Prism.languages.javascript);
    } else {
      source = js2coffee.build(data).code;
      source = Prism.highlight(source, Prism.languages.coffeescript);
    }
    $('<div class="compiled"><pre class="line-numbers" data-start="-5"><code>' + source + '</code></pre></div>').insertBefore('.highlight');
  });
};


$(document.body).on('click', '.compile', function (e) {
  e.preventDefault();
  if ($('.compiled').length) {
    $(this).removeClass('btn-danger-fix').addClass('btn-primary').text('Compile: to ' + compileTo);
    $('.highlight').show();
    $('.compiled').remove();
  } else {

    $(this).removeClass('btn-primary').addClass('btn-danger-fix').text('Original');
    $('.highlight').hide();
    compilr.compileAndShow();
  }
});

$('#js-repo-pjax-container').on('DOMNodeInserted', function (e) {
  if ($(e.target).is('.file')) {
    if (window.location.href.indexOf(".coffee") > -1) {
      compileTo = 'js';
      compilr.init('coffee');
    } else if (window.location.href.indexOf(".js") > -1) {
      compileTo = 'coffee';
      compilr.init();
    }
  }
});


//When you open a page direct
if (window.location.href.indexOf(".coffee") > -1) {
  compileTo = 'js';
  compilr.init();
} else if (window.location.href.indexOf(".js") > -1) {
  compileTo = 'coffee';
  compilr.init();
}