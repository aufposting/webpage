<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\ListingSection */

$this->title =  Yii::t('app','Update Listing Section: ') . $model->title;
$this->params['breadcrumbs'][] = ['label' =>  Yii::t('app','Listing Sections'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->title, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] =  Yii::t('app','Update');
?>
<div class="listing-section-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
        'model_translations' => $model_translations,
    ]) ?>

</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
 <script type="text/javascript">

 function removeUploadedFiles(name, id) {
 	var confirms = confirm("Are you sure want to delete?");
 	if(confirms) {
 		$.ajax({
                type: "GET",
                url: "http://<?php echo Yii::$app->getRequest()->serverName; ?>/backend/web/listing-section/delete-file?name="+name+"&id="+id,
                data: false,
                success: function (test) {
                    $("#up-files"+id).remove();
                },
                error: function (exception) {
                    alert(exception);
                }
            })
 	} else {
 		return false;
 	}
 }
        $(document).ready(function() {
 

            
  if (window.File && window.FileList && window.FileReader) {


    $("#files").on("change", function(e) {
      var files = e.target.files,
        filesLength = files.length;
      for (var i = 0; i < filesLength; i++) {
      	var validExtensions = ['jpg','png','jpeg']; //array of valid extensions
        var fileName = files[i].name;
        var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
        if ($.inArray(fileNameExt, validExtensions) == -1) {
            
            alert("Only these file types are accepted : "+validExtensions.join(', '));
        }
        else
        {
        var f = files[i]
        var fileReader = new FileReader();
        fileReader.onload = (function(e) {
          var file = e.target;
          $("<span class=\"pip\">" +
            "<img class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
            "<br/><span class=\"remove\">Remove image</span>" +
            "</span>").insertAfter("#files");
          $(".remove").click(function(){
            $(this).parent(".pip").remove();
          });

           
          
          // Old code here
          /*$("<img></img>", {
            class: "imageThumb",
            src: e.target.result,
            title: file.name + " | Click to remove"
          }).insertAfter("#files").click(function(){$(this).remove();});*/
          
        });
        fileReader.readAsDataURL(f);
    }
      }
    });
  } else {
    alert("Your browser doesn't support to File API")
  }
});
    </script>
    <style type="text/css">
        input[type="file"] {
  display: block;
}
.imageThumb {
  max-height: 75px;
  border: 2px solid;
  padding: 1px;
  cursor: pointer;
}
.pip {
  display: inline-block;
  margin: 10px 10px 0 0;
}
.remove {
  display: block;
  background: #444;
  border: 1px solid black;
  color: white;
  text-align: center;
  cursor: pointer;
}
.remove:hover {
  background: white;
  color: black;
}
    </style>