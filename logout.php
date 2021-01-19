<?php

session_start();
unset($_SESSION['requesterlogin']);
//session_unset();
//session_destroy();
header("location:apilogin.php");

?>