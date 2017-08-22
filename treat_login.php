<?php
// on ouvre le session
session_start();

// on récupère l'id de la session
$ident = session_id();
?>
<!DOCTYPE html>
<html>
    <head>
        <?php include 'inc/config.php' ?>

        <!-- TITRE PAGE -->
        <title></title>
    </head>
    <body>
        <?php
        include 'inc/header.php';

        $user_iden = $_REQUEST['pseudo'];
        $user_pass = sha1($_REQUEST['password']);

        $user_iden = htmlentities($user_iden);
        $user_pass = htmlentities($user_pass);

        $user_iden = strtolower($user_iden);

        const REG_IDEN = '/.{4,24}/';
        const REG_PASS = '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/';

        // CONNEXION A LA DB
        // On définie les constantes pour se connecter à la DB
        define("DB_DSN", "mysql:host=127.0.0.1;dbname=users");
        define("DB_USER", "root");
        define("DB_PASS", "");


        try {
            $db_connexion = new PDO(DB_DSN, DB_USER, DB_PASS); // On créer la var avec la connexion
            echo "test";
        } catch (Exception $ex) {
            echo "Erreur: " . $erreur->getMessage();
            exit();
        }

        // Vérification des identifiants
        $req = $db_connexion->prepare('SELECT user_id, user_rights FROM users WHERE user_pseudo = :pseudo AND user_pass = :pass');
        $req->execute(array(
            'pseudo' => $user_iden,
            'pass' => $user_pass));

        $resultat = $req->fetch();

        echo '<div class="main_container">';
        echo '<div class="container_connexion">';

        if (!$resultat) {
            echo 'Mauvais identifiant ou mot de passe !';
        } else {
            $_SESSION ['id'] = $ident;
            $_SESSION ['pseudo'] = $user_iden;
//            $_SESSION ['admin'] = $user_iden;

            echo 'Vous êtes connecté !';
            header('location: ./index.php');
            exit;
        }

        echo "</div></div>";

        // Fermeture de la connexion à la DB
        if ($db_connexion) {
            $db_connexion = NULL;
        }
        ?>
    </body>
</html>
