-----------------------------------------------------------------
DO THIS IS ASPX, NOT PHP
-----------------------------------------------------------------

<?php
$data = '{}'; // json string

if(array_key_exists('callback', $_GET)){
    //Pass JSONP in callback
    header('Content-Type: text/javascript; charset=utf8');

    $callback = $_GET['callback'];
    echo $callback.'('.$data.');';

}else{
    //Pass normal JSON string
    header('Content-Type: application/json; charset=utf8');

    echo $data;
}
?>