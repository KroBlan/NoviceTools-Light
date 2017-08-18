var soundFile; //le fichier son
var timerID = null;
var duration = 600; // durée du cycle
var bpm;
var key_sounds = []; // tab à 1 dimension indéxée Touche/Son
var key_time = []; //tab à 2 dim non indéx Temps/touche
var soundFiles = [];
var beats = 8; //nombre de segments sur la timeline
var beat_duration = 0.0;//durée d'un beat
var beat = 0; //beat actuel
var stick_to_beat = true; //le mode quantification est il actif ?
//timer
var timerStarted = false; //le timer est il actif ?
var time = 1; //position du curseur sur la timeline
var time_pause;//position du curseur au moment de la pause
var pause = true;

var metronome_sound = ""; //le son du metronome
var metronome_active = true;

var bouton_w;
var bouton_x;
var bouton_c;
var bouton_v;
var bouton_b;


var sound_duration;//durée du sample
var timerId_bouton = null;//timer de l'enclenchement des couleur
var bouton_on = false;

// s'excecute après le chargement de la page comme le init
window.addEventListener('load', function () {

   bouton_w = document.getElementById('w');
   bouton_x = document.getElementById('x');
   bouton_c = document.getElementById('c');
   bouton_v = document.getElementById('v');
   bouton_b = document.getElementById('b');
//A placer dans fonction pour choisir les beats
    beat_duration = duration / beats;
// Pour declarer une nouvelle source sonore
    soundFiles = [
        new Audio("library/sounds/sound1.mp3"),
        new Audio("library/sounds/sound2.mp3"),
        new Audio("library/sounds/sound3.mp3"),
        new Audio("library/sounds/sound4.mp3"),
        new Audio("library/sounds/sound5.mp3"),
        new Audio("library/sounds/click.mp3"),
        new Audio("library/sounds/beep2.mp3")];

    key_sounds = {
        "W": soundFiles[0],
        "X": soundFiles[1],
        "C": soundFiles[2],
        "V": soundFiles[3],
        "B": soundFiles[4]};

          // metronome_sound = soundFiles[5];
          soundFiles[6].volume = 0.1;
    startTimer();
});


function startTimer() {
    if (timerStarted === false) {
        timerId = window.setInterval("timer_sequencer()", 10);
    }
    timerStarted = true;
}

function allume_bouton () {

  timerId_bouton = window.setInterval("timer_bouton()", sound_duration);
}

function timer_bouton () {
  bouton_on = true;
  bouton_w.style.backgroundColor = "#16125A";
}

function off_bouton () {

  if (sound_duration === sound_duration) {
    bouton_on = false;
    window.clearInterval(timerId_bouton);
  }

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

    if (e.keyCode === 32 && pause === true) {
        time = time_pause;
        startTimer();
    }
    timerStarted = false;

});



function timer_sequencer() {

    if (time < duration) {
        time++;
        if (time > beat * beat_duration + beat_duration)
        {
            if (metronome_active)
            {
                playSound(metronome_sound);

            }
            beat++;
        }
    } else {
        time = 1;
        beat = 0;
        if (metronome_active)
        {
            playSound(metronome_sound);
        }
    }

    for (var i = 0; i < key_time.length; i++) {

        if (time === key_time[i][0]) {
            playSound(key_sounds[key_time[i][1]]);

            if (key_time[i][1] === "W") {

              allume_bouton();

              sound_duration = soundFiles[0].duration * 10 ;
              console.log(key_time[i][1]);
              console.log(sound_duration);

            }
        }
    }

// beep different à chaque début de boucle
    if (beat === 0) {

      metronome_sound = soundFiles[6];
    } else {
      metronome_sound = soundFiles[5]};


}


// On ajoute un listener pour la detection des touches
window.addEventListener('keydown', function (e) {
// on detecte si la touche w est pressee
    if (e.keyCode === 87) {
        get_time("W", time);
        bouton_w.style.backgroundColor = "#16125A";
// appelle la fonction lisant le son à chaque pression de w
        playSound(key_sounds["W"]);
    }

    if (e.keyCode === 88) {
        get_time("X", time);
        bouton_x.style.backgroundColor = "#16125A";
// appelle la fonction lisant le son à chaque pression de w
        playSound(key_sounds["X"]);
    }

    if (e.keyCode === 67) {
        get_time("C", time);
        bouton_c.style.backgroundColor = "#16125A";
// appelle la fonction lisant le son à chaque pression de w
        playSound(key_sounds["C"]);
    }

    if (e.keyCode === 86) {
        get_time("V", time);
        bouton_v.style.backgroundColor = "#16125A";
// appelle la fonction lisant le son à chaque pression de w
        playSound(key_sounds["V"]);
    }

    if (e.keyCode === 66) {
        get_time("B", time);
        bouton_b.style.backgroundColor = "#16125A";
// appelle la fonction lisant le son à chaque pression de w
        playSound(key_sounds["B"]);
    }

    //Boutons:
    // Nombre de divisions par sequences (multiples de 4)
    if (e.keyCode === 49 && beats > 1) {
        beats-=4;
        beat_duration = duration / beats;
        console.log(beats);
    }

    if (e.keyCode === 50 && beats / duration < 0.2) {
        beats+=4;
        beat_duration = duration / beats;
        console.log(beats);
    }

    // Durée de la sequence
    if (e.keyCode === 51 && duration > 10) {
        duration -= 10;
        beat_duration = duration / beats;
        console.log(duration);
    }

    if (e.keyCode === 52 && duration < 900) {
        duration += 10;
        beat_duration = duration / beats;
        console.log(duration);
    }

    // if (e.keyCode === 38) {
    //   beat_duration +=1;
    //   console.log(beat_duration);
    // }
    //
    // if (e.keyCode === 40) {
    //   beat_duration -=1;
    //   console.log(beat_duration);
    // }

//efface le dernier element placé en appuyant sur 0
    if (e.keyCode === 48) {
        key_time.pop();
    }
//efface tout en appuyant sur backspace;
    if (e.keyCode === 8) {
        key_time = [];
    }

//metronome
    if (e.keyCode === 55) {
    metronome_active = !metronome_active;
    }
//stick to beat
    if (e.keyCode === 56) {
    stick_to_beat = !stick_to_beat;
    }
});

// detection d'evenement lorsque les touches sons sont relevées
window.addEventListener('keyup', function(e) {

    if (e.keyCode === 87 ) {

      bouton_w.style.backgroundColor = "";
    }

    if (e.keyCode === 88) {

      bouton_x.style.backgroundColor = "";
    }

    if (e.keyCode === 67) {

      bouton_c.style.backgroundColor = "";
    }

    if (e.keyCode === 86) {

      bouton_v.style.backgroundColor = "";
    }

    if (e.keyCode === 66) {

      bouton_b.style.backgroundColor = "";
    }

});
// fonction qui joue du son
function playSound(sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
}

// on récupère t dans le tableau temps/touche
function get_time(key, t) {
    if (stick_to_beat === true) {

        var c = t / beat_duration;
        if (t % beat_duration < beat_duration / 2)
        {
            t = c * beat_duration;
        } else
            t = (c * beat_duration) + beat_duration;
    }
    key_time.push([t, key]);
}
bpm = duration / 7.5;
console.log(bpm);
