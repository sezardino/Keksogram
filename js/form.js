'use strict';

(function() {

  //event
  var uploadFileInput = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.img-upload__overlay');
  var preview = uploadForm.querySelector('.img-upload__preview').querySelector('img');
  var closeUploadFormBtn = document.querySelector('.img-upload__cancel');
  var commentInput = document.querySelector('.text__description');
  var hashtagInput = document.querySelector('.text__hashtags');
  window.ESC_KEYCODE = 27;
  var FILE_FORMAT = ['gif', 'jpg', 'jpeg', 'png']
  window.escKeyPress = function(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeUploadForm()
    }
  }
  var addEscListener = function() {
    document.body.addEventListener('keydown', escKeyPress);
  }
  var removeEscListener = function() {
    document.body.removeEventListener('keydown', escKeyPress);
  }
  var openUploadForm = function() {
    uploadForm.classList.remove('hidden');
    addEscListener();
  }
  var closeUploadForm = function() {
    uploadForm.classList.add('hidden');
    removeEscListener();
  }
  var onUploadFileInputChange = function() {
    var file = uploadFileInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_FORMAT.some(function(it) {
      return fileName.endsWith(it)
    })
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function() {
        preview.src = reader.result;
      })

      reader.readAsDataURL(file);
      openUploadForm();
    } else {
      alert('Загрузить можно только ' + FILE_FORMAT)
    }

  }

  hashtagInput.addEventListener('focus', removeEscListener)
  hashtagInput.addEventListener('blur', addEscListener)
  commentInput.addEventListener('focus', removeEscListener)
  commentInput.addEventListener('blur', addEscListener)
  uploadFileInput.addEventListener('change', onUploadFileInputChange);
  closeUploadFormBtn.addEventListener('click', closeUploadForm)


  //// resize
  var resize = document.querySelector('.resize');
  var resizeImg = uploadForm.querySelector('img');
  var resizeInput = resize.querySelector('.resize__control--value')
  var resizeValue = parseInt(resizeInput.value, 10);
  var STEP = 25;
  var MAX = 100;
  var MIN = 25;

  var plusSize = function() {
    if (resizeValue === MAX) {
      resizeValue = MAX;
      return resizeInput.value = resizeValue + '%';
    }
    resizeValue += STEP
    resizeInput.value = resizeValue + '%';
    var percent = resizeValue * 0.01;
    resizeImg.style.transform = 'scale(' + percent + ')'
  }
  var minusSize = function() {
    if (resizeValue === MIN) {
      resizeValue = MIN;
      return resizeInput.value = resizeValue + '%';
    }
    resizeValue -= STEP;
    resizeInput.value = resizeValue + '%';
    var percent = resizeValue * 0.01;
    resizeImg.style.transform = 'scale(' + percent + ')'
  }
  var onResize = function(evt) {
    var target = evt.target
    if (target.classList.contains('resize__control--plus')) {
      plusSize()
    } else if (target.classList.contains('resize__control--minus')) {
      minusSize()
    }
  }
  resize.addEventListener('click', onResize);

