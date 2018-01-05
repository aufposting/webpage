<?php
use yii\helpers\Html;

/* @var $this \yii\web\View view component instance */
/* @var $message \yii\mail\MessageInterface the message being composed */
/* @var $content string main view render result */
?>
<?php $this->beginPage() ?>
<?php $this->beginBody() ?>
<h2 style="color: rgba(151, 151, 151, 0.5); text-align: center;">Contact Message</h2>

<table frame="box" rules="all" cellpadding="15" style="margin:auto;box-shadow: -2px -2px 4px grey, 4px 4px 4px grey;line-height:1.6;width:100%;">
    <tr>
        <th>Name</th>
        <td><?= $name ?></td>
    </tr>
    <tr>
        <th>E-mail</th>
        <td><?= $email ?></td>
    </tr>
    <tr>
        <th>Subject</th>
        <td><?= $subject ?></td>
    </tr>
    <tr>
        <th>Message</th>
        <td><?= $content ?></td>
    </tr>
</table>

<?php $this->endBody() ?>
<?php $this->endPage() ?>
