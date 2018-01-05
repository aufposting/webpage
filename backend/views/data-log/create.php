<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model common\models\DataLog */

$this->title = Yii::t('app', 'Create Data Log');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Data Logs'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="data-log-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
