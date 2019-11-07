<?php

  function cptui_register_my_cpts_sponsors() {
  	$labels = [
  		"name" => __( "Sponsors", "" ),
  		"singular_name" => __( "Sponsor", "" ),
  	];

  	$args = [
  		"label" => __( "Sponsors", "" ),
  		"labels" => $labels,
  		"description" => "",
  		"public" => false,
  		"publicly_queryable" => false,
  		"show_ui" => true,
  		"show_in_rest" => true,
  		"rest_base" => "sponsors",
  		"has_archive" => false,
  		"show_in_menu" => true,
  		"exclude_from_search" => false,
  		"capability_type" => "post",
  		"map_meta_cap" => true,
  		"hierarchical" => false,
  		"rewrite" => [ "slug" => "sponsors", "with_front" => true ],
  		"query_var" => true,
  		"supports" => [ "title", "editor", "thumbnail" ],
  	];

  	register_post_type( "sponsors", $args );
  }

  add_action('init', 'cptui_register_my_cpts_sponsors');
  if( function_exists('acf_add_local_field_group') ):

  acf_add_local_field_group(array(
  	'key' => 'group_5dc373953fac7',
  	'title' => 'Sponsors',
  	'fields' => array(
  		array(
  			'key' => 'field_5dc373ab74bfd',
  			'label' => 'Name',
  			'name' => 'name',
  			'type' => 'text',
  			'instructions' => 'Enter in the name of the sponsor',
  			'required' => 1,
  			'conditional_logic' => 0,
  			'wrapper' => array(
  				'width' => '',
  				'class' => '',
  				'id' => '',
  			),
  			'default_value' => '',
  			'placeholder' => '',
  			'prepend' => '',
  			'append' => '',
  			'maxlength' => '',
  		),
  		array(
  			'key' => 'field_5dc373d474bfe',
  			'label' => 'Event',
  			'name' => 'event',
  			'type' => 'post_object',
  			'instructions' => 'Select the event that is being sponsored',
  			'required' => 1,
  			'conditional_logic' => 0,
  			'wrapper' => array(
  				'width' => '',
  				'class' => '',
  				'id' => '',
  			),
  			'post_type' => array(
  				0 => 'events',
  			),
  			'taxonomy' => '',
  			'allow_null' => 0,
  			'multiple' => 0,
  			'return_format' => 'id',
  			'ui' => 1,
  		),
  		array(
  			'key' => 'field_5dc374ab74c01',
  			'label' => 'Image',
  			'name' => 'image',
  			'type' => 'image',
  			'instructions' => 'The logo of the sponsor',
  			'required' => 1,
  			'conditional_logic' => 0,
  			'wrapper' => array(
  				'width' => '',
  				'class' => '',
  				'id' => '',
  			),
  			'return_format' => 'array',
  			'preview_size' => 'medium',
  			'library' => 'all',
  			'min_width' => '',
  			'min_height' => '',
  			'min_size' => '',
  			'max_width' => '',
  			'max_height' => '',
  			'max_size' => '',
  			'mime_types' => '',
  		),
  		array(
  			'key' => 'field_5dc3743c74bff',
  			'label' => 'Link',
  			'name' => 'link',
  			'type' => 'url',
  			'instructions' => 'Enter in a link to the sponsors website',
  			'required' => 0,
  			'conditional_logic' => 0,
  			'wrapper' => array(
  				'width' => '',
  				'class' => '',
  				'id' => '',
  			),
  			'default_value' => '',
  			'placeholder' => '',
  		),
  		array(
  			'key' => 'field_5dc3745e74c00',
  			'label' => 'Value',
  			'name' => 'value',
  			'type' => 'number',
  			'instructions' => 'The value here will be used to sort sponsors on the events page. Higher values will have sponsor shown earlier.',
  			'required' => 0,
  			'conditional_logic' => 0,
  			'wrapper' => array(
  				'width' => '',
  				'class' => '',
  				'id' => '',
  			),
  			'default_value' => '',
  			'placeholder' => '',
  			'prepend' => '',
  			'append' => '',
  			'min' => '',
  			'max' => '',
  			'step' => '',
  		),
  	),
  	'location' => array(
  		array(
  			array(
  				'param' => 'post_type',
  				'operator' => '==',
  				'value' => 'sponsors',
  			),
  		),
  	),
  	'menu_order' => 0,
  	'position' => 'normal',
  	'style' => 'default',
  	'label_placement' => 'top',
  	'instruction_placement' => 'label',
  	'hide_on_screen' => array(
  		0 => 'permalink',
  		1 => 'the_content',
  		2 => 'excerpt',
  		3 => 'discussion',
  		4 => 'comments',
  		5 => 'revisions',
  		6 => 'slug',
  		7 => 'author',
  		8 => 'format',
  		9 => 'page_attributes',
  		10 => 'featured_image',
  		11 => 'categories',
  		12 => 'tags',
  		13 => 'send-trackbacks',
  	),
  	'active' => true,
  	'description' => '',
  ));

  endif;
