<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "data_log".
 *
 * @property string $id
 * @property string $submit_data_id
 * @property string $email
 * @property string $login
 * @property string $pass
 * @property string $site_id
 * @property string $status
 */
class DataLog extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'data_log';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['submit_data_id', 'site_id'], 'required'],
            [['submit_data_id', 'site_id'], 'integer'],
            [['status'], 'string'],
            [['email'], 'string', 'max' => 100],
            [['login', 'pass'], 'string', 'max' => 60],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'submit_data_id' => Yii::t('app', 'Submit Data ID'),
            'email' => Yii::t('app', 'Email'),
            'login' => Yii::t('app', 'Login'),
            'pass' => Yii::t('app', 'Pass'),
            'site_id' => Yii::t('app', 'Site ID'),
            'status' => Yii::t('app', 'Status'),
        ];
    }
}
