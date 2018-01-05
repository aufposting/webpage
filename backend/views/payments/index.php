<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
/* @var $this yii\web\View */
/* @var $searchModel backend\models\PaymentsControll */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Payments');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="payments-index table-responsive">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

<?php Pjax::begin(); ?>    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
//            ['class' => 'yii\grid\SerialColumn'],

//            'id',
            [
                'attribute' => 'sd_id',
                'format' => 'raw',
                'value' => function($model){
                    return Html::a(Yii::t('app', 'View Submit Data'), \yii\helpers\Url::to(['/submit-data/view?id=' . $model->sd_id]), [
                            'class' => 'btn btn-info btn-sm'
                    ]);
                }
            ],
            'payer_id',
            'token',
            'transaction_id',
            'created_at:datetime',
            // 'updated_at:datetime',

            [
                'class' => 'yii\grid\ActionColumn',
                'template' => '{view} {delete}'
            ],
        ],
    ]); ?>
<?php Pjax::end(); ?></div>
