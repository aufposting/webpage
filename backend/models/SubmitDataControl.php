<?php

namespace backend\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\SubmitData;

/**
 * SubmitDataControl represents the model behind the search form about `common\models\SubmitData`.
 */
class SubmitDataControl extends SubmitData
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['published', 'login', 'pass', 'title', 'content', 'name', 'l_name', 'gender', 'phone', 'email', 'contact_time', 'city', 'postal_code', 'street', 'address', 'apartment_ids',  'apt_size', 'bedroom', 'bathroom', 'available_date',  'pets', 'parking_price', 'image_url', 'contact_person', 'zone', 'region', 'region_iso'], 'safe'],
            [['id', 'house_type_id', 'parking_count','floor_count', 'lease_length', 'package_id', 'package_duration_id'], 'integer'],
            [['rent'], 'number'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = SubmitData::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'rent' => $this->rent,
            'house_type_id' => $this->house_type_id,
            'available_date' => $this->available_date,
            'parking_count' => $this->parking_count,
            'lease_length' => $this->lease_length,
            'package_id' => $this->package_id,
            'package_duration_id' => $this->package_duration_id,
        ]);

        $query->andFilterWhere(['like', 'published', $this->published])
            ->andFilterWhere(['like', 'login', $this->login])
            ->andFilterWhere(['like', 'pass', $this->pass])
            ->andFilterWhere(['like', 'title', $this->title])
            ->andFilterWhere(['like', 'content', $this->content])
            ->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'l_name', $this->l_name])
            ->andFilterWhere(['like', 'gender', $this->gender])
            ->andFilterWhere(['like', 'phone', $this->phone])
            ->andFilterWhere(['like', 'email', $this->email])
            ->andFilterWhere(['like', 'contact_time', $this->contact_time])
            ->andFilterWhere(['like', 'city', $this->city])
            ->andFilterWhere(['like', 'postal_code', $this->postal_code])
            ->andFilterWhere(['like', 'street', $this->street])
            ->andFilterWhere(['like', 'address', $this->address])
            ->andFilterWhere(['like', 'apartment_ids', $this->apartment_ids])
            ->andFilterWhere(['like', 'apt_size', $this->apt_size])
            ->andFilterWhere(['like', 'bedroom', $this->bedroom])
            ->andFilterWhere(['like', 'bathroom', $this->bathroom])
            ->andFilterWhere(['like', 'pets', $this->pets])
            ->andFilterWhere(['like', 'parking_price', $this->parking_price])
            ->andFilterWhere(['like', 'image_url', $this->image_url])
            ->andFilterWhere(['like', 'contact_person', $this->contact_person])
            ->andFilterWhere(['like', 'zone', $this->zone])
            ->andFilterWhere(['like', 'region', $this->region])
            ->andFilterWhere(['like', 'region_iso', $this->region_iso])
            ->andFilterWhere(['like', 'floor_count', $this->floor_count]);

        return $dataProvider;
    }

    /**
     * @return $this
     */
    public static function getSubmitData()
    {
        $model = SubmitData::find()
            ->where(['published' => '0'])
            ->orderBy('id desc')
            ->asArray()
            ->one();

        return $model;
    }
    
	/**
	 * @return $this
	 */
	public static function getPremiumSubmitData()
	{
		$model = SubmitData::find()
			->where(['published' => '1'])
			->andWhere(['package_id' =>'2'])
			->orderBy('id desc')
			->asArray()
			->all();

		return $model;
	}

}
