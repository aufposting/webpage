<?php

/**
 * Created by PhpStorm.
 * User: User
 * Date: 12/27/2016
 * Time: 2:25 PM
 */

namespace backend\controllers;

use backend\models\SitesControl;
use backend\models\SubmitDataControl;
use common\models\DataLog;
use common\models\PremiumUpdateStage;
use yii\base\Controller;
use common\models\SubmitData;
use common\models\Sites;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;

class AdsController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
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

    public function actionGetData() {
	    $is_top = \Yii::$app->request->get('is_top');
	    
    	if($is_top){
		    $sites = SitesControl::getTopSites();
	    }else{
		    $sites = SitesControl::getSites();
	    }
	    
        $getSubmitData = SubmitDataControl::getSubmitData();
	    
        return $this->render('get-data', [
                    'sites' => $sites,
                    'getSubmitData' => $getSubmitData
        ]);
    }
    
    public function actionGetPremiumData(){
    	$premiumSubmitData = SubmitDataControl::getPremiumSubmitData();
	    return $this->render('get-premium-data', [
		    'premiumSubmitData' => $premiumSubmitData
	    ]);
    }
    
    public function actionGetPremiumUpdateStage(){
	    $premiumUpdateStage = PremiumUpdateStage::find()->asArray()->one();
	    die(json_encode($premiumUpdateStage));
    }
    

    public function actionMail() {
        return $this->render('mail');
    }

    public function actionLog() {
        $data_log = new DataLog();

        $postRequest = \Yii::$app->request->get();
        $data_id = $postRequest['data_id'];

        $site = $postRequest['site'];
        $login = isset($postRequest['login']) ? $postRequest['login'] : NULL;
        $email = isset($postRequest['email']) ? $postRequest['email'] : NULL;
        $pass = isset($postRequest['login']) ? $postRequest['login'] : NULL;
        $status = $postRequest['status'];
        $db_data = SubmitData::find()->select('login, pass, email')->where(['id' => $data_id])->asArray()->one();
        $site_id = Sites::find()->select('id')->where("url LIKE '%$site%'")->asArray()->one();
        if ($status == '1') {
            if (!$login) {
                $login = $db_data['login'];
            }
            if (!$email) {
                $email = $db_data['email'];
            }
            if (!$pass) {
                $pass = $db_data['pass'];
            }
        }
        $data_log->submit_data_id = $data_id;
        $data_log->email = $email;
        $data_log->login = $login;
        $data_log->pass = $pass;
        $data_log->site_id = $site_id;
        $data_log->status = "$status";
//        $data_log->save();



//        \Yii::$app->db->createCommand("
//INSERT INTO `data_log`(`submit_data_id`, `site_id`, `email`, `login`, `pass`, `status`) VALUES
//($data_id, $site_id, $email, $login, $pass, $status)")->execute();


        return $this->render('log');
    }

}
