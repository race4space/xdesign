<?php

$str_path_server=$_SERVER['DOCUMENT_ROOT'];      
$folderpath_designInstance=$str_path_server."/xdesign";
$folderpath_projectInstance=$folderpath_designInstance."/AFrame";
$folderpath_projectDestination=$str_path_server."/MyProject";            
$filename_xdesignIndex="index.html";           

$str_path_folder=$folderpath_projectInstance;

echo("str_path_server: ".$str_path_server."<br>");
echo("folderpath_designInstance: ".$folderpath_designInstance."<br>");
echo("folderpath_projectInstance: ".$folderpath_projectInstance."<br>");
echo("folderpath_projectDestination: ".$folderpath_projectDestination."<br>");
echo("filename_xdesignIndex: ".$filename_xdesignIndex."<br>");

$bln_fileexist=file_exists($str_path_folder);        

echo("bln_fileexist: ".$bln_fileexist."<br>");

if(!$bln_fileexist){                          
    echo("path does not exist"."<br>");
}

?>