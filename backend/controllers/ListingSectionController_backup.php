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

    /**
     * Creates a new ListingSection model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new ListingSection();
        $model_translations = new Translations();

        if ($model->load(Yii::$app->request->post()) && $model_translations->load(Yii::$app->request->post()) && $model->save()) {

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

        $model_translations = empty($model_translations) ? new Translations() : $model_translations;

        if ($model->load(Yii::$app->request->post()) && $model_translations->load(Yii::$app->request->post()) && $model->save()) {

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
