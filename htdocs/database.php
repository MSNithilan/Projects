<?php
$hostName="localhost";
$dbUser= "root";
$dbPassword= "";
$dbName= "login_db";
$conn=mysqli_connect($hostName,$dbUser,$dbPassword,$dbName);
if(!$conn){
    die("".mysqli_connect_error());
}