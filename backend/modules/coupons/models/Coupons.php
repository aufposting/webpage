<?php

namespace backend\modules\coupons\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use yii\db\Expression;

/**
 * This is the model class for table "coupons".
 *
 * @property integer $id
 * @property string $name
 * @property string $image_url
 * @property string $coupon_code
 * @property string $discount_type
 * @property integer $discount_count
 * @property integer $available_coupons_count
 * @property string $expire_at
 * @property string $created_at
 * @property string $updated_at
 * @property string $status
 * @property string $image
 * @property string $generate_coupon_code
 *
 */
class Coupons extends \yii\db\ActiveRecord
{
    public $image;
    public $generate_coupon_code;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'coupons';
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::className(),
                'createdAtAttribute' => 'created_at',
                'updatedAtAttribute' => 'updated_at',
                'value' => new Expression('NOW()'),
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['discount_type', 'discount_count', 'available_coupons_count', 'status'], 'required'],
            [['discount_type', 'status'], 'string'],
            [['discount_count', 'available_coupons_count'], 'integer'],
            [['created_at', 'updated_at', 'expire_at'], 'safe'],
            [['name', 'image_url'], 'string', 'max' => 500],
            [['coupon_code'], 'string', 'max' => 255],
            [['coupon_code'], 'unique'],
            [['generate_coupon_code'], 'safe'],
            [['image'], 'safe'],
            [['image'], 'file', 'extensions'=>'jpg, png', 'maxSize'=> 2000000], //max 2 mb
            [['image'], 'image'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'name' => Yii::t('app', 'Name'),
            'image_url' => Yii::t('app', 'Image Url'),
            'coupon_code' => Yii::t('app', 'Coupon Code'),
            'discount_type' => Yii::t('app', 'Discount Type'),
            'discount_count' => Yii::t('app', 'Discount Count'),
            'available_coupons_count' => Yii::t('app', 'Available Coupons Count'),
            'expire_at' => Yii::t('app', 'Expire At'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
            'status' => Yii::t('app', 'Status'),
            'image' => Yii::t('app', 'Image'),
            'generate_coupon_code' => Yii::t('app', 'Generate Coupon Code'),
        ];
    }
}