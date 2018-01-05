<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "location".
 *
 * @property string $id
 * @property string $name
 * @property integer $parent_id
 */
class Location extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'location';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'parent_id'], 'required'],
            [['parent_id'], 'integer'],
            [['name'], 'string', 'max' => 120],
            [['name', 'parent_id'], 'unique', 'targetAttribute' => ['name', 'parent_id'], 'message' => 'The combination of Name and Parent ID has already been taken.'],
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
            'parent_id' => Yii::t('app', 'Parent ID'),
        ];
    }
}
