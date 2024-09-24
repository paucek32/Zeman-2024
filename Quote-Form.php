<?php
// Load PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';  // Include PHPMailer via Composer (or require path to downloaded PHPMailer)

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $dueDate = $_POST['due_date'];
    $company = $_POST['company'];
    $specifications = $_POST['specifications'];

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();                                      // Send using SMTP
        $mail->Host       = 'smtp-mail.outlook.com';               // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                             // Enable SMTP authentication
        $mail->Username   = 'you@example.com';                // SMTP username
        $mail->Password   = 'yourpassword';                   // SMTP password
        $mail->SMTPSecure = 'tls';                            // Enable TLS encryption
        $mail->Port       = 587;                              // TCP port to connect to

        // Recipients
        $mail->setFrom('no-reply@yourdomain.com', 'Request Form');
        $mail->addAddress('hr@zemantool.com');                // Add recipient

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'New Request for Quote Submitted';
        $mail->Body    = "
            <h2>New Quote Request</h2>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Desired Due Date:</strong> $dueDate</p>
            <p><strong>Company Name:</strong> $company</p>
            <p><strong>Specifications:</strong> $specifications</p>
        ";

        // Handle file upload
        if (!empty($_FILES['file']['name'])) {
            $file = $_FILES['file'];
            $filePath = $file['tmp_name'];
            $fileName = $file['name'];
            
            // Attach file to email
            $mail->addAttachment($filePath, $fileName);
        }

        // Send email
        $mail->send();
        echo 'Quote request has been sent successfully.';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>