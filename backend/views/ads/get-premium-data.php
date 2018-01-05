<?php
use backend\models\HouseTypeControl;
use backend\models\ApartmentAmenitiesControl;

if (isset($premiumSubmitData)) {
	
	$submit_data = $premiumSubmitData;
	
	foreach ($premiumSubmitData as $key=>$val){
		$houseType[] = HouseTypeControl::getHouse($val['house_type_id']);
		
		if ($houseType) {
			$submit_data[$key]['house_type'] = $houseType[$key]['house'];
		}else{
			$submit_data[$key]['house_type'] = null;
		}
		
		
		$ApartmentAmenities[] = ApartmentAmenitiesControl::getApartmentAmenities($submit_data[$key]['apartment_ids']);
		
		if ($ApartmentAmenities) {
			foreach ($ApartmentAmenities[$key] as $val){
				$submit_data[$key]['apartment_amenities'][$val['id']] = $val['apartment'];
			}
		}else{
			$submit_data[$key]['apartment_amenities'] = null;
		}
		
	}
	
	die(json_encode($submit_data));
}

