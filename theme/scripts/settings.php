<?php

  function add_theme_menu_item()
  {
  	add_menu_page("CCMC Settings", "CCMC Settings", "manage_options", "theme-panel", "theme_settings_page", null, 99);
  }

  add_action("admin_menu", "add_theme_menu_item");

  function theme_settings_page()
  {
    ?>
	    <div class="wrap">
  	    <h1>Settings</h1>
  	    <form method="post" action="options.php">
	        <?php
            settings_fields("section");
            do_settings_sections("theme-options");
            submit_button();
	        ?>
  	    </form>
  		</div>
  	<?php
  }
  function display_fb_app_id_element()
  {
  	?>
    	<input type="text" name="ccmc_fb_app_id" id="ccmc_fb_app_id" value="<?php echo get_option('ccmc_fb_app_id'); ?>" />
    <?php
  }

  function display_fb_app_secret_element()
  {
  	?>
    	<input type="text" name="ccmc_fb_app_secret" id="ccmc_fb_app_secret" value="<?php echo get_option('ccmc_fb_app_secret'); ?>" />
    <?php
  }

  function display_contact_name_element()
  {
    ?>
    	<input type="text" name="ccmc_contact_name" id="ccmc_contact_name" value="<?php echo get_option('ccmc_contact_name'); ?>" />
    <?php
  }

  function display_contact_email_element()
  {
    ?>
    	<input type="text" name="ccmc_contact_email" id="ccmc_contact_email" value="<?php echo get_option('ccmc_contact_email'); ?>" />
    <?php
  }

  function display_contact_phone_element()
  {
    ?>
    	<input type="text" name="ccmc_contact_phone" id="ccmc_contact_phone" value="<?php echo get_option('ccmc_contact_phone'); ?>" />
    <?php
  }

  function display_theme_panel_fields()
  {
  	add_settings_section("fbapp", "Facebook app settings", null, "theme-options");
  	add_settings_field("ccmc_fb_app_id", "Facebook app ID", "display_fb_app_id_element", "theme-options", "fbapp");
    add_settings_field("ccmc_fb_app_secret", "Facebook app secret", "display_fb_app_secret_element", "theme-options", "fbapp");
    register_setting("section", "ccmc_fb_app_id");
    register_setting("section", "ccmc_fb_app_secret");

    add_settings_section("contact", "Contact settings", null, "theme-options");
    add_settings_field("ccmc_contact_name", "Name", "display_contact_name_element", "theme-options", "contact");
    add_settings_field("ccmc_contact_email", "Email", "display_contact_email_element", "theme-options", "contact");
    add_settings_field("ccmc_contac_phonee", "Phone", "display_contact_phone_element", "theme-options", "contact");
    register_setting("section", "ccmc_contact_name");
    register_setting("section", "ccmc_contact_email");
    register_setting("section", "ccmc_contact_phone");
  }

  add_action("admin_init", "display_theme_panel_fields");
