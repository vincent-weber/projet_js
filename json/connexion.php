<?php
    session_start();
    $result = new stdClass();
    $result->est_connecte = false;

    if(isset($_POST['username']) && isset($_POST['password'])) {
        $result->est_connecte = true;
        $_SESSION['user_co'] = true;
    }

    else {
        $_SESSION['user_co'] = false;
    }

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');

    echo json_encode($result);
