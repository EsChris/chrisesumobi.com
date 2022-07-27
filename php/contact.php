<?php

/*
This project is licensed under the MIT License.
Copyright (c) 2018 Jordan Segalman
*/

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["subject"])) {
		http_response_code(400);
		echo "Please enter a subject.";
		exit;
	} else if (empty($_POST["name"])) {
		http_response_code(400);
		echo "Please enter your name.";
		exit;
	} else if (empty($_POST["email"])) {
		http_response_code(400);
		echo "Please enter your email address.";
		exit;
	} else if (!filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL)) {
		http_response_code(400);
		echo "Please enter a valid email address.";
		exit;
	} else if (empty($_POST["message"])) {
		http_response_code(400);
		echo "Please enter a message.";
		exit;
	} else if (empty($_POST['g-recaptcha-response'])) {
		http_response_code(400);
		echo 'Please check the reCAPTCHA.';
		exit;
	}

    // Get the form fields and remove whitespace.
    $subject = strip_tags(trim($_POST["subject"]));
	$subject = str_replace(array("\r", "\n"), array(" ", " "), $subject);
	$name = strip_tags(trim($_POST["name"]));
	$name = str_replace(array("\r", "\n"), array(" ", " "), $name);
	$from = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);
    
    // Set the recipient email address.
    $recipient = "hello@example.com";
    
    // Get IP address, date and time.
	$address = $_SERVER['REMOTE_ADDR'];
	$date = date('m/d/Y');
    $time = date('H:i:s');
    
    // Build the email content.
    $content = "You have received a new message from the contact form on your website.\n\n";
    $content .= "Subject: $subject\n\n";
    $content .= "Name: $name\n";
    $content .= "Email: $from\n\n";
    $content .= "Message:\n$message\n\n";
    $content .= "This message was sent from $address on $date at $time.";

    $response = isValid($address);
    
    // Build the email headers.
    $headers = "Content-type: text/plain; charset=utf-8\r\n";
    $headers .= "From: $name <$email>";
    

    // Send the email.
	if ($response !== true) {
		http_response_code(400);
		echo "You are a robot!";
	} else if (mail($recipient, $subject, $content, $headers)) {
		http_response_code(200);
		echo "Thank you! Your message has been sent. I will get back to you as soon as possible.";
	} else {
		http_response_code(500);
		echo "Oops! An error occurred and your message could not be sent.";
	}
} else {
	http_response_code(403);
	echo "Oops! There was a problem with your submission. Please try again.";
}

/*
Google recaptcha verification.
Replace YOUR-SECRET-KEY with your own.
*/
function isValid($address) {
	try {
        $url = 'https://www.google.com/recaptcha/api/siteverify';
		$data = ['secret' => 'YOUR-SECRET-KEY', 'response' => $_POST['g-recaptcha-response'], 'remoteip' => $address];
		$options = ['http' => ['header' => "Content-type: application/x-www-form-urlencoded\r\n", 'method' => 'POST', 'content' => http_build_query($data)]];
		$context  = stream_context_create($options);
		$result = file_get_contents($url, false, $context);
		return json_decode($result) -> success;
	} catch (Exception $e) {
		return null;
	}
}

?>