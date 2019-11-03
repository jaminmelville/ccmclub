<?php

  function cccmcApi() {
    $settings = [
      'contact' => [
        'name' => get_option('ccmc_contact_name'),
        'email' => get_option('ccmc_contact_email'),
        'phone' => get_option('ccmc_contact_phone'),
      ],
    ];
    return $settings;
  }

  add_action('rest_api_init', function() {
    register_rest_route('ccmc/v1', '/settings', [
      'methods' => 'GET',
      'callback' => 'cccmcApi',
    ]);
  });
