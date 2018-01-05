<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "house_type".
 *
 * @property string $id
 * @property string $house
 * @property string $translation_fr
 */
class HouseType extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'house_type';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['house', 'translation_fr'], 'required'],
            [['house', 'translation_fr'], 'string', 'max' => 50],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'house' => Yii::t('app', 'House'),
            'translation_fr' => Yii::t('app', 'France Translation'),
        ];
    }
}
