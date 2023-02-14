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
 
// Define variables and initialize with empty values
$new_password = $confirm_password = "";
$new_password_err = $confirm_password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Validate new password
    if(trim($_POST["new_password"]) == ""){
        $new_password_err = "Por favor, ingrese la nueva contraseña.";     
    } elseif(strlen(trim($_POST["new_password"])) < 6){
        $new_password_err = "Su nueva contraseña debe tener al menos 6 caracteres.";
    } else{
        $new_password = trim($_POST["new_password"]);
    }
    
    // Validate confirm password
    if(trim($_POST["confirm_password"]) == ""){
        $confirm_password_err = "Por favor, confirme su nueva contraseña.";
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($new_password_err) && ($new_password != $confirm_password)){
            $confirm_password_err = "Las contraseñas no concuerdan.";
        }
    }
        
    // Check input errors before updating the database
    if(empty($new_password_err) && empty($confirm_password_err)){
        // Prepare an update statement
        $sql = "UPDATE users SET password = ? WHERE id = ?";
        
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "si", $param_password, $param_id);
            
            // Set parameters
            $param_password = password_hash($new_password, PASSWORD_DEFAULT);
            //$param_password = $new_password;
            $param_id = $_SESSION["id"];
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Password updated successfully. Destroy the session, and redirect to login page
                session_destroy();
                header("location: index.php");
                exit();
            } else{
                echo "Oops! Algo no está bien. Intente más tarde.";
            }
        }
        
        // Close statement
        mysqli_stmt_close($stmt);
    }
    
    // Close connection
    mysqli_close($link);
}
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