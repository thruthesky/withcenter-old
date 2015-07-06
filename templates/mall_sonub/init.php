<?php
use Drupal\post\Entity\PostData;


/*
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
*/
if( $hook == 'page' ){
	$post_with_thumbnail = PostData::search([
										'post_config_name' => 'job',
										'fid_of_first_image' => true,
										'order_field' => 'created',
										'order_direction' => 'DESC',
										'limit'=>'4'
									]);
									
	$variables['data']['sidebar_post_bullet'] = PostData::search([
										'post_config_name' => 'discussion',
										'order_field' => 'created',
										'order_direction' => 'DESC',
										'limit'=>'10'
									]);	
									
	$pwt = [];
	foreach( $post_with_thumbnail  as $post ){		
		$file_entity = $post->fid_of_first_image->entity;
		/*
		*I need thumbnails...
		*/
		$file_url = [];
		$file_url['fid'] = $file_entity->id();
		$file_url['url_original'] = $file_entity->url();
		$path = $file_entity->getFileUri();
		$file_url['url_thumbnail'] = entity_load('image_style', 'thumbnail')->buildUrl($path);
		$file_url['url_medium'] = entity_load('image_style', 'medium')->buildUrl($path);
		$file_url['url_large'] = entity_load('image_style', 'large')->buildUrl($path);
		
		$pwt[ $post->id() ]['first_image_thumbnail'] = $file_url;
		$pwt[ $post->id() ]['entity'] = $post;
	}
	
	$variables['data']['sidebar_post_thumbnail'] = $pwt;
}
