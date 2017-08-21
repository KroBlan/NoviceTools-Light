//sequenceur.js

//Presser sur des touches du clavier ou cliquer pour composer des boucles.

//A FAIRE:
//catégories pour fichiers audios
//Drag & Drop
//fait-detecter et ajuster affichage au changement de taille de la fenetre
//stocker des pourcentages au lieu de durées pour pouvoir accélérer et ralentir avec "duration"



var timerID = null;//pour le timer...
var key_time = []; //tab à 2 dim non indéx Temps/touche
var soundFiles = [
    // Liste des objets audios (référence des fichiers son)
    new Audio("library/sounds/sound1.mp3"),//source sonore sample 1
    new Audio("library/sounds/sound2.mp3"),//source sonore sample 2
    new Audio("library/sounds/sound3.mp3"),//source sonore sample 3
    new Audio("library/sounds/sound4.mp3"),//source sonore sample 4
    new Audio("library/sounds/sound5.mp3"),//source sonore sample 5

    new Audio("library/sounds/click.mp3"),//source sonore click metronome
    new Audio("library/sounds/beep2.mp3")];//source sonore debut de boucle

//associassion Touche/Son
var key_sounds = {// tab à 1 dimension indéxée Touche/Son
    "W": soundFiles[0],
    "X": soundFiles[1],
    "C": soundFiles[2],
    "V": soundFiles[3],
    "B": soundFiles[4]};
var duration = 600; // durée du cycle
var beats = 8; //nombre de segments sur la timeline
var beat_duration = duration / beats;//durée d'un beat
var beat = 0; //beat actuel
var stick_to_beat = true; //le mode quantification est il actif ?
//timer
var timerStarted = false; //le timer est il actif ?
var time = 1; //position du curseur sur la timeline
var time_pause;//position du curseur au moment de la pause
var pause = true;//pour mettre en pause

var metronome_sound = ""; //le son du metronome
var metronome_active = true;//false pour éteindre le métronome

var clicked_button;//pour les boutons...

var soundFiles_buttons = [];//Array de boutons de fichiers sons à sélectionner (obj)

var boutons_creation = [];//Array de boutons pour créer des boucles de sons (obj)

var loaded = 0;//pour verifier que tous les fichiers audio à utiliser son en cache

var browser_window_width;



// s'excecute après le chargement de la page comme le init
//INIT -------------------------------

window.addEventListener('load', function () {

    //on prend la largeur de l'écran
    browser_window_width = window.innerWidth;
    //on dessine les trucs autour du cercle
    draw_items(beats);

    //on met l'audio en cache
    //--------------------
    preloadAudio(metronome_sound);

    for (var i in key_sounds) {
        preloadAudio(key_sounds[i]);
    }
    //---------------------


    //on remplit un tableau de boutons avec tous les sons
    for (var i = 0, len = soundFiles.length; i < len; i++)
    {
        soundFiles_buttons.push(new Button("sample "+(i<10?"0"+(i+1):(i+1)), "librarySamples_1", soundFiles[i], false));
    }


    // creation des boutons de creation de son
    for (i in key_sounds)
    {
        boutons_creation.push(new Button(i, "launchpad", key_sounds[i], true));
    }
    //On affiche les bpm
     display_bpm();

     soundFiles[6].volume = 0.1; // volume du beep debut de boucle



      //  metronome_sound = soundFiles[6];
      // boutons controle
      play_pause = document.getElementById('play_pause');
      undo = document.getElementById('undo');
      clear = document.getElementById('clear');
      sync = document.getElementById('sync');
      dot1 = document.getElementById('metronome_1');
      dot2 = document.getElementById('metronome_2');

      // affichage de l'avancé dans la timeline
      document.getElementById('time').innerHTML = beat + " / " + beats ;

      dot1.style.backgroundColor = "#FF4F4F";
      dot2.style.backgroundColor = "";
});

//FIN de l'init -----------------

//On détecte le changement de taille de la fenêtre du navigateur
window.onresize = function (event) {
    browser_window_width = window.innerWidth;
    draw_items(beats);
    draw_bidule(time);
};


