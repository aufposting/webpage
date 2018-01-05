<?php

namespace common\models;

use Yii;
use  yii\db\ActiveRecord;

/**
 * This is the model class for table "submit_data".
 *
 * @property string $published
 * @property string $id
 * @property string $login
 * @property string $pass
 * @property double $rent
 * @property string $title
 * @property string $content
 * @property string $name
 * @property string $l_name
 * @property string $gender
 * @property string $phone
 * @property string $email
 * @property string $contact_time
 * @property string $city
 * @property string $postal_code
 * @property string $street
 * @property string $address
 * @property string $apartment_ids
 * @property string $apt_size
 * @property string $bedroom
 * @property string $bathroom
 * @property integer $house_type_id
 * @property string $available_date
 * @property string $pets
 * @property integer $parking_count
 * @property integer $parking_price
 * @property string $image
 * @property string $contact_person
 * @property string $zone
 * @property integer $lease_length
 * @property integer $floor_count
 * @property string $region
 * @property string $region_iso
 * @property string $parking_included
 * @property string $package_id
 * @property string $package_duration_id
 * @property integer $promo_code
 *
 * @property Payments[] $payments
 */
class SubmitData extends ActiveRecord
{
    public $image;
    public $parking_included;
    public $promo_code;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'submit_data';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['published', 'content', 'gender', 'pets', 'contact_person', 'zone', 'region'], 'string'],
            [['rent', 'title', 'content', 'name', 'l_name', 'gender', 'phone', 'email', 'city', 'postal_code', 'street', 'address', 'apartment_ids', 'apt_size', 'bedroom', 'bathroom', 'zone', 'lease_length', 'region', 'contact_time', 'parking_count', 'parking_included', 'package_id', 'package_duration_id'], 'required'],
            [['floor_count'], 'number'],
            [['rent'], 'number', 'min' => 15],
            [['house_type_id', 'parking_count', 'parking_price', 'lease_length', 'apt_size', 'bedroom', 'bathroom', 'package_duration_id'], 'integer'],
            [['available_date'], 'safe'],
            [['login', 'pass', 'name', 'l_name',  'postal_code', 'street'], 'string', 'max' => 60],
            [['email'], 'email'],
            [['image'], 'safe'],
//            [['image'], 'file', 'extensions'=>'jpg, gif, png', 'maxSize'=> 800000], //max 1 mb
//            [['image'], 'image'],
            [['promo_code'], 'safe'],
            [['available_date'], 'validateDate', 'skipOnEmpty' => false, 'skipOnError' => false],
            [['pass'], 'string', 'min' => 8],
            ['phone', 'match', 'pattern' => '/^[0-9]+$/', 'message' => Yii::t('app', 'Phone must be a number.')],
            [['phone'], 'string', 'max' => 10],
            ['postal_code', 'match', 'pattern' => '/^[a-zA-Z0-9]+$/', 'message' => Yii::t('app', 'No symbols "_" or spaces are allowed.')],
//            ['pass', 'match', 'pattern' => '/^[+A-Z]$/', 'message' => 'At least one character must be uppercase'],
//            [['pass'], 'string', 'max' => 16],
            [['content'], 'string', 'min' => 200],
            [['city'], 'string', 'max' => 120],
            [['address'], 'string', 'max' => 200],
            [['title'], 'string', 'max' => 255],
            [['region_iso'], 'string', 'max' => 2],
        ];
    }

    /* Date Validation*/
    public function validateDate($attribute, $params) {
        $date = date('Y-m-d');
        if($this->$attribute == ''){
            return $this->addError($attribute, Yii::t('app', 'Available Date cannot be blank.'));
        }
        if($this->$attribute < $date){
            return $this->addError($attribute, Yii::t('app', 'Date Is Not Valid.'));
        }
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'published' => Yii::t('app', 'Published'),
            'id' => Yii::t('app', 'ID'),
            'login' => Yii::t('app', 'Login'),
            'rent' => Yii::t('app', 'Rent'),
            'title' => Yii::t('app', 'Title'),
            'content' => Yii::t('app', 'Content'),
            'name' => Yii::t('app', 'Name'),
            'l_name' => Yii::t('app', 'L Name'),
            'gender' => Yii::t('app', 'Gender'),
            'phone' => Yii::t('app', 'Phone'),
            'email' => Yii::t('app', 'Email'),
            'contact_time' => Yii::t('app', 'Contact Time'),
            'city' => Yii::t('app', 'City'),
            'postal_code' => Yii::t('app', 'Postal Code'),
            'street' => Yii::t('app', 'Street'),
            'address' => Yii::t('app', 'Address'),
            'apartment_ids' => Yii::t('app', 'Apartment Ids'),
            'apt_size' => Yii::t('app', 'Apt Size'),
            'bedroom' => Yii::t('app', 'Bedroom'),
            'bathroom' => Yii::t('app', 'Bathroom'),
            'house_type_id' => Yii::t('app', 'House Type'),
            'available_date' => Yii::t('app', 'Available Date'),
            'pets' => Yii::t('app', 'Pets'),
            'parking_count' => Yii::t('app', 'Parking Count'),
            'parking_price' => Yii::t('app', 'Parking Price'),
            'image' => Yii::t('app', 'Image'),
            'contact_person' => Yii::t('app', 'Contact Person'),
            'zone' => Yii::t('app', 'Zone'),
            'lease_length' => Yii::t('app', 'Lease Length'),
            'region' => Yii::t('app', 'Region'),
            'region_iso' => Yii::t('app', 'Region Iso'),
            'floor_count' => Yii::t('app', 'Floor Count'),
            'parking_included' => Yii::t('app', 'Parking Included'),
            'package_id' => Yii::t('app', 'Package'),
            'package_duration_id' => Yii::t('app', 'Package Duration ID'),
            'promo_code' => Yii::t('app', 'Promo Code'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPayments()
    {
        return $this->hasMany(Payments::className(), ['sd_id' => 'id']);
    }

    public function upload()
    {

        if ($this->image != NUll) {
            foreach ($this->image as $file) {
                $imgName =    $file->name =   Yii::$app->security->generateRandomString() . '.' . $file->extension;
                $file->saveAs(Yii::$app->params['image'] . $imgName);
            }
        }

        return true;

    }
}
