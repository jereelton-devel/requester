<?php

class RequesterAuth
{
    private $headers;
    private $proto = "http";
    private $domain = "localhost";

    public function __construct()
    {
        $this->headers = apache_request_headers();
        return $this->requesterAuthorization();
    }

    private function requesterAuthorization()
    {
        if (
            (isset($this->headers['Host']) && $this->headers['Host'] == $this->domain)
            &&
            (!isset($this->headers['Origin']) || $this->headers['Origin'] != $this->proto."://".$this->domain)
            ||
            (!isset($this->headers['Referer']) || !strstr($this->headers['Referer'], $this->proto."://".$this->domain))
        )
        {
            return false;
        }

        if (
            (!isset($this->headers['Origin']) || $this->headers['Origin'] != $this->proto."://".$this->domain)
            ||
            (!isset($this->headers['Referer']) || !strstr($this->headers['Referer'], $this->proto."://".$this->domain))
        ) {
            return false;
        }

        return true;
    }
}

?>