// Une fois ce fichier chargé il vas appeller loadedAudio()
// le fichier sera gardé dans le navigateur dans le cache
function preloadAudio(audio)
{
//    audio.addEventListener('canplaythrough', loadedAudio, false);
    audio.oncanplaythrough = loadedAudio();
}

//Verifie si l'audio est en cache et lance la boucle
function loadedAudio() {
    loaded++;
    console.log(Object.keys(key_sounds).length + 1 + ": " + loaded);
    //on regarde si tout est chargé:
    if (loaded >= Object.keys(key_sounds).length + 1) {
        //si tout est chargé:
        //on lance la boucle
        startTimer();
        console.log("loaded");
        loaded = 0;
    }
}

//démarrage du timer
function startTimer() {
    if (timerStarted === false) {
        timerId = window.setInterval("timer_sequencer()", 10);
    }
    timerStarted = true;
}



// arret du timer (PAUSE)
window.addEventListener('keydown', stopTimer);

function stopTimer(e) {
// la barre espace active la pause
    if (e.keyCode === 32) {

        window.clearInterval(timerId);
        timerStarted = false;//compteur en pause
        pause = !pause;//pause activée
        time_pause = time;

        play_pause.style.backgroundColor = "white";
    }
}

// reprise du timer
window.addEventListener('keydown', function (e) {

    if (e.keyCode === 32 && pause === true) {
        time = time_pause;
        startTimer();

        play_pause.style.backgroundColor = "";
    }
});

// une fonction qui permet de changer l'apparence d'un bouton
// permet de trouver un bouton à partir de la lettre
function activate_bouton(lettre) {

    for (var i = 0; i < boutons_creation.length; i++) {

        if (boutons_creation[i].key === lettre) {


            boutons_creation[i].bouton_on = true;
            boutons_creation[i].time_bouton_on = 10;

            boutons_creation[i].out.style.transition = "0s";
            boutons_creation[i].out.style.backgroundColor = "white";
        }
    }

}

//fonction qui réduit les décomptes des boutons ayant changé d'apparence
//et on les remet à leur apparence d'origine si le décompte est à 0
function deactivate_button () {

  for (var i = 0; i < boutons_creation.length; i++) {

      if (boutons_creation[i].bouton_on) {

          boutons_creation[i].time_bouton_on--; //la durée de changement de style se réduit jusqu'à zero dès que le bouton est allumé
//            console.log(boutons_creation[i].time_bouton_on);
          if (boutons_creation[i].time_bouton_on <= 0) {
              // lorsque la durée de changement atteint zero...
              boutons_creation[i].bouton_on = false;
              // on remet le style d'origine
              boutons_creation[i].out.style.transition = "0.4s";
              boutons_creation[i].out.style.backgroundColor = "";
          }
      }
  }
}


//------------------------------------------
// TIMER
//------------------------------------------

function timer_sequencer() {
    if (time < duration) {
        time++;
        //dessine un bidule qui tourne autour du cercle
        draw_bidule(time);

        if (time > beat * beat_duration)
        {
            if (metronome_active)
            {
                playSound(metronome_sound);
//                console.log("m " + time);
            }
            beat++;
        }
    } else {
        time = 1;
        beat = 1;
        if (metronome_active)
        {
            playSound(metronome_sound);
//            console.log("m " + time);
        }
    }

    // affichage de l'avancée dans la timeline
    document.getElementById('time').innerHTML = beat + " / " + beats ;

    // clignottement des dots metronome
    if (beat % 2 == 0) {

      dot1.style.backgroundColor = "#FF4F4F";
      dot2.style.backgroundColor = "";
    } else {
      
      dot1.style.backgroundColor = "";
      dot1.style.border = "1px #FF4F4F solid";
      dot2.style.backgroundColor = "#FF4F4F";

    }


//on regarde si il y a un son enregistré à cet instant (on arrondie)
    for (var i = 0; i < key_time.length; i++) {
        if (Math.round(key_time[i][0]) === time) {
            //on joue le son
            playSound(key_sounds[key_time[i][1]]);
            //on change son apparence
            activate_bouton(key_time[i][1]);
        }
    }
      deactivate_button();

    // beep different à chaque début de boucle
        if (time === 0) {

          metronome_sound = soundFiles[6];
        } else {
          metronome_sound = soundFiles[5];
        }

}

