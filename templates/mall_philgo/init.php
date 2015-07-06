<?php
use Drupal\post\Entity\PostData;
$posts = PostData::search([
    'post_config_name' => 'job',
    'fid_of_first_image' => true
]);
$variables['data']['latest_with_photo'] = $posts;
