<?php
// di("hello, what am i? : hook=$hook");


use Drupal\post\Entity\PostData;



$where = PostData::getQueryOnConds([]); // return null

$where = PostData::getQueryOnConds([
    'post_config_name' => 'job',
]); // returns "WHERE config_id=2 AND parent_id=0"
$where = PostData::getQueryOnConds([
    'post_config_name' => 'job',
    'original_only' => true
]); // returns "WHERE config_id=2 AND parent_id=0"
$where = PostData::getQueryOnConds([
    'post_config_name' => 'job',
    'original_only' => false
]); // WHERE config_id=2

PostData::search([
    'post_config_name' => 'job',
    'original_only' => false,
    'order_field' => 'created',
    'order_direction' => 'DESC',
]); // SQL : SELECT `id` FROM post_data WHERE config_id=2 ORDER BY `created` DESC LIMIT 0,10


PostData::search([
    'post_config_name' => 'job',
    'fid_of_first_image' => true
]); // SQL : SELECT `id` FROM post_data WHERE config_id=2 AND parent_id=0 AND fid_of_first_image>0 ORDER BY `id` DESC LIMIT 0,10
