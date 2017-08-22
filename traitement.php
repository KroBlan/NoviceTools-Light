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
        $user_iden = $_REQUEST['identifiant'];
        $user_pass = $_REQUEST['password'];

        $user_iden = htmlentities($user_iden);
        $user_pass = htmlentities($user_pass);

        const REG_IDEN = '/.{4,24}/';
        const REG_PASS = '/[a-zA-Z0-9]{6,12}/';
        
        // CONNEXION A LA DB

        // On définie les constantes pour se connecter à la DB
        define("DB_DSN", "mysql:host=localhost;dbname=users");
        define("DB_USER", "root");
        define("DB_PASS", "root");


        try {
            $db_connexion = new PDO(DB_DSN, DB_USER, DB_PASS); // On créer la var avec la connexion
            echo 'Connexion avec succès !';
        } catch (Exception $ex) {
            echo "Erreur: " . $erreur->getMessage();
            exit();
        }

        
        // Fermeture de la connexion à la DB
        if ($db_connexion) {
            $db_connexion = NULL;
        }

        $list_users = ['demo'];
        $list_pass = ['123456'];
        $list_login = false;


        for ($i = 0; $i < count($list_users); $i++) {
            if ($user_iden === $list_users[$i]) {
                for ($i = 0; $i < count($list_pass); $i++) {
                    if ($user_pass === $list_pass[$i]) {
                        $list_login = true;
                    }
                }
            }
        }

        include 'inc/header.php';

        echo "<header>";
        if (isset($user_iden)) {
            if ($user_iden != "") {
                if (preg_match(REG_IDEN, $user_iden)) {
                    if ($list_login) {
                        if (isset($user_pass)) {
                            if ($user_pass != "") {
                                if (preg_match(REG_PASS, $user_pass)) {
                                    if ($list_login) {
                                        $_SESSION ['id'] = $ident;
                                        $_SESSION ['pseudo'] = $user_iden;
                                        echo "<h1>Connecté !</h1>";
                                        header('location: ./index.php');
                                        exit;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            echo "<h1>C'est pas bien :( !</h1>";
            header('location: ./index.php');
            exit;
        }
        echo "</header>";
        include 'inc/footer.php';
        ?>
    </body>
</html>