//------------------------------------
// Ecouteur pour clavier (touche pressée)
//------------------------------------





// On ajoute un listener pour la detection des touches
window.addEventListener('keydown', function (e) {

// on detecte si la touche w est pressee
    if (e.keyCode === 87) {
        get_time("W", time);
        activate_bouton("W");
// appelle la fonction lisant le son à chaque pression de w
//        playSound(key_sounds["W"]);
    }

    if (e.keyCode === 88) {
        get_time("X", time);
        activate_bouton("X");
// appelle la fonction lisant le son à chaque pression de w
//        playSound(key_sounds["X"]);
    }

    if (e.keyCode === 67) {
        get_time("C", time);
        activate_bouton("C");
// appelle la fonction lisant le son à chaque pression de w
//        playSound(key_sounds["C"]);
    }

    if (e.keyCode === 86) {
        get_time("V", time);
        activate_bouton("V");
// appelle la fonction lisant le son à chaque pression de w
//        playSound(key_sounds["V"]);
    }

    if (e.keyCode === 66) {
        get_time("B", time);
        activate_bouton("B");
// appelle la fonction lisant le son à chaque pression de w
//        playSound(key_sounds["B"]);
    }

    //Change le nombre de beats par boucle
    if (e.keyCode === 49 && beats > 1) {
        beats /= 2;
        beat_duration = duration / beats;
        draw_items(beats);
        beat = Math.floor(time / beat_duration) + 1;
        console.log(beats);
        console.log("beat actuel: " + beat);
        display_bpm();
    }
//augmente les beats
    if (e.keyCode === 50 && beats / duration < 0.2) {
        //on multiplie le nombre de beats par 2
        beats *= 2;
        //on recalcule la durée d'un beat
        beat_duration = duration / beats;
        //on recalcule à quel beat on est actuellement
        beat = Math.floor(time / beat_duration) + 1;
        //on redessine les indicateurs
        draw_items(beats);
        console.log(beats);
        console.log("beat actuel: " + beat);
        display_bpm();
    }

//change la longueur de la séquence
    if (e.keyCode === 51 && duration > 10) {
        duration -= 10;
        beat_duration = duration / beats;
        console.log(duration);
        display_bpm();
    }

    if (e.keyCode === 52 && duration < 900) {
        duration += 10;
        beat_duration = duration / beats;
        console.log(duration);
        display_bpm();
    }

//efface le dernier element placé en appuyant sur 0
    if (e.keyCode === 48) {
        key_time.pop();
        undo.style.backgroundColor = "white";
    }
//efface tout en appuyant sur backspace;
    if (e.keyCode === 8) {
        key_time = [];
        clear.style.backgroundColor = "white";
    }

//active desactive le metronome avec la touche 7
    if (e.keyCode === 55) {
        metronome_active = !metronome_active;
    }
//active desactive stick to beat touche 8
    if (e.keyCode === 56) {
        stick_to_beat = !stick_to_beat;
    }




});

//------------------------------
//------------------------------

//------------------------------------
// Ecouteur pour clavier (touche relevée)
//------------------------------------


window.addEventListener('keyup', function (e) {

  if (e.keyCode === 87 ) {

    boutons_creation[0].out.style.backgroundColor = "";
  }

  if (e.keyCode === 88) {

    boutons_creation[1].out.style.backgroundColor = "";
  }

  if (e.keyCode === 67) {

    boutons_creation[2].out.style.backgroundColor = "";
  }

  if (e.keyCode === 86) {

    boutons_creation[3].out.style.backgroundColor = "";
  }

  if (e.keyCode === 66) {

    boutons_creation[4].out.style.backgroundColor = "";
  }

  //efface le dernier element placé en appuyant sur 0
      if (e.keyCode === 48) {
          undo.style.backgroundColor = "";
      }
  //efface tout en appuyant sur backspace;
      if (e.keyCode === 8) {
          clear.style.backgroundColor = "";
      }


});

// fonction qui joue du son
function playSound(sound) {
    if (sound.currentTime > 0)
    {
        sound.pause();
        sound.currentTime = 0;
//        console.log("paused");
    }
    sound.play();
}

