<?php

  function cptui_register_my_cpts_events() {
  	$labels = array(
  		"name" => __( "Events", "" ),
  		"singular_name" => __( "Event", "" ),
  	);

  	$args = array(
  		"label" => __( "Events", "" ),
  		"labels" => $labels,
  		"description" => "",
  		"public" => true,
  		"publicly_queryable" => true,
  		"show_ui" => true,
  		"show_in_rest" => true,
  		"rest_base" => "events",
  		"has_archive" => false,
  		"show_in_menu" => true,
  		"exclude_from_search" => false,
  		"capability_type" => "post",
  		"map_meta_cap" => true,
  		"hierarchical" => false,
  		"rewrite" => array( "slug" => "events", "with_front" => true ),
  		"query_var" => true,
  		"supports" => array( "title", "editor", "thumbnail" ),
  	);

  	register_post_type( "events", $args );
  }

  add_action( 'init', 'cptui_register_my_cpts_events' );

  if(function_exists("register_field_group"))
  {
    register_field_group(array (
  		'id' => 'acf_page',
  		'title' => 'Page',
  		'fields' => array (
  			array (
  				'key' => 'field_5a27c37b6d07e',
  				'label' => 'Background',
  				'name' => 'background',
  				'type' => 'image',
  				'instructions' => 'Choose background image for the page',
  				'required' => 1,
  				'save_format' => 'object',
  				'preview_size' => 'thumbnail',
  				'library' => 'all',
  			),
  		),
  		'location' => array (
  			array (
  				array (
  					'param' => 'post_type',
  					'operator' => '==',
  					'value' => 'page',
  					'order_no' => 0,
  					'group_no' => 0,
  				),
  			),
  		),
  		'options' => array (
  			'position' => 'normal',
  			'layout' => 'no_box',
  			'hide_on_screen' => array (
  			),
  		),
  		'menu_order' => 0,
  	));

  	register_field_group(array (
  		'id' => 'acf_event-fields',
  		'title' => 'Event fields',
  		'fields' => array (
  			array (
  				'key' => 'field_5a1cfc7ff0e3a',
  				'label' => 'Date',
  				'name' => 'date',
  				'type' => 'date_time_picker',
  				'instructions' => 'Pick a start time and date for the event',
  				'required' => 1,
  				'show_date' => 'true',
  				'date_format' => 'm/d/y',
  				'time_format' => 'h:mm tt',
  				'show_week_number' => 'false',
  				'picker' => 'slider',
  				'save_as_timestamp' => 'true',
  				'get_as_timestamp' => 'false',
  			),
  			array (
  				'key' => 'field_5a1cfc9df0e3b',
  				'label' => 'Results URL',
  				'name' => 'results_url',
  				'type' => 'text',
  				'instructions' => 'Paste in the URL for the results',
  				'default_value' => '',
  				'placeholder' => '',
  				'prepend' => '',
  				'append' => '',
  				'formatting' => 'html',
  				'maxlength' => '',
  			),
  			array (
  				'key' => 'field_5a1cfcc2f0e3c',
  				'label' => 'Registration URL',
  				'name' => 'registration_url',
  				'type' => 'text',
  				'instructions' => 'Paste in the URL for registering',
  				'default_value' => '',
  				'placeholder' => '',
  				'prepend' => '',
  				'append' => '',
  				'formatting' => 'html',
  				'maxlength' => '',
  			),
        array (
  				'key' => 'field_5a1cfcc2f0e4c',
  				'label' => 'Youtube URL',
  				'name' => 'youtube_url',
  				'type' => 'text',
  				'instructions' => 'Paste in the URL of a youtube video',
  				'default_value' => '',
  				'placeholder' => '',
  				'prepend' => '',
  				'append' => '',
  				'formatting' => 'html',
  				'maxlength' => '',
  			),
        array (
          'key' => 'field_5a1cfcc2f0egc',
          'label' => 'Facebook album URL',
          'name' => 'facebook_album_url',
          'type' => 'text',
          'instructions' => 'Paste in the URL of a facebook album',
          'default_value' => '',
          'placeholder' => '',
          'prepend' => '',
          'append' => '',
          'formatting' => 'html',
          'maxlength' => '',
        ),
        array (
  				'key' => 'field_5a1d08363fcd8',
  				'label' => 'Map embed',
  				'name' => 'map_embed',
  				'type' => 'textarea',
  				'instructions' => 'Paste in a map URL from mymaps.google.com',
  				'default_value' => '',
  				'placeholder' => '',
  				'maxlength' => '',
  				'rows' => '',
  				'formatting' => 'none',
  			),
  			array (
  				'key' => 'field_5a1cfce3f0e3d',
  				'label' => 'Tags',
  				'name' => 'tags',
  				'type' => 'taxonomy',
  				'taxonomy' => 'category',
  				'field_type' => 'checkbox',
  				'allow_null' => 0,
  				'load_save_terms' => 0,
  				'return_format' => 'id',
  				'multiple' => 0,
  			),
  			array (
  				'key' => 'field_5a1cfd37f0e3e',
  				'label' => 'Background',
  				'name' => 'background',
  				'type' => 'image',
  				'instructions' => 'Choose background image for the page',
  				'required' => 1,
  				'save_format' => 'object',
  				'preview_size' => 'thumbnail',
  				'library' => 'all',
  			),
  			array (
  				'key' => 'field_5a1cfd5cf0e3f',
  				'label' => 'Feature image',
  				'name' => 'feature_image',
  				'type' => 'image',
  				'instructions' => 'Choose the featured image',
  				'required' => 1,
  				'save_format' => 'object',
  				'preview_size' => 'thumbnail',
  				'library' => 'all',
  			),
  		),
  		'location' => array (
  			array (
  				array (
  					'param' => 'post_type',
  					'operator' => '==',
  					'value' => 'events',
  					'order_no' => 0,
  					'group_no' => 0,
  				),
  			),
  		),
  		'options' => array (
  			'position' => 'normal',
  			'layout' => 'no_box',
  			'hide_on_screen' => array (
  			),
  		),
  		'menu_order' => 0,
  	));
  }
