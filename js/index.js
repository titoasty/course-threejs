import slidesUrl from '../slides.md';
import '../images/*';

// load all images
import * as images from '../images/*.*';

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
    }
}
rawFile.send();
