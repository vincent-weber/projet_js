<?php

session_start();

if (isset($_POST['largeur']) && isset($_POST['longueur'])) {
    $_SESSION['damier_cree'] = true;
    $largeur = intval($_POST['largeur']);
    $longueur = intval($_POST['longueur']);
    if ($largeur>0 && $longueur>0) {
        $_SESSION['largeur'] = $largeur;
        $_SESSION['longueur'] = $longueur;
    }
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($result);