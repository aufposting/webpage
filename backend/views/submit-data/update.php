<?php
use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\SubmitData */

$this->title = Yii::t('app', 'Update {modelClass}: ', [
    'modelClass' => 'Submit Data',
]) . $model->title;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Submit Datas'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->title, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Yii::t('app', 'Update');
?>
<div class="submit-data-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
