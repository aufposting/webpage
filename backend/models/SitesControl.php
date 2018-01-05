<?php

namespace backend\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\Sites;

/**
 * SitesControl represents the model behind the search form about `common\models\Sites`.
 */
class SitesControl extends Sites
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'integer'],
            [['url', 'is_active'], 'safe'],
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
        $query = Sites::find();

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

        $query->andFilterWhere(['like', 'url', $this->url])
            ->andFilterWhere(['like', 'is_active', $this->is_active]);

        return $dataProvider;
    }


    /**
     * @return array|\yii\db\ActiveRecord[]
     */
    public static function getSites(){
        $model = Sites::find()
            ->where(['is_active'=> '1'])
	        ->andWhere(['is_top'=>'0'])
            ->asArray()
            ->all();
        return $model;
    }
	
	/**
	 * @return array|\yii\db\ActiveRecord[]
	 */
	public static function getTopSites(){
		$model = Sites::find()
			->where(['is_active'=> '1'])
			->andWhere(['is_top'=>'1'])
			->asArray()
			->all();
		return $model;
	}
}
