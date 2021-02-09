<?php

session_start();

/*error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);*/

if(!isset($_SESSION['requesterlogin']) || $_SESSION['requesterlogin'] == "") {
    header("location:login.php");
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>REQUESTER</title>
    <meta name="description" content="DASHBOARD">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/bootstrap-theme.min.css" />
    <link rel="stylesheet" href="css/styles.css" />

    <link rel="stylesheet" href="js/vendor/toastr/toastr.min.css"/>
</head>
<body>

<!--
TODO:Opcao para trabalhar com criptografia
TODO:Verficar Charset
TODO:Recuperar a Header de Resposta e Status
-->

<div id="container-requester">

    <div id="div-request-endpoint">

        <div class="div-request-options">
            <h2>REQUESTER</h2>
        </div>

        <div class="div-request-options">
            <span>Enviar</span>
            <br />
            <select id="select-request-type">
                <option value="">Selecione</option>
                <option value="json">Json</option>
                <option value="text">Text</option>
                <option value="xml">Xml</option>
                <option value="base64">Base64</option>
            </select>
        </div>

        <div class="div-request-options">
            <span>Receber</span>
            <br />
            <select id="select-received-type">
                <option value="">Selecione</option>
                <option value="json">Json</option>
                <option value="text">Text</option>
                <option value="xml">Xml</option>
                <option value="base64">Base64</option>
            </select>
        </div>

        <div class="div-request-options">
            <span>Modo</span>
            <br />
            <select id="select-mode-type">
                <option value="">Selecione</option>
                <option value="Ajax">Ajax</option>
                <option value="Curl">Curl</option>
            </select>
        </div>

        <div class="div-request-options">
            <span>Metodo</span>
            <br />
            <select id="select-method-type">
                <option value="">Selecione</option>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
            </select>
        </div>

        <div class="div-request-options">
            <span>Endpoint</span>
            <br />
            <input type="text" name="endpoint" id="endpoint" value="" placeholder="http://endpoint.test.com/api" />
        </div>

        <div class="div-request-options padding-top-1">
            <button class="btn btn-success" type="button" id="bt-exec-request" value="Enviar">Enviar</button>
            <button class="btn btn-danger" type="button" id="bt-cancel-request" value="Cancelar">Cancelar</button>
            <button class="btn btn-info" type="button" id="bt-headers-received" value="Headers" disabled>Headers</button>
            <a id="a-quit" href="logout.php">Sair</a>
        </div>

    </div>

    <div id="div-request-params">

        <button class="btn btn-primary pull-right" type="button" id="bt-add-param" value="Adicionar">+ Add</button>

        <h4>Headers e Autenticação</h4>
        <div id="div-add-params">
            Parametro <input type="text" name="param[]" id="param_0" value="" placeholder="" />
            Valor <input type="text" name="paramvalue[]" id="paramvalue_0" value="" placeholder="" />
        </div>

        <div id="div-body-post">
            <h4>Body POST</h4>
            <textarea id="input-body-post"></textarea>
        </div>

    </div>

    <div id="div-requester-results">

        <div id="div-request-headers">
            Headers
        </div>

        <div id="div-request-results">
        </div>

    </div>

</div>

<div id="container-footer" class="container-fluid">
    <div class="row">
        <div class="padding-footer"></div>
    </div>
</div>

<script type="text/javascript" src="./js/vendor/jquery/jquery-1.11.3.js"></script>
<script src="js/vendor/toastr/toastr.min.js"></script>
<script type="text/javascript" src="./js/script.js"></script>

</body>
</html>
