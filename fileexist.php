<?php

$str_UniqueName=date("Y-m-d-H-i-s");                  

$str_path_server=$_SERVER['DOCUMENT_ROOT'];      
$folderpath_designInstance=$str_path_server."/xdesign";

$folderpath_projectInstance=$folderpath_designInstance."/AFrame";
//$folderpath_projectInstance.="/".$str_UniqueName;


$folderpath_projectDestination=$str_path_server."/MyProject";            
$filename_xdesignIndex="index.html";           

$str_path_folder=$folderpath_projectInstance;

echo("str_path_server: ".$str_path_server."<br>");
echo("folderpath_designInstance: ".$folderpath_designInstance."<br>");
echo("folderpath_projectInstance: ".$folderpath_projectInstance."<br>");
echo("folderpath_projectDestination: ".$folderpath_projectDestination."<br>");
echo("filename_xdesignIndex: ".$filename_xdesignIndex."<br>");

echo("str_path_folder: ".$str_path_folder."<br>");

$bln_fileexist=file_exists($str_path_folder);        
echo("bln_fileexist: ".$bln_fileexist."<br>");
if(!$bln_fileexist){                          
    echo("path does not exist"."<br>"); 
    mkdir($str_path_folder, 0777, true);
}
else{
    echo("path does exist"."<br>"); 
    $str_url=path2url($str_path_folder);
    echo("str_url: ".$str_url."<br>"); 

}


function path2url($file, $Protocol='http://') {
    return $Protocol.$_SERVER['HTTP_HOST'].str_replace($_SERVER['DOCUMENT_ROOT'], '', $file);
}

?>