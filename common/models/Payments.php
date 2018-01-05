<?php

namespace common\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "payments".
 *
 * @property integer $id
 * @property integer $sd_id
 * @property string $payer_id
 * @property string $token
 * @property string $transaction_id
 * @property string $created_at
 * @property string $updated_at
 *
 * @property SubmitData $sd
 */
class Payments extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'payments';
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'timestamp' => [
                'class' => 'yii\behaviors\TimestampBehavior',
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['created_at', 'updated_at'],
                    ActiveRecord::EVENT_BEFORE_UPDATE => ['updated_at'],
                ],
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['sd_id'], 'integer'],
            [['payer_id', 'token', 'transaction_id', 'created_at', 'updated_at'], 'string', 'max' => 500],
            [['sd_id'], 'exist', 'skipOnError' => true, 'targetClass' => SubmitData::className(), 'targetAttribute' => ['sd_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'payer_id' => Yii::t('app', 'Payer ID'),
            'token' => Yii::t('app', 'Token'),
            'transaction_id' => Yii::t('app', 'Transaction ID'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSd()
    {
        return $this->hasOne(SubmitData::className(), ['id' => 'sd_id']);
    }
}
