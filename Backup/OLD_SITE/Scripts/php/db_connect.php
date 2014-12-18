<?php

$servername='sql5c6a.megasqlservers.com';
// username and password to log onto db server
$dbusername='eatatspitz233342';
$dbpassword='guyrie';
// name of database

$dbname='spitz_eatatspitz_com';
////////////////////////////////////////
////// DONOT EDIT BELOW  /////////
///////////////////////////////////////
connecttodb($servername,$dbname,$dbusername,$dbpassword);

function connecttodb($servername,$dbname,$dbuser,$dbpassword){
	
	global $link;
	
	$link=mysql_connect ("$servername","$dbuser","$dbpassword");
	
	if(!$link){
		
		die("Could not connect to Database");
		
	}
	
	mysql_select_db("$dbname",$link) or die ("could not open db".mysql_error());

}

?>