///effect
  var effectsList = document.querySelector('.effects__list');
  var img = uploadForm.querySelector('img');
  var pinContainer = document.querySelector('.img-upload__scale');
  var effects = {
    none : 'effects__preview--none',
    chrome : 'effects__preview--chrome',
    chromeFilter : 'grayscale',
    sepia : 'effects__preview--sepia',
    sepiaFilter : 'sepia',
    marvin : 'effects__preview--marvin',
    marvinFilter : 'invert',
    phobos : 'effects__preview--phobos',
    phobosFilter : 'blur',
    heat : 'effects__preview--heat',
    heatFilter : 'brightness',
  }
  var pinHide = function(evt) {
    if(evt.target.classList.contains(effects.none) || evt.target.closest('#effect-none')) {
      pinContainer.classList.add('hidden');
    } else {
      pinContainer.classList.remove('hidden');
    }
  }

  var onEffectListClick = function(evt) {
    var target = evt.target;
    img.style = '';
    pin.style = '';
    pinLevel.style = '';
    checkEffect(target)

    pinHide(evt)
  };

  var checkEffect = function(target) {
    if (target.classList.contains(effects.none)) {
      img.className = effects.none;
      effectDeepInput.value = 0;
    } else if (target.classList.contains(effects.chrome)) {
      img.className = effects.chrome;
      effectDeepInput.value = 1;
    } else if (target.classList.contains(effects.sepia)) {
      img.className = effects.sepia;
      effectDeepInput.value = 1;
    } else if (target.classList.contains(effects.marvin)) {
      img.className = effects.marvin;
      effectDeepInput.value = '100%';
    } else if (target.classList.contains(effects.phobos)) {
      img.className = effects.phobos;
      effectDeepInput.value = '5px';
    } else if (target.classList.contains(effects.heat)) {
      img.className = effects.heat;
      effectDeepInput.value = 3;
    }
  }


  effectsList.addEventListener('click', onEffectListClick);

  ////validation hashtag form

  var hashtagInput = document.querySelector('.text__hashtags');

  var hashtagCheckValidity = function(hashtags) {
    hashtagInput.setCustomValidity('');
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#') {
        hashtagInput.setCustomValidity('хэш-тег начинается с символа # (решётка)')
      } else if (hashtags[i].length > 20) {
        hashtagInput.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку')
      } else if (hashtags[i] === '#') {
        hashtagInput.setCustomValidity('хеш-тег не может состоять только из одной решётки')
      } else if (hashtags.length > 5) {
        hashtagInput.setCustomValidity('нельзя указать больше пяти хэш-тегов')
      }
      for (var a = 0; a < i; a++) {
        if (hashtags[i].toLowerCase() === hashtags[a].toLowerCase()) {
          hashtagInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды, теги нечувствительны к регистру')
        }
      }
    }
  }

  hashtagInput.addEventListener('input', function() {
    var hashtagArr = hashtagInput.value.split(' ');
    hashtagCheckValidity(hashtagArr)
  });


  ///DRUG AND DROP

  var pin = document.querySelector('.scale__pin');
  var pinScale = document.querySelector('.scale__line')
  var pinLevel = document.querySelector('.scale__level')
  var effectDeepInput = document.querySelector('.scale__value');
  var coordinate = [];

  var onPinMouseDown = function(evt) {
    evt.preventDefault()
    coordinate.start = evt.clientX;
    coordinate.x = evt.clientX;
    var onPinMouseMove = function(moveEvt) {
      moveEvt.preventDefault()

      coordinate.shift = coordinate.x - moveEvt.clientX;
      coordinate.x = moveEvt.clientX;

      var pinPosition = pin.offsetLeft - coordinate.shift
      if (pinPosition <= 0) {
        pin.style.left = 0;
      } else if (pinPosition >= pinScale.clientWidth) {
        pin.style.left = pinScale.clientWidth + 'px';
      } else {
        pin.style.left = ((pin.offsetLeft - coordinate.shift) + 'px');
        pinLevel.style.width = pin.offsetLeft + 'px';
      }
      effectDeep(pinPosition)
    };
    var onPinMouseUp = function(upEvt) {
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    }
    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  }

  var effectDeep = function() {
    var value;
    var line = pinLevel.clientWidth;
    var allLine = pinScale.clientWidth;
    var percent = Math.round(100 * line / allLine);
    img.style = '';
    if (img.classList.contains(effects.chrome)) {
      value = percent / 100;
      img.style.filter = effects.chromeFilter + '(' + value + ')';
    } else if (img.classList.contains(effects.sepia)) {
      value = percent / 100;
      img.style.filter = effects.sepiaFilter + '(' + value + ')';
    } else if (img.classList.contains(effects.marvin)) {
      value = percent;
      img.style.filter = effects.marvinFilter + '(' + value + '%)';
    } else if (img.classList.contains(effects.phobos)) {
      value = percent / 20;
      img.style.filter = effects.phobosFilter + '(' + percent / 20 + 'px)';
    } else if (img.classList.contains(effects.heat)) {
      value = percent / 33;
      img.style.filter = effects.heatFilter + '(' + value + ')';
    }
    effectDeepInput.value = value;
  };

  pin.addEventListener('mousedown', onPinMouseDown);

})();
