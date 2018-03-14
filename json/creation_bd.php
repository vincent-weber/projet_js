<?php
session_start();
$result = new stdClass();
$db = new PDO('sqlite:./sql.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $db->exec('DROP TABLE IF EXISTS USER');
    $db->exec("CREATE TABLE `USER` (".
                        "`ID` INTEGER PRIMARY KEY AUTOINCREMENT, ".
                        "`NAME` varchar(32) NOT NULL, ".
                        "`PASSWORD` varchar(32) DEFAULT NULL, ".
                        "`EMAIL` varchar(64) DEFAULT NULL, ".
                        "`BEST` int(32) DEFAULT NULL".
")");

    $db->exec("INSERT INTO `USER` (`NAME`, `PASSWORD`, `BEST`) VALUES ('adminlaby', '".md5('mdplaby')."', 9999);");
}
catch (PDOException $e) {
    // Affichage de l'erreur.
    $result->bool_error = true;
    $result->error = 'Erreur : ' . $e->getMessage();
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($result);