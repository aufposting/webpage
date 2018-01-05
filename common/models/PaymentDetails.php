<?php

namespace common\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use yii\db\Expression;

/**
 * This is the model class for table "payment_details".
 *
 * @property integer $id
 * @property string $name
 * @property string $price
 * @property string $currency
 * @property string $shipping
 * @property string $tax
 * @property string $payment_description
 * @property string $content
 * @property string $content_translation
 * @property string $created_at
 * @property string $updated_at
 */
class PaymentDetails extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'payment_details';
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
            [['price', 'shipping', 'tax'], 'number'],
            [['content', 'content_translation'], 'string'],
            [['created_at', 'updated_at'], 'safe'],
            [['name', 'currency'], 'string', 'max' => 255],
            [['payment_description'], 'string', 'max' => 500],
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
            'price' => Yii::t('app', 'Price'),
            'currency' => Yii::t('app', 'Currency'),
            'shipping' => Yii::t('app', 'Shipping'),
            'tax' => Yii::t('app', 'Tax'),
            'payment_description' => Yii::t('app', 'Payment Description'),
            'content' => Yii::t('app', 'Content'),
            'content_translation' => Yii::t('app', 'Content Translation'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
        ];
    }
}
