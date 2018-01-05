<?php

namespace common\components;

use common\models\PackageDuration;
use common\models\PaymentDetails;
use Yii;
use yii\base\Component;
use PayPal\Api\Amount;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\Transaction;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\RedirectUrls;

class Paypal extends Component
{

    public function makePayments($title, $package, $package_duration, $promo_code)
    {
        Yii::$app->paypal->init();
        $apiContext = Yii::$app->paypal->getApiContext();

        $payment_details = PaymentDetails::findAll(['id' => $package]);

        $tmp_price = 0;

        foreach ($payment_details as $index => $payment_detail) {

            $tmp_price += $payment_detail->price;

        }
 
        $discount_from_package_duration = PackageDuration::findOne([
            'id' => $package_duration
        ]);

        $price = ($tmp_price * $discount_from_package_duration->duration) * $discount_from_package_duration->discount / 100;

        $price = ($tmp_price * $discount_from_package_duration->duration) - $price;

        $coupons = Yii::$app->getModule('coupons');

        $price = $coupons->getPrice($promo_code, $price);

        $payer = new Payer();
        $payer->setPaymentMethod("paypal");

        $items = [];

        $item = new Item();
        $item->setName($title)
            ->setCurrency($payment_details[0]->currency)
            ->setQuantity(1)
            ->setPrice($price);

        array_push($items,$item);

        $itemList = new ItemList();
        $itemList->setItems($items);

        $details = new Details();
        $details->setShipping($payment_details[0]->shipping)
            ->setTax($payment_details[0]->tax)
            ->setSubtotal($price);

        $total = floatval($payment_details[0]->shipping) + floatval($payment_details[0]->tax) + $price;

        $amount = new Amount();
        $amount->setCurrency($payment_details[0]->currency)
            ->setTotal($total)
            ->setDetails($details);

        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setItemList($itemList)
            ->setDescription($payment_details[0]->payment_description)
            ->setInvoiceNumber(uniqid());

        if ( (! empty($_SERVER['REQUEST_SCHEME']) &&
                $_SERVER['REQUEST_SCHEME'] == 'https') ||
            (! empty($_SERVER['HTTPS']) &&
                $_SERVER['HTTPS'] == 'on') ||
            (! empty($_SERVER['SERVER_PORT']) &&
                $_SERVER['SERVER_PORT'] == '443') ) {
            $scheme = 'https';
        } else {
            $scheme = 'http';
        }

        $baseUrl = $scheme . '://' . Yii::$app->request->serverName . Yii::$app->homeUrl;

        $redirectUrls = new RedirectUrls();
        $redirectUrls->setReturnUrl($baseUrl . "main/sign-up?success=true")->setCancelUrl($baseUrl . "main/sign-up?success=false");

        $payment = new Payment();
        $payment->setIntent("sale")
            ->setPayer($payer)
            ->setRedirectUrls($redirectUrls)
            ->setTransactions([$transaction]);

        try {
            $payment->create($apiContext);
        } catch (\Exception $ex) {
            die($ex);
        }

        $approvalUrl = $payment->getApprovalLink();

        return $approvalUrl;

    }
  
}