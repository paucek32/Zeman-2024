<?php
// Load PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';  // Include PHPMailer via Composer

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name           = $_POST['name'];
    $email          = $_POST['email'];
    $company        = $_POST['company'];
    $phone          = $_POST['phone'];
    $dueDate        = $_POST['due_date'];
    $specifications = $_POST['specifications'];
    $jobReference   = isset($_POST['job_reference']) ? $_POST['job_reference'] : '';

    // Sanitize inputs
    $name           = htmlspecialchars(strip_tags(trim($name)));
    $email          = filter_var($email, FILTER_SANITIZE_EMAIL);
    $company        = htmlspecialchars(strip_tags(trim($company)));
    $phone          = htmlspecialchars(strip_tags(trim($phone)));
    $dueDate        = htmlspecialchars(strip_tags(trim($dueDate)));
    $specifications = htmlspecialchars(strip_tags(trim($specifications)));
    $jobReference   = htmlspecialchars(strip_tags(trim($jobReference)));

    // Validate required fields
    if (empty($name) || empty($email) || empty($company) || empty($specifications)) {
        echo 'Please fill in all required fields.';
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 'Invalid email address.';
        exit;
    }

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp-mail.outlook.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = getenv('SMTP_USERNAME'); // Securely retrieve SMTP username
        $mail->Password   = getenv('SMTP_PASSWORD'); // Securely retrieve SMTP password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('no-reply@zemantool.com', 'Request Form');
        $mail->addAddress('your-email@example.com'); // Replace with your email address

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Request for Quote Submitted';
        $mail->Body    = "
            <h2>New Quote Request</h2>
            <table>
                <tr><td><strong>Name:</strong></td><td>{$name}</td></tr>
                <tr><td><strong>Email:</strong></td><td>{$email}</td></tr>
                <tr><td><strong>Company Name:</strong></td><td>{$company}</td></tr>
                <tr><td><strong>Phone Number:</strong></td><td>{$phone}</td></tr>
                <tr><td><strong>Job Reference:</strong></td><td>{$jobReference}</td></tr>
                <tr><td><strong>Desired Due Date:</strong></td><td>{$dueDate}</td></tr>
                <tr><td><strong>Project Details:</strong></td><td>{$specifications}</td></tr>
            </table>
        ";

        // Handle multiple file uploads
        if (isset($_FILES['file']) && $_FILES['file']['error'][0] != UPLOAD_ERR_NO_FILE) {
            $allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'image/jpeg',
                'image/png',
                'application/dxf', // Adjust MIME type as needed
            ];
            $maxFileSize  = 10 * 1024 * 1024; // 10 MB

            foreach ($_FILES['file']['tmp_name'] as $key => $tmp_name) {
                $fileTmpPath = $_FILES['file']['tmp_name'][$key];
                $fileName    = $_FILES['file']['name'][$key];
                $fileSize    = $_FILES['file']['size'][$key];
                $fileType    = $_FILES['file']['type'][$key];
                $fileError   = $_FILES['file']['error'][$key];

                if ($fileError === UPLOAD_ERR_OK) {
                    if (in_array($fileType, $allowedTypes) && $fileSize <= $maxFileSize) {
                        $mail->addAttachment($fileTmpPath, $fileName);
                    } else {
                        echo 'Invalid file type or file too large.';
                        exit;
                    }
                } else {
                    echo 'Error uploading file.';
                    exit;
                }
            }
        }

        // Send email
        $mail->send();
        echo 'Quote request has been sent successfully.';
    } catch (Exception $e) {
        error_log("Mailer Error: {$mail->ErrorInfo}");
        echo 'An error occurred while sending your request. Please try again later.';
    }
}
?>