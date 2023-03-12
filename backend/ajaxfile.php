<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

include "config.php";
include "functions.php";

session_start();

$data = json_decode(file_get_contents("php://input"));
$request = $data->request;
$user = $_SESSION["id"];
$corporation = $_SESSION["corporation"];
$corporationName = getCorporationName($link, $corporation);

switch ($request) {
    case "getModules":
        genericRequest($link, "CALL sp_get_modules($user, $corporation)");
        break;
    case "getSubmodules":
        genericRequest($link, "CALL sp_get_submodules($user, $corporation, $data->module)");
        break;
    case "getAllSubmodules":
        genericRequest($link, "CALL sp_get_all_submodules($user, $corporation)");
        break;
    case "getItems":
        $from = $data->from;
        $display = $data->display;
        genericRequest($link, "SELECT * FROM $corporationName.items WHERE stock > 0 ORDER BY id LIMIT $from, $display");
        break;
    case "getItemsCount":
        genericRequest($link, "SELECT count(*) AS count FROM $corporationName.items WHERE stock > 0");
        break;
    case "storePicture":
        $newImage = '../assets/images/items/'.$data->name;
        echo $newImage;
        storePicture($newImage , $data->pic);
        if ($data->firstPicture){
            genericUpdate($link, "UPDATE $corporationName.items SET `images` = '$data->name' WHERE (`id` = '$data->id');");
        } else {
            genericUpdate($link, "UPDATE $corporationName.items SET `images` = CONCAT_WS(',',`images`, '$data->name') WHERE (`id` = '$data->id');");
        }
        
        break;
}
