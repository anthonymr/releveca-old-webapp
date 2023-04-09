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

    <link rel="icon" href="assets/images/logo-medium.svg" />
    
    <link rel="stylesheet" href="./css/generalStyles.css">
    <link rel="stylesheet" href="./css/forms.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"  />

    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />

    <script src="js/vendors/axios.js" defer></script>
    <script src="js/vendors/vue.js" defer></script>

    <script src="https://cdn.jsdelivr.net/npm/vue-select@3.20.2/dist/vue-select.min.js" defer></script>
    <link href="https://cdn.jsdelivr.net/npm/vue-select@3.20.2/dist/vue-select.min.css" rel="stylesheet">

    <script src="components/global/AlertList/Alert/Alert.js" defer></script>
    <link rel="stylesheet" href="components/global/AlertList/Alert/Alert.css">
    <script src="components/global/AlertList/AlertList.js" defer></script>
    <link rel="stylesheet" href="components/global/AlertList/AlertList.css">

    <script src="components/global/Pagination/Pagination.js" defer></script>
    <link rel="stylesheet" href="components/global/Pagination/Pagination.css">

    <script src="components/global/Modal/Modal.js" defer></script>
    <link rel="stylesheet" href="components/global/Modal/Modal.css">

    <script src="components/MainMenu/MainMenu.js" defer></script>
    <link rel="stylesheet" href="components/MainMenu/MainMenu.css">

    <script src="components/MainPanel/MainPanel.js" defer></script>
    <link rel="stylesheet" href="components/MainPanel/MainPanel.css">

    <script src="components/HeaderLocation/HeaderLocation.js" defer></script>
    <link rel="stylesheet" href="components/HeaderLocation/HeaderLocation.css">

    <script src="components/Cart/Cart.js" defer></script>
    <link rel="stylesheet" href="components/Cart/Cart.css">

    <script src="components/Items/Items.js" defer></script>
    <script src="components/Items/Item/Item.js" defer></script>
    <script src="components/Items/EditItem/EditItem.js" defer></script>
    <link rel="stylesheet" href="components/Items/Items.css">
    <link rel="stylesheet" href="components/Items/Item/Item.css">
    <link rel="stylesheet" href="components/Items/EditItem/EditItem.css">

    <script src="components/Clients/Clients.js" defer></script>
    <script src="components/Clients/Client/Client.js" defer></script>
    <script src="components/Clients/NewClient/NewClient.js" defer></script>
    <script src="components/Clients/ClientFiles/ClientFiles.js" defer></script>
    <script src="components/Clients/ClientFiles/ClientFilesForm/ClientFilesForm.js" defer></script>
    <link rel="stylesheet" href="components/Clients/Clients.css">
    <link rel="stylesheet" href="components/Clients/Client/Client.css">
    <link rel="stylesheet" href="components/Clients/NewClient/NewClient.css">
    <link rel="stylesheet" href="components/Clients/ClientFiles/ClientFiles.css">
    <link rel="stylesheet" href="components/Clients/ClientFiles/ClientFilesForm/ClientFilesForm.css">

    <script src="components/Quotes/Quotes.js" defer></script>
    <script src="components/Quotes/Quote/Quote.js" defer></script>
    <script src="components/Quotes/QuoteDetails/QuoteDetails.js" defer></script>
    <script src="components/Quotes/QuotesApproval/QuotesApproval.js" defer></script>
    <link rel="stylesheet" href="components/Quotes/Quotes.css">
    <link rel="stylesheet" href="components/Quotes/Quote/Quote.css">
    <link rel="stylesheet" href="components/Quotes/QuoteDetails/QuoteDetails.css">
    <link rel="stylesheet" href="components/Quotes/QuotesApproval/QuotesApproval.css">
    

    <script src="js/main.js" defer></script>
</head>

<body>
    <main id="app">
        <v_main_menu @change="changeModule"></v_main_menu>
        <v_cart></v_cart>
        <v_main_panel :module="currentModule" :key="currentModule.id"></v_main_panel>
        <v_alert_list v-model="$alerts"></v_alert_list>
    </main>
</body>

</html>