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
        $user_email = $_REQUEST['email'];

        $user_iden = htmlentities($user_iden);
        $user_pass = htmlentities($user_pass);
        $user_email = htmlentities($user_email);


        // CONNEXION A LA DB
        // On définie les constantes pour se connecter à la DB
        define("DB_DSN", "mysql:host=127.0.0.1;dbname=users");
        define("DB_USER", "root");
        define("DB_PASS", "");


        try {
            $db_connexion = new PDO(DB_DSN, DB_USER, DB_PASS); // On créer la var avec la connexion
        } catch (Exception $ex) {
            echo "Erreur: " . $erreur->getMessage();
            exit();
        }

//        //Préparaiton requête pour récuperer les users
//        $requete = "SELECT `id`, `pseudo`, `pass`, `email` FROM `users`";
        // Vérification des identifiants
        $req = $db_connexion->prepare('SELECT user_id FROM users WHERE user_pseudo = :pseudo AND user_email = :email');
        $req->execute(array(
            'pseudo' => $user_iden,
            'email' => $user_email));

        $resultat = $req->fetch();

        echo '<div class="main_container">';
        echo '<div class="container_connexion">';

        if ($resultat) {
            echo 'Cet utilisateur existe déjà';
        } else {

            $user_iden = strtolower($user_iden);
            $user_email = strtolower($user_email);

            $req = $db_connexion->prepare('INSERT INTO users(user_pseudo, user_pass, user_email, user_date, user_token, user_statut, user_rights) VALUES(:pseudo, :pass, :email, CURDATE(), :token, :statut, :rights)');
            $req->execute(array(
                'pseudo' => $user_iden,
                'pass' => $user_pass,
                'email' => $user_email,
                'token' => '',
                'statut' => '0',
                'rights' => '0',));
            
            $_SESSION ['id'] = $ident;
            $_SESSION ['pseudo'] = $user_iden;


            echo "Vous êtes inscrit !";
        }

        echo "</div></div>";

        // Fermeture de la connexion à la DB
        if ($db_connexion) {
            $db_connexion = NULL;
        }
        ?>
    </body>
</html>
