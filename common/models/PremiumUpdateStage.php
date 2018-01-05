<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "premium_update_stage".
 *
 * @property integer $id
 * @property integer $stage_hour
 */
class PremiumUpdateStage extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'premium_update_stage';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['stage_hour'], 'integer'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'stage_hour' => Yii::t('app', 'Stage Hour'),
        ];
    }
	
	
}
