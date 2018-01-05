<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model common\models\Payments */

$this->title = $model->id;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Payments'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="payments-view table-responsive">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a(Yii::t('app', 'Delete'), ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => Yii::t('app', 'Are you sure you want to delete this item?'),
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'id',
            [
                'attribute' => 'sd_id',
                'format' => 'raw',
                'value' => Html::a(Yii::t('app', 'View Submit Data'), \yii\helpers\Url::to(['/submit-data/view?id=' . $model->sd_id]), [
                        'class' => 'btn btn-info btn-sm'
                    ])
            ],
            'payer_id',
            'token',
            'transaction_id',
            'created_at:datetime',
            'updated_at:datetime',
        ],
    ]) ?>

</div>
