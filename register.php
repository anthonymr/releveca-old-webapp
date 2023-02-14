<?php
// Include config file
require_once "./backend/config.php";
 
// Define variables and initialize with empty values
$username = $mail = $password = $confirm_password = "";
$username_err = $mail_err = $password_err = $confirm_password_err = "";
 
function valid_email($str) {
    return (!preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $str)) ? FALSE : TRUE;
}


// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Validate username
    if(trim($_POST["username"]) == ""){
        $username_err = "Por favor, ingrese un nombre de usuario.";
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
        $mail_err = "Por favor, ingrese un correo electrónico.";     
    } else{
        if(!valid_email(trim($_POST["mail"]))){
            $mail_err = "Por favor, ingrese un correo electrónico valido.";
        }else{
            $mail = trim($_POST["mail"]);
        }
    }

    // Validate password
    if(trim($_POST["password"]) == ""){
        $password_err = "Por favor, ingrese una contraseña.";     
    } elseif(strlen(trim($_POST["password"])) < 6){
        $password_err = "La contraseña debe tener al menos 6 caracteres.";
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate confirm password
    if(trim($_POST["confirm_password"]) == ""){
        $confirm_password_err = "Por favor, confirme su contraseña.";     
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password != $confirm_password)){
            $confirm_password_err = " Las contraseñas no concuerdan.";
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
    <title>Tencelu | Nuevo usuario</title>
    <link rel="icon" href="../img/icon_new.svg?v=2" />
    <link href="../css/cdn/bootstrap.css" rel="stylesheet">
    <link href="../css/controlpanel.css" rel="stylesheet">
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
                <h2>Registro de usuario</h2>
                <p>Por favor, complete el siguiente formulario para crear un nuevo usuario.</p>
                <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                    <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                        <label>Nombre de usuario</label>
                        <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                        <span class="help-block"><?php echo $username_err; ?></span>
                    </div>  
                    <div class="form-group <?php echo (!empty($mail_err)) ? 'has-error' : ''; ?>">
                        <label>E-Mail</label>
                        <input type="text" name="mail" class="form-control" value="<?php echo $mail; ?>">
                        <span class="help-block"><?php echo $mail_err; ?></span>
                    </div>  
                    <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                        <label>Contraseña</label>
                        <input type="password" name="password" class="form-control" value="<?php echo $password; ?>">
                        <span class="help-block"><?php echo $password_err; ?></span>
                    </div>
                    <div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
                        <label>Confirmar contraseña</label>
                        <input type="password" name="confirm_password" class="form-control" value="<?php echo $confirm_password; ?>">
                        <span class="help-block"><?php echo $confirm_password_err; ?></span>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Continuar">
                        <input type="reset" class="btn btn-default" value="Limpiar">
                    </div>
                    <p>Si ya tiene una contraseña <a href="index.php">Inicie sesión aquí</a>.</p>
                </form>
            </div>    
        </div>
    </div>
</body>
</html>