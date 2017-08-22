//sequenceur.js

//Presser sur des touches du clavier ou cliquer pour composer des boucles.

//A FAIRE:
//catégories pour fichiers audios

//en stick to beat -> jouer le son quand on presse la touche
//stocker un truc dans une variable skip_sound
//si le son n'existe pas déjà

//afficher les sons enregistrés sur le cercle

//optimiser la boule qui tourne autour du cercle

//placer curseur pour modifier le bpm

var timerID = null;//pour le timer...
var key_time = []; //tab à 2 dim non indéx Temps/touche
var soundFiles = [
    new Audio("library/sounds/sound1.mp3"),
    new Audio("library/sounds/sound2.mp3"),
    new Audio("library/sounds/sound3.mp3"),
    new Audio("library/sounds/sound4.mp3"),
    new Audio("library/sounds/sound5.mp3")];// Liste des objets audios (référence des fichiers son)

var audio_categories = [
    "Clap",
    "Kick"
];

//associassion Touche/Son
// tab à 1 dimension indéxée Touche/Son
var key_sounds = {
    "W": soundFiles[0],
    "X": soundFiles[1],
    "C": soundFiles[2],
    "V": soundFiles[3],
    "B": soundFiles[4]};
var duration = 600; // durée du cycle

var mesures = 8; //nombre de segments sur la timeline
var mesure_duration = duration / mesures;//durée d'un mesure
var mesure = 0; //mesure actuel

var beat_duration = duration / 4;
var beat = 1;

var stick_to_mesure = true; //le mode quantification est il actif ?
//timer
var timerStarted = false; //le timer est il actif ?
var time = 1; //position du curseur sur la timeline
var time_pause;//position du curseur au moment de la pause
var pause = false;//pour mettre en pause

var metronome_sound = soundFiles[1]; //le son du metronome
var metronome_active = false;//false pour éteindre le métronome

var clicked_button;//pour les boutons...

var soundFiles_buttons = [];//Array de boutons de fichiers sons à sélectionner (obj)

var boutons_creation = [];//Array de boutons pour créer des boucles de sons (obj)

var loaded = 0;//pour verifier que tous les fichiers audio à utiliser son en cache

var browser_window_width;

var bidule;
var bidule_draw = false;//true si bidule à été créé
var show_bidule = true;//affiche le bidule

var pointeur;//truc qui tourne autour du cercle


// s'excecute après le chargement de la page comme le init
//INIT -------------------------------

window.addEventListener('load', function () {

    //on prend la largeur de l'écran
    browser_window_width = window.innerWidth;
    //on dessine les trucs autour du cercle
    draw_items(mesures);

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
        soundFiles_buttons.push(new Button("sample " + (i < 10 ? "0" + (i + 1) : (i + 1)), "librarySamples_1", soundFiles[i], false));
//        soundFiles_buttons.push(new Button("sample " + (i < 10 ? "0" + (i + 1) : (i + 1)), "librarySamples_1", false));
    }


    // creation des boutons de creation de son
    for (i in key_sounds)
    {
        boutons_creation.push(new Button(i, "launchpad", key_sounds[i], true));
//        boutons_creation.push(new Button(i, "launchpad", true));
    }
    //On affiche les bpm
    display_bpm();

    //test: dessine cercle
//    draw_cercle(mesures);
    pointeur = new Pointeur('pointeur', 'cercle');
    pointeur.draw(time);
});

//FIN de l'init -----------------

//On détecte le changement de taille de la fenêtre du navigateur
window.onresize = function (event) {
    browser_window_width = window.innerWidth;
    draw_items(mesures);
//    draw_bidule(time);
    //bouge le bidule qui tourne autour du cercle
    pointeur.refresh_position();
//    pointeur.draw(time);
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
    }
}

// reprise du timer
window.addEventListener('keydown', function (e) {

    if (e.keyCode === 32 && pause === false) {
        time = time_pause;
        startTimer();
    }
});


