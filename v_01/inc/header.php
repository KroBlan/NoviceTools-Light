<!-- HEADER: MOBILE -->

<header id="mobileHeader" class="fade-in">
    <!-- OUVRIR LE MOBILE MENU -->
    <div id='mobilemenu_id' class="mobilemenuOpen">
        <img src="img/menu.png" alt="☰"/>
    </div>

    <!-- LE CONTENU MOBILE MENU -->
    <nav class="mobilemenu">
        <div id='mobilemenuClose' class='mobilemenuClose'>
            <img src="img/close.png" alt="fermer le menu"/>
        </div>

        <ul>
            <?php
            if (isset($_SESSION ['nom'])) {
                echo '<li>' . $_SESSION ['nom'] . '</li>';
                echo '<li><a href="myprofil.php">mon profil</a></li>';
                echo '<li><a href="mysounds.php">mes sons</a></li>';
                echo '<li><a href="logout.php">se déconnecter</a></li>';
            } else {
                echo "<li><a href='registration.php'>créer un compte</a></li>";
                echo '<li><a href="login.php">se connecter</a></li>';
            }
            ?>

        </ul>

    </nav>
</header>

<!-- HEADER: FULL SCREEN -->
<header id="mainHeader">

    <!-- LE LOGO -->
    <div id="logo">
        <a href="index.php"> <img src="img/logo.svg" alt="Logo BeatzNbitz" title='BeatzNbitz' /></a>
    </div> 

    <!-- LE MENU -->
    <nav id="menuMain">
        <ul>
            <?php
            if (isset($_SESSION ['nom'])) {
                echo '<li>' . $_SESSION ['nom'] . '</li>';
                echo '<li><a href="myprofil.php">mon profil</a></li>';
                echo '<li><a href="mysounds.php">mes sons</a></li>';
                echo '<li><a href="logout.php">se déconnecter</a></li>';
            } else {
                echo "<li><a href='registration.php'>créer un compte</a></li>";
                echo '<li><a href="login.php">se connecter</a></li>';
            }
            ?>
        </ul>
    </nav> 
</header>