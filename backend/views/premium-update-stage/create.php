<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model common\models\PremiumUpdateStage */

$this->title = Yii::t('app', 'Create Premium Update Stage');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Premium Update Stages'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="premium-update-stage-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
