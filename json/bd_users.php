<?php

    class UsersDataBase {
        function connexionBD() {
            try {
                $dsn = 'sqlite:./sql.db';
                $pdo = new PDO($dsn);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $pdo;
            }
            catch (PDOException $e) {
                // Affichage de l'erreur.
                die('Erreur : ' . $e->getMessage());
            }
        }
    }


