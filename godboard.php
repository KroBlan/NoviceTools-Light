<?php
// on ouvre le session
session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <?php include 'inc/config.php' ?>

        <!-- TITRE PAGE -->
        <title>Administration</title>
    </head>
    <body>

        <main>

            <!-- LE HEADER -->

            <?php include 'inc/header.php' ?>

            <!-- LE MAIN CONTAINER -->
            <div class="main_container">
                <?php
                if (isset($_SESSION['session_id']) && isset($_SESSION['id']) && isset($_SESSION['pseudo']) && isset($_SESSION['admin'])) {
                    echo "good";
                } else {
                    echo "Cette page n'existe pas...";
                    header('location: ./404.php');
                    exit;
                    ?>






                <?php } ?>

            </div>


            <!-- LE FOOTER -->
            <?php include 'inc/footer.php' ?>


        </main>
    </body>
</html>
