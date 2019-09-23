<?php
function fetchJson($envUrls, $slug, $env){
    return file_get_contents($envUrls[$env].$slug.'.json');
}

function getData($json){
    $json = json_decode($json);
    return $json->data;
}

function getSlug($defaultSlug, $folderPath){
    $req_uri = explode('?', $_SERVER['REQUEST_URI'], 2)[0];
    $req_uri_without_folder = substr($req_uri, strlen($folderPath));

    $slug = explode('/', $req_uri_without_folder, 2)[0];
    if(
       strlen($slug) == 0 || 
       $slug == 'combo' || 
       $slug == 'producto'
    ) $slug = $defaultSlug;

    return $slug;
}

function getEnvVar(){
    $env = 0;
    if(
        isset($_GET['env']) && 
        is_numeric($_GET['env']) && 
        $_GET['env'] > -1 &&
        $_GET['env'] < count($envUrls)
    ) $env = $_GET['env'];
    return $env;
}
?>