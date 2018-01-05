<?php
namespace backend\modules\coupons;

use backend\modules\coupons\models\Coupons as couponsModel;

/**
 * coupons module definition class
 */
class Coupons extends \yii\base\Module
{
    /**
     * @inheritdoc
     */
    public $controllerNamespace = 'backend\modules\coupons\controllers';

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();
    }

    /**
     * @property string $coupon_code
     * @property integer $price
     *
     * @return $new_price or $price
     */
    public function getPrice($coupon_code, $price)
    {

        if(isset($coupon_code) && isset($price)) {

            $model = couponsModel::findOne([
                'coupon_code' => $coupon_code,
                'status' => 'active',
            ]);

            if(!empty($model)){

                $check_date = date('Y-m-d H:i:s');

		if($model->expire_at >= $check_date || $model->expire_at==NULL){

                   if($model->available_coupons_count > 0){

                       if($model->discount_type == 'percent'){

                           $new_price = $price * $model->discount_count / 100;
                           $new_price = $price - $new_price;

                           return $new_price;

                       }else{

                           $new_price = $price - $model->discount_count;

                           return $new_price;

                       }

                   }else{

                       return floatval($price);

                   }

               }else{

                   return floatval($price);

               }

            }else{

                return floatval($price);

            }

        }else{

            return false;

        }

    }

    /**
     * @property string $coupon_code
     *
     * @return true or false
     */
    public function reduceCouponCount($coupon_code)
    {
        $model = couponsModel::findOne([
            'coupon_code' => $coupon_code,
            'status' => 'active',
        ]);

        if(!empty($model)){

            if($model->available_coupons_count > 0){

                $model->available_coupons_count = $model->available_coupons_count - 1;

                $model->save();

                return true;

            }else{

                return false;

            }

        }else{

            return false;

        }

    }

}
