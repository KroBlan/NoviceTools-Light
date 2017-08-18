var timerId_bouton = null;//timer de l'enclenchement des couleur

function allume_bouton () {

  timerId_bouton = window.setInterval("timer_bouton()", sound_duration);
}

function timer_bouton () {

  bouton_w.style.backgroundColor = "#16125A";
}
