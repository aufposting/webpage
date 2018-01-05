<?php
$this->title = $thread['title'];

$this->registerMetaTag(['name' => 'keywords', 'content' => $thread['keywords']]);
$this->registerMetaTag(['name' => 'description', 'content' => $thread['description']]);

$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Blog'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;

$getRequest = Yii::$app->request->get();

?>

<section class="paddingT padding-services">

    <?php if (!empty($thread)): ?>

        <div class="container">
            <div class="row">
                <button class="visible-xs visible-sm closeUl">
                    <i class="fa fa-arrow-circle-right fa-lg" aria-hidden="true"></i>
                </button>
                <div id="showUl" class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <ul class="list-group left-listGroup pageUl">
                        <?php foreach ($blogposts as $value) { ?>
                            <li class="list-group-item <?php if ($getRequest['slug']) {
                                if ($getRequest['slug'] == $value['slug']) {
                                    echo 'active';
                                }
                            } ?>">
                                <a class="content_title" href="<?= $value['slug']; ?>"><?= $value['title'] ?></a></li>
                        <?php } ?>
                    </ul>
                </div>
                <div id="contentSection" class="col-lg-8 col-md-8 col-sm-12 col-xs-12" data-show="true">
                    <h2 class="col-xs-12 text-center text-capitalize">
                        <?= $thread['title']; ?>
                    </h2>
                    <p>
                        <?= $thread['content']; ?>
                    </p>
                </div>
            </div>
        </div>

    <?php endif; ?>

</section>