(function () {

  // const

  var n = 5;
  var frequentThreshold = 0.5;
  var deleteThreshold = 0.8;

  // util

  function each(array, handler) {
    for (var i = 0, len = array.length; i < len; i++) {
      handler(array[i]);
    }
  }

  function removeElements(query, parent) {
    parent = parent || document;
    each(parent.querySelectorAll(query), function (elem) {
      elem.remove();
    });
  };

  function sanitize(str) {
    str = str.replace(/<a.*?>.*?<\/a>/g, '');
    str = str.replace(/<b.*?>.*?<\/b>/g, '');
    str = str.replace(/\sさんから\s/, '');
    str = str.replace(/\sさんから$/, '');
    str = str.replace(/\s+$/, '');
    str = str.replace(/^\s+/, '');
    return str;
  }

  // n-gram

  function Ngram(n, threshold) {
    this.n = n;
    this.threshold = threshold;
    this.items = 0;
    this.memory = {};
    this.frequent = null;
  }

  Ngram.prototype.addText = function (text) {
    for (var i = 0, len = (text.length - this.n + 1); i < len; i++) {
      var sub = text.substr(i, this.n);
      this.memory[sub] = this.memory[sub] ? this.memory[sub] + 1 : 1;
    }
    this.items++;
  };

  Ngram.prototype.learn = function () {
    this.frequent = [];
    for (var key in this.memory) {
      if (this.memory.hasOwnProperty(key)) {
        if (this.memory[key] / this.items > this.threshold) {
          this.frequent.push(key);
        }
      }
    }
  };

  Ngram.prototype.simplify = function (text) {
    var marker = new Array(text.length),
        result, i, len;
    for (i = 0, len = this.frequent.length; i < len; i++) {
      this.markText(text, this.frequent[i], marker, 0);
    }
    result = '';
    for (i = 0, len = marker.length; i < len; i++) {
      if (!marker[i]) {
        result += text[i];
      }
    }
    return result;
  };

  Ngram.prototype.markText = function (text, expr, marker, fromIndex) {
    var index = text.indexOf(expr, fromIndex);
    if (index === -1) { return; }
    for (var i = 0, len = expr.length; i < len; i++) {
      marker[i + index] = true;
    }
    this.markText(text, expr, marker, index + 1);
  };

  function learnItem(item, ngram) {
    var tweet = item.querySelector('.js-tweet-text');
    ngram.addText(sanitize(tweet.textContent));
  }

  function simplifyItem(item, ngram) {
    var tweet = item.querySelector('.js-tweet-text');
    var text = ngram.simplify(sanitize(tweet.textContent));
    if (text.length / tweet.textContent.length < 1 - deleteThreshold) {
      item.setAttribute('style', 'display:none;');
    } else {
      tweet.textContent = text;
    }
    removeElements('.js-media-container', item);
  }

  // main

  function main() {
    var ngram = new Ngram(n, frequentThreshold),
        container = document.getElementById('stream-items-id'),
        items = container.querySelectorAll('li[data-item-type="tweet"]');

    each(items, function (item) {
      learnItem(item, ngram);
    });

    ngram.learn();

    each(items, function (item) {
      simplifyItem(item, ngram);
    });

    container.addEventListener('DOMNodeInserted', function (e) {
      setTimeout(function () {
        if (e.target.classList && e.target.classList.contains('js-stream-item')) {
          simplifyItem(e.target, ngram);
        }
      }, 0);
    }, false);
  }

  main();
} ());
