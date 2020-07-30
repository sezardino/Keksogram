'use strict';

(function() {
  var URL = {
    GET : 'https://javascript.pages.academy/kekstagram/data',
    POST : 'https://example',
    TIMEOUT : 1000,
  };

  var xhr = new XMLHttpRequest();

  window.get = function(onPositive, onNegative) {
    xhr.responseType = 'json';
    xhr.timeout = URL.TIMEOUT;


    xhr.addEventListener('load', function() {
      if (xhr.status === 200) {
        onPositive(xhr.response);
      } else {
        onNegative('error');
      }
    });

    xhr.open('GET', URL.GET);
    xhr.send();
  };
})();
