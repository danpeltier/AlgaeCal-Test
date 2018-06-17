<?php
// WordPress solution - Part 2 of AlgaeCal Front End Developer Test

function replace_core_jquery_version() {
    wp_deregister_script( 'jquery-core' );
    wp_register_script( 'jquery-core', "https://code.jquery.com/jquery-3.3.1.js", array(), '3.3.1' );
    wp_deregister_script( 'jquery-migrate' );
    wp_register_script( 'jquery-migrate', "https://code.jquery.com/jquery-migrate-3.0.1.js", array(), '3.0.1' );
}

add_action( 'wp_enqueue_scripts', 'replace_core_jquery_version' );

?>
