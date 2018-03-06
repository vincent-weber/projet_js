<?php
    session_start();
   // phpinfo();
    try {

        $result = new stdClass();
        $result->est_connecte = false;

        $username = $_POST['username'];
        $passwd = $_POST['password'];

    // Connexion à la base de données.
        $dsn = 'mysql:host=mysql-vincent-weber.alwaysdata.net;dbname=vincent-weber_laby';
        $pdo = new PDO($dsn, '144459_laby', 'a1b2c3');
    // Codage de caractères.
        $pdo->exec('SET CHARACTER SET utf8');
    // Gestion des erreurs sous forme d'exceptions.
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $connectCheckQuery = 'SELECT * FROM USER WHERE NAME = :username AND PASSWORD = md5(:passwd)';
        $stmt = $pdo->prepare($connectCheckQuery);
        $stmt->bindValue('username', $username, PDO::PARAM_STR);
        $stmt->bindValue('passwd', $passwd, PDO::PARAM_STR);

        $stmt->execute();
        if ($stmt->rowCount()) {
            $result->est_connecte = true;
            $_SESSION['user_co'] = true;
        }
        else {
            $_SESSION['user_co'] = false;
            $_SESSION['fail_co'] = true;
        }


    } catch (PDOException $e) {
    // Affichage de l'erreur.
        die('Erreur : ' . $e->getMessage());
    }

    /*if(isset($_POST['username']) && isset($_POST['password'])) {
        $result->est_connecte = true;
        $_SESSION['user_co'] = true;
    }

    else {
        $_SESSION['user_co'] = false;
    }*/

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');

    echo json_encode($result);
