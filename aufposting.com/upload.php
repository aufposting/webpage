<?php

$ds = DIRECTORY_SEPARATOR;

$storeFolder = 'uploads/';

if (!empty($_FILES)) {
    $_q = $_REQUEST['_q'];
    $tempFile = $_FILES['file']['tmp_name'];
    $targetPath = dirname(__FILE__) . $ds . $storeFolder . $ds;
    $fName = $_q . '-' . $_FILES['file']['name'];
    $targetFile = $targetPath . $fName;
    if (move_uploaded_file($tempFile, $targetFile)) {
        echo $fName;
    }
    die();
}


?>