'use strict';

(function() {
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];
  var description = [
      'Тестим новую камеру!',
      'Затусили с друзьями на море',
      'Как же круто тут кормят',
      'Отдыхаем...',
      'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
      'Вот это тачка!',
  ];

  window.getRandomNumberInRange = function(min, max) {
    var random = (Math.floor(Math.random() * max + min));
    if (random > max) {
      random -= min;
    } else  if(random == 0){
      random += min;
    }
    return random;
  };

  window.getRandomElementInArray = function(arr) {
    var element = arr[getRandomNumberInRange(0, (arr.length - 1))];
    return element;
  };

  window.getRandomElementsInArray = function(arr, min, max) {
    var emtyArr = [];
    for (var i = 0; i <= max ; i++) {
      element = getRandomElementInArray(arr);
      emptyArr.push(element);
    }
    return emptyArr;
  };

  window.getRandomElementsInArray = function(min, max, arr) {
    var number = getRandomNumberInRange(min, max);
    var emptyArr = [];
    for (var i = 0; i < number; i++) {
      var randomNumber = getRandomNumberInRange(0, (arr.length - 1));
      emptyArr.push(arr[randomNumber]);

    }
    return emptyArr;
  };

  var generateArr = function(){
    var pictures = [];
    for (var i = 1; i <= 25; i++) {
      var obj = {};
      obj.url = `photos/${i}.jpg`;
      obj.likes = getRandomNumberInRange(15, 200);
      obj.comments = getRandomElementsInArray(1, 2, comments);
      obj.commentsCount = obj.comments.length;
      obj.description = getRandomElementInArray(description);
      pictures.push(obj);
    }
    return pictures;
  };

  window.pictures = generateArr();
})();
