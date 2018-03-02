<?php
/**
 * Created by PhpStorm.
 * User: r16010237
 * Date: 22/02/18
 * Time: 09:17
 */

session_start();
$resultat = new stdClass();
$_SESSION_ = array();

if(ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), "", time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
}

session_destroy();

//$resultat -> result = true;
//$resultat -> message = '';
//$resultat -> est_connecte = false;

echo json_encode($resultat);

//header('Cache-Control: no-cache, must-revalidate');
//header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
//header('Content-type: application/json');