## three.js  
Nicolas Bouvet  
[bouvet.nicolas+esgi@gmail.com](mailto:bouvet.nicolas+esgi@gmail.com)
Note:
découvrir le pipeline pour créer des xp 3d (jeux, sites, ...)
au travers de three.js  

pas uniquement lib mais aussi fondamentaux du dev 3d

---

### Interactive 3D Rendering
* Rendering = créer une image
    * 60fps = 1/60s = 16.667ms

* 3d = monde en 3 dimensions
* Interactive = monde influençable

<img src="images/duh.jpg" width="250">
Note:
c'est ce que nous allons voir au travers de threejs  

rendering = créer une image

3d = définir des choses dans un environnement en 3 dimensions.  
plus particulièrement, dans la 3d "informatique", on définit des objets (meshes), matériaux, lumières et une caméra.  
On utilise ces informations pour rendre une image en 2 dimensions.  
Ecran -> fenêtre vers ce monde 3d. (d'autres exemples qu'un écran)

interactive = signifie que l'on peut influencer sur ce qu'il y a à l'écran (exemple basique : jeux vidéos)  

implications: identifier besoins/bottlenecks, perfs, concessions...

---

### Hardware
![](images/Graphics3D_Hardware.png)
* gestion mémoire vive et gpu
* où sont exécutées les fonctions
* identifier les devices ciblés
Note:
pourquoi c'est important de le rappeler  

connaître où sont exécutées les fonctions  
où sont stockées les textures, framebuffers, images, meshes...  
gestion mémoire gpu  
GPU très hétérogènes, téléphones mobiles, ...  
Penser aux devices dès le début du projet  

---

### classic 3d Pipeline aka "forward rendering"
<img src="images/pipeline.jpg" width="750">
Note:
* pipeline utilisé en temps réel et en rendu  
* unity, unreal engine, godot
* autre mode : deferred rendering

Décrire succintement chaque étape

---

### Etape 1 : Application
* IHM
* Modification du monde 3d
* Gestion des ressources (objets 3d, images, ...)
* Output : liste de vertex/points, triangles, ...
Note:
* Côté CPU
* si on appuie sur une touche, le personnage avance, dans quelle direction, de combien d'unités
* IHM en web : clavier, souris, webcam, gyroscope, casque VR... (webUSB ?)
* Images -> Textures GPU
* /!\ Attention aux ressources, sur le Web (mémoire, bande passante, ...)

-=-

### Représentation d'un objet 3d
<img src="images/GL_GeometricPrimitives.png" width="450">
* Liste de vertex
* Type de polygone
* Optionnel : matériaux, textures, normales, UVs...
Note:
Pour bien comprendre la suite, explication de la représentation d'un objet 3d

---

### Etape 2 : Geometry
* Model & view transformations
* Vertex shading & illumination
* Projection
* Clipping
* Screen mapping

-=-

### Model & view transformations
<img src="images/modelview_world.jpg" width="750">  
model transform : calcul de la position de l'objet selon sa translation/orientation/scale
Note:
les objets sont placés dans le monde, on calcule sa transformation sous forme de matrice

-=-

### Matrices 3D
<img src="images/3d_matrices.png">
> TransformedVector = TranslationMatrix x RotationMatrix x ScaleMatrix x OriginalVector;

-=-

### Model & view transformations
<img src="images/modelview_computer.jpg" width="750">  
view transform : calcul de la position de l'objet selon la translation/orientation de la caméra
Note:
la caméra est en fait fixe. La view transform déplace tout le monde de telle sorte de ramener le monde autour de la caméra fixe.
Avec un peu de magie, on obtient ce qu'on appelle la model-view matrix, qui fournit une matrice de transformation pour l'objet, de telle sorte qu'on ait l'illusion qu'on regardee à travers cette caméra.

-=-

### Vertex shading
* manipulation des vertex à travers des shaders
* déformation, animation, skinning
* normales pour l'illumination
* très performant, relativement peu coûteux

-=-

### Projection
<img src="images/perspective_frustum1.jpg" width="600">
* forme de pyramide
* field of view, near/far clipping plane
* distorsion avec la distance  
(oeil humain : 135° vertical, 200° horizontal)

