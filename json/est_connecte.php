<?php
    session_start();
    $result = new stdClass();
    //$result->est_connecte = false;

    if (isset($_SESSION['user_co'])) {
        $result->est_connecte = $_SESSION['user_co'];
    }
    if (isset($_SESSION['laby_cree'])) {
        $result->laby_cree = true;
        $result->largeur = $_SESSION['largeur'];
        $result->hauteur = $_SESSION['hauteur'];
    }

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');

    echo json_encode($result);