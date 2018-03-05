<?php

    session_start();
    $result = new stdClass();
    $_SESSION['campagne'] = true;
    $_SESSION['laby_cree'] = true;
    $_SESSION['largeur'] = 5;
    $_SESSION['hauteur'] = 5;

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($result);