//Fonction pour ajouter du son
// on place la référence du son dans le tableau keytime
function get_time(key, t) {
    //si on colle au beat
    if (stick_to_beat === true) {

        var c = Math.floor(t / beat_duration);
        if (t % beat_duration < beat_duration / 2)
        {
            t = c * beat_duration + 1;
//            console.log("c: "+c+" t: "+t);
            playSound(key_sounds[key]);//!! placé ici pour éviter répétition
        } else
            t = (c * beat_duration) + beat_duration + 1;
//            console.log("c: "+c+" t: "+t);
        if (t > duration)
        {
            t = t - duration;
//            console.log("c: "+c+" t: "+t);
        }
    } else
    {
        playSound(key_sounds[key]);//!! placé ici pour éviter répétition
    }
    //on vérifie que ce son n'a pas déjà été placé à cet endroit
    for (var i = 0, len = key_time.length; i < len; i++)
    {
        if (key_time[i][0] === t && key_time[i][1] === key)
        {
            return;
        }
    }
    key_time.push([t, key]);
//    console.log("+ " + t);
}

//calculateur de bpm (renvoie les bpm)
function get_bpm(b, t)
{
    let seconds = Math.floor(t/100);
    let bpm = 60 * b / seconds;
    return bpm;
}


//-------------------------------------------------
//AFFICHAGE ---------------------------------------
//-------------------------------------------------

//affiche les bpm dans la page
function display_bpm()
{
    let parent = document.getElementById("bpm");
    parent.innerHTML = get_bpm(beats, duration)+' bpm';
}

//dessine les trucs autour du cercle
function draw_items(items)
{
    var rayon = browser_window_width / 8 - 4;
    //! soustraire la moitier de la largeur du div pour les x et de la hauteur pour les y
    var centreX = browser_window_width / 8 - 10;
    var centreY = browser_window_width / 8 - 2;

    destroy('items', 'cercle');
    for (var i = 0; i < items; i++)
    {
        //On calcule l'angle en degrés
        var angle = 360 / (items / i) - 90;
//        console.log("angle deg: " + angle);
        //On calcule l'angle en radiants
        angle = angle * Math.PI / 180.0;
//        console.log(angle);
        draw('items', angle, rayon, centreX, centreY, 'cercle');
    }
}

//dessine le truc qui tourne autour du cercle (à voir...)
function draw_bidule(t)
{
    var rayon = browser_window_width / 8 + 10;
    //! soustraire la moitier de la largeur du div pour les x et de la hauteur pour les y
    var centreX = browser_window_width / 8 - 5;
    var centreY = browser_window_width / 8 - 5;

    //On calcule l'angle en degrés
    var angle = 360 / (duration / t) - 90;
//    console.log("angle deg: " + angle);
    //On calcule l'angle en radiants
    angle = angle * Math.PI / 180.0;
//    console.log(angle);

    destroy('bidule', 'cercle');
    draw('bidule', angle, rayon, centreX, centreY, 'cercle');
}

//détruit tous les éléments avec la class class_name placés dans parent_id
function destroy(class_name, parent_id)
{
    var parent = document.getElementById(parent_id);
    //on efface le contenu du parent
    var rip = document.getElementsByClassName(class_name);
    if (rip.length > 0)
    {
        for (var i = rip.length - 1; i > -1; i--) {
            parent.removeChild(rip[i]);
        }
    }
}

//crée une div sur un cercle
function draw(class_name, angle, rayon, centreX, centreY, parent_id)
{

    var parent = document.getElementById(parent_id);
    var x = centreX + rayon * Math.cos(angle);
    var y = centreY + rayon * Math.sin(angle);
    var out = document.createElement("div");
    parent.appendChild(out);

    out.className = class_name;
    out.style.left = x + "px";
    out.style.top = y + "px";
//    out.style.transformOrigin = "50% 50%";

    out.style.webkitTransform = 'rotate(' + angle + 'rad)';
    out.style.mozTransform = 'rotate(' + angle + 'rad)';
    out.style.msTransform = 'rotate(' + angle + 'rad)';
    out.style.oTransform = 'rotate(' + angle + 'rad)';
    out.style.transform = 'rotate(' + angle + 'rad)';
}
