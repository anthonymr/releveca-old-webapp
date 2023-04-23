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
        $filter = $data->filter;
        genericRequest($link, "SELECT * FROM $corporationName.items WHERE stock > 0 
            AND ( 
                name like '%$filter%'
                OR code like '%$filter%'
                OR model like '%$filter%'
            )
            ORDER BY id LIMIT $from, $display");
        break;
    case "getItemsCount":
        $filter = $data->filter;
        genericRequest($link, "SELECT count(*) AS count FROM $corporationName.items WHERE stock > 0 
            AND ( 
                name like '%$filter%'
                OR code like '%$filter%'
                OR model like '%$filter%'
            )
        ");
        break;
    case "getClients":
        $from = $data->from;
        $display = $data->display;
        $filter = $data->filter;
        genericRequest($link, "SELECT * FROM $corporationName.clients WHERE inactive = 0 
            AND owner = $user
            AND ( 
                name like '%$filter%'
                OR code like '%$filter%'
            )
            ORDER BY id LIMIT $from, $display");
        break;
    case "getClientsCount":
        $filter = $data->filter;
        genericRequest($link, "SELECT count(*) AS count FROM $corporationName.clients WHERE inactive = 0 
            AND owner = $user
            AND ( 
                name like '%$filter%'
                OR code like '%$filter%'
            )
        ");
        break;
    case "getClientsForInput":
        genericRequest($link, "SELECT id, name, code, taxpayer FROM $corporationName.clients WHERE inactive = 0 AND owner = $user AND status = 'aprobado' ORDER BY name");
        break;
    case "storePicture":
        $newImage = '../assets/images/items/'.$data->name;
        echo $newImage;
        storeFile($newImage , $data->pic);
        if ($data->firstPicture){
            genericUpdate($link, "UPDATE $corporationName.items SET `images` = '$data->name' WHERE (`id` = '$data->id');");
        } else {
            genericUpdate($link, "UPDATE $corporationName.items SET `images` = CONCAT_WS(',',`images`, '$data->name') WHERE (`id` = '$data->id');");
        }
        
        break;
    case "getCurrencies":
        genericRequest($link, "SELECT * FROM $corporationName.currency");
        break;
    case "getConditions":
        genericRequest($link, "SELECT * FROM $corporationName.conditions");
        break;
    case "setOrder":
        $sql = "INSERT INTO $corporationName.orders 
            (`client_id`, `sub_total`, `taxes`, `total`, `condition`, `rate`, `currency`, `balance`) 
            VALUES 
            ('$data->id', '$data->sub_total', '$data->taxes', '$data->total', '$data->condition', '$data->rate', '$data->currency', '$data->total');
        ";

        $id = 0;
        $details = $data->details;

        if (mysqli_query($link, $sql)) {
            $id = mysqli_insert_id($link);

            foreach($details as $i){
                genericUpdate($link, "INSERT INTO $corporationName.`orders_details` 
                    (`order_id`, `item_id`, `qty`, `unit_price`, `unit`, `total_price`, `currency`, `rate`) 
                    VALUES 
                    ('$id', '$i->item_id', '$i->qty', '$i->unit_price', '$i->unit', '$i->total', '$data->currency', '$data->rate');");
                echo 200;
            }
        }
        break;
    case "getOrders":
        $from = $data->from;
        $display = $data->display;
        $filter = $data->filter;
        genericRequest($link, "SELECT *, orders.id AS order_id, orders.index AS order_index, orders.status AS order_status FROM $corporationName.orders
            LEFT JOIN $corporationName.clients ON clients.id = orders.client_id
            LEFT JOIN $corporationName.conditions ON conditions.code = orders.condition
            LEFT JOIN $corporationName.currency ON currency.code = orders.currency
            WHERE clients.name like '%$filter%'
                AND clients.owner = $user
            ORDER BY orders.creation_date DESC LIMIT $from, $display
        ");
        break;
    case "getOrdersCount":
        $filter = $data->filter;
        genericRequest($link, "SELECT count(*) AS count FROM $corporationName.orders
            LEFT JOIN $corporationName.clients ON clients.id = orders.client_id
            WHERE clients.name like '%$filter%'
        ");
        break;
    case "getOrderDetails":
        $sql = "SELECT orders_details.*, items.name FROM $corporationName.orders_details 
        LEFT JOIN $corporationName.items ON items.id = item_id
        WHERE order_id = '$data->id'";
        genericRequest($link, $sql);
        break;
    case "getOrdersForApproval":
        $from = $data->from;
        $display = $data->display;
        $filter = $data->filter;

        genericRequest($link, "SELECT *, orders.id AS order_id, orders.index AS order_index FROM $corporationName.orders
            LEFT JOIN $corporationName.clients ON clients.id = orders.client_id
            LEFT JOIN $corporationName.conditions ON conditions.code = orders.condition
            LEFT JOIN $corporationName.currency ON currency.code = orders.currency
            WHERE clients.name like '%$filter%' AND orders.status = 'en espera'
            ORDER BY orders.creation_date DESC LIMIT $from, $display
        ");
        break;
    case "getOrdersForApprovalCount":
        $filter = $data->filter;
        genericRequest($link, "SELECT count(*) AS count FROM $corporationName.orders
            LEFT JOIN $corporationName.clients ON clients.id = orders.client_id
            WHERE clients.name like '%$filter%' AND orders.status = 'en espera'
        ");
        break;
    case "approveOrder":
        $sql = "UPDATE `releveca`.`orders` SET `approved` = '1' WHERE (`id` = '$data->id');";
        genericUpdate($link, $sql);
        break;
    case "checkIfRIFExists":
        $sql = "SELECT * FROM $corporationName.clients WHERE rif like '%$data->rif%'";
        genericRequest($link, $sql);
        break;
    case "createClient":
        $newClient = $data->newClient;
        $sql = "INSERT INTO $corporationName.clients 
            (`code`, `type`, `name`, `address1`, `phone`, `inactive`, `notes`, `registration_date`, `address`, `rif`, `taxpayer`, `email`, `owner`, `status`) 
            VALUES 
            ('$newClient->code', '01', '$newClient->bussinessName', '$newClient->address', '$newClient->phone', '0', '$newClient->notes', now(), '$newClient->address', '$newClient->code', '$newClient->tax', '$newClient->email', '$user', 'por aprobar');
        ";
        echo genericUpdate($link, $sql);
        break;
    case "storeFile": 
        $url = '../assets/files/clients/';

        $files = $data->files;

        foreach($files as $i){
            $sql = "INSERT INTO $corporationName.client_files (`client_id`, `type`, `extension`) VALUES ('$data->id', '$i->fileType', '$i->fileExtension');";

            if (mysqli_query($link, $sql)) {
                $id = mysqli_insert_id($link);
                $newFile = $url.$id.'.'.$i->fileExtension;
                storeFile($newFile, $i->file);
            }
        }

        echo 200;
        break;
    case "getClientFiles":
        $sql = "SELECT * FROM $corporationName.client_files WHERE client_id = '$data->id'";
        genericRequest($link, $sql);
        break;
    case "getAllClients":
        $from = $data->from;
        $display = $data->display;
        $filter = $data->filter;
        genericRequest($link, "SELECT clients.*, users.username as owner_name FROM $corporationName.clients 
            LEFT JOIN controller.users ON users.id = clients.owner
            WHERE inactive = 0 
            AND ( 
                clients.name like '%$filter%'
                OR clients.code like '%$filter%'
            )
            ORDER BY clients.status DESC, clients.id LIMIT $from, $display");
        break;
    case "getAllClientsCount":
        $filter = $data->filter;
        genericRequest($link, "SELECT count(*) AS count FROM $corporationName.clients WHERE inactive = 0 
            AND ( 
                clients.name like '%$filter%'
                OR clients.code like '%$filter%'
            )
        ");
        break;
    case "approveClient":
        if(checkSubmodulePermissions($link, $user, 12)){
            $sql = "UPDATE $corporationName.clients SET status = 'aprobado' WHERE id = '$data->id'";
            genericUpdate($link, $sql);
        }
        break;
    case "getUsers":
        genericRequest($link, "SELECT * FROM controller.users WHERE status = 1");
        break;
    case "reassignClient":
        $sql = "UPDATE $corporationName.clients SET owner = '$data->new_owner' WHERE id = '$data->client_id'";
        genericUpdate($link, $sql);
        break;
    case "checkIfRIFExistsInOthers":
        $sql = "SELECT * FROM $corporationName.clients WHERE rif like '%$data->rif%' AND id != '$data->client_id'";
        genericRequest($link, $sql);
        break;
    case "updateClient":
        $newClientData = $data->newClientData;
        $sql = "UPDATE $corporationName.clients SET 
            code = '$newClientData->code',
            name = '$newClientData->bussinessName',
            address1 = '$newClientData->address',
            phone = '$newClientData->phone',
            notes = '$newClientData->notes',
            address = '$newClientData->address',
            rif = '$newClientData->code',
            taxpayer = '$newClientData->tax',
            email = '$newClientData->email'
            WHERE id = '$data->client_id'";
        genericUpdate($link, $sql);
    break;
    case "checkUserClientsLimit":
        $userToCheck = $data->user == '' ? $user : $data->user;
        $sql = "SELECT * FROM controller.users WHERE id = '$userToCheck'";
        genericRequest($link, $sql);
    break;
    case "userClientsCount":
        $userToCheck = $data->user == '' ? $user : $data->user;
        $sql = "SELECT count(*) AS count FROM $corporationName.clients WHERE owner = '$userToCheck'";
        genericRequest($link, $sql);
    break;
    case "getOrderStatuses":
        genericRequest($link, "SELECT * FROM controller.order_status");
    break;
    case "changeOrderStatus":
        $queries = [
            "UPDATE $corporationName.orders SET status = '$data->to' WHERE id = '$data->id'",
            "INSERT INTO $corporationName.orders_history (`order_id`, `from`, `to`, `by`) VALUES ('$data->id', '$data->from', '$data->to', '$user');"
        ];
        genericTransaction($link, $queries);
    break;
    case "getOrderHistory":
        $sql = "SELECT orders_history.*, date(moment) as moment, users.name, users.lastname FROM $corporationName.orders_history
        LEFT JOIN controller.users on users.id = `by`
        WHERE order_id = '$data->id'";
        genericRequest($link, $sql);
    break;
    case "getClientActiveOrders":
        $sql = "SELECT count(*) AS count FROM $corporationName.orders
        WHERE client_id = '$data->id' AND 
        (
            orders.status = '4'
            OR orders.balance > 0
        )";
        genericRequest($link, $sql);
    break;
    case "getClientTotalDebt":
        $sql = "SELECT coalesce(sum(balance),0) AS total FROM $corporationName.orders WHERE client_id = '$data->id'";
        genericRequest($link, $sql);
}
