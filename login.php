<?php
// on ouvre le session
session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <?php include 'inc/config.php' ?>

        <!-- TITRE PAGE -->
        <title>Connexion</title>
    </head>
    <body>

        <main>

            <!-- LE HEADER -->

            <?php include 'inc/header.php' ?>


            <!-- LE MAIN CONTAINER -->
            <div class="main_container">

                <!-- SE CONNECTER -->
                <div class="container_connexion">
                    <h1>SE CONNECTER</h1>
                    <form id="connexionForm" name="connexionForm" action="traitement.php" method="post">
                        <div id="connexionContent">
                            <div class="profil_input">
                                <input type="text"
                                       name="identifiant"
                                       id="identifiant"
                                       value="demo"
                                       placeholder="pseudo"
                                       maxlength="24"
                                       required>
                            </div>


                            <div class="profil_input">
                                <input type="password"
                                       name="password"
                                       id="password"
                                       value="123456"
                                       placeholder="mot de passe"
                                       maxlength="12"
                                       required>
                            </div>
                            <div id="alert" class="alert">
                            </div>
                            <div class="profil_submit">
<!--                                REMETTRE LE INPUT EN BUTTON-->
                                <input type="submit" value="CONNEXION">
                            </div>
                        </div>
                        <a href="registration.php">Pas encore inscrit ?</a>
                        -
                        <a href="lostpass.php">Mot de pass oublié ?</a>
                    </form>

                </div>
            </div>





            <!-- LE FOOTER -->
            <?php include 'inc/footer.php' ?>


        </main>
    </body>
</html>
