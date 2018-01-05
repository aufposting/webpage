<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use frontend\assets\AppAsset;
use common\widgets\Alert;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
<script type='text/javascript' src='https://ssl.p.jwpcdn.com/6/6/jwplayer.js'></script>
</head>
<body>
<?php $this->beginBody() ?>

<div class="wrap">
    <?php
    NavBar::begin([
        'brandLabel' => 'My Company',
        'brandUrl' => Yii::$app->homeUrl,
        'options' => [
            'class' => 'navbar-inverse navbar-fixed-top',
        ],
    ]);
    $menuItems = [
        ['label' => 'Home', 'url' => ['/site/index']],
        ['label' => 'About', 'url' => ['/site/about']],
        ['label' => 'Contact', 'url' => ['/site/contact']],
    ];
    if (Yii::$app->user->isGuest) {
        $menuItems[] = ['label' => 'Signup', 'url' => ['/site/signup']];
        $menuItems[] = ['label' => 'Login', 'url' => ['/site/login']];
    } else {
        $menuItems[] = '<li>'
            . Html::beginForm(['/site/logout'], 'post')
            . Html::submitButton(
                'Logout (' . Yii::$app->user->identity->username . ')',
                ['class' => 'btn btn-link logout']
            )
            . Html::endForm()
            . '</li>';
    }
    echo Nav::widget([
        'options' => ['class' => 'navbar-nav navbar-right'],
        'items' => $menuItems,
    ]);
    NavBar::end();
    ?>

    <div class="container">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>
        <?= Alert::widget() ?>
        <?= $content ?>
    </div>
</div>

<footer class="footer">
    <div class="container">
        <p class="pull-left">&copy; My Company <?= date('Y') ?></p>

        <p class="pull-right"><?= Yii::powered() ?></p>
    </div>
</footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
<!----menu-slider------>
<script src="js/slick-min.js" type="text/javascript" charset="utf-8"></script>   
<script src="js/slick.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">

$(document).ready(function() {

$('.testimonial-slider').slick({
centerMode: true,
centerPadding: '0px',
slidesToShow: 1,
autoplay: true,
arrows: true,
dots:false,
responsive: [
{
  breakpoint: 1024,
  settings: {
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 1
  }
},
{
  breakpoint: 800,
  settings: {
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 1
     }
    }
  ]
});
$('.client-slider').slick({
centerMode: true,
centerPadding: '0px',
slidesToShow: 3,
autoplay: true,
arrows: false,
dots:false,
responsive: [
{
  breakpoint: 1024,
  settings: {
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 3
  }
},
{
  breakpoint: 800,
  settings: {
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 1
     }
    }
  ]
});    
});
</script> 

<script type="text/javascript">
jwplayer("player").setup({
  playlist: [{
    sources: [{
      file: "frontend/web/video/video.mp4"
    }]
  }],
  width: 500,
  height:350,
 autostart: 'true',
  stretching: "fill",

});

jwplayer().onComplete(function() {
	var el = document.createElement("div");
	var el2 = document.createElement("div");
	var el3 = document.createElement("div");
	var el4 = document.createElement("div");
	var txt = document.createElement('a');
	if (jwplayer().getRenderingMode() == "html5"){
	var theBody = document.getElementById(player.id);
	} else {
	var theBody = document.getElementById(player.id+"_wrapper");
	}
	var playerWidthPX2 = theBody.style.width;
	var playerWidthPX = parseFloat(playerWidthPX2);
	var playerHeightPX2 = theBody.style.height;
	var playerHeightPX = parseFloat(playerHeightPX2);
	el3.setAttribute('id', 'bg');
	el3.style.height = playerHeightPX + "px";
	el3.style.width = playerWidthPX2;
	el3.style.background = "#333333";
	el3.style.opacity = "0.70";
	el3.style.position = "absolute";
	el3.style.backgroundImage="url('')";
	el.setAttribute('src', '');
	if (jwplayer().getRenderingMode() == "html5"){
	} else {
	el3.style.top = playerHeightPX-playerHeightPX+"px";
	}
	el3.style.zIndex = "999";
	el3.width = playerWidthPX;
	el3.height = playerHeightPX;
	el2.setAttribute('id', 'bg2');
	el2.style.height = playerHeightPX + "px";
	el2.style.width = playerWidthPX2;
	el2.style.position = "absolute";
	el2.style.zIndex = "999";
	el2.width = playerWidthPX;
	el2.height = playerHeightPX;
	theBody.appendChild(el3);
	theBody.appendChild(el2);
	el2.style.textAlign = "center";
	el2.style.left = ((playerWidthPX*2)/6) -"5" + "px";
	el2.style.top = ((playerHeightPX*3)/6) -"30" + "px";
	el.setAttribute('id', 'hyperlink');
	el.style.height = "30px";
	el.style.width = "30px";
	el2.width = "30";
	el2.height = "30";
	el.style.position = "relative";
	el.setAttribute('frameBorder', '0');
	el.style.top = "11px";
	el.style.left = "202px";
	el.style.textAlign = "center";
	el.style.marginBottom = "-16px";
	el.style.marginRight = "8px";
	var message = '';
	txt.innerHTML = message;
	txt.href = ""
	txt.target = "_blank";
	txt.style.textDecoration = "none";
	txt.style.outline = "0";
	txt.style.MozUserSelect = 'none';
	txt.style.KhtmlUserSelect = 'none';
	txt.style.WebkitUserSelect = 'none';
	txt.style.OUserSelect = 'none';
	txt.style.UserSelect = 'none';
	txt.style.fontSize = "18px";
txt.style.fontWeight = "600";
	txt.style.color = "#fff"
	txt.style.backgroundColor = "#008080"
	txt.style.textAlign = "center"
	txt.style.padding = "8px 20px"
	txt.style.position = "absolute";
	txt.style.marginLeft = "auto";
	txt.style.marginTop = "4px";
	txt.style.fontFamily = "arial,_sans";
	txt.setAttribute('id', 'txt');
	el4.setAttribute('id', 'replay');
	el4.style.height = "20px";
	el4.style.width = "20px";
	el4.height = "20";
	el4.width = "20";
	el4.style.position = "absolute";
	el4.style.top = "-" + playerHeightPX/2 + "px";
	el4.style.marginTop = "50px";
	el4.style.left = playerWidthPX/2 + "px";
	el4.style.marginLeft = "50px";
	el4.style.backgroundImage="url('replay.png')";
	el4.setAttribute('src', 'replay.png');
	el2.appendChild(txt);
	el2.appendChild(el);
	el2.appendChild(el4);
	el.style.backgroundImage="url('hyperlink.png')";
	el.setAttribute('src', 'hyperlink.png');
	el.style.cursor = "pointer";
	el.style.display = "table";
	el2.style.display = "table";
	el3.style.display = "table";
	el4.style.display = "table";
	txt.style.display = "table";
	el.onmouseup = function(){
	window.open("frontend/web/video/video.mp4");
	}
	el4.style.cursor = "pointer";
	el4.onmouseup = function(){
	el.style.display = "none";
	el2.style.display = "none";
	el3.style.display = "none";
	el4.style.display = "none";
	txt.style.display = "none";
	jwplayer().play();
	}
});
</script> 
 
