<?php

use common\models\Blog;
use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
/* @var $this yii\web\View */
/* @var $searchModel backend\models\BlogControll */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title =  Yii::t('app','Blogs');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="blog-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a( Yii::t('app','Create Blog'), ['create'], ['class' => 'btn btn-success']) ?>
    </p>
    <div class="table-responsive">
        <?php Pjax::begin(); ?>    <?= GridView::widget([
                'dataProvider' => $dataProvider,
                'filterModel' => $searchModel,
                'columns' => [
                    ['class' => 'yii\grid\SerialColumn'],

        //            'id',
                    'title',
        //            'keywords',
        //            'short_text:ntext',
        //            'content:ntext',
                    // 'description',
                    // 'slug',
                     'created_at',
                     'updated_at',
                    [
                        'attribute' => 'is_active',
                        'format' => 'raw',
                        'label'  => Yii::t('app', 'Is Active'),
                        'value' => function ($model) {
                            if($model->is_active == 1){
                                return Html::a(Yii::t('app', 'Active'), ['status', 'id' => $model->id, 'className' => Blog::className()], [
                                    'class' => 'btn btn-xs btn-success btn-block',
                                    'data-method' => 'post',
                                    'data-confirm' => Yii::t('app', 'Are you sure you want to disable this blog?'),
                                ]);
                            }else{
                                return Html::a(Yii::t('app', 'Disabled'), ['status', 'id' => $model->id, 'className' => Blog::className()], [
                                    'class' => 'btn btn-xs btn-danger btn-block',
                                    'data-method' => 'post',
                                    'data-confirm' => Yii::t('app', 'Are you sure you want to activate this blog?'),
                                ]);
                            }
                        },
                    ],

                    ['class' => 'yii\grid\ActionColumn'],
                ],
            ]); ?>
        <?php Pjax::end(); ?>
    </div>
</div>
