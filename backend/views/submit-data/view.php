<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model common\models\SubmitData */

$this->title = $model->title;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Submit Datas'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="submit-data-view table-responsive">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a(Yii::t('app', 'Update'), ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a(Yii::t('app', 'Delete'), ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => Yii::t('app', 'Are you sure you want to delete this item?'),
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?php

        function setPackageId($model){

            $all = \common\models\PaymentDetails::findAll(['id' => explode(',', $model->package_id)]);
            $names = '';

            foreach ($all as $key => $value) {

                $names .= $value->name . ', ';

            }

            $names = rtrim($names, ', ');

            return $names;

        }

    ?>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            [
                'attribute' => 'published',
                'value' => $model->published == 0 ? 'Unpublished' : 'Published'
            ],
            'id',
            [
                'attribute' => 'package_id',
                'format' => 'raw',
                'value' => setPackageId($model)
            ],
            'package_duration_id',
            'login',
            'pass',
            'rent',
            'title:ntext',
            'content:ntext',
            'name',
            'l_name',
            'gender',
            'phone',
            'email:email',
            'contact_time',
            'city',
            'postal_code',
            'street',
            'address',
            'apartment_ids',
            'apt_size',
            'bedroom',
            'bathroom',
            'house_type_id',
            'available_date',
            [
                'attribute' => 'pets',
                'value' => $model->pets == 0 ? 'No' : 'Yes'
            ],
            'parking_count',
            'parking_price',
            'image_url:ntext',
            'contact_person',
            'zone',
            'lease_length',
            'region',
            'region_iso',
        ],
    ]) ?>

</div>
