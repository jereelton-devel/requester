<?php

class RequesterAuth
{
    private $headers;

    public function __construct()
    {
        $this->headers = apache_request_headers();
        return $this->requesterAuthorization();
    }

    private function requesterAuthorization()
    {
        if (
            (isset($this->headers['Host']) && $this->headers['Host'] == "DOMAIN")
            &&
            (!isset($this->headers['Origin']) || $this->headers['Origin'] != "https://DOMAIN")
            ||
            (!isset($this->headers['Referer']) || !strstr($this->headers['Referer'], "https://DOMAIN"))
        )
        {
            return false;
        }

        if (
            (!isset($this->headers['Origin']) || $this->headers['Origin'] != "https://DOMAIN")
            ||
            (!isset($this->headers['Referer']) || !strstr($this->headers['Referer'], "https://DOMAIN"))
        ) {
            return false;
        }

        return true;
    }
}

?>