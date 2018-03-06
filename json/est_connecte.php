<?php
    session_start();
    $result = new stdClass();
    $result->fail_co = false;

    if (isset($_SESSION['user_co'])) {
        $result->est_connecte = $_SESSION['user_co'];
    }
    if (isset($_SESSION['fail_co'])) {
        $result->fail_co = true;
        unset($_SESSION['fail_co']);
    }

    if (isset($_SESSION['laby_cree'])) {
        $result->laby_cree = true;
        $result->largeur = $_SESSION['largeur'];
        $result->hauteur = $_SESSION['hauteur'];
    }
    if (isset($_SESSION['campagne']) && $_SESSION['campagne'] == true)
        $result->campagne = true;
    else {
        $result->campagne = false;
    }

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');

    echo json_encode($result);