<?php
    session_start();
    try {
        $result = new stdClass();
        if (isset($_POST['temps'])) {
            $result->temps = $_POST['temps'];
        }
        else
            die('Probleme avec dollar post temps');


        if (isset($_SESSION['username']))
            $result->user = $_SESSION['username'];
        else
            die('probl');

        $dsn = 'mysql:host=mysql-vincent-weber.alwaysdata.net;dbname=vincent-weber_laby';
        $pdo = new PDO($dsn, '144459_laby', 'a1b2c3');
        // Codage de caractères.
        $pdo->exec('SET CHARACTER SET utf8');
        // Gestion des erreurs sous forme d'exceptions.
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $recupMeilleurScore = 'SELECT BEST FROM USER WHERE NAME=:username AND BEST IS NOT NULL';
        $updateMeilleurScore = 'UPDATE USER SET BEST=:temps WHERE NAME=:username';
        $stmt = $pdo->prepare($recupMeilleurScore);
        $stmt2 = $pdo->prepare($updateMeilleurScore);
        $stmt->bindValue('username', $result->user, PDO::PARAM_STR);
        $stmt2->bindValue('username', $result->user, PDO::PARAM_STR);
        $stmt2->bindValue('temps', $result->temps, PDO::PARAM_INT);

        $stmt->execute();
        if ($stmt->rowCount()) {
            $best = $stmt->fetch(PDO::FETCH_OBJ);
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
    catch (PDOException $e) {
        // Affichage de l'erreur.
        die('Erreur : ' . $e->getMessage());
    }

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($result);

