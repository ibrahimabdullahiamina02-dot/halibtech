<?php

require_once "db.php";

require_once "PHPMailer/src/Exception.php";
require_once "PHPMailer/src/PHPMailer.php";
require_once "PHPMailer/src/SMTP.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    header("Location: contact.html");

    exit;

}


/* ---------- GET FORM DATA ---------- */

$name = trim($_POST["name"] ?? "");

$email = trim($_POST["email"] ?? "");

$phone = trim($_POST["phone"] ?? "");

$service = trim($_POST["service"] ?? "");

$subject = trim($_POST["subject"] ?? "");

$message = trim($_POST["message"] ?? "");


/* ---------- VALIDATION ---------- */

if (
    empty($name) ||
    empty($email) ||
    empty($service) ||
    empty($message)
) {

    die("Please complete all required fields.");

}


if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    die("Please enter a valid email address.");

}


/* ---------- SAVE TO DATABASE ---------- */

$sql = "
    INSERT INTO enquiries
    (name, email, phone, service, subject, message)
    VALUES (?, ?, ?, ?, ?, ?)
";


$stmt = $conn->prepare($sql);


$stmt->bind_param(
    "ssssss",
    $name,
    $email,
    $phone,
    $service,
    $subject,
    $message
);


if (!$stmt->execute()) {

    die("Something went wrong. Please try again.");

}


/* ---------- EMAIL NOTIFICATION ---------- */

/*
   CHANGE THIS TO YOUR REAL HALIB EMAIL.
*/

$halibEmail = "halibtechandmediagroup@gmail.com";


$emailSubject = "New HALIB Website Enquiry";


$emailBody = "

New enquiry received from HALIB website.


Name:
$name


Email:
$email


Phone:
$phone


Service:
$service


Subject:
$subject


Message:
$message

";


$headers = "From: HALIB Website <noreply@yourdomain.com>\r\n";

$headers .= "Reply-To: $email\r\n";


@mail(
    $halibEmail,
    $emailSubject,
    $emailBody,
    $headers
);


/* ---------- SUCCESS ---------- */

$stmt->close();

$conn->close();


echo "

<!DOCTYPE html>

<html>

<head>

    <meta charset='UTF-8'>

    <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0'
    >

    <title>Message Sent | HALIB</title>

    <link rel='stylesheet' href='style.css'>

</head>


<body>

<section class='page-hero'>

    <h1>Thank You!</h1>

    <p>
        Your message has been received by HALIB Tech & Media Group.
    </p>

    <br>

    <a href='index.html' class='btn primary-btn'>
        Back to Home
    </a>

</section>

</body>

</html>

";

?>