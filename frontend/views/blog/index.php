<?php

use yii\widgets;

$this->title = Yii::t('app', 'Blog');

$this->registerMetaTag(['name' => 'keywords', 'content' => 'Blog']);
$this->registerMetaTag(['name' => 'description', 'content' => 'Blog']);

$this->params['breadcrumbs'][] = $this->title;

?>

<section class="paddingT padding-services">

    <?php if (!empty($blogContent)): ?>
        <div class="container">
            <?php foreach ($blogContent as $item): ?>
                <div class="row">
                    <div class="col-xs-12">
                        <h3>
                            <a href="<?= Yii::$app->homeUrl ?>blog/<?= $item['slug']; ?>"
                               class="text-capitalize"><?= $item['title']; ?></a>
                        </h3>
                        <p>
                            <?= $item['short_text']; ?>
                        </p>
                    </div>
                </div>
            <?php endforeach; ?>
            <div class="row">
                <div class="col-xs-12 text-center">
                    <?= widgets\LinkPager::widget(['pagination' => $pagination]); ?>
                </div>
            </div>
        </div>
    <?php endif; ?>

</section>