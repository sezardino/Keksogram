'use strict';

(function() {
  //render photos

  window.photosContainer = document.querySelector('.pictures');
  var template = document.querySelector('#picture')
    .content
    .querySelector('.picture__link')


  var fragment = document.createDocumentFragment();

  var generatePicture = function(picture) {
    var photo = template.cloneNode(true);
    photo.querySelector('img').src = picture.url;
    photo.querySelector('.picture__stat--likes').textContent = picture.likes;
    photo.querySelector('.picture__stat--comments').textContent = picture.comments.length;
    photo.addEventListener('click', function(evt) {
      evt.preventDefault();
      showBigPicture(picture)
    })
    return photo
  }

  var renderPicture = function(picture) {
    for (var i = 0; i < picture.length; i++) {
      fragment.appendChild(generatePicture(picture[i]))
    }
    photosContainer.appendChild(fragment);
  }


  window.get(function(response) {
    window.picturesData = response
    renderPicture(response)
  })


  /// pop
  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersBtns = document.querySelectorAll('.img-filters__button')
  window.picturesData;
  imgFilters.classList.remove('img-filters--inactive')

  var onImgFiltersClick = function(evt) {
    var target = evt.target;
    if (target.classList.contains('img-filters__button')) {
      target.classList.add('img-filters__button--active')
    }
    check(target);
    checkBtn(target);
  }
  var check = function(button) {
    cleanPosts()
    for (var i = 0; i < imgFiltersBtns.length; i++) {
      if (imgFiltersBtns[i] !== button) {
        imgFiltersBtns[i].classList.remove('img-filters__button--active')
      }
    }
  }

  var checkBtn = function(target) {
    if (target.id === 'filter-new') {
      showNewPosts()
    } else if (target.id === 'filter-discussed') {
      showDiscussedPosts()
    } else {
      renderPicture(picturesData)
    }
  }

  var cleanPosts = function(pictures) {
    var posts = document.querySelectorAll('.picture__link');
    posts.forEach(function(el) {
      el.remove();
    })
  }

  var showNewPosts = function() {
    var newPosts = [];
    for (var i = 0; i < 12 ; i++) {
      var a = window.getRandomElementInArray(picturesData);
      if (newPosts.some(function(el) {
        return el === a;
      })) {
        i--;
      } else {
        newPosts.push(a)
      }
    }
    renderPicture(newPosts)
  }

  var showDiscussedPosts = function() {
    var discussedPosts = picturesData.slice();
    discussedPosts.sort(function(a, b) {
      if (a.comments.length > b.comments.length) {
        return -1
      } else if (a.comments.length < b.comments.length) {
        return 1
      } else {
        return 0
      }
    })
    renderPicture(discussedPosts)

  }



  imgFilters.addEventListener('click', onImgFiltersClick);
})();
