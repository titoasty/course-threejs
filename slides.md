## three.js
Nicolas Bouvet
bouvet.nicolas+esgi@gmail.com
Note:
découvrir le pipeline pour créer des xp 3d (jeux, sites, ...)
au travers de three.js

---

### Interactive 3D Rendering
* Rendering = créer une image
    * 60fps = 1/60s = 16.667ms
* 3d = monde en 3 dimensions
* Interactive = monde influençable

<img src="images/duh.jpg" width="200">
Note:
c'est ce que nous allons voir au travers de threejs  
pas uniquement lib mais aussi fondamentaux du dev 3d

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
connaître où sont exécutées les fonctions
où sont stockées les textures, framebuffers, images, meshes...
gestion mémoire gpu
GPU très hétérogènes, téléphones mobiles, ...
Penser aux devices dès le début du projet

---

### 3d Pipeline
<img src="images/pipeline.jpg" width="750">
Note:
scan conversion :
* Line drawing
* Polygon filling
* Depth test
* Texturing

---

### Etape 1 : Application
* IHM
* Modification du monde 3d
* Gestion des ressources (objets 3d, images, ...)
* résultat : liste de vertex/points, triangles, ...
Note:
si on appuie sur une touche, le personnage avance, dans quelle direction, de combien d'unités

---

### Etape 2 : Geometry
* model & view transformations
* vertex shading & illumination
* projection
* clipping
* screen mapping

-=-

### Model & view transformations
<img src="images/modelview_world.jpg" width="750">
* model transform: calcul de la position de l'objet selon sa translation/orientation/scale
Note:
les objets sont placés dans le monde, on calcule sa transformation sous forme de matrice

-=-

### Model & view transformations
<img src="images/modelview_computer.jpg" width="750">
* view transform: calcul de la position de l'objet selon la translation/orientation de la caméra
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
<img src="images/perspective_frustum1.jpg" width="700">
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
* Pour chaque pixel à dessiner, comparer avec  
la profondeur existante dans le Z-Buffer
* De 0 (plus proche) à 1 (plus éloigné)
* Linéaire (hardcodé) / Logarithmique (shader)

---

### Youpi, des pixels.
<img src="images/meme_harold_ok.jpg" width="500">  

---

### 3d pipeline
![](images/Graphics3D_Pipe.png)

---

### Composants de base d'un monde 3d
* Coordonnées
* Objets (meshes)
* Matériaux
* Lumières
* Caméra

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

### Objets (meshes)

---

three.js

---

### Mise en place de three.js

---
