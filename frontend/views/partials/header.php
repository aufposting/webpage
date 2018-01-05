<header>
<div class="menu navbar-fixed-top">
	<div class="container">
    	<div class="row">
        	<div class="col-md-3 col-sm-3">
            <div class="logo">
<a class="navbar-brand" href="http://aufposting.com/">
                    <img src="<?= Yii::$app->homeUrl.'img/Auf Posting Logo.jpg' ?>" class="img_responsive" width="180px">
                </a>
                <a href="http://www.aufposting.com"><img src="/frontend/web/img/logo2.png" class="banner-img">  </a>
            </div>
                        </div>
            <div class="col-md-9 col-sm-9">
                <nav role="navigation" class="navbar navbar-default">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a class="page-scroll" href="http://aufposting.com/#success">
                            <?= Yii::t('app', 'Marketing Services') ?>
                        </a>
                    </li>
                    <li>
                        <a class="page-scroll" href="http://aufposting.com/#contact_us">
                            <?= Yii::t('app', 'Contact Us') ?>
                        </a>
                    </li>
                    <li>
                        <a class="page-scroll" href="<?=Yii::$app->homeUrl?>blog">
                            <?= Yii::t('app', 'Blog') ?>
                        </a>
                    </li>
                    <li>
                        <a class="page-scroll" href="<?=Yii::$app->homeUrl?>listing-section">
                            <?= Yii::t('app', 'Listing Section') ?>
                        </a>
                    </li>
                    <li>
                        <a class="page-scroll" href="<?=Yii::$app->homeUrl?>main/our-services">
                            <?= Yii::t('app', 'Our Services') ?>
                        </a>
                    </li>
                    <li>
                        <a href="<?=Yii::$app->homeUrl.'main/sign-up'?>">
                            <?= Yii::t('app', 'Sign Up') ?>
                        </a>
                    </li>
                    <li class="helper_class"></li>
                    <li class="dropdown">
                        <a href="" id="languages_dropdown" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            <?php if(isset($_COOKIE['lang'])): ?>

                                <img src="<?= Yii::$app->homeUrl ?>img/flags/<?= $_COOKIE['lang'] ?>.png" alt="<?= $_COOKIE['lang'] ?>_flag" width="30px" height="30px" data-lang="<?= $_COOKIE['lang'] ?>">

                                <?php else: ?>

                                <img src="<?= Yii::$app->homeUrl ?>img/flags/en-US.png" alt="en_flag" width="30px" height="30px" data-lang="en-US">

                            <?php endif; ?>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right languages">
                            <li>
                                <img src="<?= Yii::$app->homeUrl ?>img/flags/en-US.png" alt="en_flag" width="30px" height="30px" data-lang="en-US">
                            </li>
                            <li>
                                <img src="<?= Yii::$app->homeUrl ?>img/flags/fr-FR.png" alt="fr_flag" width="30px" height="30px" data-lang="fr-FR">
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>