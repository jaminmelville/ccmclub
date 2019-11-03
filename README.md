# ccmclub

## Setup

* `cp .env.dist .env`
* run `docker-compose up -d`

### Install wordpress site.
`docker-compose run cli core install --url="localhost"  --title="CCMC" --admin_user="admin" --admin_password="password" --skip-email --admin_email="benmelville87@gmail.com"`

### Install wordpress plugins.
`docker-compose run cli plugin install advanced-custom-fields acf-field-date-time-picker acf-to-rest-api wordpress-seo --activate`

### Install wordpress plugins.
`docker-compose run cli rewrite structure '/%postname%'`

### Make theme available.
`sudo cp -r theme web/wp-content/themes/ccmclub`

### Active ccmclub wordpress theme.
`docker-compose run cli theme activate ccmclub`

* edit siteurl and home to correct URLs
* enable theme
* enable advanced seo settings (/wp-admin/admin.php?page=wpseo_dashboard#top#features)
* add seo fields for social etc.
* add content
