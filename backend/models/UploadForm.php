<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 1/11/2017
 * Time: 4:59 PM
 */

namespace backend\models;



use yii\base\Model;
use yii\web\UploadedFile;

class UploadForm extends Model
{
    public $image;

    public function rules()
    {
        return [
            [['image'],  'extensions' => 'jpg'],
        ];
    }
    public function upload()
    {
        if ($this->validate()) {
            foreach ($this->image as $file) {
                $file->saveAs(\Yii::$app->params['image'] . $file->baseName . '.' . $file->extension);
            }
            return true;
        } else {
            return false;
        }
    }
}