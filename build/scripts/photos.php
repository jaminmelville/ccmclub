<?php

  function cptui_register_my_cpts_photos() {
  	$labels = [
  		"name" => __( "Photos", "" ),
  		"singular_name" => __( "Photo", "" ),
  	];

  	$args = [
  		"label" => __( "Photos", "" ),
  		"labels" => $labels,
  		"description" => "",
  		"public" => false,
  		"publicly_queryable" => false,
  		"show_ui" => true,
  		"show_in_rest" => true,
  		"rest_base" => "photos",
  		"has_archive" => false,
  		"show_in_menu" => true,
  		"exclude_from_search" => false,
  		"capability_type" => "post",
  		"map_meta_cap" => true,
  		"hierarchical" => false,
  		"rewrite" => [ "slug" => "photos", "with_front" => true ],
  		"query_var" => true,
  		"supports" => [],
  	];

  	register_post_type( "photos", $args );
  }

  add_action('init', 'cptui_register_my_cpts_photos');
  if( function_exists('acf_add_local_field_group') ):

  acf_add_local_field_group(array(
  	'key' => 'group_5dfc467b172d5',
  	'title' => 'Photos',
  	'fields' => array(
      array(
        'key' => 'field_5dfc467b25573',
        'label' => 'Event',
        'name' => 'event',
        'type' => 'post_object',
        'instructions' => 'Select event for which the photos are associated with.',
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
  			'key' => 'field_5dfc467b254ee',
  			'label' => 'Label',
  			'name' => 'label',
  			'type' => 'text',
  			'instructions' => 'eg. 2018',
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
  			'key' => 'field_5dfc467b25534',
  			'label' => 'URL',
  			'name' => 'url',
  			'type' => 'url',
  			'instructions' => 'Paste in the link to the photos.',
  			'required' => 1,
  			'conditional_logic' => 0,
  			'wrapper' => array(
  				'width' => '',
  				'class' => '',
  				'id' => '',
  			),
  			'default_value' => '',
  			'placeholder' => '',
  		),
  	),
  	'location' => array(
  		array(
  			array(
  				'param' => 'post_type',
  				'operator' => '==',
  				'value' => 'photos',
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
  add_filter( 'manage_photos_posts_columns', 'photos_columns' );
  function photos_columns( $columns ) {
    $columns = [
      'cb' => $columns['cb'],
      'event' => __( 'Event' ),
      'label' => __( 'Label' ),
    ];
    return $columns;
  }

  add_action( 'manage_photos_posts_custom_column', 'photos_column', 10, 2);
  function photos_column( $column, $post_id ) {
    if ( 'label' === $column ) {
      echo get_post_meta( $post_id, 'label', true );
    }
    if ( 'event' === $column ) {
      echo get_the_title(get_post_meta( $post_id, 'event', true ));
    }
  }

  add_filter( 'manage_edit-photos_sortable_columns', 'photos_sortable_columns');
  function photos_sortable_columns( $columns ) {
    $columns['value'] = 'value';
    $columns['name'] = 'name';
    $columns['event'] = 'event';
    return $columns;
  }

  function photos_remove_post_type_title() {
    remove_post_type_support('photos', 'title');
    remove_post_type_support('photos', 'editor');
  }
  add_action( 'admin_init', 'photos_remove_post_type_title' );
