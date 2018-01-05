<?php

namespace backend\modules\coupons\controllers;

use backend\modules\coupons\helpers\HelperStatus;
use Yii;
use backend\modules\coupons\models\Coupons;
use backend\modules\coupons\models\Search\CouponsSearch;
use yii\filters\AccessControl;
use yii\helpers\FileHelper;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\web\UploadedFile;

/**
 * CouponsController implements the CRUD actions for Coupons model.
 */
class CouponsController extends Controller
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
                        'actions' => ['logout', 'error', 'index', 'create', 'update', 'delete', 'view', 'status'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
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
     * Lists all Coupons models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new CouponsSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Coupons model.
     * @param integer $id
     * @return mixed
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Coupons model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new Coupons();

        if ($model->load(Yii::$app->request->post()) && $model->validate()) {

            $image = UploadedFile::getInstance($model, 'image');

            if($image != NULL){

                $name = Yii::$app->security->generateRandomString() . '.' . $image->extension;

                if(!is_dir(Yii::getAlias('@frontend') . '/web/coupons')){
                    FileHelper::createDirectory(Yii::getAlias('@frontend') . '/web/coupons', 0775, true);
                }

                $image->saveAs(Yii::getAlias('@frontend') . '/web/coupons/' . $name);

                $url = explode('http:', explode('backend', $_SERVER["HTTP_REFERER"])[0])[1];

                if($url == NULL){

                    $url = explode('https:', explode('backend', $_SERVER["HTTP_REFERER"])[0])[1];

                }

                $model->image_url = $url . 'frontend/web/coupons/' . $name;

            }

           if($model->generate_coupon_code == 1){

               generateAgain:

               $model->coupon_code = Yii::$app->security->generateRandomString();

               if(!$model->save()){
                   goto generateAgain;
               }

           }else{

               $model->save();

           }

            return $this->redirect(['view', 'id' => $model->id]);

        } else {

            return $this->render('create', [
                'model' => $model,
            ]);

        }
    }

    /**
     * Updates an existing Coupons model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->validate()) {

            $image = UploadedFile::getInstance($model, 'image');

            if($image != NULL){

                if($model->image_url != NULL){

                    $imageName = explode('/', $model->image_url);
                    $imageName = $imageName[count($imageName) - 1];

                    if(file_exists(Yii::getAlias('@frontend') . '/web/coupons/' . $imageName)){

                        unlink(Yii::getAlias('@frontend') . '/web/coupons/' . $imageName);

                    }

                }

                $name = Yii::$app->security->generateRandomString() . '.' . $image->extension;

                if(!is_dir(Yii::getAlias('@frontend') . '/web/coupons')){
                    FileHelper::createDirectory(Yii::getAlias('@frontend') . '/web/coupons', 0775, true);
                }

                $image->saveAs(Yii::getAlias('@frontend') . '/web/coupons/' . $name);

                $url = explode('http:', explode('backend', $_SERVER["HTTP_REFERER"])[0])[1];

                if($url == NULL){

                    $url = explode('https:', explode('backend', $_SERVER["HTTP_REFERER"])[0])[1];

                }

                $model->image_url = $url . 'frontend/web/coupons/' . $name;

            }

            if($model->generate_coupon_code == 1){

                generateAgain:

                $model->coupon_code = Yii::$app->security->generateRandomString();

                if(!$model->save()){
                    goto generateAgain;
                }

            }else{

                $model->save();

            }

            return $this->redirect(['view', 'id' => $model->id]);

        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Deletes an existing Coupons model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     */
    public function actionDelete($id)
    {
        $model = $this->findModel($id);

       if($model->image_url != NULL){

           $imageName = explode('/', $model->image_url);
           $imageName = $imageName[count($imageName) - 1];

           if(file_exists(Yii::getAlias('@frontend') . '/web/coupons/' . $imageName)){

               unlink(Yii::getAlias('@frontend') . '/web/coupons/' . $imageName);

           }

       }

        $model->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Coupons model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return Coupons the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Coupons::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }

    public function actionStatus($id,$className)
    {
        HelperStatus::GetStatus($id,$className);

        return $this->redirect('index');
    }
}
