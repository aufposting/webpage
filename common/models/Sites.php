<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "sites".
 *
 * @property string $id
 * @property string $url
 * @property string $is_active
 */
class Sites extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'sites';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['url'], 'required'],
            [['is_active', 'is_top'], 'string'],
            [['url'], 'string', 'max' => 200],
            [['url'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'url' => Yii::t('app', 'Url'),
            'is_active' => Yii::t('app', 'Is Active'),
            'is_top' => Yii::t('app', 'Is Active'),
        ];
    }
}
