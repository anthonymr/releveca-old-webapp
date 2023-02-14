
<?php
require_once "./backend/config.php";
require_once "./backend/functions.php";

// Initialize the session
session_start();
 
// Check if the user is already logged in, if yes then redirect him to welcome page
isUserLogged($_SESSION);
 
 // Define variables and initialize with empty values
$username = $password = "";
$err = "";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){

    // Check if username is empty
    if(trim($_POST["username"]) == ""){
        $err = "Por favor, ingresa todos los datos.";
    } else{
        $username = trim($_POST["username"]);
    }
    
    // Check if password is empty
    if(trim($_POST["password"]) == ""){
        $err = "Por favor, ingresa todos los datos.";
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate credentials
    if(empty($err)){
        // Prepare a select statement
        $sql = "SELECT users.id, users.username, password FROM users 
        WHERE status = 1 and users.username = ?";
        
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            
            // Set parameters
            $param_username = $username;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Store result
                mysqli_stmt_store_result($stmt);
                
                // Check if username exists, if yes then verify password
                if(mysqli_stmt_num_rows($stmt) == 1){                    
                    // Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
                    if(mysqli_stmt_fetch($stmt)){
                        if(password_verify($password, $hashed_password)){
                        //if($password == $hashed_password){
                            // Password is correct, so start a new session
                            session_start();
                            
                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;                            

                            // Redirect user to welcome page
                            header("location: welcome.php");
                        } else{
                            // Display an error message if password is not valid
                            $err = "Los datos ingresados no son invalidos.";
                        }
                    }
                } else{
                    // Display an error message if username doesn't exist
                    $err = "Los datos ingresados no son invalidos.";
                }
            } else{
                echo "Oops! Algo no está bien. Intente más tarde.";
            }
                    // Close statement
        mysqli_stmt_close($stmt);
        }
        

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
        <div class="logo-wrapper">
            <div>
                <img src="./assets/images/logo-medium.svg">
            </div>
        </div>
        <form class="form-wrapper" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <input placeholder="Usuario" type="text" name="username" value="<?php echo $username; ?>">
            <input placeholder="Contraseña" type="password" name="password" class="form-control">
            
            <span class="form-error"><?php echo $err; ?></span>

            <input type="submit" value="Ingresar">
            <button class="secondary"><a href="register.php">Registrate</a></button>
        </form>
    </main>
</body>
</html>