<?php

session_start();

  require_once("mail/class.phpmailer.php"); //library added in download source.

    if (isset($_GET['method'])) {

        if(isSet($_GET['method']) && $_GET['method'] == 'sendMail') {
            try{

                $array = array();
                parse_str($_POST['datos'], $array);

                $name_1 = $array['name_1'];
                $last_name = $array['last_name'];
                $phone = $array['phone'];
                $email_2 = $array['email_2'];
                $state = $array['state'];
                $city = $array['city'];
                $postalcode = $array['postalcode'];
                $street = $array['street'];
                $address = $array['address'];
                $Tpropiedad = $array['Tpropiedad'];
                $numBeds = $array['numBeds'];
                $numBath = $array['numBath'];

                $titleAd = $array['titleAd'];
                $descriptionAd = $array['descriptionAd'];
                $sizeOfApt = $array['sizeOfApt'];
                
                $minLease = $array['minLease'];
                $price = $array['rentPrice'];
                $furnished = $array['furnished'];
                $petsAllow = $array['petsAllow'];
                $parkingInc = $array['parkingInc'];

               // $creditcard_type_2 = $array['creditcard_type_2'];
                // $creditcard_number_2 = $array['creditcard_number_2'];
                // $creditcard_expdate_month_2 = $array['creditcard_expdate_month_2'];
                // $creditcard_expdate_year_2 = $array['creditcard_expdate_year_2'];
               //  $creditcard_csc_2 = $array['creditcard_csc_2'];
               
                
                $email_message = "<br>Reservation:<br><br>";
                
                $email_message .= "Name: " . $name_1 . "<br>";
                $email_message .= "Last Name: " . $last_name . "<br>";
                $email_message .= "Phone: " . $phone . "<br>";
                $email_message .= "Email: " . $email_2 . "<br>";
                $email_message .= "State: " . $state . "<br>";
                $email_message .= "City: " . $city . "<br>";
                $email_message .= "Postal Code: " . $postalcode . "<br>";
                $email_message .= "Street: " . $street . "<br>";
                $email_message .= "Address: " . $address . "<br>";
                $email_message .= "Type Property: " . $Tpropiedad . "<br>";
                $email_message .= "Size of apt: " . $sizeOfApt . "<br>";
                $email_message .= "Number Bedroom: " . $numBeds . "<br>";
                $email_message .= "Number Bathroom: " . $numBath . "<br>";



        //Apartment Amenities
                $email_message .= "<b>Apartment Amenities:</b><br>";


                    if(!empty($array['Apartmentamenities'])) {
                                $email_message .= "<b>";
                        foreach($array['Apartmentamenities'] as $check => $value) {
                                $email_message .= $value . "<br>"; //echoes the value set in the HTML form for each checked checkbox.
                                             //so, if I were to check 1, 3, and 5 it would echo value 1, value 3, value 5.
                                             //in your case, it would echo whatever $row['Report ID'] is equivalent to.
                        }
                                $email_message .= "</b><br>";
                    }    


        //Property Amenities
                $email_message .= "<b>Property Amenities:</b><br>";


                    if(!empty($array['amenities'])) {
                                $email_message .= "<b>";
                        foreach($array['amenities'] as $check => $value) {
                                $email_message .= $value . "<br>"; //echoes the value set in the HTML form for each checked checkbox.
                                             //so, if I were to check 1, 3, and 5 it would echo value 1, value 3, value 5.
                                             //in your case, it would echo whatever $row['Report ID'] is equivalent to.
                        }
                                $email_message .= "</b><br>";
                    }  

                $email_message .= "Minimum Lease Term: " . $minLease . "<br>";
                $email_message .= "Rent (price of rent): " . $price . "<br>";
                $email_message .= "Furnished: " . $furnished . "<br>";
                $email_message .= "Pets Allowed: " . $petsAllow . "<br>";
                $email_message .= "Parking Included: " . $parkingInc . "<br>";
                $email_message .= "Title of the Ad: " . $titleAd . "<br>";
                $email_message .= "Description: " . $descriptionAd . "<br>";

                // $email_message .= "Type Credit Card: " . $creditcard_type_2 . "<br>";
               // $email_message .= "Credit Card: " . $creditcard_number_2 . "<br>";
                //$email_message .= "Expiration Month: " . $creditcard_expdate_month_2 . "<br>";
                //$email_message .= "Expiration Year: " . $creditcard_expdate_year_2 . "<br>";
                //$email_message .= "Code Security: " . $creditcard_csc_2 . "<br>";
                //$email_message .= "Coupon: " . $coupon_code_2 . "<br>";                             


                    $to   = $email_2;
                    $from = 'orders@aufposting.com';
                    $name = 'Order Reservation';
                    $from_name = 'orders@aufposting.com';
                    $subject = 'Order Reservation';
                    $body = $email_message;
                    $is_gmail = false;
                    
                        global $error;
                        $mail = new PHPMailer();
                        $mail->CharSet = 'UTF-8';
                        $mail->IsSMTP();
                        $mail->SMTPAuth = true; 
                        if($is_gmail)
                        {
                            $mail->SMTPSecure = 'ssl'; 
                            $mail->Host = 'cloud1032.hostgator.com';
                            $mail->Port = 465;  
                            $mail->Username = 'orders@aufposting.com';  
                            $mail->Password = 'BAnkoh2rBD#F';   
                        }
                        else
                        {
                            $mail->Host = 'mail.aufposting.com';
                            $mail->Username = 'orders@aufposting.com';  
                            $mail->Password = 'BAnkoh2rBD#F';
                        }
                        $mail->IsHTML(true);
                        $mail->From="orders@aufposting.com";
                        $mail->FromName="Order Reservation";
                        $mail->Sender=$from; // indicates ReturnPath header
                        $mail->AddReplyTo($from, $from_name); // indicates ReplyTo headers
                        //$mail->AddCC('reservas@ninjaweb.us');
                        $mail->AddBCC("orders@aufposting.com"); // Copia oculta
                        $mail->AddBCC("info@aufposting.com"); // Copia oculta
                        //$mail->AddBCC("rjsg_1994@hotmail.com");
                        $mail->Subject = $subject;
                        $mail->Body = $body;
                        $mail->AltBody = "Thank you for your preference!"; // email_messageo sin html

						$_q = $_REQUEST['_q'];
						foreach (glob('uploads/' . $_q . "*.*") as $filename) {
							$mail->AddAttachment($filename, str_replace('uploads/', '', $filename));
						}
						
//                       if(!empty($_SESSION['files'])) {
//                              //var_dump($_SESSION['files']);
//                         foreach ($_SESSION['files'] as $row) {//                               //echo $row['path'] ." - ".$row['name'];
//                           $mail->AddAttachment($row['path'], $row['name']);
//                         }
//                       }else{
//                            echo "no hay nada";
//                      }

                        session_destroy();

                        $mail->AddAddress($to);
                        
                        if(!$mail->Send())
                        {
                            $error = 'Mail error: '.$mail->ErrorInfo;
                            echo $error;
                        }
                        else
                        {
                            $error = 'You will be redirected to paypal payment page!';
                            //header("Location: reservation.php?mail=true");
                            echo $error;
                        }                

            }catch(Exception $e){
                echo "catch: ".$e->getMessage();
            }
        }
    }

?>