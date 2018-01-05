<?php

namespace backend\controllers;

use backend\models\LocationControl;
use common\models\Location;
use Yii;
use common\models\SubmitData;
use backend\models\SubmitDataControl;
use yii\filters\AccessControl;
use yii\helpers\Url;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\web\UploadedFile;

/**
 * SubmitDataController implements the CRUD actions for SubmitData model.
 */
class SubmitDataController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'actions' => ['login', 'error'],
                        'allow' => true,
                    ],
                    [
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    /**
     * Lists all SubmitData models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new SubmitDataControl();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single SubmitData model.
     * @param string $id
     * @return mixed
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    public function actionGetCity()
    {
        $getRequest = Yii::$app->request->get();
        if (isset($getRequest['name'])) {
            $regionName = $getRequest['name'];
            $regionId = LocationControl::getRegionId($regionName);
            $model = LocationControl::getCity($regionId);

            if (count($model) > 0) {
                foreach ($model as $val) {
                    $name = $val['name'];
                    echo "<option value='$name'>" . $val['name'] . "</option>";
                }
            } else {
                echo "<option hidden>" . Yii::t('app', '-- No Such City --') . "</option>";
            }
        }
    }

    /**
     * Creates a new SubmitData model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new SubmitData();
        $postRequest = Yii::$app->request->post();

        if ($model->load(Yii::$app->request->post()) && $model->validate()) {

            $apartment_ids = $postRequest['SubmitData']['apartment_ids'];
            $lengthApartment_ids = count($apartment_ids);
            $apartment_idsVal = '';
            $package_id = '';

            foreach ($apartment_ids as $key => $val) {
                if ($key != $lengthApartment_ids - 1) {
                    $apartment_idsVal .= $val . ',';
                } else {
                    $apartment_idsVal .= $val;
                }
            }

            $model->apartment_ids = $apartment_idsVal;
            $contact_time = $postRequest['SubmitData']['contact_time'];
            $contact_timeVal = '';
            $lengthContact_time = count($contact_time);
            $package_id_arr = $model->package_id;

            foreach ($contact_time as $key => $val) {

                if ($key != $lengthContact_time - 1) {
                    $contact_timeVal .= $val . ',';
                } else {
                    $contact_timeVal .= $val;
                }
            }

            foreach($package_id_arr as $i => $j){
                if($i != (count($package_id_arr) - 1)){
                    $package_id .= $j . ',';
                }else{
                    $package_id .= $j;
                }
            }

            $model->contact_time = $contact_timeVal;
            $model->contact_person = 'person';
            $model->package_id = $package_id;
            $image = UploadedFile::getInstances($model, 'image');
            $imgVal = '';
            $model->image = $image;

            if ($model->upload()) {

                $url = explode('http:', explode('backend', $_SERVER["HTTP_REFERER"])[0])[1];

                if($url == NULL){

                    $url = explode('https:', explode('backend', $_SERVER["HTTP_REFERER"])[0])[1];

                }

                $lengthImage = count($image);

                foreach ($image as $key => $val) {
                    if ($key != $lengthImage - 1) {
                        $imgVal .= $url . 'frontend/web/img/upload/' . $val->name . ';';
                    } else {
                        $imgVal .= $url . 'frontend/web/img/upload/' . $val->name;
                    }
                }

                $model->image_url = $imgVal;

                if ($model->save()) {

                    return $this->redirect(['view', 'id' => $model->id]);

                }else{

                    return $this->goBack();

                }
            }else{

                return $this->refresh();

            }
        } else {
            return $this->render('create', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Updates an existing SubmitData model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param string $id
     * @return mixed
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);
        $postRequest = Yii::$app->request->post();

        if ($model->load(Yii::$app->request->post())) {

            $apartment_ids = $postRequest['SubmitData']['apartment_ids'];
            $lengthApartment_ids = count($apartment_ids);
            $apartment_idsVal = '';
            $package_id = '';

            foreach ($apartment_ids as $key => $val) {
                if ($key != $lengthApartment_ids - 1) {
                    $apartment_idsVal .= $val . ',';
                } else {
                    $apartment_idsVal .= $val;
                }
            }

            $model->apartment_ids = $apartment_idsVal;
            $contact_time = $postRequest['SubmitData']['contact_time'];
            $contact_timeVal = '';
            $lengthContact_time = count($contact_time);
            $package_id_arr = $model->package_id;

            foreach ($contact_time as $key => $val) {
                if ($key != $lengthContact_time - 1) {
                    $contact_timeVal .= $val . ',';
                } else {
                    $contact_timeVal .= $val;
                }
            }

            foreach($package_id_arr as $i => $j){
                if($i != (count($package_id_arr) - 1)){
                    $package_id .= $j . ',';
                }else{
                    $package_id .= $j;
                }
            }

            $model->contact_time = $contact_timeVal;
            $model->contact_person = 'person';
            $model->package_id = $package_id;

           if($model->save()){

               if($this->actionUpload($id)){
                   return $this->redirect(['view', 'id' => $model->id]);
               }else{
                   return $this->redirect(['view', 'id' => $model->id]);
               }

           }else{
               return $this->refresh();
           }

        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
    }

    public function actionUpload($id = '')
    {
        if($id != ''){
            $model = $this->findModel($id);
        }else{
            $model = new SubmitData();
        }

        $image = UploadedFile::getInstances($model, 'image');
        $model->image = $image;
        if ($model->image_url == '' || $model->image_url == null) {
            $imgVal = '';
        } else {
            if ($model->image != null) {
                $imgVal = $model->image_url . ';';
            } else {
                $imgVal = $model->image_url;
            }
        }

        if ($model->upload()) {

            $url = explode('http:', explode('backend', $_SERVER["HTTP_REFERER"])[0])[1];

            if($url == NULL){

                $url = explode('https:', explode('backend', $_SERVER["HTTP_REFERER"])[0])[1];

            }

            $lengthImage = count($image);
            foreach ($image as $key => $val) {
                if ($key != $lengthImage - 1) {
                    $imgVal .= $url . 'frontend/web/img/upload/' . $val->name . ';';
                } else {
                    $imgVal .= $url . 'frontend/web/img/upload/' . $val->name;
                }
            }
            $model->image_url = $imgVal;
        }

        if($model->save(false)){
            return true;
        }else{
            return false;
        }

    }

    public function actionFileDelete($id)
    {
        $model = $this->findModel($id);

        $img = explode('/',Yii::$app->request->post('key'));
        $img = $img[count($img)-1];
        $file = Yii::getAlias('@frontend') . '/web/img/upload/' . $img;

        $imgPathData = '';
        $arrayImgUrl = explode(';', $model->image_url);
        $lengthArrayImgUrl = count($arrayImgUrl);
        if ($arrayImgUrl != null) {
            foreach ($arrayImgUrl as $key =>$val) {
                if (Yii::$app->request->post('key') != $val) {
                    if ($key != $lengthArrayImgUrl-1){
                        $imgPathData .= $val.";";
                    }else{
                        $imgPathData .= $val;
                    }
                }
            }
        }

        $model->image_url = $imgPathData;

        if(file_exists($file)){
            if (unlink($file)){
                $model->save(false);
            }else{
                return false;
            }
        }else{
            return false;
        }

        return true;
    }

    /**
     * Deletes an existing SubmitData model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param string $id
     * @return mixed
     */
    public function actionDelete($id)
    {
        $model = $this->findModel($id);

        if($model->image_url != NULL){

            $images = explode(';', $model->image_url);

            foreach ($images as $image){

                $image = explode('/', $image);
                $image = $image[count($image) - 1];
                $image = Yii::getAlias('@frontend') . '/web/img/upload/' . $image;

                if(file_exists($image)){

                    unlink($image);

                }

            }

        }

        $model->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the SubmitData model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param string $id
     * @return SubmitData the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = SubmitData::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}
