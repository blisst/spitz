<?
//include "send_user_email.php";
include "db_connect.php";
	

//////////////////////////////

//if(isset($submit_data) and $submit_data=="post"){
//if(isset($todo) and $todo=="test"){ 

	$status = "OK";
	$msg="";				
	$userEmail = $_POST['userEmail'];

				
	/*if (!eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", $userEmail)){ 
	
		$status = "NOT OK";
		echo "result=" . urlencode("Not a valid email! Try again!");
	}*/
	/////////////////
	
	$exsists = mysql_fetch_array(mysql_query("SELECT * FROM email WHERE email='$userEmail'"));
	
	
	if($exsists){
		
		$status = "NOT OK";
		echo"result=" . urlencode("Email already exsists!");
	}
	   
	if($status<>"OK"){ 
	
		
		
	}else{ 
	
		// if all validations are passed.
		//sendEmail();
		
		
		$query=mysql_query("insert into email(email) values('$userEmail')");
		echo "result=" . urlencode("Thank you! $userEmail, has been submitted! ");
		
	}

//}
?>
