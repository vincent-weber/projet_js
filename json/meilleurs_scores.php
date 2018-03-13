<?php
    session_start();
    if (!class_exists('UsersDataBase'))
    {
        require 'bd_users.php';
    }

    $result = new stdClass();
    try {
        $usersDataBase = new UsersDataBase();
        $pdo = $usersDataBase->connexionBD();
        $recupMeilleursTemps = 'SELECT  NAME, BEST FROM USER WHERE BEST IS NOT NULL ORDER BY BEST ASC LIMIT 10';
        $stmt = $pdo->prepare($recupMeilleursTemps);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $result->meilleursTemps = array();
        $result->meilleursTemps = $stmt->fetchAll();
    }
    catch (PDOException $e) {
        // Affichage de l'erreur.
        die('Erreur : ' . $e->getMessage());
    }

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');

    echo json_encode($result);