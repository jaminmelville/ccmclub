<?php

  function cccmcApi() {
    $settings = [
      'contact' => [
        'name' => get_option('ccmc_contact_name'),
        'email' => get_option('ccmc_contact_email'),
        'phone' => get_option('ccmc_contact_phone'),
      ],
      'site' => [
        'name' => nl2br(get_option('ccmc_site_name'))
      ]
    ];
    return $settings;
  }

  add_action('rest_api_init', function() {
    register_rest_route('ccmc/v1', '/settings', [
      'methods' => 'GET',
      'callback' => 'cccmcApi',
    ]);
  });
