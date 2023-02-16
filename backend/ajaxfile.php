<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

include "config.php";
include "functions.php";


$data = json_decode(file_get_contents("php://input"));
$request = $data->request;

switch($request){
}