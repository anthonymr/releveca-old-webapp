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
    <meta charset="UTF-8">
    <link href="../css/cdn/bootstrap.css" rel="stylesheet">
    <title>Tencelu | Panel de control</title>
    <link rel="icon" href="../img/icon_new.svg?v=2" />
    <link rel="stylesheet" href="../css/controlpanel.css" />
    <style type="text/css">
        html{width:100%; height:100%;}
        body{
            font: 14px sans-serif;
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;
        }

        .wrapper{ 
            width: 350px; 
            padding: 20px;
        }

        .panel{
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
        }

        h2{
            margin-top: 0px;
        }
    </style>
</head>
<body  style="background-image:url('img/background.jpg');  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;">
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="wrapper">
                <h2>Restablecer contraseña</h2>
                <p>Por favor, complete el siguiente formulario para restablecer su contraseña.</p>
                <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post"> 
                    <div class="form-group <?php echo (!empty($new_password_err)) ? 'has-error' : ''; ?>">
                        <label>Nueva contraseña</label>
                        <input type="password" name="new_password" class="form-control" value="<?php echo $new_password; ?>">
                        <span class="help-block"><?php echo $new_password_err; ?></span>
                    </div>
                    <div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
                        <label>Confirme su contraseña</label>
                        <input type="password" name="confirm_password" class="form-control">
                        <span class="help-block"><?php echo $confirm_password_err; ?></span>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Continuar">
                        <a class="btn btn-link" href="welcome.php">Cancelar</a>
                    </div>
                </form>
            </div> 
        </div>  
    </div> 
</body>
</html>