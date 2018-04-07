import Reveal from 'reveal.js/js/reveal';
import 'reveal.js/lib/js/head.min';
import 'reveal.js/css/reveal.css';
import 'reveal.js/css/theme/moon.css';

import slides from '../slides.md';

// load slides markdown
document.getElementById("slidesContent").innerHTML = slides;

window.Reveal = Reveal;

Reveal.initialize({
    history: true,
    dependencies: [{
            src: '../node_modules/reveal.js/plugin/markdown/marked.js',
            condition: function () {
                return !!document.querySelector('[data-markdown]');
            }
        },
        {
            src: '../node_modules/reveal.js/plugin/markdown/markdown.js',
            condition: function () {
                return !!document.querySelector('[data-markdown]');
            }
        },
        {
            src: '../node_modules/reveal.js/plugin/highlight/highlight.js',
            async: true,
            callback: function () {
                hljs.initHighlightingOnLoad();
            }
        },
        {
            src: '../node_modules/reveal.js/plugin/zoom-js/zoom.js',
            async: true
        },
        {
            src: '../node_modules/reveal.js/plugin/notes/notes.js',
            async: true
        }
    ]
});

//import tmp from 'reveal.js/plugin/markdown/marked';
//import 'reveal.js/plugin/markdown/markdown';
//import 'reveal.js/plugin/notes/notes';
/*
import slidesUrl from '../slides.md';
import '../images/*';

// load all images
import * as images from '../images/*.*';

import * as tmp from '../node_modules/reveal.js/reveal.js/js/*.js';
console.log(tmp);

const replaceAll = (text, search, replacement) => {
    var target = this;
    return text.replace(new RegExp(search, 'g'), replacement);
};

// load slides markdown
var rawFile = new XMLHttpRequest();
rawFile.open("GET", slidesUrl, true);
rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
        let text = rawFile.responseText;

        // replace all images ids in the form "!id_image!" in markdown
        Object.keys(images).forEach(id => {
            const imageUrl = images[id][Object.keys(images[id])[0]];
            text = replaceAll(text, `!${id}!`, `![](${imageUrl})`);
        });

        document.getElementById("slidesContent").innerHTML = text;

        Reveal.initialize({
            history: true
        });
    }
}
rawFile.send();
*/