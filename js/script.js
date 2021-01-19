
var domain = "DOMAIN";
var endpointApi = "https://"+domain+"/requester/RequesterApi.php";

//TODO: Terminar o controle de acesso das aplicacoes
/*Controle de acesso por aplicacao*/
var appOriginUrl = window.location.href;
var getDomain = appOriginUrl.replace("http://", "").replace("https://", "");
getDomain = getDomain.split("/");
var remoteDomain   = getDomain[0];

//console.log(remoteDomain);

//Mensageiro (Tooltip style)
toastr.options = {
    "closeButton": false, // true/false
    "debug": false, // true/false
    "newestOnTop": false, // true/false
    "progressBar": false, // true/false
    "positionClass": "toast-bottom-right",//toast-bottom-center / toast-top-right / toast-top-left / toast-bottom-right / toast-bottom-left0
    "preventDuplicates": true, //true/false,
    "onclick": null,
    "showDuration": "300", // in milliseconds
    "hideDuration": "1000", // in milliseconds
    "timeOut": "5000", // in milliseconds
    "extendedTimeOut": "1000", // in milliseconds
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

var bt_login = $("#bt-login");
var bt_exec_request = $("#bt-exec-request");
var bt_add_param = $("#bt-add-param");
var bt_headers_received = $("#bt-headers-received");
var bt_cancel_request = $("#bt-cancel-request");
var select_method_type = $("#select-method-type");
var headersToAjax = {};
var param_count = 0;

function getHeadersAjax() {

    for(var i = 0; i <= param_count; i++) {

        var currentParam = $("#param_"+i).val();
        var currentValue = $("#paramvalue_"+i).val();

        if(currentParam != "" && currentValue != "") {
            headersToAjax[currentParam] = currentValue;
        }

    }

    return headersToAjax;

}

function sendRequest(typeRequester, typeReceiver, modeRequester, methodRequester, endpointRequester, dataRequester) {

    var contentTypeSend = typeRequester;
    var dataToSend = dataRequester;
    var dataTypeReceiver = typeReceiver;

    $("#div-request-results").html('');

    if(modeRequester == "Ajax") {

        if(typeRequester == "base64") {
            contentTypeSend = "text";
            dataToSend = btoa(dataToSend);
        }

        if(dataTypeReceiver == "base64") {
            dataTypeReceiver = "text";
        }

        var headersAjax = getHeadersAjax();

        $.ajax({

            type: methodRequester,
            url: endpointRequester,
            data: dataToSend,
            dataType: dataTypeReceiver,
            headers: headersAjax,
            contentType: 'application/'+contentTypeSend+'; charset=utf-8',

            success: function (rsp, status, xhr) {

                //console.log(xhr.getAllResponseHeaders()); //HTTP Headers
                //console.log(xhr.status); //200
                $("#div-request-headers").html("<pre>status: " + xhr.status + "<br />" + xhr.getAllResponseHeaders() + "</pre>");
                $("#bt-headers-received").prop('disabled', false);

                if(typeReceiver == "json") {

                    $("#div-request-results").html("<pre>" + JSON.stringify(rsp, null, "\t") + "</pre>");

                } else if(typeReceiver == "text") {

                    $("#div-request-results").html("<pre>" + rsp + "</pre>");

                } else if(typeReceiver == "xml") {

                    toastr.error("Tipo de Resposta " + typeReceiver + " indisponivel");

                } else if(typeReceiver == "base64") {

                    var tmp = "";

                    //BASE64(JSON)
                    try {
                        tmp = JSON.parse(JSON.stringify(atob(rsp), null, "\t"));
                    } catch(err) {

                        //BASE64(TXT)
                        try {
                            tmp = atob(rsp);
                        } catch (err) {
                            tmp = "<strong style='color: red'>Base64DecodeError:<br />" + err + "</strong>";
                        }
                    }

                    $("#div-request-results").html("<pre>" + tmp + "</pre>");

                } else {
                    toastr.error("Houve um erro ao tentar identificar o tipo de resposta: " + typeReceiver);
                }

            },

            error: function (err, status, xhr) {

                if (err.responseText = "" || xhr == "" || status == "") {
                    toastr.error("Não foi possível obter a resposta do Endpoint Requisitado");
                } else {
                    $("#div-request-results").html("<pre><strong style='color: red'>" + status + "<br />" + xhr + "</strong></pre>");
                }
            }

        });
    } else {
        toastr.error("Modo " + modeRequester + " indisponivel");
    }

}

function apiAuthentication(name, pass) {

    $.post(endpointApi,
        {acao: 'auth', name: btoa(name), pass: btoa(pass)},
        function (resp, textStatus, jqXHR) {
            if (parseInt(atob(resp)) == 1) {
                toastr.success("Logado com sucesso!");
                setTimeout(function(){
                    location.href = 'index.php';
                }, 2000);
            } else {
                toastr.error("Erro: Login Invalido!");
                //window.location.href = 'apilogin.php';
            }
        }
    );
}

function removeParam(id) {
    $("#param_"+id).val('');
    $("#paramvalue_"+id).val('');
    $("#divparam_"+id).hide();
}

$(document).ready(function(){

    bt_add_param.on('click', function(){

        param_count += 1;

        $("#div-add-params").append('' +
            '<div id="divparam_'+param_count+'">Parametro <input type="text" name="param[]" id="param_'+param_count+'" value="" placeholder="" />\n' + '' +
            'Valor <input type="text" name="paramvalue[]" id="paramvalue_'+param_count+'" value="" placeholder="" />' +
            '<button onclick="removeParam('+param_count+')" class="btn btn-danger" type="button" id="bt-remove-param_'+param_count+'" value='+param_count+'">X</button></div>'
        );
    });

    select_method_type.change(function(){
        if($(this).val() == 'POST') {
            $("#div-body-post").show();
        } else {
            $("#div-body-post").hide();
        }
    });

    bt_cancel_request.on('click', function(){

        $("#select-request-type").val('');
        $("#select-received-type").val('');
        $("#select-mode-type").val('');
        $("#select-method-type").val('');
        $("#endpoint").val('');

        $("#div-add-params").html('' +
            'Parametro <input type="text" name="param[]" id="param_1" value="" placeholder="" />\n' + '' +
            'Valor <input type="text" name="paramvalue[]" id="paramvalue_1" value="" placeholder="" />'
        );

        $("#input-body-post").val('');

        $("#div-request-headers").html('');
        $("#div-request-results").html('');
        $("#bt-headers-received").prop('disabled', true);

    });

    bt_headers_received.on('click', function(){

        $("#div-request-results").toggle();
        $("#div-request-headers").toggle();

    });

    bt_login.on('click', function(){
        var name = $("#name").val();
        var pass = $("#password").val();
        if(name && pass) {
            apiAuthentication(name, pass);
        } else {
            toastr.error("Erro: Informe os dados para login!");
        }
    });

    bt_exec_request.on('click', function(){

        var typeRequester = $("#select-request-type").val();
        var typeReceiver = $("#select-received-type").val();
        var modeRequester = $("#select-mode-type").val();
        var methodRequester = $("#select-method-type").val();
        var endpointRequester = $("#endpoint").val();
        var dataRequester = "";

        if(methodRequester == 'POST') {
            dataRequester = $("#input-body-post").val();
        }

        if(!typeRequester || !typeReceiver || !modeRequester || !methodRequester || !endpointRequester) {
            toastr.error("Informe todos os dados para request");
            return false;
        }

        sendRequest(typeRequester, typeReceiver, modeRequester, methodRequester, endpointRequester, dataRequester);
    });
});