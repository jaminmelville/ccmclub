<?php
  require_once __DIR__ . '/../vendor/autoload.php'; // change path as needed

  function fetchFacebookAlbum($data) {
    $images = get_transient('photos' . $data['id']);
    if ($images) {
      return $images;
    }

    $fb = new \Facebook\Facebook([
      'app_id' => get_option('ccmc_fb_app_id'),
      'app_secret' => get_option('ccmc_fb_app_secret'),
      'default_graph_version' => 'v2.11',
    ]);

    try {
      $response = $fb->get(
        '/' . $data['id'] . '/photos?fields=images&limit=100',
        '1849712832007043|41078426cb6fa04dc70813f7c5c1bbaf'
      );
    } catch(Exception $e) {
      echo 'Graph returned an error: ' . $e->getMessage();
    }

    $images = [];
    $edge = $response->getGraphEdge();
    do {
      foreach ($edge as $node) {
        $images[] = $node->asArray();
      }
    } while ($edge = $fb->next($edge));
    set_transient('photos' . $data['id'], $images, 60 * 60 * 24 * 7);
    return $images;
  }

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
    register_rest_route('fb/v1', '/album/(?P<id>\d+)', [
      'methods' => 'GET',
      'callback' => 'fetchFacebookAlbum',
    ]);
    register_rest_route('ccmc/v1', '/settings', [
      'methods' => 'GET',
      'callback' => 'cccmcApi',
    ]);
  });
