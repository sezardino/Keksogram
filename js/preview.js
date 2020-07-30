'use strict';

(function() {
//big picture / show
var bigPicture = document.querySelector('.big-picture');
var bigPictureCancel = document.querySelector('.big-picture__cancel')
var commentsContainer = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('.social__comment');

window.showBigPicture = function(picture) {
  bigPicture.querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  if (bigPicture.querySelector('.comments-number').textContent > picture.comments.length) {
    bigPicture.querySelector('.comments-number').textContent = picture.comments.length;
  } else {
    bigPicture.querySelector('.comments-number').textContent = 5;
  }

  renderComment(picture, 5);
  loadMore.classList.remove('hidden')
  if (picture.comments.length < 5) {
    bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
  }

  // bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  // bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
}
/// load more
var loadMore = document.querySelector('.social__loadmore');
var renderComment = function(picture, step) {
  var fragment = document.createDocumentFragment();
  commentsContainer.innerHTML = '';
  if (step > picture.comments.length) {
    step = picture.comments.length;
  };
  for (var i = 0; i < step; i++) {
    commentTemplate.querySelector('.social__picture').src = picture.comments[i].avatar;
    commentTemplate.querySelector('.social__text').textContent = picture.comments[i].message;
    fragment.appendChild(commentTemplate.cloneNode(true));
  }
  commentsContainer.appendChild(fragment);
}


var onLoadMoreClick = function() {
  loadMore.classList.add('hidden')
}




loadMore.addEventListener('click', onLoadMoreClick);


window.escPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture()
  }
}



var closeBigPicture = function() {
  bigPicture.classList.add('hidden');
  document.body.style.overflow = '';
  document.body.addEventListener('keydown', escPress)
}

var openBigPicture = function() {
  bigPicture.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  document.body.addEventListener('keydown', escPress)
}

var onPhotosContainerClick = function(evt) {
  var target = evt.target;
  if (target.classList.contains('picture__img')) {
    openBigPicture();
  }
}
var onBigPictureCancelClick = function() {
  closeBigPicture()
}

photosContainer.addEventListener('click', onPhotosContainerClick);
bigPictureCancel.addEventListener('click', onBigPictureCancelClick);

})();