-=-

### Projection
<img src="images/perspective_view.jpg" width="700">  
résultat de projection en perspective

-=-

### Projection
<img src="images/ortho_frustum.jpg" width="700">
* forme de cube
* pas de distorsion avec la distance

-=-

### Projection
<img src="images/orthoview.jpg" width="700">  
résultat de projection en vue orthogonale

-=-

### Clipping
* Tout ce qui n'est pas dans le volume visible est ignoré
* Fait sur le GPU, mais d'autres méthodes existent sur le CPU
Note:
Plus compliqué qu'il n'y parait puisque certains objets/polygones peuvent couper l'un des plans de vue (cf. camera view)  
Les polygones sont coupés à l'intersection avec les bords avec de nouveaux vertex créés

-=-

### ex: Frustum culling
<iframe width="560" height="315" src="https://www.youtube.com/embed/ORFuqih9V6Y" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>  
côté CPU

---

### Etape 3 : Rasterization
* 3d data > screen space coordinates
* Pour chaque pixel, déterminer ce qui est visible ou non
* Déterminer la couleur du pixel  
(lumières, z-buffer, fragment shader...)
* À cette étape :
    * Line drawing
    * Polygon filling
    * Texturing
    * Depth test

-=-

### Line drawing
* Affichage de lignes (duh, again)
* Opération essentielle : wireframes
* Quels pixels allumer entre deux points ?
* Algorithme populaire : Bresenham
Note:
https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm

-=-

### Polygon filling
<img src="images/scanline.png" width="350">  
* Déterminer quels pixels allumer à partir d'un polygone
* Algorithme populaire : scan-line method
* Beaucoup de brute force dans ces algos
* Antialiasing
Note:
Parmi les premiers à être accéléré par les GPUs  

-=-

### Texturing
<img src="images/uvmapping.jpg" width="700">  
* Application de textures
* Coordonnées : UV
* Complexité à la préparation des objets 3D

-=-

### Depth test
* Déterminer quels objets sont devant lesquels
* N'afficher que ce qui est le plus près
* Comment garder l'information entre chaque polygone ?

-=-

### L'algorithme du peintre
![](images/painters_algorithm.png)
* Dessiner plus du loin au plus près
* Au centre : troll case

-=-

### Z-Buffer
![](images/zbuffer.jpg)
* De 0 (plus proche) à 1 (plus éloigné)
* Pour chaque pixel à dessiner, comparer avec  
la profondeur existante dans le Z-Buffer
* Linéaire (hardcodé) / Logarithmique (shader)
* DEPTH_WRITE, DEPTH_TEST

---

### Youpi, des pixels.
<img src="images/meme_harold_ok.jpg" width="500">  

---

### Résumé du pipeline 3d
![](images/Graphics3D_Pipe.png)

---

### Composants de base d'un monde 3d
* Coordonnées
* Objets (meshes)
* Matériaux
* Lumières
* Caméra
* (Scène)

---

### Système de coordonnées
![](images/3d-coordinate-system.png)

