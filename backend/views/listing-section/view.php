<?php

use common\models\Translations;
use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model common\models\ListingSection */

$this->title = $model->title;
$this->params['breadcrumbs'][] = ['label' =>  Yii::t('app','Listing Section'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;

$translation = Translations::findOne([
    'parent_id' => $model->id,
    'parent_tbl' => 'listing'
]);

?>
<div class="listing-section-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a( Yii::t('app','Update'), ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a( Yii::t('app','Delete'), ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' =>  Yii::t('app','Are you sure you want to delete this item?'),
                'method' => 'post',
            ],
        ]) ?>
    </p>
    <div class="table-responsive">
        <?= DetailView::widget([
            'model' => $model,
            'attributes' => [
                'id',
                'title',
                'keywords',
                'short_text:ntext',
                'content:ntext',
                'description',
                'slug',
                'created_at:datetime',
                'updated_at:datetime',
                [
                    'label'  => Yii::t('app','Is Active'),
                    'value'  => $model->is_active == 1 ? Yii::t('app','Active') : Yii::t('app','Passive'),
                ],
                [
                    'attribute' => 'title',
                    'label' => Yii::t('app', 'Translated Title'),
                    'value' => !empty($translation) ? $translation->title : NULL
                ],
                [
                    'attribute' => 'short_text',
                    'label' => Yii::t('app', 'Translated Short Text'),
                    'value' => !empty($translation) ? $translation->short_text : NULL
                ],
                [
                    'attribute' => 'content',
                    'label' => Yii::t('app', 'Translated Content'),
                    'value' => !empty($translation) ? $translation->content : NULL
                ]
            ],
        ]) ?>
    </div>
</div>
