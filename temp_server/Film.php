<?php
header("Access-Control-Allow-Origin:*");
$name="Film.JSON";
echo file_get_contents($name);
?>