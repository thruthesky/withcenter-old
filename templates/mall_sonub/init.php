<?php
use Drupal\post\Entity\PostData;

/**
 * @todo Bug - This should not be called in every page. It should be called only on front page.
 *  Use $variable[is_front] instead.
 */
if( $hook == 'page' ) {
	$post_with_thumbnail_mixed = PostData::search([										
										//'fid_of_first_image' => true,
										'order_field' => 'created',
										'order_direction' => 'DESC',
										'limit'=>'5'
								]);
	
	$pwt = [];
	foreach( $post_with_thumbnail_mixed as $post ){		
		$file_entity = $post->fid_of_first_image->entity;
		/*
		*I need thumbnails...
		*/
		if( $file_entity ){
			$file_url = [];
			$file_url['fid'] = $file_entity->id();
			$file_url['url_original'] = $file_entity->url();
			$path = $file_entity->getFileUri();
			$file_url['url_thumbnail'] = entity_load('image_style', 'thumbnail')->buildUrl($path);
			$file_url['url_medium'] = entity_load('image_style', 'medium')->buildUrl($path);
			$file_url['url_large'] = entity_load('image_style', 'large')->buildUrl($path);
			
			$pwt[ $post->id() ]['first_image_thumbnail'] = $file_url;
		}
			$pwt[ $post->id() ]['entity'] = $post;		
	}
	$variables['data']['sidebar_post_thumbnail_mixed'] = $pwt;
		
									
	$post_with_thumbnail = PostData::search([
										'fid_of_first_image' => true,
										'order_field' => 'created',
										'order_direction' => 'DESC',
										'limit'=>'5'
									]);		
	
	$pwt = [];
	foreach( $post_with_thumbnail as $post ){		
		$file_entity = $post->fid_of_first_image->entity;
		/*
		*I need thumbnails...
		*/
		if( $file_entity ){
			$file_url = [];
			$file_url['fid'] = $file_entity->id();
			$file_url['url_original'] = $file_entity->url();
			$path = $file_entity->getFileUri();
			$file_url['url_thumbnail'] = entity_load('image_style', 'thumbnail')->buildUrl($path);
			$file_url['url_medium'] = entity_load('image_style', 'medium')->buildUrl($path);
			$file_url['url_large'] = entity_load('image_style', 'large')->buildUrl($path);
			
			$pwt[ $post->id() ]['first_image_thumbnail'] = $file_url;
		}
			$pwt[ $post->id() ]['entity'] = $post;		
	}
	$variables['data']['sidebar_post_thumbnail'] = $pwt;
}
