window.addEventListener('load', function () {
// EVENTS DETECTION DE CLICK
    let menuOpen = document.getElementById('mobilemenu_id');
    menuOpen.addEventListener("click", mobilemenuOpen_fx);

    let menuClose = document.getElementById('mobilemenuClose');
    menuClose.addEventListener("click", mobilemenuClose_fx);
      
    // -----
    
    let libraryOpen = document.getElementById('libraryOpen_id');
    libraryOpen.addEventListener("click", libraryOpen_fx);

    let libraryClose = document.getElementById('libraryClose_id');
    libraryClose.addEventListener("click", libraryClose_fx);

    // -----

    let controlsOpen = document.getElementById('openControls_id');
    controlsOpen.addEventListener("click", controlsOpen_fx);

    let controlsClose = document.getElementById('closeControls_id');
    controlsClose.addEventListener("click", controlsClose_fx);

    // -----

    let shareOpen = document.getElementById('shareOpen_id');
    shareOpen.addEventListener("click", shareOpen_fx);

    let shareClose = document.getElementById('shareClose_id');
    shareClose.addEventListener("click", shareClose_fx);

    // -----

    let optionsOpen = document.getElementById('optionsOpen_id');
    optionsOpen.addEventListener("click", optionsOpen_fx);

    let optionsClose = document.getElementById('optionsClose_id');
    optionsClose.addEventListener("click", optionsClose_fx);
    
    
    // -----

    let fullscreen = document.getElementById('fullscreenOpen_id');
    fullscreen.addEventListener("click", fullscreen_fx);


    // -----



//    False = fermé / True =  ouvert
    let library = false;
    let options = false;
    let share = false;
    let controls = true;
    let menumobile = true;


});

// OUVRIR LE MENU MOBILE
function mobilemenuOpen_fx() {
    document.querySelector('.mobilemenu').style.display = 'block';
    document.querySelector('.mobilemenuOpen').style.display = 'none';
    document.querySelector('.mobilemenuClose').style.display = 'block';
    document.getElementById('mobilemenu_id').className += ' display_none';
    document.getElementById('mobilemenuClose').className = 'mobilemenuClose';
    document.querySelector('.middlepage').style.display = 'none';
    menumobile = false;
}

// FERMER LE MENU MOBILE
function mobilemenuClose_fx() {
    document.querySelector('.mobilemenu').style.display = 'none';
    document.querySelector('.mobilemenuOpen').style.display = 'block';
    document.querySelector('.mobilemenuClose').style.display = 'none';
    document.getElementById('mobilemenu_id').className = 'mobilemenuOpen';
    document.getElementById('mobilemenuClose').className += ' display_none';
    document.querySelector('.middlepage').style.display = 'block';
    menumobile = true;
}

// OUVRE LA LIBRAIRIE
function libraryOpen_fx() {
    document.querySelector('.libraryOpened').style.display = 'block';
    document.querySelector('.libraryOpen').style.display = 'none';
    document.querySelector('.libraryClose').style.display = 'block';
//    document.getElementById('cercle_container').className = 'display_none';

    library = true;
}

// FERME LA LIBRAIRIE
function libraryClose_fx() {
    document.querySelector('.libraryClose').style.display = 'none';
    document.querySelector('.libraryOpen').style.display = 'block';
    document.querySelector('.libraryOpened').style.display = 'none';
//    document.getElementById('cercle_container').className = 'cercle_container';

    library = false;
}

// OUVRE LES OPTIONS
function optionsOpen_fx() {
    document.querySelector('.optionsOpened').style.display = 'block';
    document.querySelector('.optionsOpen').style.display = 'none';
    document.querySelector('.optionsClose').style.display = 'block';
    document.querySelector('.libraryOpen').style.display = 'none';
    controls = true;
}

// FERME LES OPTIONS
function optionsClose_fx() {
    document.querySelector('.optionsClose').style.display = 'none';
    document.querySelector('.optionsOpen').style.display = 'block';
    document.querySelector('.optionsOpened').style.display = 'none';
    document.querySelector('.libraryOpen').style.display = 'block';
    controls = false;
}

// OUVRE SHARE
function shareOpen_fx() {
    document.querySelector('.shareOpened').style.display = 'block';
    document.querySelector('.shareOpen').style.display = 'none';
    document.querySelector('.shareClose').style.display = 'block';
    document.querySelector('.libraryOpen').style.display = 'none';
    document.querySelector('.optionsClose').style.display = 'none';
    document.querySelector('.optionsOpen').style.display = 'none';
    share = true;
}

// FERME SHARE
function shareClose_fx() {
    document.querySelector('.shareClose').style.display = 'none';
    document.querySelector('.shareOpen').style.display = 'block';
    document.querySelector('.shareOpened').style.display = 'none';
    document.querySelector('.libraryOpen').style.display = 'block';
    document.querySelector('.optionsOpen').style.display = 'block';
    share = false;
}


// OUVRE LES CONTROLS
function controlsOpen_fx() {
    document.querySelector('.user_controls').style.display = 'block';
    document.querySelector('.controlsOpen').style.display = 'none';
    document.querySelector('.controlsClose').style.display = 'block';
    document.querySelector('.container').style.minHeight = '60vh';
    document.querySelector('.container').style.maxHeight = '60vh';
    controls = false;
}

//FERME LES CONTROLS
function controlsClose_fx() {
    document.querySelector('.user_controls').style.display = 'none';
    document.querySelector('.controlsOpen').style.display = 'block';
    document.querySelector('.controlsClose').style.display = 'none';
    document.querySelector('.container').style.minHeight = '85vh';
    document.querySelector('.container').style.maxHeight = '85vh';
    controls = true;
}

// MODE PLEIN ECRAN ON/OFF 
function fullscreen_fx() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        // Taille de l'écran
        taiEX = window.screen.width;
        taiEY = window.screen.height;
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.msCancelFullScreen) {
            document.msCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        taiEX = window.screen.width;
        taiEY = window.screen.height;
    }
}
