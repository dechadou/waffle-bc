<?php
    $folderPath = '/samurai-de-ensaladas/';
    $defaultSlug = 'samurai-de-ensaladas';

    $envUrls = [
        'https://abrecultura.s3.amazonaws.com/storage/prod/', 
        'https://abrecultura-dev.s3.amazonaws.com/storage/staging/', 
        'https://abrecultura-dev.s3.amazonaws.com/storage/dev/'
    ];

    $env = 0;
    if(
        isset($_GET['env']) && 
        is_numeric($_GET['env']) && 
        $_GET['env'] > -1 &&
        $_GET['env'] < count($envUrls)
    ) $env = $_GET['env'];

    $req_uri = explode('?', $_SERVER['REQUEST_URI'], 2)[0];
    $req_uri_without_folder = substr($req_uri, strlen($folderPath));

    $slug = explode('/', $req_uri_without_folder, 2)[0];
    if(
       strlen($slug) == 0 || 
       $slug == 'combo' || 
       $slug == 'producto'
    ) $slug = $defaultSlug;
    

    $json_file_url = $envUrls[$env].$slug.'.json';
    $json_file = file_get_contents($json_file_url);
    $json = json_decode($json_file);
    $data = $json->data;
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,shrink-to-fit=no">

    <link href=<?= $folderPath ?>js/StoreProductPage.js rel=prefetch>
    <link href=<?= $folderPath ?>css/app.css rel=preload as=style>
    <link href=<?= $folderPath ?>js/app.js rel=preload as=script>
    <link href=<?= $folderPath ?>js/chunk-vendors.js rel=preload as=script>

    <link href=<?= $folderPath ?>css/app.css rel=stylesheet>

    <link rel="author" href="<?=$data->template->tienda_url;?>">
    <link rel="canonical" href="<?=$data->template->tienda_url;?>">
    <link rel="icon" type="image/png" href="favicon.png">
    <meta property="fb:app_id" content="">
    <meta property="og:url" content="<?=$data->template->tienda_url;?>">
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?=$data->template->open_graph_title;?>">
    <meta property="og:image" content="<?=$data->template->open_graph_image;?>">
    <meta property="og:description" content="<?=$data->template->open_graph_description;?>">
    <meta property="twitter:title" content="<?=$data->template->open_graph_title;?>">
    <meta property="twitter:description" content="<?=$data->template->open_graph_description;?>">
    <meta property="twitter:image" content="<?=$data->template->open_graph_image;?>">
    
    <meta name=theme-color content=#4D4D4D>
    <link rel=manifest href=<?= $folderPath ?>manifest.json>

    <title><?=$data->template->open_graph_title;?></title>
    <script>
    	console.log('<?=$json_file_url?>');
        var $storeData = <?=$json_file?>;
        // enable to override webpacks publicPath
        // var webpackPublicPath = '/';
    </script>
</head>

<body>
    <div id="app"></div>
    <script src=<?= $folderPath ?>js/chunk-vendors.js></script>
    <script src=<?= $folderPath ?>js/app.js></script>
</body>

</html>