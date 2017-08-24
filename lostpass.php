<?php
// on ouvre le session
session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <?php include 'inc/config.php' ?>

        <!-- TITRE PAGE -->
        <title>Mot de passe oublié</title>
    </head>
    <body>

        <main>
            <!-- LE HEADER -->
            <?php include 'inc/header.php' ?>

            <?php
            if (isset($_SESSION['session_id']) && isset($_SESSION['id']) && isset($_SESSION['pseudo'])) {
                echo '<div class="main_container">';
                echo '<div class="container_connexion">';
                echo '<h1>Vous êtes déjà connecté...';
                echo '</div></div>';
                header('location: ./index.php');
                exit;
            } else {
                ?>


                <!-- LE MAIN CONTAINER -->
                <div class="main_container">

                    <!-- SE CONNECTER -->
                    <div class="container_connexion">
                        <h1>MOT DE PASSE OUBLIÉ</h1>
                        <form id="connexionForm" name="identification" action="login.php" method="post">
                            <div id="connexionContent">
                                <div class="profil_input">
                                    <input type="email"
                                           name="email"
                                           id="email"
                                           value=""
                                           placeholder="entrez votre email"
                                           maxlength="64"
                                           required>
                                </div>
                                <div id="alert" class="alert">
                                </div>
                                <div class="profil_submit">
                                    <input type="button" value="REINITIALISER">
                                </div>
                                Un email vous sera envoyer pour réinitialiser votre mot de passe
                               
                            </div>
                            <a href="registration.php">Pas encore inscrit ?</a>
                            -
                            <a href="login.php">Déjà inscrit ?</a>
                        </form>

                    </div>
                </div>

                <?php
            }
            ?>

            <!-- LE FOOTER -->
            <?php include 'inc/footer.php' ?>


        </main>
    </body>
</html>
