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
    slideNumber: true,
    width: "100%",
    height: "100%",
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
