<?php
session_start();

require_once "./backend/config.php";
require_once "./backend/functions.php";

if (isset($_GET['corporation'])) {
    $_SESSION["corporation"] = $_GET['corporation'];
    header("location: welcome.php");
}

$query = 'SELECT * FROM corporations WHERE trusted = 1';
$corporations = genericInlineRequest($link, $query);

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LYC Project</title>

    <link rel="stylesheet" href="./css/generalStyles.css">
    <link rel="stylesheet" href="./css/loginPage.css">
    <link rel="stylesheet" href="./css/corporation.css">
</head>

<body>
    <main class="login-page">
        <div class="corporations-container">
            <?php foreach ($corporations as $corp) { ?>
                <div>
                    <img src="./assets/images/corporations/<?php echo $corp['id'] ?>.png">
                    <a href='corporation.php?corporation=<?php echo $corp['id'] ?>'>
                        <span>
                            <?php echo $corp['name'] ?>
                        </span>
                    </a>
                </div>
            <?php } ?>
        </div>
    </main>
</body>

</html>