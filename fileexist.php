<?php

$str_path_server=$_SERVER['DOCUMENT_ROOT'];
$str_path_design=$str_path_server."/xdesign";
$str_path_folder=$str_path_design."/AFrame";

echo("str_path_server: ".$str_path_server."<br>");
echo("str_path_design: ".$str_path_design."<br>");
echo("str_path_folder: ".$str_path_folder."<br>");

$bln_fileexist=file_exists($str_path_folder);        

echo("bln_fileexist: ".$bln_fileexist."<br>");

if(!$bln_fileexist){                          
    echo("path does not exist"."<br>");
}

?>