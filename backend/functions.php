<?php

function isUserLogged($session)
{
    if (isset($session["loggedin"]) && $session["loggedin"] === true) {
        header("location: welcome.php");
        exit;
    }
}

function getRealIpAddr($server)
{
    if (!empty($server['HTTP_CLIENT_IP'])) {
        // Check IP from internet.
        $ip = $server['HTTP_CLIENT_IP'];
    } elseif (!empty($server['HTTP_X_FORWARDED_FOR'])) {
        // Check IP is passed from proxy.
        $ip = $server['HTTP_X_FORWARDED_FOR'];
    } else {
        // Get IP address from remote address.
        $ip = $server['REMOTE_ADDR'];
    }
    return $ip;
}

function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        return utf8_encode($d);
    }
    return $d;
}

function genericRequest($link, $query)
{
    $data = mysqli_query($link, $query);
    $response = array();

    while ($row = mysqli_fetch_assoc($data)) {
        $response[] = $row;
    }
    echo json_encode($response);
}

function genericInlineRequest($link, $query)
{
    $data = mysqli_query($link, $query);
    $response = array();

    while ($row = mysqli_fetch_assoc($data)) {
        $response[] = $row;
    }
    
    return($response);
}

function genericUpdate($link, $query)
{
    if (mysqli_query($link, $query)) {
        echo '200';
    } else {
        echo -1;
    }
}

function storeFile($url, $data){
    list($type, $data) = explode(';', $data);
    list(, $data)      = explode(',', $data);
    $data = base64_decode($data);

    file_put_contents($url, $data);
}

function valid_email($str) {
    return (!preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $str)) ? FALSE : TRUE;
}

function getCorporationName($link, $corp) {
    $data = mysqli_query($link, "select name from corporations where id = $corp");
    $response = array();

    while ($row = mysqli_fetch_assoc($data)) {
        $response[] = $row;
    }
    return $response[0]['name'];
}