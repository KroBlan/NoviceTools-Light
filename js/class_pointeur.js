//class_cbutton.js
//

//faire une div avec une id pour placer le bouton
//Ex: <div id="ma_div" id="parent"></div>
//appeler le bouton
//Ex:
//var c = new Button("X", "parent", key_sounds[0], true);

//A FAIRE
//fait
//jouer son sur mouse up pour les boutons son
//mouse down -> playsound = true;
//si drag -> playsound = false;
//mouse up -> si playsound = true -> playsound

class Pointeur
{
//    définition d'un Pointeur
    constructor(class_name, parent_id)
    {
        this.parent = document.getElementById(parent_id);//parent du bouton dans le HTML
        this.class_name = class_name;
        this.posX;//position x
        this.posY;//position y

        this.is_draw = false;
        this.img = document.getElementById('img_cercle');//balise <img> du cercle dans le html
        this.out;
    }
//fin du constructor

//detruit la div dans le html
    destroy()
    {
//        let rip = document.getElementsByClassName(this.class_name);
//        if (rip.length > 0)
//        {
//            for (let i = rip.length - 1; i > -1; i--) {
//                this.parent.removeChild(rip[i]);
//            }
//        }
        this.parent.removeChild(this.out);
        this.is_draw = false;
    }

//permet de créé un pointeur (le dessiner)
    draw(t)
    {
        console.log('draw pointeur');
        if (this.is_draw)
        {
            destroy();
        }
        //On calcule l'angle en degrés
        let angle = 360 / (duration / t) - 90;//duration est déclaré dans sequenceur.js
        //On calcule l'angle en radiants
        angle = angle * Math.PI / 180.0;

        //on calcule la position
        this.posX = this.centreX + this.rayon * Math.cos(angle);
        this.posY = this.centreY + this.rayon * Math.sin(angle);

        this.out = document.createElement("div");
        this.parent.appendChild(this.out);
        //on lui met une classe
        this.out.className = this.class_name;
        //on place le point de pivot au centre de la div
        this.out.style.transformOrigin = "50% 50%";
        
        this.refresh_position();

        //on déplace la div du pointeur à la bonne position
        this.out.style.left = this.posX + "px";
        this.out.style.top = this.posY + "px";
        
        //on fait une rotation sur la div du pointeur
        this.out.style.webkitTransform = 'rotate(' + angle + 'rad)';
        this.out.style.mozTransform = 'rotate(' + angle + 'rad)';
        this.out.style.msTransform = 'rotate(' + angle + 'rad)';
        this.out.style.oTransform = 'rotate(' + angle + 'rad)';
        this.out.style.transform = 'rotate(' + angle + 'rad)';
        this.is_draw = true;
    }

    move(t)
    {
        //On calcule l'angle en degrés
        let angle = 360 / (duration / t) - 90;//duration est déclaré dans sequenceur.js
        //On calcule l'angle en radiants
        angle = angle * Math.PI / 180.0;

        //on calcule la position
        this.posX = this.centreX + this.rayon * Math.cos(angle);
        this.posY = this.centreY + this.rayon * Math.sin(angle);


        this.out.style.left = this.posX + "px";
        this.out.style.top = this.posY + "px";

        this.out.style.webkitTransform = 'rotate(' + angle + 'rad)';
        this.out.style.mozTransform = 'rotate(' + angle + 'rad)';
        this.out.style.msTransform = 'rotate(' + angle + 'rad)';
        this.out.style.oTransform = 'rotate(' + angle + 'rad)';
        this.out.style.transform = 'rotate(' + angle + 'rad)';
    }
    
    //met à jour le centre et le rayon
    refresh_position()
    {
        //on se base sur la taille de l'image du cercle
//        this.centreX = this.img.clientWidth / 2 - this.out.clientWidth/2;
//        this.centreY = this.img.clientHeight / 2 - this.out.clientHeight/2;
        this.centreX = this.img.clientWidth / 2 - 10;
        this.centreY = this.img.clientHeight / 2 - 14;
        this.rayon = this.img.clientHeight / 2 + 10;
    }

}