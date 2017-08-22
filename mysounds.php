<?php
// on ouvre le session
session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <?php include 'inc/config.php' ?>

        <!-- TITRE PAGE -->
        <title>Mes sons</title>
    </head>
    <body>

        <main>
            <!-- LE HEADER -->
            <?php include 'inc/header.php' ?>

            <?php
            if (isset($_SESSION['id']) && isset($_SESSION['pseudo'])) {
                ?>

                <!-- LE MAIN CONTAINER -->
                <div class="main_container">


                    <div class="main_content">
                        <h2> MES SONS </h2>
                        <div class="mysounds">
                            <h3>nom du son</h3>
                            <div class="mysounds_options">
                                test
                            </div>
                        </div>
                        <div class="mysounds">

                        </div>
                        <div class="mysounds">

                        </div>
                        <div class="mysounds">

                        </div>
                        <div class="mysounds">

                        </div>
                        

                    </div>




                </div>

                <?php
            } else {

                echo '<div class="main_container">';
                echo '<div class="container_connexion">';
                echo '<h1>Vous devez être connecté';
                echo '</div></div>';
                header('location: ./login.php');
                exit;
            }
            ?>

            <!-- LE FOOTER -->
            <?php include 'inc/footer.php' ?>


        </main>
    </body>
</html>
