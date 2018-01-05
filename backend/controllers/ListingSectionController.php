<?php

namespace backend\controllers;

use common\models\Translations;
use Yii;
use common\models\ListingSection;
use backend\models\ListingSectionControll;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\helpers\Url;
use yii\web\UploadedFile;

/**
 * ListingSectionController implements the CRUD actions for ListingSection model.
 */
class ListingSectionController extends Controller
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

    public function actionStatus($id,$className)
    {
        $find = $className::findOne(['id' => $id]);

        if($find->is_active == 1){

            $find->is_active = 0;
            $find->save();

        }else{

            $find->is_active = 1;
            $find->save();

        }

        return $this->redirect('index');
    }

    /**
     * Lists all ListingSection models.
     * @return mixed
     */
    public function actionIndex()
    {

        $searchModel = new ListingSectionControll();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);
        
        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single ListingSection model.
     * @param integer $id
     * @return mixed
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }
    public function actionDeleteFile()
    {
        $name = $_GET['name'];
        $id = $_GET['id'];
         $rows = (new \yii\db\Query())
        ->select(['id', 'files'])
        ->from('listing_section')
        ->where(['id' => $_GET['id']])
        ->limit(1)
        ->one();
        $explodeFiles = explode(',',$rows['files']);
        $newfiles = array_diff($explodeFiles, array($name));
        if(!empty($newfiles)) {
            $newfiles = implode(",", $newfiles);
        } else {
            $newfiles = '';
        }

        Yii::$app->db->createCommand()
            ->update('listing_section', ['files' => $newfiles], "id=$id")
            ->execute();
        exit;

    }
    /**
     * Creates a new ListingSection model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new ListingSection();
        $model_translations = new Translations();
            
        if(!empty($_FILES['ListingSection'])) {
            $totalFiles = count($_FILES['ListingSection']['name']['files']);

            $nameArr = array();
            if(!empty($_FILES['ListingSection']['name']['files'][0])) {
            for($i = 0; $i<$totalFiles; $i++) {
                $name =strtotime(date('y-m-d h:i:s')).$_FILES['ListingSection']['name']['files'][$i];
                $nameArr[] = $name;
                $tempPath = $_FILES['ListingSection']['tmp_name']['files'][$i];
                $uploadDir =  '/home3/x0s6j5b1/public_html/frontend/web/img/uploads/';
                move_uploaded_file($tempPath, $uploadDir.$name);
            }
        }
        }
        if(!empty($nameArr)) {
            $files = implode(',',$nameArr);
        } else {
            $files = '';
        }

        

        if ($model->load(Yii::$app->request->post()) && $model_translations->load(Yii::$app->request->post()) && $model->save()) {

            // update files
            $model_id = $model->id;
            Yii::$app->db->createCommand()
            ->update('listing_section', ['files' => $files], "id=$model_id")
            ->execute();
            

            $model_translations->parent_id = $model->id;
            $model_translations->parent_tbl = 'listing';
            $model_translations->save();



            return $this->redirect(['view', 'id' => $model->id]);

        } else {
            return $this->render('create', [
                'model' => $model,
                'model_translations' => $model_translations,
            ]);
        }
    }

    /**
     * Updates an existing ListingSection model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);
        $model_translations = Translations::findOne([
            'parent_id' => $id,
            'parent_tbl' => 'listing'
        ]);

        if(!empty($_FILES['ListingSection'])) {
            $totalFiles = count($_FILES['ListingSection']['name']['files']);

            $nameArr = array();
            if(!empty($_FILES['ListingSection']['name']['files'][0])) {
            for($i = 0; $i<$totalFiles; $i++) {
                $name =strtotime(date('y-m-d h:i:s')).$_FILES['ListingSection']['name']['files'][$i];
                $nameArr[] = $name;
                $tempPath = $_FILES['ListingSection']['tmp_name']['files'][$i];
                $uploadDir =  '/home3/x0s6j5b1/public_html/frontend/web/img/uploads/';
                move_uploaded_file($tempPath, $uploadDir.$name);
            }
        }
        }
        if(!empty($nameArr)) {
            $files = implode(',',$nameArr);
        } else {
            $files = '';
        }

        $model_translations = empty($model_translations) ? new Translations() : $model_translations;

        if ($model->load(Yii::$app->request->post()) && $model_translations->load(Yii::$app->request->post()) && $model->save()) {

            $rows = (new \yii\db\Query())
        ->select(['id', 'files'])
        ->from('listing_section')
        ->where(['id' =>$model->id])
        ->limit(1)
        ->one();

        $explodeFiles = explode(',',$rows['files']);
        $newfiles = array_merge($explodeFiles, $nameArr);
        $newfiles = implode(",", $newfiles);

        // update files
            $model_id = $model->id;
            Yii::$app->db->createCommand()
            ->update('listing_section', ['files' => $newfiles], "id=$model_id")
            ->execute();
            


            $model_translations->parent_id = $model->id;
            $model_translations->parent_tbl = 'listing';
            $model_translations->save();

            return $this->redirect(['view', 'id' => $model->id]);
        } else {
            return $this->render('update', [
                'model' => $model,
                'model_translations' => $model_translations,
            ]);
        }
    }

    /**
     * Deletes an existing ListingSection model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();
        Translations::findOne([
            'parent_id' => $id,
            'parent_tbl' => 'listing'
        ])->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the ListingSection model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return ListingSection the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = ListingSection::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}
