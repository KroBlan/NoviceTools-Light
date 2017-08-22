//class_cbutton.js
//

//faire une div avec une id pour placer le bouton
//Ex: <div id="ma_div" id="parent"></div>
//appeler le bouton
//Ex:
//var c = new Button("X", "parent", key_sounds[0], true);

//A FAIRE
//jouer son sur mouse up pour les boutons son
//mouse down -> playsound = true;
//si drag -> playsound = false;
//mouse up -> si playsound = true -> playsound

class Button
{
    constructor(key, parent_id, sound_file, is_playButton)
    {
        this.parent = document.getElementById(parent_id);//parent du bouton dans le HTML
        this.key = key;//Label du bouton
        this.sound_file = sound_file;//obj audio associé au bouton
        this.is_active = false;
        this.is_over = false;
        this.is_playButton = is_playButton;//si true: bouton d'édition, si false: bouton fichier son
        this.out = document.createElement("div");//le div du bouton dans le HTML
        this.playsound = false;//passe en true quand mousedown et false quand drag
        this.bouton_on = false;
        this.time_bouton_on = 0;
//    this.key_value = key_value;
//    this.key_label = String.fromCharCode(key_value);
//    this.key_label = key;
        this.parent.appendChild(this.out);

        if (this.is_playButton)
        {
            this.out.className = "launchpad dropper";
//            this.out.innerHTML = '<h1>' + this.key + '</h1>';
            this.out.innerHTML = this.key;
        } else
        {
            this.out.className = "samples draggable";
            this.out.innerHTML = '<h6>' + this.key + '</h6>';
            this.out.draggable = 'true';

//            this.out.setAttribute('draggable', 'true');  // Permet d'être draggable
//            this.out.addEventListener('dragstart', this.handleDragStart, false);
//            this.out.addEventListener('dragenter', this.handleDragEnter, false);
//            this.out.addEventListener('dragover', this.handleDragOver, false);
//            this.out.addEventListener('dragleave', this.handleDragLeave, false);
//            this.out.addEventListener('drop', this.handleDrop, false);
//            this.out.addEventListener('dragend', this.handleDragEnd, false);
        }

        var ici = this;//!!!nécessaire pour le addEventListener
        //
        //On place un écouteur pour les les clicks de souris
        this.out.addEventListener("mousedown", function ()
        {

            if (ici.is_playButton)
            {
                //on ajoute le son
                get_time(ici.key, time);//time est déclarée dans sequenceur.js
//                console.log(ici.key + ", " + time);
            } else
            {
                ici.playsound = true;
                //on lit le son
                playSound(ici.sound_file);
//                console.log(ici.key + ", " + time);
//
            }

            //on crée un listener pour savoir si la souris bouge
//        window.addEventListener("mousemove", move_fx);
            clicked_button = ici;//on déclre ce bouton comme étant cliqué (pour le dragndrop
            //on crée un listener pour détecter mouse up
            window.addEventListener("mouseup", ici.mouseup_fx);

        });

        function mouseup_fx()
        {
            //on supprime les listeners dont on a plus besoin...
//        window.removeEventListener("mousemove", move_fx);
            window.removeEventListener("mouseup", ici.move_fx);
            console.log("mouseup_fx");


            //on supprime la class "unselect" dans le body de la page HTML
//        document.body.className = "";
        }
        function move_fx()
        {
            console.log("move_fx");
        }


    }
//fin du constructor


//    change_soundFile_value(sf)
//    {
//        this.sound_file = sf;
//        console.log('sf: '+this.sound_file);
//    }

    drop()
    {
        console.log("drop");
    }

}
