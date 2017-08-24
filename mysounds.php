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
            if (isset($_SESSION['session_id']) && isset($_SESSION['id']) && isset($_SESSION['pseudo'])) {
                ?>

                <!-- LE MAIN CONTAINER -->
                <div class="main_container">


                    <div class="main_content">
                        <h2> MES SONS </h2>
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

                        <table>

                            <thead> <!-- En-tête du tableau -->
                                <tr>
                                    <th>NOM</th>
                                    <th colspan="2">ttttttttt</th>
                                </tr>
                            </thead>

                            <tfoot> <!-- Pied de tableau -->
                                <tr>
                                    <th></th>
                                    <th colspan="2"></th>
                                </tr>
                            </tfoot>

                            <tbody> <!-- Corps du tableau -->
                                <tr>
                                    <td>Son 1</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Son 2</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Son 3</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Son 4</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Son 5</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Son 6</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>


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
