<?php

session_start();

if (isset($_SESSION['speedrun']) && $_SESSION['speedrun'] == true)
    $_SESSION['speedrun'] = false;

if (isset($_POST['largeur']) && isset($_POST['hauteur']) && preg_match('/^([5-9]|[1-4][0-9]|50)$/', $_POST['largeur'])
                                                         && preg_match('/^([5-9]|[1-4][0-9]|50)$/', $_POST['hauteur'])) {
    $_SESSION['laby_cree'] = true;
    $largeur = intval($_POST['largeur']);
    $hauteur = intval($_POST['hauteur']);
    $_SESSION['largeur'] = $largeur;
    $_SESSION['hauteur'] = $hauteur;
}
else
    $_SESSION['err_settings'] = true;

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($hauteur);