(système main droite)
Note:
pouce: x
index: y (en l'air)
majeur : z
vecteur à 3 dimensions
utilisation des opérations classiques : multiplication, cross product, dot product

---

### Objets 3D (meshes)
<img src="images/mesh_example.jpg" width="300">  
* Vertex
* Type
* Optionnel : faces, edges, UVs, normales, matériaux, ...

---

### Matériaux
<img src="images/materials.png" width="700">  
* Propriétés visuelles de l'objet (mais pas que)
* Entièrement customs : shaders

Note:
Principalement utilisé pour définir les propriétés visuelles (réaction à la lumière)

---

### Lumières
<img src="images/light_types.svg" width="500" style="background-color: #ffffff;">  
* Ambient light : lumière diffuse
* Directional light : soleil
* Point light : ampoule, feu, ...
* Spot light : projecteur, réverbère

---

### Lumières
<img src="images/lights.jpg" width="600">  

---

### Lumières
<img src="images/spotlight.png">  
Spot light : émission en en forme de cône

---

### Caméra
<img src="images/mdn-games-3d-camera-settings.png" width="500">  
* Fov
* Near, Far
* Ratio width/height = vertical Fov

---

### WebGL
* Créé par le Khronos group
* v1 : 3 mars 2011
* v2 : 17 janvier 2017
* Navigateurs : Firefox 4+, Google Chrome 9+,  
Opera 12+, Safari 5.1+ and Internet Explorer 11+
* Accessible via Canvas
Note:
Khronos group = consortium dont le but est de créer des APIs multimédia publiques et gratuites  
En juin 2011, Microsoft exprime sa défiance vis-à-vis de la techno  
En juin 2013, Microsoft annonce le support dans IE11  
three.js, babylon.js, processing, blend4web  
Certains moteurs pro offrent un export en webgl : unity, unreal engine...
Egalement utilisé pour la 2d  

Avant : Flash, plugin Unity, ...

---

### Librairies WebGL
* three.js
* Babylon.js
* Processing
* Unity, Unreal Engine

---

### three.js
* Créé par Ricardo Cabello (Mr.doob)
* Première release : 24 avril 2010
* Actuellement : r91 (14 mars 2018)
* Rendus en WebGL, CSS3D, SVG

---

### Quelques exemples
* <a href="https://threejs.org/" target="_blank">https://threejs.org/</a>
* <a href="http://alteredqualia.com/three/examples/webgl_terrain_dynamic.html" target="_blank">terrain dynamic (altered qualia)</a>
* <a href="http://mrdoob.com/lab/javascript/webgl/clouds/" target="_blank">clouds (mr doob)</a>
* <a href="https://interview.ueno.co/" target="_blank">https://interview.ueno.co/</a>
* <a href="http://www.adultswim.com/music/singles-2017" target="_blank">http://www.adultswim.com/music/singles-2017</a>
* <a href="https://moments.epic.net/" target="_blank">https://moments.epic.net/</a>
* <a href="http://pos.biborg.com/fr/" target="_blank">http://pos.biborg.com/fr/</a>
* <a href="http://www.larsberg.net/#/hexanemone" target="_blank">http://www.larsberg.net/#/hexanemone</a>
* <a href="http://nico-boo.com/" target="_blank">http://nico-boo.com/</a>

---

### Mise en place de three.js
[https://github.com/titoasty/boilerplate-threejs](https://github.com/titoasty/boilerplate-threejs)

<section>
<h3>Caméra</h3>
<pre><code data-trim data-noescape style="max-height: 700px;">
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;
</code></pre>
</section>

<section>
<h3>Mesh</h3>
<pre><code data-trim data-noescape style="max-height: 700px;">
var geometry = new THREE.BoxGeometry(200, 200, 200);
var material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
});

var mesh = new THREE.Mesh(geometry, material);
</code></pre>
</section>

<section>
<h3>Scene</h3>
<pre><code data-trim data-noescape style="max-height: 700px;">
var scene = new THREE.Scene();
scene.add(mesh);
</code></pre>
</section>

<section>
<h3>Renderer</h3>
<pre><code data-trim data-noescape style="max-height: 700px;">
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
</code></pre>
</section>

<section>
<h3>Afficher la scène</h3>
<pre><code data-trim data-noescape style="max-height: 700px;">
renderer.render(scene, camera);
</code></pre>
</section>

<section>
<h3>Afficher la scène</h3>
<pre><code data-trim data-noescape style="max-height: 700px;">
function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);
}

animate();
</code></pre>
</section>

<section>
<h3>Hello World !</h3>
<pre><code data-trim data-noescape style="max-height: 600px;">
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;

var geometry = new THREE.BoxGeometry(200, 200, 200);
var material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
});

var mesh = new THREE.Mesh(geometry, material);

var scene = new THREE.Scene();
scene.add(mesh);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);
}

animate();
</code></pre>
</section>

### Projet : Minecraft
* naviguer dans un monde de cubes
* créer/modifier/supprimer des cubes
* au moins **1 shader**
* au moins un effet graphique  
(particules, postprocessing, ...)
