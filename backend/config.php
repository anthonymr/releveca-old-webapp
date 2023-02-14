<?php 
$host = "localhost"; /* Host name */
$user = "root"; /* User */
$password = ""; /* Password */
$dbname = "controller"; /* Database name */
$link = mysqli_connect($host, $user, $password,$dbname);

// Check connection
if (!$link) {
 die("Connection failed: " . mysqli_connect_error());
}
?>