<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "apartment_amenities".
 *
 * @property string $id
 * @property string $apartment
 * @property string $translation_fr
 */
class ApartmentAmenities extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'apartment_amenities';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['apartment', 'translation_fr'], 'required'],
            [['apartment', 'translation_fr'], 'string', 'max' => 50],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'apartment' => Yii::t('app', 'Apartment'),
            'translation_fr' => Yii::t('app', 'France Translation'),
        ];
    }
}
