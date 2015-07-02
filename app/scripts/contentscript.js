'use strict';
//file wide
var language;
var compilr = {};


compilr.init = function (lang) {
  language = lang;
  switch (lang) {
    case 'coffee':
      $('.file-actions .btn-group').append('<a href="#" class="btn btn-sm btn-primary compile">Compile to: ' + language + '</a>');
      break;
    case('js'):
      $('.file-actions .btn-group').append('<a href="#" class="btn btn-sm btn-primary compile">Compile to: ' + language.toUpperCase() + '</a>');
      break;
    default:
      return
  }

};

compilr.compileAndShow = function (lang) {
  var rawLink = $('#raw-url').attr('href'),
    source;
  $.get(rawLink, function (data) {
    if (lang === 'coffee') {
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

    $(this).removeClass('btn-danger-fix').addClass('btn-primary').text('Compile to: ' + language);
    $('.highlight').show();
    $('.compiled').remove();
  } else {

    $(this).removeClass('btn-primary').addClass('btn-danger-fix').text('Original');
    $('.highlight').hide();
    compilr.compileAndShow(language);
  }
});


$('#js-repo-pjax-container').on('DOMNodeInserted', function (e) {
  if ($(e.target).is('.file')) {
    if (window.location.href.indexOf(".coffee") > -1) {
      compilr.init('coffee');
    } else if (window.location.href.indexOf(".js") > -1) {
      compilr.init('js');
    }
  }
});

//When you open a page direct
if (window.location.href.indexOf(".coffee") > -1) {
  compilr.init('coffee');
} else if (window.location.href.indexOf(".js") > -1) {
  compilr.init('js');
}



