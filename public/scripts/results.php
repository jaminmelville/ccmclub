<?php

  function cptui_register_my_cpts_results() {
  	$labels = [
  		"name" => __( "Results", "" ),
  		"singular_name" => __( "Result", "" ),
  	];

  	$args = [
  		"label" => __( "Results", "" ),
  		"labels" => $labels,
  		"description" => "",
  		"public" => false,
  		"publicly_queryable" => false,
  		"show_ui" => true,
  		"show_in_rest" => true,
  		"rest_base" => "results",
  		"has_archive" => false,
  		"show_in_menu" => true,
  		"exclude_from_search" => false,
  		"capability_type" => "post",
  		"map_meta_cap" => true,
  		"hierarchical" => false,
  		"rewrite" => [ "slug" => "results", "with_front" => true ],
  		"query_var" => true,
  		"supports" => [],
  	];

  	register_post_type( "results", $args );
  }

  add_action('init', 'cptui_register_my_cpts_results');

if( function_exists('acf_add_local_field_group') ):

acf_add_local_field_group(array(
	'key' => 'group_5dfc314bf10e2',
	'title' => 'Results',
	'fields' => array(
		array(
			'key' => 'field_5dfc319d4fe20',
			'label' => 'Event',
			'name' => 'event',
			'type' => 'post_object',
			'instructions' => 'Select event for which the result is associated with.',
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
			'key' => 'field_5dfc31654fe1f',
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
			'key' => 'field_5dfc31fb4fe21',
			'label' => 'URL',
			'name' => 'url',
			'type' => 'url',
			'instructions' => 'Paste in the link to the results.',
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
				'value' => 'results',
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
add_filter( 'manage_results_posts_columns', 'results_columns' );
function results_columns( $columns ) {
  $columns = [
    'cb' => $columns['cb'],
    'event' => __( 'Event' ),
    'label' => __( 'Label' ),
  ];
  return $columns;
}

add_action( 'manage_results_posts_custom_column', 'results_column', 10, 2);
function results_column( $column, $post_id ) {
  if ( 'label' === $column ) {
    echo get_post_meta( $post_id, 'label', true );
  }
  if ( 'event' === $column ) {
    echo get_the_title(get_post_meta( $post_id, 'event', true ));
  }
}

add_filter( 'manage_edit-results_sortable_columns', 'results_sortable_columns');
function results_sortable_columns( $columns ) {
  $columns['value'] = 'value';
  $columns['name'] = 'name';
  $columns['event'] = 'event';
  return $columns;
}

function results_remove_post_type_title() {
  remove_post_type_support('results', 'title');
  remove_post_type_support('results', 'editor');
}
add_action( 'admin_init', 'results_remove_post_type_title' );
