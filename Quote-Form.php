<?php
// Load PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';  // Include PHPMailer via Composer (or include the path to PHPMailer if installed manually)

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name           = $_POST['name'];
    $email          = $_POST['email'];
    $dueDate        = $_POST['due_date'];
    $company        = $_POST['company'];
    $specifications = $_POST['specifications'];
    $jobReference   = isset($_POST['job_reference']) ? $_POST['job_reference'] : '';

    // Sanitize inputs (recommended for security)
    $name           = htmlspecialchars(strip_tags(trim($name)));
    $email          = filter_var($email, FILTER_SANITIZE_EMAIL);
    $dueDate        = htmlspecialchars(strip_tags(trim($dueDate)));
    $company        = htmlspecialchars(strip_tags(trim($company)));
    $specifications = htmlspecialchars(strip_tags(trim($specifications)));
    $jobReference   = htmlspecialchars(strip_tags(trim($jobReference)));

    // Validate required fields
    if (empty($name) || empty($email) || empty($company) || empty($specifications)) {
        echo 'Please fill in all required fields.';
        exit;
    }

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();                                      // Send using SMTP
        $mail->Host       = 'smtp-mail.outlook.com';          // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                             // Enable SMTP authentication
        $mail->Username   = 'jpaucek@zemantool.com';                // SMTP username
        $mail->Password   = '~69Newport~';                   // SMTP password
        $mail->SMTPSecure = 'tls';                            // Enable TLS encryption
        $mail->Port       = 587;                              // TCP port to connect to

        // Recipients
        $mail->setFrom('no-reply@zemantool.com', 'Request Form');
        $mail->addAddress('jpaucek32@gmail.com');                // Add recipient

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'New Request for Quote Submitted';
        $mail->Body    = "
            <h2>New Quote Request</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Job Reference:</strong> {$jobReference}</p>
            <p><strong>Desired Due Date:</strong> {$dueDate}</p>
            <p><strong>Company Name:</strong> {$company}</p>
            <p><strong>Specifications:</strong> {$specifications}</p>
        ";

        // Handle file upload
        if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['file']['tmp_name'];
            $fileName    = $_FILES['file']['name'];
            $fileSize    = $_FILES['file']['size'];
            $fileType    = $_FILES['file']['type'];

            // Validate file type and size (optional but recommended)
            $allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'drawing/dxf'];
            $maxFileSize  = 5 * 1024 * 1024; // 10 MB

            if (in_array($fileType, $allowedTypes) && $fileSize <= $maxFileSize) {
                $mail->addAttachment($fileTmpPath, $fileName);
            } else {
                echo 'Invalid file type or file too large.';
                exit;
            }
        }

        // Send email
        $mail->send();
        echo 'Quote request has been sent successfully.';
    } catch (Exception $e) {
        // Log the error message (do not display sensitive info to the user)
        error_log("Mailer Error: {$mail->ErrorInfo}");
        echo 'An error occurred while sending your request. Please try again later.';
    }
}
?>
