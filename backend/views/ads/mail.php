<?php

/**
$mbox = imap_open('{mail.ghost-services.com:143/novalidate-cert}INBOX', 'client1@ghost-services.com', 'FvO{k-_%~ruZ');

echo "<h1>Mailboxes</h1>\n";
$folders = imap_listmailbox($mbox, "{imap.ghost-services.com:143}", "*");

if ($folders == false) {
    echo "Call failed<br />\n";
} else {
    foreach ($folders as $val) {
        echo $val . "<br />\n";
    }
}

echo "<h1>Headers in INBOX</h1>\n";
$headers = imap_headers($mbox);

if ($headers == false) {
    echo "Call failed<br />\n";
} else {
    foreach ($headers as $val) {
        echo $val . "<br />\n";
    }
}

imap_close($mbox);
exit;
*/
set_time_limit(0);

class Mail {

    private $from;
    private $time_ago;
    private $imap;
    private $email;
    private $pass;
    

    public function __construct() {
        $this->from = isset($_REQUEST['from']) ? $_REQUEST['from'] : die('!!! Error');
        $this->email = isset($_REQUEST['email']) ? $_REQUEST['email'] : die('!!! Error');
        $this->pass = isset($_REQUEST['pass']) ? $_REQUEST['pass'] : die('!!! Error');
        $this->time_ago = isset($_REQUEST['time_ago']) && (int) $_REQUEST['time_ago'] > 0 ? (int) $_REQUEST['time_ago'] : 300;
        $this->getImapData($this->email, $this->pass);
    }

    private function getImapData($email, $pass) {
        $email_arr = explode('@', $email);
        $user_name = $email_arr[0];
        $domen = $email_arr[1];
        switch ($domen) {
            case 'gmail.com': $mailbox = "{imap.gmail.com:993/imap/ssl/novalidate-cert}";
                break;
            case 'mail.ru': $mailbox = "{imap.mail.ru:143/imap}INBOX";
                break;
            case 'hotmail.com': case 'outlook.com': $mailbox = "{imap-mail.outlook.com:993/imap/ssl}";
                break;
            case 'ghost-services.com': $mailbox = "{mail.ghost-services.com:143/novalidate-cert}INBOX"; 
                break;
            default : die('!!! Not Supported Email');
        }


        $this->imap = imap_open($mailbox, $email, $pass);
        if ($this->imap) {
            $this->gatMail(60); //TODO change time to 300 
        } else {
            die('!!! Error');
        }
    }

    private function gatMail($limit) {
        $i = 0;
        $data = '';
        $date = date('d-M-Y G\:i', time() - $this->time_ago);
        $mail_ids = imap_search($this->imap, 'FROM ' . $this->from . ' SINCE "' . $date . '"');
        if ($mail_ids) {
            foreach ($mail_ids as $mail_id) {
                $mail = isset($_REQUEST['utf8']) ? utf8_encode(imap_body($this->imap, $mail_id)) : imap_qprint(imap_body($this->imap, $mail_id));
                $data .= '<span data-id="' . $i++ . '">' . $mail . '</span>' . PHP_EOL;
            }
            die($data);
        } elseif ($limit > 0) {
            sleep(2);
            $this->gatMail(--$limit);
        } else {
            die('!!! Empty');
        }
    }

}

new Mail();
