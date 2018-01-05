<?php

namespace backend\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\Location;

/**
 * LocationControl represents the model behind the search form about `common\models\Location`.
 */
class LocationControl extends Location
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'parent_id'], 'integer'],
            [['name'], 'safe'],
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
        $query = Location::find();

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
            'parent_id' => $this->parent_id,
        ]);

        $query->andFilterWhere(['like', 'name', $this->name]);

        return $dataProvider;
    }

    public static function getRegion()
    {
        $model = Location::find()
            ->where(['parent_id' => 0])
            ->asArray()
            ->all();

        return $model;
    }

    public static function getRegionId($regionName)
    {
        $model = Location::find()
            ->select('id')
            ->where([
                'name' => $regionName
            ])->one()->id;

        return $model;
    }
    public static function getCity($parent_id)
    {
        $model = Location::find()
            ->asArray()
            ->where(['parent_id' => $parent_id])
            ->all();

        return $model;
    }

}
