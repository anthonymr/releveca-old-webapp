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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"  />

    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />

    <script src="js/vendors/axios.js" defer></script>
    <script src="js/vendors/vue.js" defer></script>

    <script src="components/global/AlertList/Alert/Alert.js" defer></script>
    <link rel="stylesheet" href="components/global/AlertList/Alert/Alert.css">

    <script src="components/global/AlertList/AlertList.js" defer></script>
    <link rel="stylesheet" href="components/global/AlertList/AlertList.css">

    <script src="components/MainMenu/MainMenu.js" defer></script>
    <link rel="stylesheet" href="components/MainMenu/MainMenu.css">

    <script src="components/MainPanel/MainPanel.js" defer></script>
    <link rel="stylesheet" href="components/MainPanel/MainPanel.css">

    <script src="js/main.js" defer></script>
</head>

<body>
    <main id="app">
        <v_main_menu @change="changeModule"></v_main_menu>
        <v_main_panel :module="currentModule" :key="currentModule.id"></v_main_panel>
        <v_alert_list v-model="$alerts"></v_alert_list>
    </main>
</body>

</html>