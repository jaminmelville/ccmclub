<?php

  if(function_exists("register_field_group"))
  {
    register_field_group([
  		'id' => 'acf_page',
  		'title' => 'Page',
  		'fields' => [
  			[
  				'key' => 'field_5a27c37b6d07e',
  				'label' => 'Background',
  				'name' => 'background',
  				'type' => 'image',
  				'instructions' => 'Choose background image for the page',
  				'required' => 1,
  				'save_format' => 'object',
  				'preview_size' => 'thumbnail',
  				'library' => 'all',
  			],
  			[
  				'key' => 'field_5a1cfd5cf0ejf',
  				'label' => 'Feature image',
  				'name' => 'feature_image',
  				'type' => 'image',
  				'instructions' => 'Choose the featured image',
  				'save_format' => 'object',
  				'preview_size' => 'thumbnail',
  				'library' => 'all',
  			],
  		],
  		'location' => [
  			[
  				[
  					'param' => 'post_type',
  					'operator' => '==',
  					'value' => 'page',
  					'order_no' => 0,
  					'group_no' => 0,
  				],
  			],
  		],
  		'options' => [
  			'position' => 'normal',
  			'layout' => 'no_box',
  			'hide_on_screen' => [],
  		],
  		'menu_order' => 0,
  	]);
  }
