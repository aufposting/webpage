<?php

namespace backend\modules\coupons\models\Search;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use backend\modules\coupons\models\Coupons;

/**
 * CouponsSearch represents the model behind the search form about `backend\modules\coupons\models\Coupons`.
 */
class CouponsSearch extends Coupons
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'discount_count', 'available_coupons_count'], 'integer'],
            [['name', 'image_url', 'coupon_code', 'discount_type', 'created_at', 'updated_at', 'expire_at', 'status'], 'safe'],
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
        $query = Coupons::find();

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
            'discount_count' => $this->discount_count,
            'available_coupons_count' => $this->available_coupons_count,
            'expire_at' => $this->expire_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ]);

        $query->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'image_url', $this->image_url])
            ->andFilterWhere(['like', 'coupon_code', $this->coupon_code])
            ->andFilterWhere(['like', 'discount_type', $this->discount_type])
            ->andFilterWhere(['like', 'status', $this->status]);

        return $dataProvider;
    }
}
