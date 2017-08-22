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


        this.bouton_on = false;//le bouton n'est pas actif
        this.timer;//pour pouvoir faire un clearTimeout
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
        }

//        var ici = this;//!!!nécessaire pour le addEventListener

        //On place un écouteur pour les les clicks de souris

        //on utilise une fonction fléchée pour préserver le "this"
        //comme: this.out.addEventListener("mousedown", function ()
        //mais this existe dedans
        this.out.addEventListener("mousedown", ()=>
        {

            if (this.is_playButton)
            {
                //on ajoute le son
                get_time(this.key, time);//time est déclarée dans sequenceur.js
//                console.log(ici.key + ", " + time);
            } else
            {
                this.playsound = true;
            }

            //on crée un listener pour savoir si la souris bouge
//        window.addEventListener("mousemove", move_fx);
            clicked_button = this;//on déclre ce bouton comme étant cliqué (pour le dragndrop
            //on crée un listener pour détecter mouse up
//            ici.out.addEventListener("mouseup", function()
            this.out.addEventListener("mouseup", () =>
            {
                //on lit le son
                playSound(this.sound_file);
//            console.log("mouseup_fx");
                window.removeEventListener("mouseup", this.move_fx);
            });

        });



//        function mouseup_fx()
//        {
//            //on lit le son
//            playSound(ici.sound_file);
//            console.log("mouseup_fx");
//            window.removeEventListener("mouseup", ici.move_fx);
//        }
        function move_fx()
        {
            console.log("move_fx");
        }

    }
//fin du constructor

    activate(t)
    {
//        this.clearTimeout(timer);
        
        this.bouton_on = true;

        this.out.style.transition = "0s";
        this.out.style.backgroundColor = "white";


        this.timer = window.setTimeout(()=> {
            // lorsque la durée de changement atteint zero...
            this.bouton_on = false;
            // on remet le style d'origine
            this.out.style.transition = "0.4s";
            this.out.style.backgroundColor = "";
        }, t);
        
    }

}