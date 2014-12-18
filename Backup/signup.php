<?php	//SCRIPT VARS 
		//url of ewbpage to submit POST array to 
		$curl_url = 'http://app.icontact.com/icp/signup.php'; 
		//thanks webpage 
		//$redirect_success = 'success.php'; 
		////error webpage 
		//$redirect_failure = 'failure.php'; 
		$fields_email = $_POST['email'];
	$this["specialid:82007"] = $_POST['specialid'];
	$clientid = $_POST['clientid'];
	$formid = $_POST['formid'];
	$reallistid = $_POST['reallistid'];
	$doubleopt = $_POST['doubleopt'];
	//echo "result=". urlencode("$fields_email");
	//$Submit = "Submit";
		//submit POST array to external webpage 
		//if(isset($_POST['Submit'])) { 
		
		$postVals = ''; 
			foreach($_POST as $k => $v) { 
				$postVals .= "$k=".urlencode($v); 
				
			} 
			 
			$ch = curl_init(); 
			curl_setopt ($ch, CURLOPT_URL, $curl_url); 
			curl_setopt($curl, CURLOPT_POST, 1); 
			curl_setopt($ch, CURLOPT_POSTFIELDS, $postVals); 
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
			$result = curl_exec($ch); 
			curl_close($ch); 
		
			//here you would normally check for success or failure 
			//by searching $result for positive or negative response. 
			//for now, just redirect to the thanks page if $result is not empty 
			//echo "result=" . urlencode("$postVals");
			 if(!empty($result)) header("Location:http://app.icontact.com/icp/signup.php"); 
		
		//} 
        
        ?>