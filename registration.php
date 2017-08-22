<?php
// on ouvre le session
session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <?php include 'inc/config.php' ?>

        <!-- TITRE PAGE -->
        <title>Créer un compte</title>
    </head>
    <body>

        <main>
            <!-- LE HEADER -->

            <?php include 'inc/header.php' ?>

            <?php
            if (isset($_SESSION['id']) && isset($_SESSION['pseudo'])){
                echo '<div class="main_container">';
                echo '<div class="container_connexion">';
                echo '<h1>Vous êtes déjà inscrit...';
                echo '</div></div>';
                header('location: ./index.php');
                exit;
            } else {
                ?>


                <!-- LE MAIN CONTAINER -->
                <div class="main_container">

                    <!-- SE CONNECTER -->
                    <div class="container_connexion">
                        <h1>CRÉER UN COMPTE</h1>
                        <form id="connexionForm" name="identification" action="treat_registration.php" method="post">
                            <div id="inscriptionContent">
                                <div class="profil_input">
                                    <input type="text"
                                           name="identifiant"
                                           id="identifiant"
                                           value="test"
                                           placeholder="votre pseudo"
                                           maxlength="24"
                                           required>
                                </div>


                                <div class="profil_input">
                                    <input type="password"
                                           name="password"
                                           id="password"
                                           value="test"
                                           placeholder="mot de passe"
                                           maxlength="12"
                                           required>
                                </div>

                                <div class="profil_input">
                                    <input type="email"
                                           name="email"
                                           id="email"
                                           value="test@test.fr"
                                           placeholder="email"
                                           maxlength="64"
                                           required>
                                </div>

<!--                                <div class="profil_input">
                                    <input type="email"
                                           name="emailConfirm"
                                           id="emailConfirm"
                                           value=""
                                           placeholder="confirmez votre email"
                                           maxlength="64"
                                           required>
                                </div>-->

                                <div id="alert" class="alert">
                                </div>
                                <div class="profil_submit">
                                    <!--REMETTRE LE INPUT EN BUTTON-->
                                    <input type="submit" value="S'INSCRIRE">
                                </div>
                            </div>
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
