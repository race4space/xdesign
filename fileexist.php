<?php

$str_path_server=$_SERVER['DOCUMENT_ROOT'];
$str_path_folder=$str_path_server."/xdesign";

echo("str_path_server: ".$str_path_server."<br>");
echo("str_path_folder: ".$str_path_folder."<br>");

$bln_fileexist=file_exists($str_path_folder);        

echo("bln_fileexist: ".$bln_fileexist."<br>");

?>