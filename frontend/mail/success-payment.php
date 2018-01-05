 <?php $apartment = isset($_COOKIE['lang']) ? (($_COOKIE['lang'] == 'fr-FR') ? 'translation_fr' : 'apartment') : 'apartment';
use yii\helpers\ArrayHelper;
$ApartmentAmenitiesData = ArrayHelper::map(\common\models\ApartmentAmenities::find()->asArray()->all(), 'id', $apartment);
$house_type = \common\models\HouseType::find()->asArray()->all();
$house_type = array_column($house_type, 'house', 'id');

 ?>

<?php $this->beginPage() ?>
<?php $this->beginBody() ?>


<h2 style="text-align: center;">Thank you.Your payment was successfully made.</h2>
<h3 style="text-align: center;"><span style="text-transform: uppercase;"><?= $model->name . ' ' . $model->l_name ?></span> , This is your registration data.</h3>

    <table frame="box" rules="all" cellpadding="15" style="margin:auto;box-shadow: -2px -2px 4px grey, 4px 4px 4px grey;line-height:1.6;width:100%;">
        <tr>
            <th>Name</th>
            <td><?= $model->name ?></td>
        </tr>
        <tr>
            <th>Last Name</th>
            <td><?= $model->l_name ?></td>
        </tr>
        <tr>
            <th>Email</th>
            <td><?= $model->email ?></td>
        </tr>
        <tr>
            <th>Phone</th>
            <td><?= $model->phone ?></td>
        </tr>
        <tr>
            <th>Gender</th>
            <td><?= $model->gender ?></td>
        </tr>
        <tr>
            <th>City</th>
            <td><?= $model->city ?></td>
        </tr>
        <tr>
            <th>Region</th>
            <td><?= $model->region ?></td>
        </tr>
        <tr>
            <th>Street</th>
            <td><?= $model->street ?></td>
        </tr>
        <tr>
            <th>Zone</th>
            <td><?= $model->zone?></td>
        </tr>
        <tr>
            <th>Address</th>
            <td><?= $model->address ?></td>
        </tr>
        <tr>
            <th>Postal Code</th>
            <td><?= $model->postal_code ?></td>
        </tr>
        <tr>
            <th>Rent (price of rent)</th>
	            <td><?= $model->rent ?></td>           
        </tr>
        <tr>
            <th>Property type</th>

             <td><?= $house_type[$model->house_type_id] ?></td>
        </tr>
        <tr>
            <th>Bedroom</th>
            <td><?= $model->bedroom ?></td>
        </tr>
        <tr>
            <th>Bathroom</th>
            <td><?= $model->bathroom ?></td>
        </tr>
        <tr>
            <th>Size of apartment</th>
            <td><?= $model->apt_size ?></td>
        </tr>
        <tr>
            <th>Lease Length</th>
            <td><?= $model->lease_length ?> Months</td>
        </tr>
        <tr>
            <th>Rent (price of rent)</th>
            <td><?= $model->rent ?> Months</td>
        </tr>
        <tr>
            <th>Pet Friendly</th>
            <td><?= ($model->pets==0)?'No':'Yes'  ?></td>
        </tr>
        <tr>
            <th>Parking Included</th>
            <td>
            <?php
            if($model->parking_count==0){
            echo "No parking Available";
            } elseif($model->parking_count==1) {
            echo "Yes";
            } else {
            echo "Available with additional fee";
            }
             ?>
            </td>
        </tr>
        <tr>
            <th>Parking Price</th>
            <td><?= $model->parking_price ?></td>
        </tr>
        
        <tr>
            <th>Title</th>
            <td><?= $model->title ?></td>
        </tr>
        <tr>
            <th>Content</th>
            <td><?= $model->content ?></td>
        </tr>
        <tr>
            <th>Contact Time</th>
            <td>
            <?php if($model->contact_time=='a'){
            echo "Afternoon	";
            } elseif($model->contact_time=='e'){
            echo "Evening";
            } else {
            echo "Morning";
            } ?>
            </td>
        </tr>
        
        <tr>
            <th>Apartment Amenities</th>
            <td>
            <?php $ame = $model->apartment_ids;
		$explodeAme = explode(',',$ame);
		foreach($explodeAme as $expl){
		  $amte[] = $ApartmentAmenitiesData[$expl];
		}
		echo implode(', ',$amte);
             ?>
            </td>
        </tr>
        <tr>
            <th>Available Date</th>
            <td><?= $model->available_date ?></td>
        </tr>
         
        
        <tr>
            <th>Packages</th>
            <td>
            <?php
            if($model->package_id==1){
            echo "Price $50/Month";
            } elseif($model->package_id==1){
            echo "Price $150/Month";
            } else {
            echo "Price $225/Month";
            }
             ?>
            </td>
        </tr>
        <tr>
            <th>Package Duration (Months)</th>
            <td><?= $model->package_duration_id ?></td>
        </tr>
        
        <tr>
            <th>Transaction ID</th>
            <td><?= $token ?></td>
        </tr>
         <tr>
            <th>Images</th>
            <td>
            <?php 
              if($model->image_url)
              {  
            $images = $model->image_url;
        		$explodeImages = explode(';',$images);
            		foreach($explodeImages as $expl){
            		 // $img[] ="<a target='_blank' href='http:".$expl."'>".$expl."</a>";
            		  $img[] ="<a target='_blank' href='".$expl."'><img  width='100' height='100' src='".$expl."'></a>";
            		}
        		echo implode('<br>',$img);
            } else { ?>
            
            No Image Uploaded

            <?php }
             ?>
            
            </td>
        </tr>
       
    </table>

<?php $this->endBody() ?>
<?php $this->endPage() ?>