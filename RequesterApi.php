<?php

session_start();

header("Access-Control-Allow-Origin: *");

/*error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);*/

extract($_REQUEST);

if($acao == 'auth') {

    require_once("./RequesterAuth.php");
    require_once("./RequesterLogin.php");

    $oAuth = new RequesterAuth();

    if($oAuth) {

        //devel, 123mudar$
        $oLogin = new RequesterLogin($name, $pass);

        $resp = 'Erro';
        if ($oLogin->requesterLogin()) {
            $resp = 1;
            $_SESSION['requesterlogin'] = $name;
        }

    } else {
        $resp = "Acesso Negado";
    }

    echo base64_encode($resp);
    exit;

}

echo base64_encode("false");
exit;

?>

