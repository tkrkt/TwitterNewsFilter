TwitterNewsFilter
=================

ツイッターのニュース反応ページから邪魔なコメントを除去


せつめい
===================

ニュース記事のツイート数リンクから飛べる記事に関するツイートページから、ニュースのタイトルやURLなどを除去して、
ニュースへの個人の感想などを見やすく表示するようにします。

ブックマークレットとして利用することを想定しています。

[hoge][piyo]

[piyo]: javascript:(function(){function g(a,c){for(var d=0,b=a.length;d&lt;b;d++)c(a[d])}function l(a){a=a||document;g(a.querySelectorAll(&quot;.js-media-container&quot;),function(a){a.remove()})}function f(a,c){this.c=a;this.g=c;this.items=0;this.memory={};this.a=null}function h(a){a=a.replace(/&lt;a.*?&gt;.*?&lt;\/a&gt;/g,&quot;&quot;);a=a.replace(/&lt;b.*?&gt;.*?&lt;\/b&gt;/g,&quot;&quot;);a=a.replace(/\s\u3055\u3093\u304b\u3089\s/,&quot;&quot;);a=a.replace(/\s\u3055\u3093\u304b\u3089$/,&quot;&quot;);a=a.replace(/\s+$/,&quot;&quot;);return a=a.replace(/^\s+/,&quot;&quot;)}function k(a,c){var d=a.getElementsByClassName(&quot;js-tweet-text&quot;)[0],b=c.f(d.textContent);b.length/d.textContent.length&lt;1-m?a.setAttribute(&quot;style&quot;,&quot;display:none;&quot;):d.textContent=h(b);l(a)}var m=.8;f.prototype.d=function(a){for(var c=0,d=a.length-this.c+1;c&lt;d;c++){var b=a.substr(c,this.c);this.memory[b]=this.memory[b]?this.memory[b]+1:1}this.items++};f.prototype.e=function(){this.a=[];for(var a in this.memory)this.memory.hasOwnProperty(a)&&this.memory[a]/this.items&gt;this.g&&this.a.push(a)};f.prototype.f=function(a){var c=Array(a.length),d,b,e;b=0;for(e=this.a.length;b&lt;e;b++)this.b(a,this.a[b],c,0);d=&quot;&quot;;b=0;for(e=c.length;b&lt;e;b++)c[b]||(d+=a[b]);return d};f.prototype.b=function(a,c,d,b){b=a.indexOf(c,b);if(-1!==b){for(var e=0,f=c.length;e&lt;f;e++)d[e+b]=!0;this.b(a,c,d,b+1)}};(function(){var a=new f(5,.5),c=document.getElementById(&quot;stream-items-id&quot;),d=c.children;g(d,function(b){b=b.getElementsByClassName(&quot;js-tweet-text&quot;)[0];b.innerHTML=h(b.innerHTML);a.d(b.textContent)});a.e();g(d,function(b){k(b,a)});c.addEventListener(&quot;DOMNodeInserted&quot;,function(b){setTimeout(function(){if(b.target.classList&&b.target.classList.contains(&quot;js-stream-item&quot;)){var c=b.target.getElementsByClassName(&quot;js-tweet-text&quot;)[0];c.innerHTML=h(c.innerHTML);setTimeout(function(){k(b.target,a)},0)}},0)},!1)})()})();

紹介記事
==================

http://tkrkt.com/article/twitter-filter/

ライセンス
===================

MIT
