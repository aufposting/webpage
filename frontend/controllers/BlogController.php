<?php

namespace frontend\controllers;

use common\models\Translations;
use Yii;
use yii\data\Pagination;
use yii\web\Controller;
use common\models\Blog;

class BlogController extends Controller
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

            $blog = Blog::find()->where(['is_active' => 1]);

        }else{

            $blog = Blog::find()
                ->where(['blog.is_active' => 1])
                ->innerJoin(Translations::tableName(), 'translations.parent_id=blog.id')
                ->andWhere(['translations.parent_tbl' => 'blog'])
                ->select('blog.keywords, blog.description, blog.slug, translations.title,translations.short_text,translations.content');

        }

        $pagination = new Pagination([
            'defaultPageSize' => 10,
            'totalCount' => $blog->count(),
        ]);

        $blogContent = $blog->offset($pagination->offset)->limit($pagination->limit)->asArray()->all();

        return $this->render('index', [
            'pagination' => $pagination,
            'blogContent' => $blogContent
        ]);

    }

    public function actionBlog()
    {
        $getRequest = Yii::$app->request->get();

        if(isset($_COOKIE['lang']) && ($_COOKIE['lang'] == 'en-US')){

            $blogposts = Blog::find()
                ->where(['is_active' => 1])
                ->asArray()
                ->all();

            if (isset($getRequest['slug']) && $getRequest['slug'] !== '') {

                $thread = Blog::find()->where([
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

            $blogposts = Blog::find()
                ->where(['blog.is_active' => 1])
                ->innerJoin(Translations::tableName(), 'translations.parent_id=blog.id')
                ->andWhere(['translations.parent_tbl' => 'blog'])
                ->select('blog.slug, translations.title')
                ->asArray()
                ->all();

            if (isset($getRequest['slug']) && $getRequest['slug'] !== '') {

                $thread = Blog::find()
                    ->where([
                        'blog.is_active' => 1,
                        'blog.slug' => $getRequest['slug']
                    ])
                    ->innerJoin(Translations::tableName(), 'translations.parent_id=blog.id')
                    ->andWhere(['translations.parent_tbl' => 'blog'])
                    ->select('blog.keywords, blog.description, blog.slug, translations.title,translations.short_text,translations.content,')
                    ->asArray()
                    ->one();

                if($thread == null){
                    $this->redirect('main/error');
                }

            } else {

                return $this->redirect('index');

            }

        }

        return $this->render('blog', [
            'thread' => $thread,
            'blogposts' => $blogposts,
        ]);

    }
}