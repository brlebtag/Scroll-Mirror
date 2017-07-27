/*
MIT License

Copyright (c) 2017 Bruno Gabriel Araujo Lebtag

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

"use strict";

// Original source: http://www.alexandre-gomes.com/?p=115
function getScrollBarWidth() {
  var inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild (inner);

  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild (outer);

  return (w1 - w2);
};

$(function() {
	var SCROLL_WIDTH = getScrollBarWidth();

	$('[data-scroll-mirror]').each(function(i, e) {
		var el = $(e);
    var fakeContent = $('<div></div>');
		var wrapper = $('#' + el.data('scroll-mirror'));
    var content = wrapper.children().eq(0);

		var valid = 
			wrapper.length > 0 && 
			content.length > 0
      ;

    if ( !valid ) return;

    el.append(fakeContent);

		el.css({
			'overflow-y': 'scroll',
			'height': wrapper.height() + 'px',
			'width': SCROLL_WIDTH,
		});

		fakeContent.css({
			'height': content.height() + 'px',
			'overflow': 'visible',
		});

		el.scroll(function() {
			wrapper.animate({'scrollTop': el.scrollTop() + 'px'}, 0);
		});
	});
})