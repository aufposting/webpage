<?php
use backend\models\HouseTypeControl;
use backend\models\ApartmentAmenitiesControl;
$getRequest = Yii::$app->request->get();

    if (isset($getRequest['sites'])) {
        $submit_data = [];
     if ($sites){
         foreach ($sites as $val){
             $submit_data[] = $val['url'];
         }
     }
        die(json_encode($submit_data));
    } else {

        if ($getSubmitData) {
            $submit_data = $getSubmitData;
            $houseType = HouseTypeControl::getHouse($submit_data['house_type_id']);

            if ($houseType) {
                $submit_data['house_type'] = $houseType['house'];
            }else{
                $submit_data['house_type'] = null;
            }
            $ApartmentAmenities = ApartmentAmenitiesControl::getApartmentAmenities($submit_data['apartment_ids']);
            if ($ApartmentAmenities) {
                foreach ($ApartmentAmenities as $val){
                    $submit_data['apartment_amenities'][$val['id']] = $val['apartment'];
                }
            }else{
                $submit_data['apartment_amenities'] = null;
            }
            die(json_encode($submit_data));
        }
      die("Empty Data");
}