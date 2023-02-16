<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

include "config.php";
include "functions.php";

session_start();

$data = json_decode(file_get_contents("php://input"));
$request = $data->request;

switch ($request) {
    case "getModules":
        $user = $_SESSION["id"];
        $corporation = $_SESSION["corporation"];

        genericRequest($link, "CALL sp_get_modules($user, $corporation)");
        break;
}
