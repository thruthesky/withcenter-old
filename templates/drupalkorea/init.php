<?php
use Drupal\post\Entity\PostData;

if( ! empty($variables['is_front']) ) {
    $variables['data']['post']['drupal_freetalk'] = PostData::search([
        'post_config_name' => 'drupal-freetalk',
        'order_field' => 'created',
        'order_direction' => 'DESC',
        'limit'=>'10'
    ]);
    $variables['data']['post']['drupal_ask'] = PostData::search([
        'post_config_name' => 'drupal-ask',
        'order_field' => 'created',
        'order_direction' => 'DESC',
        'limit'=>'10'
    ]);

    $variables['data']['post']['drupal_help'] = PostData::search([
        'post_config_name' => 'drupal-help',
        'order_field' => 'created',
        'order_direction' => 'DESC',
        'limit'=>'10'
    ]);

    $variables['data']['post']['drupal_tip'] = PostData::search([
        'post_config_name' => 'drupal-tip',
        'order_field' => 'created',
        'order_direction' => 'DESC',
        'limit'=>'10'
    ]);
}
