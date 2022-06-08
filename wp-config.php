<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'kikilproperty' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'p)/,h3}AIFxo(Nvk#ID>yoUg1#w`an*9@o#m<BS%D{h,0^+h5PIVNY)0FiANd)Cv' );
define( 'SECURE_AUTH_KEY',  'TNyxX;%Q]iL/fMsb~Fv:C`rl<-EiK1N/}Y[^W]*)=^uS< K{(O1jKd*s^LwK*d>m' );
define( 'LOGGED_IN_KEY',    ']^.[OOI/v}q*M(gUB,|=0vp=,G0 a&ybAZ/,@kXd^^)e /&u7ZU>ps-Xg7#w;9tK' );
define( 'NONCE_KEY',        'tfMTd]|$F7u7s@xN! 7x_>*HI@V:OU,Pv`@7{IXSvY#$y>~xq0m!W`mc/k)[=9jv' );
define( 'AUTH_SALT',        'RX{vftnFeL{qCEbH<*Am0TFYf#OnToKcKPm-mb-RlK,NH0@nuSRy)O.~LV)GmT8l' );
define( 'SECURE_AUTH_SALT', 'RdyQZZHR+;!Ua@<x??J !_qvLHUzp]J,.GrDsA|KD3P/xM)u-UcX!&Gj4fO,q]2S' );
define( 'LOGGED_IN_SALT',   'd}8%F.rCg[y2_c(6#.!p:w{WYB$LG>aivSQuX/JSxCAFenc]{6,%{)=LuuOp6R1P' );
define( 'NONCE_SALT',       '>]{)NlfqYSs3E4l2)<nx2vd*/Yk!so,;M>4Q}[4mP9ue ]FQ#$mW{@AE7:.3aa}u' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
