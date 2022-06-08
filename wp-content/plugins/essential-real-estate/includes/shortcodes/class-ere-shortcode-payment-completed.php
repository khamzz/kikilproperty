<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
if (!class_exists('ERE_Shortcode_Payment_Completed')) {
    /**
     * ERE_Shortcode_Payment class.
     */
    class ERE_Shortcode_Payment_Completed
    {
        /**
         * @param $atts
         */
        public static function output($atts)
        {
            return ere_get_template_html('payment/payment-completed.php', array('atts' => $atts));
        }
    }
}