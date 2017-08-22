<!-- HEADER: MOBILE -->

<header id="mobileHeader" class="fade-in">
    <!-- OUVRIR LE MOBILE MENU -->
    <div id='mobilemenu_id' class="mobilemenuOpen">
        <img src="img/menu.png" alt="☰"/>
    </div>

    <!-- LE CONTENU MOBILE MENU -->
    <nav class="mobilemenu">
        <!--        <div id='mobilemenuClose' class='mobilemenuClose'>
                    <img src="img/close.png" alt="X"/>
                </div>-->

        <ul>

            <?php
            if (isset($_SESSION['id']) && isset($_SESSION['pseudo'])) {
                echo "<li id='mobilemenuClose' class='mobilemenuClose'><img src='img/close.png' alt='X'/></li>";
                if (isset($_SESSION['admin'])) {
                    echo '<li>admin : ' . $_SESSION ['admin'] . '</li>';
                    echo '<li><a href="godboard.php">dashboard</a></li>';
                } else {
                    echo '<li>' . $_SESSION ['pseudo'] . '</li>';
                }
                echo '<li><a href="index.php">Accueil</a></li>';
                echo '<li><a href="myprofil.php">mon profil</a></li>';
                echo '<li><a href="mysounds.php">mes sons</a></li>';
                echo '<li><a href="logout.php">se déconnecter</a></li>';
            } else {
                echo "<li id='mobilemenuClose' class='mobilemenuClose'><img src='img/close.png' alt='X'/></li>";
                echo '<li><a href="index.php">Accueil</a></li>';
                echo "<li><a href='registration.php'>créer un compte</a></li>";
                echo '<li><a href="login.php">se connecter</a></li>';
            }
            ?>
            <br>
            <br>
            <li><a href="about.php">à propos</a></li>
            <li><a href="mentionslegales.php">mentions légales</a></li>
            <li>2017 copyright</li>
        </ul>


    </nav>
</header>

<!-- HEADER: FULL SCREEN -->
<header id="mainHeader">

    <!-- LE LOGO -->
    <div id="logo">
        <a href="index.php"> <img src="img/logo.svg" alt="Logo BeatzNbitz" title='BeatzNbitz' width="32" height="32" /></a>
    </div> 

    <!-- LE MENU -->
    <nav id="menuMain">
        <ul>
            <?php
            if (isset($_SESSION['id']) && isset($_SESSION['pseudo'])) {
                if (isset($_SESSION['admin'])) {
                    echo '<li>admin : ' . $_SESSION ['admin'] . '</li>';
                    echo '<li><a href="godboard.php">dashboard</a></li>';
                } else {
                    echo '<li>' . $_SESSION ['pseudo'] . '</li>';
                }

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