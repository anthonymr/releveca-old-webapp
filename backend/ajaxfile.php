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
        genericRequest($link, "select * from releveca.items limit 0,10");
        break;
}
