<?php
// on ouvre le session
session_start();
?>
<!DOCTYPE html>
<html lang="fr" class="no-js">
    <head>
        <?php include 'inc/config.php' ?>

        <!-- TITRE PAGE -->
        <title>BeatzNbitz : Make your beats easy</title>

        <!-- SCRIPTS SEQUENCEUR -->
        <script src="js/sequenceur.js" type="text/javascript"></script>
        <script src="js/class_button.js" type="text/javascript"></script>
        <script src="js/dnd.js" type="text/javascript"></script>

        <!-- CSS PRELOAD -->
        <link href="css/preload/effect.css" rel="stylesheet" type="text/css"/>

        <!-- SCRIPTS PRELOAD -->
        <script src="js/preload/modernizr.custom.js" type="text/javascript"></script>

    </head>

    <body>

        <!-- PRELOAD PAGE -->
<!--                <div id="ip-container" class="ip-container">
                    <header class="ip-header">     
                        <div class="logo-bnb">
                            <img src="img/logo.svg" alt="Logo BeatzNbitz" title='BeatzNbitz' width="300px" height="300px"/>
        
                        </div> 
                        <div class="ip-loader">
                            <svg class="ip-inner" width="60px" height="60px" viewBox="0 0 80 80">
                            <path class="ip-loader-circlebg" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"/>
                            <path id="ip-loader-circle" class="ip-loader-circle" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"/>
                            </svg>
        
                        </div>
                    </header>
                </div>-->

        <main>
            <?php include 'inc/header.php'; ?>

            <!-- NO JS MESSAGE -->
            <noscript>
            <div class="nojs">
                <div class="nojsmessage">
                    Activez Javascript
                </div>
            </div>
            </noscript>

            <!-- MIDDLE PAGE -->
            <div class="middlepage">
                <!-- LE CONTENU -->
                <div id="container" class="container">

<!--                    <div id="icon_right">-->
                        <!-- LA LIBRARIE -->
                        <div id="library">
                            <div id='libraryOpen_id' class="libraryOpen">
                                <img src="img/soundlibrary.png" alt="Librairie de samples" title='Librairie de samples'/>
                            </div>
                            <div id="library_content" class="libraryOpened fade-in">

                                <div id='libraryClose_id' class="libraryClose">
                                    <img src="img/close.png" alt="Fermer la librairie" title='Fermer la librairie'/>

                                </div>
                                <div class="libraryMain">
                                    <div class="libraryContent">
                                        <h2>LIBRAIRIE DE SAMPLE</h2>
                                    </div>
                                    <div class="libraryCategories">
                                        <ul>
                                            <li><a href="#">categorie 1</a></li>
                                            <li><a href="#">categorie 2</a></li>
                                            <li><a href="#">categorie 3</a></li>
                                            <li><a href="#">categorie 4</a></li>
                                            <li><a href="#">categorie 5</a></li>
                                            <li><a href="#">categorie 6</a></li>
<!--                                            <li>
                                                <form id="searchForm" name="identification" action="#" method="post">
                                                    <div class="profil_input">
                                                        <input type="text"
                                                               name="search"
                                                               id="search"
                                                               value=""
                                                               placeholder="rechercher"
                                                               maxlength="24"
                                                               required>
                                                    </div>
                                                </form>
                                            </li>-->
                                        </ul>
                                    </div>

                                    <div id="librarySamples_1" class="librarySamples">

                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- LES OPTIONS -->
                        <div id="options">
                            <div id='optionsOpen_id' class="optionsOpen">
                                <img src="img/settings.png" alt="Les options" title="Les options"/>
                            </div>
                            <div id="options_content" class="optionsOpened fade-in">
                                <div id='optionsClose_id' class="optionsClose">
                                    <img src="img/close.png" alt="Fermer les options" title="Fermer les options"/>
                                </div>

                                <div class="libraryMain">
                                    <div class="libraryContent">
                                        <h2>LES OPTIONS</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- SHARE -->
                        <div id="share">
                            <div id='shareOpen_id' class="shareOpen">
                                <img src="img/share.png" alt="Partager" title="Partager"/>
                            </div>
                            <div id="share_content" class="shareOpened fade-in">
                                <div id='shareClose_id' class="shareClose">
                                    <img src="img/close.png" alt="Fermer" title="Fermer"/>
                                    <div class="libraryMain">
                                        <div class="libraryContent">
                                            <h2>PARTAGEZ VOTRE CREATION</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- FULL SCREEN -->
                        <div id="fullscreen">
                            <div id='fullscreenOpen_id' class="fullscreenOpen">
                                <img src="img/fullscreen.png" alt="Mode plein écran" title="Mode plein écran"/>
                            </div>
                        </div>
<!--                    </div>-->

                    <!-- LE CERCLE MUSICAL -->
                    <div id="cercle_container">
                        <div id="cercle">
                            <img id="img_cercle" src="img/cercle.svg" alt="Cercle"/>
                        </div>
                        <div id="cercle_background">
                            <div id="cercle_logo">
                                <img src="img/logo_beatznbitz_textonly_red.png" alt="Logo BeatzNbitz" title='BeatzNbitz'/>         
                                <h3 id="bpm">126</h3>
                            </div> 
                        </div>


                    </div>
                </div>

                <!-- OUVRIR/FERMER LES CONTROLS -->
                <div id="openControls">
                    <div id='openControls_id' class="controlsOpen">
                        <img src="img/up.png" alt="Ouvrir" title='Ouvrir'/>
                    </div>
                    <div id='closeControls_id' class="controlsClose">
                        <img src="img/down.png" alt="Fermer" title='Fermer'/>
                    </div>
                </div>

                <!-- LES OUTILS UTILISATEURS -->
                <div id="user_controls" class="user_controls">

                    <!-- REGLAGES: métronome, bpm -->
                    <div id="settings">
                        <div id='metronome'>
                            <!--                            <img src="img/metronome_color.png" alt=""/>-->
                            <div id='metronome_1'></div>
                            <div id='metronome_2'></div>
                        </div>
                        <div id='sync'>
                            SYNC
                        </div>
                        <div id='time'>
                            06.93 / 11:21
                        </div>

                    </div>

                    <!-- LE LAUNCHPAD -->
                    <div id="launchpad">



                    </div>



                    <!-- LES OPTIONS: Play, pause, reset... -->
                    <div id="tools">
                        <div class="tools">
                            <img src="img/undo.svg" alt="Revenir en arrière" title='Revenir en arrière'/>

                        </div>
                        <div class="tools">
                            <img src="img/play-arrow.svg" alt="Play / Pause" title="Play / Pause"/>

                        </div>
                        <div class="tools">
                            <img src="img/clear.svg" alt="Remettre à zéro" title="Remettre à zéro"/>

                        </div>

                        <?php if (isset($_SESSION['id']) && isset($_SESSION['pseudo'])) { ?>

                            <div class="tools">
                                <img src="img/record.svg" alt="Enregistrer" title="Enregistrer"/>

                            </div>

                            <div class="tools">
                                <img src="img/download.svg" alt="Télécharger" title="Télécharger"/>

                            </div>
                        <?php } ?>
                    </div>

                </div>
            </div>
            <!-- LE FOOTER -->
            <?php include 'inc/footer.php'; ?>

        </main>

        <script src="js/preload/classie.js"></script>
        <script src="js/preload/pathLoader.js"></script>
        <script src="js/preload/main.js"></script>
    </body>
</html>