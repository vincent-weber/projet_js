<?php
    session_start();
    if (!class_exists('UsersDataBase'))
    {
        require 'bd_users.php';
    }

    $result = new stdClass();

    if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['email'])){
        $username = filter_input(INPUT_POST, 'username');
        $password = filter_input(INPUT_POST, 'password');
        $email = filter_input(INPUT_POST, 'email');

        if (!preg_match('/^[a-zA-Z0-9]+$/', $username) || empty($email) || empty($password) || !filter_var($email,FILTER_VALIDATE_EMAIL)) {
            $_SESSION['err_saisie'] = '<p>Veuillez remplir tous les champs correctement</p>';
            $result->err_saisie = true;
        }

        if (pseudoDejaPris($username)) {
            $_SESSION['pseudo_pris'] = '<p>Pseudo déjà pris</p>';
            $result->pseudo_pris = true;
        }

        if (emailDejaPris($email)) {
            $_SESSION['email_pris'] = '<p>Email déjà pris</p>';
            $result->email_pris = true;
        }

        if (!isset($_SESSION['err_saisie']) && !isset($_SESSION['pseudo_pris']) && !isset($_SESSION['email_pris'])) {
            if (inscriptionEnregistree($username, $password, $email))
                $_SESSION['insc_enreg'] = '<p>Inscription effectuée !';
            /*if (envoyerMailConfirm($email))
                lol;*/
        }



    }

    function pseudoDejaPris($username) {
        try {
            $usersDataBase = new UsersDataBase();
            $pdo = $usersDataBase->connexionBD();

            $verifPseudo = 'SELECT NAME FROM USER WHERE NAME = :username';
            $stmt = $pdo->prepare($verifPseudo);
            $stmt->bindValue('username', $username, PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->fetch(PDO::FETCH_OBJ))
            //if ($stmt->rowCount())
                return true;
            return false;
        }
        catch (PDOException $e) {
            // Affichage de l'erreur.
            die('pseudoDejaPris - Erreur : ' . $e->getMessage());
        }
    }

    function emailDejaPris($email) {
        try {
            $usersDataBase = new UsersDataBase();
            $pdo = $usersDataBase->connexionBD();

            $verifEmail = 'SELECT EMAIL FROM USER WHERE EMAIL = :email';
            $stmt = $pdo->prepare($verifEmail);
            $stmt->bindValue('email', $email, PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->fetch(PDO::FETCH_OBJ))
                return true;
            return false;
        }
        catch (PDOException $e) {
            // Affichage de l'erreur.
            die('emailDejaPris - Erreur : ' . $e->getMessage());
        }
    }

    function inscriptionEnregistree($username, $password, $email) {
        try {
            $usersDataBase = new UsersDataBase();
            $pdo = $usersDataBase->connexionBD();

            $enregInsc = 'INSERT INTO USER (NAME, PASSWORD, EMAIL) VALUES (:username, :password, :email)';
            $stmt = $pdo->prepare($enregInsc);
            $stmt->bindValue('username', $username, PDO::PARAM_STR);
            $stmt->bindValue('password', md5($password), PDO::PARAM_STR);
            $stmt->bindValue('email', $email, PDO::PARAM_STR);
            $stmt->execute();
            $lignes = $stmt->rowCount();
            return $lignes;
        }
        catch (PDOException $e) {
            // Affichage de l'erreur.
            die('incriptionEnregistree - Erreur : ' . $e->getMessage());
        }
    }

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($result);


