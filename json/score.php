<?php
    session_start();
    if (!class_exists('UsersDataBase'))
    {
        require 'bd_users.php';
    }

    try {
        $result = new stdClass();

        if (isset($_POST['temps']))
            $result->temps = $_POST['temps'];

        if (isset($_SESSION['username']))
            $result->user = $_SESSION['username'];

        $usersDataBase = new UsersDataBase();
        $pdo = $usersDataBase->connexionBD();

        $recupMeilleurScore = 'SELECT BEST FROM USER WHERE NAME=:username AND BEST IS NOT NULL';
        $updateMeilleurScore = 'UPDATE USER SET BEST=:temps WHERE NAME=:username';
        $stmt = $pdo->prepare($recupMeilleurScore);
        $stmt2 = $pdo->prepare($updateMeilleurScore);
        $stmt->bindValue('username', $result->user, PDO::PARAM_STR);
        $stmt2->bindValue('username', $result->user, PDO::PARAM_STR);
        $stmt2->bindValue('temps', $result->temps, PDO::PARAM_INT);

        $stmt->execute();
        if (isset($_POST['temps'])) {
            if ($best = $stmt->fetch(PDO::FETCH_OBJ)) {
                if ($best->BEST > $result->temps) {
                    $result->temps_ameliore = true;
                    $stmt2->execute();
                }
            }
            else { //pas encore de meilleur score
                $result->temps_ameliore = true;
                $stmt2->execute();
            }
        }
        else {
            $best = $stmt->fetch(PDO::FETCH_OBJ);
            $result->best = $best->BEST;
        }


    }
    catch (PDOException $e) {
        // Affichage de l'erreur.
        die('Erreur : ' . $e->getMessage());
    }

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');

    echo json_encode($result);
