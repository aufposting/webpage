<?php

use yii\helpers\Url;

$this->title = Yii::t('app', 'Success');

$this->registerMetaTag(['name' => 'keywords', 'content' => 'Success, page']);
$this->registerMetaTag(['name' => 'description', 'content' => 'Success page']);

$this->params['breadcrumbs'][] = $this->title;

?>

<div class="container">
    <div class="row">
        <div class="col-xs-12">

            <?php if (isset($success)): ?>

                <?php if (($success == true) && isset($model)): ?>

                    <div class="marginTB">
                        <h2 class="text-center success_s">
                            <?= Yii::t('app', 'Thank you.<br>Payment was successfully finished.<br>We will contact you if problems arise.') ?>
                        </h2>
                        <table class="table table-hover table-stripped table-bordered">
                            <tr>
                                <th>Name</th>
                                <td><?= $model->name ?></td>
                            </tr>
                            <tr>
                                <th>Last Name</th>
                                <td><?= $model->l_name ?></td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td><?= $model->phone ?></td>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <td><?= $model->gender ?></td>
                            </tr>
                            <tr>
                                <th>City</th>
                                <td><?= $model->city ?></td>
                            </tr>
                            <tr>
                                <th>Region</th>
                                <td><?= $model->region ?></td>
                            </tr>
                            <tr>
                                <th>Street</th>
                                <td><?= $model->street ?></td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td><?= $model->address ?></td>
                            </tr>
                            <tr>
                                <th>Postal Code</th>
                                <td><?= $model->postal_code ?></td>
                            </tr>
                            <tr>
                                <th>Rent (price of rent)</th>
                                <td>$<?= $model->rent ?></td>
                            </tr>
                            <tr>
                                <th>Bedroom</th>
                                <td><?= $model->bedroom ?></td>
                            </tr>
                            <tr>
                                <th>Bathroom</th>
                                <td><?= $model->bathroom ?></td>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <td><?= $model->title ?></td>
                            </tr>
                            <tr>
                                <th>Content</th>
                                <td><?= $model->content ?></td>
                            </tr>
                        </table>
                    </div>

                <?php elseif ($success == false): ?>

                    <div class="marginTB">
                        <h2 class="text-center success_e">
                            <?= Yii::t('app', 'Ooops.Something went wrong.') ?>
                        </h2>

                        <p class="text-center success_e">
                            <?= Yii::t('app', 'Please check your data and try again.') ?>
                        </p>

                        <p class="text-center">
                            <a class="btn btn-info" href="<?= Yii::$app->homeUrl ?>main/sign-up">
                                Go Back
                            </a>
                        </p>
                    </div>

                <?php else: ?>

                    <?php return Yii::$app->response->redirect(Url::to(['/main/index'])); ?>

                <?php endif; ?>

            <?php else: ?>

                <?php if (isset($success_contact) == 'success_send'): ?>

                    <div class="home_top_section">
                        <div class="success">
                            <div class="success-content">
                                <i style="color: #2ea3f2;" class="fa fa-flag fa-2x" aria-hidden="true"></i>
                                <h2>THANK YOU</h2>
                            </div>
                        </div>
                        <p>
                            Thank you for contacting AufPosting.com
                        </p>
                        <p>
                            We will check your contact information as soon as possible and send you an answer over the
                            next 48h.
                        </p>
                        <p>Sincerely,</p>
                        <p>AufPosting Team.</p>
                    </div>

                <?php elseif (isset($success_contact) == 'error_send'): ?>

                    <div class="marginTB">
                        <h2 class="text-center success_e">
                            <?= Yii::t('app', 'Ooops.Something went wrong.') ?>
                        </h2>

                        <p class="text-center success_e">
                            <?= Yii::t('app', 'Please check your data and try again.') ?>
                        </p>

                        <p class="text-center">
                            <a class="btn btn-info" href="<?= Yii::$app->homeUrl ?>main/index">
                                Go Back
                            </a>
                        </p>
                    </div>

                <?php else: ?>

                    <?php return Yii::$app->response->redirect(Url::to(['/main/index'])); ?>

                <?php endif; ?>

            <?php endif; ?>

        </div>
    </div>
</div>