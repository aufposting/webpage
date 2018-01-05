<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\Sites */

$this->title = Yii::t('app', 'Update {modelClass}: ', [
    'modelClass' => 'Sites',
]) . $model->id;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Sites'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Yii::t('app', 'Update');
?>
<div class="sites-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
