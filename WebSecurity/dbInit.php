<?php

$user = 'root';
$password = 'root';
$db = 'userdb';
$host = 'localhost';
$port = 8889;

$link = mysqli_init();
$success = mysqli_real_connect(
   $link, 
   $host, 
   $user, 
   $password, 
   $db,
   $port
);


//echo "Database successfully Connected";

?>