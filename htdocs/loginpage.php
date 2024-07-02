<?php
session_start();
if(isset($_SESSION["user"])){
    header("Location: index.php");
}
?>
<html><head> 
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Form</title>
    <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">
    <link rel="stylesheet" href="cs.css">
    <link rel="stylesheet" href="alert.css">
    <script src="./app.js" defer></script>
    </head>
    <body>
        <div class="container">
            <div class="forms-container">
                <div class="signin-signup">
                    <form action="loginpage.php" class="sign-in-form" method="post" id="signin">
                        <h2 class="title">Sign in</h2>
                        <?php
                        if(isset($_POST["login"])){
                            $username_signin=$_POST["username_signin"];
                            $password_signin=$_POST["password_signin"];
                            require_once("database.php");
                            $sql="SELECT * FROM user WHERE username = '$username_signin'";
                            $result=mysqli_query($conn,$sql);
                            $user=mysqli_fetch_array($result,MYSQLI_ASSOC);
                            if($user){
                                if(password_verify($password_signin,$user["password"])){
                                    session_start();
                                    session_regenerate_id();    
                                    $_SESSION["user"]="yes";
                                    header("Location: index.php");
                                    die();
                                }else{
                                    echo "<div class='alert alert-danger'>Invalid login!</div>";
                                }
                            }else{
                                echo "<div class='alert alert-danger'>Invalid login!</div>";
                            }
                        }
                        ?>
                        <div class="input-field">
                            <i class="bx bxs-user"></i>
                            <input type="text" placeholder="User Name" name="username_signin" id="username_signin" value="<?= htmlspecialchars($_POST["username_signin"] ?? "") ?>">
                            <div class="error"></div>
                        </div>

                        <div class="input-field">
                            <i class="bx bxs-lock-alt"></i>
                            <input type="password" placeholder="Password" name="password_signin" id="password_signin"> 
                            <div class="error"></div>
                        </div>

                        <input type="submit" value="Login" name="login" class="btn solid">

                        <p class="social-text">Or Sign in with social platforms</p>
                        <div class="social-media">
                            <a href="#" class="social-icon"><i class="bx bxl-facebook"></i></a>
                            <a href="#" class="social-icon"><i class="bx bxl-instagram"></i></a>
                            <a href="#" class="social-icon"><i class="bx bxl-google"></i></a>
                            <a href="#" class="social-icon"><i class="bx bxl-twitter"></i></a>
                        </div>
                    </form>
                    
                    <form action="loginpage.php" class="sign-up-form" method="post" novalidate id="signup">
                        <h2 class="title">Sign Up</h2>
                        <?php
                        if(isset($_POST["submit"])){
                            $username_signup=$_POST["username_signup"];
                            $email_signup=$_POST["email_signup"];
                            $password_signup=$_POST["password_signup"];
                            $confirm_password_signup=$_POST["confirm_password_signup"];
                            $password_hash=password_hash($password_signup,PASSWORD_DEFAULT);
                            $errors=array();
                            if(empty($username_signup) || empty($email_signup) || empty($password_signup) || empty($confirm_password_signup)){
                                array_push($errors,"All fields are required!");
                            }
                            if(!filter_var($email_signup,FILTER_VALIDATE_EMAIL)){
                                array_push($errors,"Invalid email!");
                            }
                            if(strlen($password_signup) < 8){
                                array_push($errors,"Password must be atleast 8 characters long!");
                            }
                            if(!preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/",$password_signup)){
                                array_push($errors,"Password must have atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character!");
                            }
                            if($password_signup!==$confirm_password_signup){
                                array_push($errors,"Passwords do not match");
                            }
                            require_once("database.php");
                            $sql = "SELECT * FROM user WHERE username='$username_signup'";
                            $result=mysqli_query($conn,$sql);
                            if(mysqli_num_rows($result)> 0){
                                array_push($errors,"This username is taken!");
                            }
                            $sql = "SELECT * FROM user WHERE email='$email_signup'";
                            $result=mysqli_query($conn,$sql);
                            if(mysqli_num_rows($result)> 0){
                                array_push($errors,"Email already exists!");
                            }
                            if(count($errors)>0){
                                foreach($errors as $error){
                                    echo "<div class='alert alert-danger'>$error</div>";
                                }
                                
                            }else{
                                
                                $sql="INSERT INTO user(username,email,password) VALUES (?,?,?);";
                                $stmt=mysqli_stmt_init($conn);
                                if(mysqli_stmt_prepare($stmt, $sql)){
                                    mysqli_stmt_bind_param($stmt,'sss',$username_signup,$email_signup,$password_hash);
                                    mysqli_stmt_execute($stmt);
                                    echo "<div class='alert alert-success'>Successfully registered!</div>";
                                }else{
                                    die("Something went wrong") ;
                                }
                            }
                        }
                        ?>
                        <div class="input-field">
                            <i class="bx bxs-user"></i>
                            <input type="text" placeholder="User Name" name="username_signup" required id="username_signup">
                            <div class="error"></div>
                        </div>
                        <div class="input-field">
                            <i class="bx bxs-envelope"></i>
                            <input type="email" placeholder="Email" name="email_signup" required id="email_signup">
                            <div class="error"></div>
                        </div>

                        <div class="input-field">
                            <i class="bx bxs-lock-alt"></i>
                            <input type="password" placeholder="Password" name="password_signup" required id="password_signup">
                            <div class="error"></div>
                        </div>

                        <div class="input-field">
                            <i class="bx bxs-lock-alt"></i>
                            <input type="password" placeholder="Confirm Password" name="confirm_password_signup" required id="confirm_password_signup">
                            <div class="error"></div>
                        </div>

                        <input type="submit" name="submit" value="Sign Up" class="btn solid">
                        <p class="social-text">Or Sign up with social platforms</p>
                        <div class="social-media">
                            <a href="#" class="social-icon"><i class="bx bxl-facebook"></i></a>
                            <a href="#" class="social-icon"><i class="bx bxl-instagram"></i></a>
                            <a href="#" class="social-icon"><i class="bx bxl-google"></i></a>
                            <a href="#" class="social-icon"><i class="bx bxl-twitter"></i></a>
                        </div>
                    </form>
                </div>
            </div>


            <div class="panels-container">
                <div class="panel left-panel">
                    <div class="content">
                        <h3>New here ?</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, dolorem!</p>
                        <button class="btn transparent" id="sign-up-btn">Sign Up</button>
                    </div>

                    <img src="undraw_video_game_night_8h8m.svg" class="image" alt="picture">
                </div>

                <div class="panel right-panel">
                    <div class="content">
                        <h3>One of us ?</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, dolorem!</p>
                        <button class="btn transparent" id="sign-in-btn">Sign In</button>
                    </div>

                    <img src="undraw_video_streaming_re_v3qg.svg" class="image" alt="picture">
                </div>


            </div>
        </div>
    </body>
</html>
