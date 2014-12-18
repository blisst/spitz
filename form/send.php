<?php
$ajax = (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');

//we do not allow direct script access
if (!$ajax) {
	//redirect to contact form
	$form = '../contact.html';
	header("Location: " . $form);
	exit;
}
require_once "config.php";

/**
 * Config for simple mail() function
 * Just delete whole section (or just line $mail->IsSMTP();) "SMTP" above and mail will use default mail() function
 */

/**
 * MAIL CONFIG
 */

$mail->SetFrom('mail@mail.com', 'First Last'); //from address
$mail->AddAddress("recipient@mail.com", "Sender Name"); //where to send email
$mail->Subject = "Contact Form";

//setup proper validation errors. If you change required=false, please make
//sure your contact form does not have "required" tag in input fields
//also keys of array (name, message, email) are the names used in contact form
$formFields = array(
	'name' => array('required' => true, 'required_error' => "Field is required"),
	'message' => array('required' => true, 'required_error' => "Field is required"),
	'email' => array('required' => true, 'required_error' => "Field is required", 'email_error' => "Email invalid"),
	'website' => array('required' => false, 'required_error' => "Field is required"),
);

$errorMessage = "Unfortunately we couldn't deliver your message. Please try again later.";
$successMessage = "Thank you.<br> We will contact you shortly.";

//NO NEED TO EDIT ANYTHING BELOW

//let's validate and return errors if required
if ($errors = $mail->validate($formFields, $_REQUEST)) {
	echo json_encode(array('errors' => $errors));
	exit;
}

$mail->setup(dirname(__FILE__) . '/mail.html', $_REQUEST, $formFields);

if (!$mail->Send()) {
	$message = '<div class="form-message error">' . $errorMessage . '</div>';
} else {
	$message = '<div class="form-message notice">' . $successMessage . '</div>';
}

echo json_encode(array('msg' => $message));
exit;