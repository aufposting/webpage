<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model common\models\Sites */

$this->title = Yii::t('app', 'Create Sites');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Sites'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="sites-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
