<?php
require_once "./backend/config.php";
require_once "./backend/functions.php";

session_start();

if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: index.php");
    exit;
}

if (!isset($_SESSION["corporation"]) || $_SESSION["corporation"] === false) {
    header("location: corporation.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LYC Project</title>

    <link rel="stylesheet" href="./css/generalStyles.css">

    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
</head>

<body>
    <?php echo $_SESSION['corporation']; ?>
    <p>Cambiar corporación <a href="corporation.php">Click aquí</a>.</p>
</body>

</html>