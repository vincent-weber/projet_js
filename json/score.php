<?php
session_start();
try {
    $result = new stdClass();

    if (isset($_POST['temps']))
        $result->temps = $_POST['temps'];

    if (isset($_SESSION['username']))
        $result->user = $_SESSION['username'];

//    $dsn = 'mysql:host=mysql-vincent-weber.alwaysdata.net;dbname=vincent-weber_laby';
//    $pdo = new PDO($dsn, '144459_laby', 'a1b2c3');

    $dsn = 'sqlite:./sql.db';
    $pdo = new PDO($dsn);
    // Codage de caractères.
    //$pdo->exec('SET CHARACTER SET utf8');
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


//    session_start();
//    try {
//        $result = new stdClass();
//
//        $dsn = 'mysql:host=mysql-vincent-weber.alwaysdata.net;dbname=vincent-weber_laby';
//        $pdo = new PDO($dsn, '144459_laby', 'a1b2c3');
//        // Codage de caractères.
//        $pdo->exec('SET CHARACTER SET utf8');
//        // Gestion des erreurs sous forme d'exceptions.
//        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//
//
//
//        if (isset($_POST['temps'])) {
//            $recupMeilleurScore = 'SELECT BEST FROM USER WHERE NAME=:username AND BEST IS NOT NULL';
//            $stmt = $pdo->prepare($recupMeilleurScore);
//            $stmt->bindValue('username', $result->user, PDO::PARAM_STR);
//            $result->temps = $_POST['temps'];
//            $updateMeilleurScore = 'UPDATE USER SET BEST=:temps WHERE NAME=:username';
//            $stmt2 = $pdo->prepare($updateMeilleurScore);
//            $stmt2->bindValue('username', $result->user, PDO::PARAM_STR);
//            $stmt2->bindValue('temps', $result->temps, PDO::PARAM_INT);
//
//            $stmt->execute();
//            if ($stmt->rowCount()) {
//                $best = $stmt->fetch(PDO::FETCH_OBJ);
//                $result->best = $best->BEST;
//                if ($best->BEST > $result->temps) {
//
//                    $result->temps_ameliore = true;
//                    $stmt2->execute();
//                }
//
//            }
//            else { //pas encore de meilleur score
//                $result->temps_ameliore = true;
//                $stmt2->execute();
//            }
//        }
//        else {
//            $result->test = true;
//            $stmt->execute();
//            if ($stmt->rowCount()) {
//                $best = $stmt->fetch(PDO::FETCH_OBJ);
//                $result->best = $best->BEST;
//            }
//        }
//
//
//
//        if (isset($_SESSION['username']))
//            $result->user = $_SESSION['username'];
//        else
//            die('probl');
//
//
//    }
//    catch (PDOException $e) {
//        // Affichage de l'erreur.
//        die('Erreur : ' . $e->getMessage());
//    }
//
//header('Cache-Control: no-cache, must-revalidate');
//header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
//header('Content-type: application/json');
//
//echo json_encode($result);
//
