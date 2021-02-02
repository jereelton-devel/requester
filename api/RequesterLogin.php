<?php

class RequesterLogin
{
    private $name;
    private $pass;

    public function __construct($name, $pass)
    {
        $this->name = $name;
        $this->pass = $pass;
    }

    public function requesterLogin()
    {
        $fileconf = "../config.dat";
        $linesconf = file($fileconf);

        $user = explode(":", trim($linesconf[0]))[0];
        $pass = explode(":", trim($linesconf[0]))[1];

        /*AMBIENTE DE DESENVOLVIMENTO: Usuario e Senha Padrão*/
        if(base64_decode($this->name) == $user && md5(base64_decode($this->pass)) == $pass) {
            return true;
        }

        return false;
    }
}

?>