// renvoie un bouton à partir de la lettre (l'intitulé ou k pour key) et l'array ou il se trouve (table)
function get_button_from_letter(k, table)
{
    for (var i = 0; i < table.length; i++) {
        if (table[i].key === k) {
            return table[i];
        }
    }
}
// une fonction qui permet de changer l'apparence d'un bouton
function activate_bouton(button)
{
    button.bouton_on = true;
    button.time_bouton_on = 10;

    button.out.style.transition = "0s";
    button.out.style.backgroundColor = "white";
}


//------------------------------------------
// TIMER
//------------------------------------------

function timer_sequencer() {
    if (time < duration) {
        time++;
        //bouge le bidule qui tourne autour du cercle
//        draw_bidule(time);
        pointeur.move(time);

        //si on passe une mesure sur la timeline
        if (time > beat * beat_duration)
        {
            //si le metronome est actif on joue un son
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

//on regarde si il y a un son enregistré à cet instant (on arrondie)
    for (var i = 0; i < key_time.length; i++) {
        if (Math.round(percentage_to_time(key_time[i][0])) === time) {
            //on joue le son
            playSound(key_sounds[key_time[i][1]]);
            //on change son apparence
//            activate_bouton(get_button_from_letter(key_time[i][1], boutons_creation));
            get_button_from_letter(key_time[i][1], boutons_creation).activate(100);
        }
    }


    //on réduit les décomptes des boutons ayant changé d'apparence
    //et on les remet à leur apparence d'origine si le décompte est à 0
//    for (var i = 0; i < boutons_creation.length; i++) {
//
//        if (boutons_creation[i].bouton_on) {
//
//            boutons_creation[i].time_bouton_on--; //la durée de changement de style se réduit jusqu'à zero dès que le bouton est allumé
////            console.log(boutons_creation[i].time_bouton_on);
//            if (boutons_creation[i].time_bouton_on <= 0) {
//                // lorsque la durée de changement atteint zero...
//                boutons_creation[i].bouton_on = false;
//                // on remet le style d'origine
//                boutons_creation[i].out.style.transition = "0.4s";
//                boutons_creation[i].out.style.backgroundColor = "";
//            }
//        }
//    }
}
//FIN TIMER

//------------------------------------
// Ecouteur pour clavier (touche pressée)
//------------------------------------



// On ajoute un listener pour la detection des touches
window.addEventListener('keydown', function (e) {
// on detecte si la touche w est pressee
    if (e.keyCode === 87) {
        get_time("W", time);
// appelle la fonction lisant le son à chaque pression de w
//        playSound(key_sounds["W"]);
    }

    if (e.keyCode === 88) {
        get_time("X", time);
// appelle la fonction lisant le son à chaque pression de w
//        playSound(key_sounds["X"]);
    }

    if (e.keyCode === 67) {
        get_time("C", time);
// appelle la fonction lisant le son à chaque pression de w
//        playSound(key_sounds["C"]);
    }

    if (e.keyCode === 86) {
        get_time("V", time);
// appelle la fonction lisant le son à chaque pression de w
//        playSound(key_sounds["V"]);
    }

    if (e.keyCode === 66) {
        get_time("B", time);
// appelle la fonction lisant le son à chaque pression de w
//        playSound(key_sounds["B"]);
    }

    //Change le nombre de mesures par boucle
    if (e.keyCode === 49 && mesures > 1) {
        mesures /= 2;
        mesure_duration = duration / mesures;
        draw_items(mesures);
        mesure = Math.floor(time / mesure_duration) + 1;
        console.log(mesures);
        console.log("mesure actuelle: " + mesure);
        display_bpm();
    }
//augmente les mesures
    if (e.keyCode === 50 && mesures / duration < 0.2) {
        //on multiplie le nombre de mesures par 2
        mesures *= 2;
        //on recalcule la durée d'un mesure
        mesure_duration = duration / mesures;
        //on recalcule à quelle mesure on est actuellement
        mesure = Math.floor(time / mesure_duration) + 1;
        //on redessine les indicateurs
        draw_items(mesures);
        console.log(mesures);
        console.log("mesure actuel: " + mesure);
        display_bpm();
    }

//change la longueur de la séquence
    if (e.keyCode === 51 && duration > 10) {
        duration -= 10;
        mesure_duration = duration / mesures;
        beat_duration = duration / 4;
        console.log(duration);
        display_bpm();
    }

    if (e.keyCode === 52 && duration < 900) {
        duration += 10;
        mesure_duration = duration / mesures;
        beat_duration = duration / 4;
        console.log(duration);
        display_bpm();
    }

//efface le dernier element placé en appuyant sur 0
    if (e.keyCode === 48) {
        key_time.pop();
    }
//efface tout en appuyant sur backspace;
    if (e.keyCode === 8) {
        key_time = [];
    }

//active desactive le metronome avec la touche 7
    if (e.keyCode === 55) {
        metronome_active = !metronome_active;
    }
//active desactive stick to mesure touche 8
    if (e.keyCode === 56) {
        stick_to_mesure = !stick_to_mesure;
    }
});

//------------------------------
//------------------------------


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
    //si on colle au mesure
    if (stick_to_mesure === true) {

        var c = Math.floor(t / mesure_duration);
        if (t % mesure_duration < mesure_duration / 2)
        {
            t = c * mesure_duration + 1;
//            console.log("c: "+c+" t: "+t);
            playSound(key_sounds[key]);//!! placé ici pour éviter répétition
        } else
            t = (c * mesure_duration) + mesure_duration + 1;
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
        if (percentage_to_time(key_time[i][0]) === t && key_time[i][1] === key)
        {
            return;
        }
    }
    key_time.push([time_to_percentage(t), key]);
//    key_time.push([t, key]);
    //on change l'apparence du bouton
//    activate_bouton(get_button_from_letter(key, boutons_creation));
    get_button_from_letter(key, boutons_creation).activate(100);
//    console.log("+ " + t);
}

//calculateur de bpm (renvoie les bpm)
function get_bpm(b, t)
{
    let seconds = t / 100;
    let bpm = 60 * (b / seconds);
    return Math.round(bpm);
}


//-------------------------------------------------
//AFFICHAGE ---------------------------------------
//-------------------------------------------------

//affiche les bpm dans la page
function display_bpm()
{
    let parent = document.getElementById("bpm");
    parent.innerHTML = get_bpm(4, duration) + ' bpm';
    console.log("affiche bpm");
}

//dessine les trucs autour du cercle
function draw_items(items)
{
    var img = document.getElementById('img_cercle');
    //on se base sur la taille de l'image du cercle
    var centreX = img.clientWidth / 2 - 10;
    var centreY = img.clientHeight / 2 - 2;
    var rayon = img.clientWidth / 2;

    destroy('beats', 'cercle');
    destroy('mesures', 'cercle');
    for (var i = 0; i < items; i++)
    {
        //On calcule l'angle en degrés
        var angle = 360 / (items / i) - 90;
//        console.log("angle deg: " + angle);

        //si c'est un beat:
        if (angle % 90 === 0)
        {
            //On calcule l'angle en radiants
            angle = angle * Math.PI / 180.0;
//        console.log(angle);
            draw('beats', angle, rayon, centreX, centreY, 'cercle');
        }
        //si c'est une mesure:
        else
        {
            //On calcule l'angle en radiants
            angle = angle * Math.PI / 180.0;
//        console.log(angle);
            draw('mesures', angle, rayon, centreX + 5, centreY + 2, 'cercle');
        }
    }
}



//dessine le truc qui tourne autour du cercle (à voir...)
//function draw_bidule(t)
//{
//    var img = document.getElementById('img_cercle');
//    //on se base sur la taille de l'image du cercle
//    var centreX = img.clientWidth / 2 - 5;
//    var centreY = img.clientHeight / 2 - 5;
//    var rayon = img.clientHeight / 2 + 10;
//
//    //On calcule l'angle en degrés
//    var angle = 360 / (duration / t) - 90;
////    console.log("angle deg: " + angle);
//    //On calcule l'angle en radiants
//    angle = angle * Math.PI / 180.0;
////    console.log(angle);
//
//    destroy('bidule', 'cercle');
//    draw('bidule', angle, rayon, centreX, centreY, 'cercle');
//    bidule_draw = true;
//}


//dessine un cercle déformable en svg
//function draw_cercle(items)
//{
//
//    var parent = document.getElementById('cercle');
//    var img = document.getElementById('img_cercle');
//    //on se base sur la taille de l'image du cercle
//    var centreX = img.clientWidth / 2 - 5;
//    var centreY = img.clientHeight / 2 - 5;
//    var rayon = img.clientHeight / 2 -6;
//
//
//    destroy('moncercle', 'cercle');
//    var svg = '<?xml version="1.0" standalone="no"?><svg width="'+img.clientWidth+'" height="'+img.clientHeight+'" version="1.1" xmlns="http://www.w3.org/2000/svg">';
//
//    for (var i = 0; i < items; i++)
//    {
//        //On calcule l'angle en degrés
//        var angle = 360 / (items / i) - 90;
////        console.log("angle deg: " + angle);
//        //On calcule l'angle en radiants
//        angle = angle * Math.PI / 180.0;
////        console.log(angle);
//        var x = Math.round(centreX + rayon * Math.cos(angle));
//        var y = Math.round(centreY + rayon * Math.sin(angle));
//        
//        if (i > 0)
//        {
//            svg += x + '" y2="' + y + '" stroke="orange" fill="transparent" stroke-width="5"/>';
//        }
//        if (i < items - 1)
//        {
//            svg += '<line x1="' + x + '" x2="' + y + '" y1="';
//        }
//    }
//            svg += '</svg>';
//            console.log(svg);
//    var out = document.createElement("object");
//    out.innerHTML += svg;
////    out.data = svg;
////    out.type="image/svg+xml";
////    parent.appendChild(out);
////
////    out.className = 'moncercle';
////    out.style.left = 0 + "px";
////    out.style.top = 0 + "px";
//}

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
//
////déplace div sur un cercle
//function move_bidule(t)
//{
//
//    var img = document.getElementById('img_cercle');
//    //on se base sur la taille de l'image du cercle
//    var centreX = img.clientWidth / 2 - 5;
//    var centreY = img.clientHeight / 2 - 5;
//    var rayon = img.clientHeight / 2 -6;
//    
//    var allout = document.getElementsByClassName('bidule');
//    var out = allout[0];
//    var x = centreX + rayon * Math.cos(angle);
//    var y = centreY + rayon * Math.sin(angle);
//    
//    //On calcule l'angle en degrés
//    var angle = 360 / (duration / t) - 90;
//    //On calcule l'angle en radiants
//    angle = angle * Math.PI / 180.0;
//    
//    
//    out.style.left = x + "px";
//    out.style.top = y + "px";
////    out.style.transformOrigin = "50% 50%";
//
//    out.style.webkitTransform = 'rotate(' + angle + 'rad)';
//    out.style.mozTransform = 'rotate(' + angle + 'rad)';
//    out.style.msTransform = 'rotate(' + angle + 'rad)';
//    out.style.oTransform = 'rotate(' + angle + 'rad)';
//    out.style.transform = 'rotate(' + angle + 'rad)';
//}

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

    return out;
}

//        renvoie un pourcentage par rapport à la durée de la boucle
function time_to_percentage(t)
{
    return t / duration * 100;
}

//        renvoie un repère de temps par rapport au pourcentage
function percentage_to_time(p)
{
    return duration / 100 * p;
}