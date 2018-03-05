<?php

session_start();

if (isset($_SESSION['campagne']))
    $_SESSION['campagne'] = false;

if (isset($_POST['largeur']) && isset($_POST['hauteur'])) {
    $_SESSION['laby_cree'] = true;
    $largeur = intval($_POST['largeur']);
    $hauteur = intval($_POST['hauteur']);
    if ($largeur>0 && $hauteur>0) {
        $_SESSION['largeur'] = $largeur;
        $_SESSION['hauteur'] = $hauteur;
    }
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($hauteur);