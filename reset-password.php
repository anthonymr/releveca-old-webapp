<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, otherwise redirect to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: index.php");
    exit;
}
 
// Include config file
require_once "./backend/config.php";
 

?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LYC Project</title>

    <link rel="stylesheet" href="./css/generalStyles.css">
    <link rel="stylesheet" href="./css/loginPage.css">
</head>
<body>
    <main class="login-page">   
        <div class="login-description">
            <h2>Restablecer contraseña</h2>
            <p>Por favor, complete el siguiente formulario para restablecer su contraseña.</p>
        </div>
        <form class="form-wrapper" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <input placeholder="Contraseña" type="password" name="new_password" value="<?php echo $new_password; ?>">
            <input placeholder="Confirmar contraseña" type="password" name="confirm_password">
            


            <input type="submit" value="Continuar">
            <button class="secondary"><a class="btn btn-link" href="welcome.php">Cancelar</a></button>

            <div class="form-error"> 
                <?php echo $new_password_err; ?>
                <?php echo $confirm_password_err; ?>
            </div>
        </form>
    </main>
</body>
</html>