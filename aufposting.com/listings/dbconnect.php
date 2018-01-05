<?php

	 $DBhost = "localhost";
	 $DBuser = "x0s6j5b1_javcal";
	 $DBpass = "zmG4)%HM,sl^";
	 $DBname = "x0s6j5b1_listings";
	 
	 $DBcon = new MySQLi($DBhost,$DBuser,$DBpass,$DBname);
    
     if ($DBcon->connect_errno) {
         die("ERROR : -> ".$DBcon->connect_error);
     }
