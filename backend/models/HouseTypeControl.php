<?php

namespace backend\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\HouseType;

/**
 * HouseTypeControl represents the model behind the search form about `common\models\HouseType`.
 */
class HouseTypeControl extends HouseType
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'integer'],
            [['house', 'translation_fr'], 'safe'],
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
        $query = HouseType::find();

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
        ]);

        $query->andFilterWhere(['like', 'house', $this->house])
              ->andFilterWhere(['like', 'translation_fr', $this->translation_fr]);

        return $dataProvider;
    }

    public static function getHouse($id){
        $model = HouseType::find()
            ->select('house')
            ->where(['id'=>$id])
            ->asArray()
            ->one();
        return $model;
    }
}
