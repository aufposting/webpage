<?php

namespace frontend\controllers;

use common\models\Translations;
use Yii;
use yii\data\Pagination;
use yii\web\Controller;
use common\models\ListingSection;

class ListingSectionController extends Controller
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

    public function actionIndex()
    {
    
   

        if(isset($_COOKIE['lang']) && ($_COOKIE['lang'] == 'en-US')){
        

            $blog = ListingSection::find()->where(['is_active' => 1])->orderBy('listing_section.created_at desc');

        }else{
        

            $blog = ListingSection::find()
               
               
                ->where(['listing_section.is_active' => 1])
                ->innerJoin(Translations::tableName(), 'translations.parent_id=listing_section.id')
                ->andWhere(['translations.parent_tbl' => 'listing'])
                ->select('listing_section.created_at,listing_section.keywords, listing_section.description, listing_section.slug,translations.title,translations.short_text,translations.content')->orderBy('listing_section.created_at desc');
            
        }

        $pagination = new Pagination([
            'defaultPageSize' => 10,
            'totalCount' => $blog->count(),
        ]);

        $blogContent = $blog->offset($pagination->offset)->limit($pagination->limit)->asArray()->all() ;
       

        return $this->render('index', [
            'pagination' => $pagination,
            'blogContent' => $blogContent
        ]);

    }

    public function actionListing()
    {
    
    
        $getRequest = Yii::$app->request->get();

        if(isset($_COOKIE['lang']) && ($_COOKIE['lang'] == 'en-US')){

            $blogposts = ListingSection::find()
                ->where(['is_active' => 1])
                ->asArray()
                ->all();

            if (isset($getRequest['slug']) && $getRequest['slug'] !== '') {

                $thread = ListingSection::find()->where([
                    'is_active' => 1,
                    'slug' => $getRequest['slug']
                ])->asArray()->one();

                if($thread == null){
                    $this->redirect('main/error');
                }

            } else {

                return $this->redirect('index');

            }

        }else{

            $blogposts = ListingSection::find()
                ->where(['listing_section.is_active' => 1])
                ->innerJoin(Translations::tableName(), 'translations.parent_id=listing_section.id')
                ->andWhere(['translations.parent_tbl' => 'listing'])
                ->select('listing_section.slug, translations.title')
                ->asArray()
                ->all();

            if (isset($getRequest['slug']) && $getRequest['slug'] !== '') {

                $thread = ListingSection::find()
                    ->where([
                        'listing_section.is_active' => 1,
                        'listing_section.slug' => $getRequest['slug']
                    ])
                    ->innerJoin(Translations::tableName(), 'translations.parent_id=listing_section.id')
                    ->andWhere(['translations.parent_tbl' => 'listing'])
                    ->select('listing_section.keywords, listing_section.description, listing_section.files, listing_section.slug, translations.title,translations.short_text,translations.content,')
                    ->asArray()
                    ->one();

                if($thread == null){
                    $this->redirect('main/error');
                }

            } else {

                return $this->redirect('index');

            }

        }

        return $this->render('listing', [
            'thread' => $thread,
            'blogposts' => $blogposts,
        ]);

    }

}