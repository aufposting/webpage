<?php
namespace backend\modules\coupons\helpers;

use Yii;

class HelperStatus
{
    public static function GetStatus($id,$className){

        $find = $className::findOne(['id' => $id]);

        if($find->status == 'active'){

            $find->status = 'passive';
            $find->save();

        }else{

            $find->status = 'active';
            $find->save();

        }

    }
}