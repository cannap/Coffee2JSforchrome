'use strict';

var coffee2js = {};


coffee2js.init = function () {
  $('.file-actions .btn-group').append('<a href="#" class="btn btn-sm btn-primary tojs">Show JS</a>');

};

coffee2js.compileAndShow = function () {
  var rawLink = $('#raw-url').attr('href');

  $.get(rawLink, function (data) {
    var jsSource = CoffeeScript.compile(data,
      {bare: true}
    );

    var source = Prism.highlight(jsSource, Prism.languages.javascript);
    $('<div class="coffee2JS"><pre class="line-numbers" data-start="-5"><code>' + source + '</code></pre></div>').insertBefore('.highlight');
  });

};


$(document.body).on('click', '.tojs', function (e) {
  e.preventDefault();
  if ($('.coffee2JS').length) {
    $(this).removeClass('btn-danger-fix').addClass('btn-primary').text('Show JS');
    $('.highlight').show();
    $('.coffee2JS').remove();
  } else {
    $(this).removeClass('btn-primary').addClass('btn-danger-fix').text('Hide JS');
    $('.highlight').hide();
    coffee2js.compileAndShow();
  }
});


$('#js-repo-pjax-container').on('DOMNodeInserted', function (e) {
  if ($(e.target).is('.file')) {
    if (window.location.href.indexOf(".coffee") > -1) {
      coffee2js.init();
    }
  }
});


if (window.location.href.indexOf(".coffee") > -1) {
  coffee2js.init();
}

