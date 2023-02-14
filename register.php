<?php
// Include config file
require_once "./backend/config.php";
require_once "./backend/functions.php";
 
// Define variables and initialize with empty values
$username = $mail = $password = $confirm_password = "";
$username_err = $mail_err = $password_err = $confirm_password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    // Validate username
    if(trim($_POST["username"]) == ""){
        $username_err = "Ingrese un nombre de usuario. ";
    } else{
        // Prepare a select statement
        $sql = "SELECT id FROM users WHERE username = ?";
        
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            
            // Set parameters
            $param_username = trim($_POST["username"]);
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);
                
                if(mysqli_stmt_num_rows($stmt) == 1){
                    $username_err = "Nombre de usuario ya en uso.";
                } else{
                    $username = trim($_POST["username"]);
                }
            } else{
                echo "Oops! Algo no está bien. Intente más tarde.";
            }
        }
         
        // Close statement
        mysqli_stmt_close($stmt);
    }
    
    // Validate mail account
    if(trim($_POST["mail"]) == ""){
        $mail_err = "Ingrese un correo electrónico. ";     
    } else{
        if(!valid_email(trim($_POST["mail"]))){
            $mail_err = "Ingrese un correo electrónico valido. ";
        }else{
            $mail = trim($_POST["mail"]);
        }
    }

    // Validate password
    if(trim($_POST["password"]) == ""){
        $password_err = "Ingrese una contraseña. ";     
    } elseif(strlen(trim($_POST["password"])) < 6){
        $password_err = "La contraseña debe tener al menos 6 caracteres. ";
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate confirm password
    if(trim($_POST["confirm_password"]) == ""){
        $confirm_password_err = "Confirme su contraseña. ";     
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password != $confirm_password)){
            $confirm_password_err = "Las contraseñas no concuerdan. ";
        }
    }
    
    // Check input errors before inserting in database
    if(empty($username_err) && empty($mail_err) && empty($password_err) && empty($confirm_password_err)){
        
        // Prepare an insert statement
        $sql = "INSERT INTO users (username, password, mail) VALUES (?, ?, ?)";
         
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "sss", $param_username, $param_password, $param_mail);
            
            // Set parameters
            $param_username = $username;
            $param_mail = $mail;
			$param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
			//$param_password = $password;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Redirect to login page
                header("location: index.php");
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LYC Project</title>

    <link rel="stylesheet" href="./css/generalStyles.css">
    <link rel="stylesheet" href="./css/loginPage.css">
</head>
<body>
    <main class="login-page">
        <div class="login-description">
            <h2>Registro de usuario</h2>
            <p>Por favor, complete el siguiente formulario para crear un nuevo usuario.</p>
        </div>
        <form class="form-wrapper" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <input placeholder="Usuario" type="text" name="username" value="<?php echo $username; ?>">
            <input placeholder="e-mail" type="text" name="mail" value="<?php echo $mail; ?>">
            <input placeholder="Contraseña" type="password" name="password" class="form-control" value="<?php echo $password; ?>">
            <input placeholder="Confirmar contraseña" type="password" name="confirm_password" value="<?php echo $confirm_password; ?>">
            


            <input type="submit" value="Continuar">
            <input type="reset" class="secondary" value="Limpiar">

            <p>Si ya tiene una contraseña <a href="index.php">Inicie sesión aquí</a>.</p>

            <div class="form-error"> 
                <?php echo $username_err; ?>
                <?php echo $mail_err; ?>
                <?php echo $password_err; ?>
                <?php echo $confirm_password_err; ?>
            </div>
        </form>
    </main>
</body>
</html>