<?php

    if (!class_exists('UsersDataBase'))
    {
        require 'bd_users.php';
    }

    session_start();
    $result = new stdClass();
    $result->est_connecte = false;

    try {


        $username = $_POST['username'];
        $passwd = $_POST['password'];
        $usersDataBase = new UsersDataBase();
        $pdo = $usersDataBase->connexionBD();

        $connectCheckQuery = 'SELECT * FROM USER WHERE NAME = :username AND PASSWORD = :passwd';
        $stmt = $pdo->prepare($connectCheckQuery);
        $stmt->bindValue('username', $username, PDO::PARAM_STR);
        $stmt->bindValue('passwd', md5($passwd), PDO::PARAM_STR);

        $stmt->execute();
        if ($ligne = $stmt->fetch()) {
            $result->est_connecte = true;
            $_SESSION['user_co'] = true;
            $_SESSION['username'] = $username;
        }
        else {
            $_SESSION['user_co'] = false;
            $_SESSION['fail_co'] = true;
        }

    } catch (PDOException $e) {
    // Affichage de l'erreur.
        $result->error = 'Erreur : ' . $e->getMessage();
    }

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');

    echo json_encode($result);
