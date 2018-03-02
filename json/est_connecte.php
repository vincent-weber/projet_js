<?php
    session_start();
    $result = new stdClass();
    //$result->est_connecte = false;

    if (isset($_SESSION['user_co'])) {
        $result->est_connecte = $_SESSION['user_co'];
    }
    if (isset($_SESSION['damier_cree'])) {
        $result->damier_cree = true;
        $result->largeur = $_SESSION['largeur'];
        $result->longueur = $_SESSION['longueur'];
    }

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');

    echo json_encode($result);