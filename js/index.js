import 'reveal.js/lib/js/head.min';
import Reveal from 'reveal.js/js/reveal';
import 'reveal.js/css/reveal.css';
import 'reveal.js/css/theme/moon.css';
import 'reveal.js/lib/css/zenburn.css';

import slides from '../slides.md';

// load slides markdown
//document.getElementById("slidesContent").innerHTML = slides;

const splits = slides.split(/(<section>.*<\/section>)/s);
let html = '';
splits.forEach((split, index) => {
    if(index % 2 == 0) {
        html += `<section data-markdown data-separator="^\\n---\\n" data-separator-vertical="^\\n-=-\\n">\n \
            <script type="text/template" id="slidesContent" data-template>\n \
                ${split}\n \
            </script>\n \
        </section>\n`;
    } else {
        html += split + '\n'
    }
});
console.log(html);

document.getElementById('slides').innerHTML = html;

window.Reveal = Reveal;

Reveal.initialize({
    history: true,
    slideNumber: true,
    width: "100%",
    height: "100%",
    dependencies: [{
            src: '../node_modules/reveal.js/lib/js/classList.js',
            condition: function () {
                return !document.body.classList;
            }
        },
        {
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