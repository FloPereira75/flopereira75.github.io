<?php 

    class Database {

        $dbHost = "localhost";
        $dbName = "burger_code";
        $dbUser = "root";
        $dbUserPassword = "";


        try {
            $connexion = new PDO("mysql:host=" . $dbHost . "; dbname=" . $dbName, $dbUser, $dbUserPassword);
        }
        catch(PDOException $e) {
            die($e->getMessage());
        }
        
    }

    


?>