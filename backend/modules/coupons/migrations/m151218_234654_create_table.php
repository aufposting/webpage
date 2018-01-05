<?php

use yii\db\Schema;
use yii\db\Migration;

class m151218_234654_create_table extends Migration
{
    public function up()
    {
        $tableOptions = null;

        if ($this->db->driverName === 'mysql') {
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        $this->createTable('{{%coupons}}', [
            'id'                          =>    Schema::TYPE_PK,
            'name'                        =>    Schema::TYPE_STRING  . '(500)',
            'image_url'                   =>    Schema::TYPE_STRING  . '(500)',
            'coupon_code'                 =>    Schema::TYPE_STRING  . '(255) UNIQUE NOT NULL',
            'discount_type'               =>    "ENUM('percent', 'price') NOT NULL",
            'discount_count'              =>    Schema::TYPE_INTEGER . ' NOT NULL',
            'available_coupons_count'     =>    Schema::TYPE_INTEGER . ' NOT NULL',
            'expire_at'                   =>    Schema::TYPE_TIMESTAMP,
            'created_at'                  =>    Schema::TYPE_TIMESTAMP,
            'updated_at'                  =>    Schema::TYPE_TIMESTAMP,
            'status'                      =>    "ENUM('active', 'passive')",
        ], $tableOptions);

    }

    public function down()
    {
        $this->dropTable('{{%coupons}}');

    }

}
