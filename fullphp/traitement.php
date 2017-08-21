<?php
// on ouvre le session
session_start();

// on récupère l'id de la session
$ident = session_id();
?>
<!DOCTYPE html>
<html>
    <head>
        <?php include 'inc/config.php'?>
        
        <!-- TITRE PAGE -->
        <title></title>
    </head>
    <body>
        <?php
        include 'inc/inc_menu.php';

        $user_iden = $_REQUEST['identifiant'];
        $user_pass = $_REQUEST['password'];

//        $user_iden = htmlentities($user_iden);
//        $user_pass = htmlentities($user_pass);

        const REG_IDEN = '/.{4,24}/';
        const REG_PASS = '/[a-zA-Z0-9]{6,12}/';

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
                                        $_SESSION ['nom'] = $user_iden;
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
        ?>
    </body>
</html>
