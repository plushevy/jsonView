'use strict';

$(function () {

  function objectToTree(obj, nest) {
    var nest = nest || 1;
    var list = $('<ul class="tree tree--' + nest + '"></ul>');
    var li = $('<li>');

    for (var key in obj) {

      var keyName = $('<span class="tree__key"></span>');
      var keyValue = $('<span class="tree__value tree__value--collapsed"></span>');
      var br = $('<br>');
      var value;

      if ($.isArray(obj)) {

        var toggle = $('<span class="tree__toggle tree__toggle--array"> [ </span>');
        var toggleEnd = $('<span class="tree__toggle-end tree__toggle-end--array"> ] </span>');
        toggleEnd.attr('data-length', obj.length);
        keyName.append(" ");

      } else {

        var toggle = $('<span class="tree__toggle tree__toggle--obj"> { </span>');
        var toggleEnd = $('<span class="tree__toggle-end tree__toggle-end--obj"> } </span>');
        keyName.append(key + "").append(" : ");
      }


      if (typeof (obj[key]) == 'object') {
        if (obj[key]) {
          value = objectToTree(obj[key], nest + 1);
        } else {
          value = '<span class="tree__null">null</span>';
        }
      } else if (typeof (obj[key]) == 'boolean') {
        var str = (obj[key]) ? 'true' : 'false';
        value = '<span class="tree__boolean">' + str + '</span>';
      } else if (typeof (obj[key]) == 'string') {
        value = '<span class="tree__string">"' + obj[key] + '"</span>';
      } else {
        value = obj[key].valueOf();
      }

      if (typeof (obj[key]) == 'object') {
        keyValue.append(toggle).append(value).append(toggleEnd).append(',').append(br);
      } else {
        keyValue.append(value).append(',').append(br);
      }

      li.append(keyName).append(keyValue);
      list.append(li);
    }
    return list;
  }

  $(document).on('click', '#show-btn', function () {
    var value = '';
    var data = $('#source').val().trim();

    if (data) {
      try {
        var source = JSON.parse(data);
        value = objectToTree(source);
        $('#container').empty().append(value);

      } catch (e) {
        value = '<pre>' + e + '</pre>';
        $('#container').empty().append('<h1 class="error">Ошибка</h1>').append('<br>').append(value).append('Введите правильный JSON..');
        return false;
      }
    } else {
      $('#container').empty().append('<h1 class="error">Нет данных</h1>').append('Введите JSON..');
      return false;
    }

  });


  $(document).on('click', '.tree__value', function (e) {
    e.stopPropagation();
    $(this).toggleClass('tree__value--collapsed');
  });


});
