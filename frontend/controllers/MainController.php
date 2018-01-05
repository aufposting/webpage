<?php
namespace frontend\controllers;

use common\components\Paypal;
use common\models\Location;
use common\models\PackageDuration;
use common\models\Payments;
use common\models\SubmitData;
use frontend\models\ContactForm;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
use PayPal\Exception\PayPalConnectionException;
use yii\helpers\Url;
use yii\web\Controller;
use Yii;
use yii\web\UploadedFile;

class MainController extends Controller
{

    public $layout = 'aufpostingMain';

    public function actions()
    {
        Yii::$app->language = isset($_COOKIE['lang']) ? $_COOKIE['lang'] : 'en-US';

        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionGetCity($id)
    {
        $res = Location::find()
            ->where([
                'parent_id' => Location::findOne(['name' => $id])->id,
            ])
            ->asArray()
            ->all();

        if(count($res) > 0){
            echo "<option hidden>" . Yii::t('app', 'Select City') . "</option>";
            foreach ($res as $r){
                $name = $r['name'];
                echo "<option value='$name'>". $name ."</option>";
            }
        }else{
            echo "<option hidden>" . Yii::t('app', 'No Such City') . "</option>";
        }
    }

    public function actionGetDiscountSize($discount)
    {
        $discount = PackageDuration::find()
            ->where(['id' => $discount])
            ->one()
            ->discount;

        echo $discount; die;
    }

    public function actionIndex()
    {
        $model = new ContactForm();

        if ($model->load(Yii::$app->request->post())) {

            $url = "https://www.google.com/recaptcha/api/siteverify";
            $privatekey = "6Ld33BsUAAAAAFjx7Z6C05kKc4uql30gAy3uEPeT";
            $response = file_get_contents($url."?secret=".$privatekey."&response=".$_POST['g-recaptcha-response']."&remoteip=".$_SERVER['REMOTE_ADDR']);
            $data = json_decode($response);

            if(isset($data->success) && $data->success == true){

                if($model->sendEmail(Yii::$app->params['adminEmail'])){

                    return $this->render('success', ['success_contact' => 'success_send']);

                }else{

                    return $this->render('success', ['success_contact' => 'error_send']);

                }

            }else{

                $errorMsg = Yii::t('app', 'ReCaptcha field is required.');

                return $this->render('index', [
                    'model' => $model,
                    'errorMsg' => $errorMsg
                ]);

            }

        } else {
            return $this->render('index', ['model' => $model]);
        }

    }

    public function actionSignUp()
    {
        $model = new SubmitData();
        $session = Yii::$app->session;
        $session->open();

        if(Yii::$app->request->get('success') == 'true'){
        
            if($this->pay()){

                $success = true;
                $model = isset($_SESSION['model']) ? $_SESSION['model'] : NULL;
                $session->destroy();

              if($model != NULL){
                  $coupons = Yii::$app->getModule('coupons');
                  $coupons->reduceCouponCount($model->promo_code);
              }

                return $this->render('success',[
                    'success' => $success,
                    'model' => $model,
                ]);

            }

        }elseif(Yii::$app->request->get('success') == 'false'){

            $success = false;

            return $this->render('success',[
                'success' => $success
            ]);

        }

        if ($model->load(Yii::$app->request->post()) && $model->validate()) {

            $apartment_ids = '';
            $contact_time = '';
            $package_id = '';
            $region_iso = [
              'Alberta'                 => 'AB',
              'British Columbia'        => 'BC',
              'Manitoba'                => 'MB',
              'New Brunswick'           => 'NB',
              'Newfoundland & Labrador' => 'NL',
              'Nova Scotia'             => 'NS',
              'Northwest Territories'   => 'NT',
              'Nunavut'                 => 'NU',
              'Ontario'                 => 'ON',
              'Prince Edward Island'    => 'PE',
              'Québec'                  => 'QC',
              'Saskatchewan'            => 'SK',
              'Yukon Territory'         => 'YT',
            ];

            $package_id_arr = $model->package_id;

            foreach($model->apartment_ids as $key => $value){
                if($key != (count($model->apartment_ids) - 1)){
                    $apartment_ids .= $value . ',';
                }else{
                    $apartment_ids .= $value;
                }
            }

            foreach($model->contact_time as $k => $v){
                if($k != (count($model->contact_time) - 1)){
                    $contact_time .= $v . ',';
                }else{
                    $contact_time .= $v;
                }
            }

            foreach($package_id_arr as $i => $j){
                if($i != (count($package_id_arr) - 1)){
                    $package_id .= $j . ',';
                }else{
                    $package_id .= $j;
                }
            }

            $model->login = Yii::$app->security->generateRandomString();
            $model->apartment_ids = $apartment_ids;
            $model->contact_time = $contact_time;
            $model->region_iso = $region_iso[$model->region];
            $model->package_id = $package_id;

            $image = UploadedFile::getInstances($model, 'image');
            

            $imgVal = '';
            $model->image = $image;

            if ($model->upload()) {

                $lengthImage = count($image);
                foreach ($image as $key => $val) {
                    if ($key != $lengthImage - 1) {
                        $imgVal .= "http://" . Yii::$app->getRequest()->serverName . Url::base() . '/img/upload/' . $val->name . ';';
                    } else {
                        $imgVal .= "http://" . Yii::$app->getRequest()->serverName . Url::base() . '/img/upload/' . $val->name;
                    }
                }

               $model->image_url = $imgVal;
               // exit;
                
                
                //$session['model'] = $model;
	        //self::sendSuccessMessage($_SESSION['model'],'azad');
		//exit;
			  
                if ($model->save()) {
                	
                    $paypal = new Paypal();
                    $response = $paypal->makePayments($model->title, $package_id_arr, $model->package_duration_id, $model->promo_code);

                    $session['model'] = $model;

                    return $this->redirect($response);

                }
            }

        } else {

            return $this->render('sign-up', ['model' => $model]);

        }

    }

    public function actionOurServices()
    {
        return $this->render('our-services');
    }

    public function actionSuccess()
    {
        return $this->render('success');
    }

    /* Make Payments With PayPal*/
    private function pay()
    {
        $modelPayments = new Payments();

        Yii::$app->paypal->init();
        $apiContext = Yii::$app->paypal->getApiContext();

        $paymentId = Yii::$app->request->get('paymentId');
        $payerId = Yii::$app->request->get('PayerID');
        $token = Yii::$app->request->get('token');

        try {

            $payment = Payment::get($paymentId, $apiContext);

            $execute = new PaymentExecution();
            $execute->setPayerId($payerId);

            $result = $payment->execute($execute, $apiContext);

        } catch (PayPalConnectionException $e) {

            $errorMSG = json_decode($e->getData());

            return $this->render('/main/error', [
                'name' => $errorMSG->name,
                'message' => $errorMSG->message,
            ]);

        } catch (\Exception $ex) {

            die($ex);

        }

        $modelPayments->sd_id = $_SESSION['model']->id;
        $modelPayments->payer_id = $payerId;
        $modelPayments->transaction_id = $paymentId;
        $modelPayments->token = $token;

        if($modelPayments->save()){

            /* Send Succes Message */
            self::sendSuccessMessage($_SESSION['model'],$token);
            
           /* Send Succes Message to Admin */
            self::sendSuccessMessageAdmin($_SESSION['model'],$token);

            return true;

        }else{

            return false;

        }

    }

    /* Send Success Message */
    private static function sendSuccessMessage($model,$token)
    {
        return Yii::$app->mailer->compose([
            'text' => 'success-payment',
            'html'=> 'success-payment'
        ], [
            'model' => $model,
            'token' => $token,
        ])
            ->setTo($model->email)
            ->setFrom([Yii::$app->params['adminEmail'] => 'AUFPosting'])
            ->setSubject('NEW Order Received.')
            ->send();
    }
    
    private static function sendSuccessMessageAdmin($model,$token)
    {
        return Yii::$app->mailer->compose([
            'text' => 'success-payment',
            'html'=> 'success-payment'
        ], [
            'model' => $model,
            'token' => $token,
        ])
            ->setTo('info@aufposting.com')
            ->setFrom([Yii::$app->params['adminEmail'] => 'AUFPosting'])
            ->setSubject('NEW Order Received.')
            ->send();
    }

}