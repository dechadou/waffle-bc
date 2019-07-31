<?php
    include 'helpers.php';

    $folderPath = '/samurai/';
    $defaultSlug = 'samurai-de-ensaladas';

    $envUrls = [
        'https://abrecultura.s3.amazonaws.com/storage/prod/', 
        'https://abrecultura-dev.s3.amazonaws.com/storage/staging/', 
        'https://abrecultura-dev.s3.amazonaws.com/storage/dev/'
    ];

    $cssChunks = getFilesInFolder('css', 'css', ['app.css']);
    $jsChunks =  getFilesInFolder('js', 'js', ['js/app.js', 'js/chunk-vendors.js']);
    $json = fetchJson($envUrls, getSlug($defaultSlug, $folderPath), getEnvVar());
    $data = getData($json);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5,shrink-to-fit=no">
    <?php foreach($cssChunks as $chunk): ?>
    <link href=<?= $folderPath ?><?= $chunk ?> rel=prefetch>
    <?php endforeach; ?>
    <?php foreach($jsChunks as $chunk): ?>
    <link href=<?= $folderPath ?><?= $chunk ?> rel=prefetch>
    <?php endforeach; ?>
    <link href=<?= $folderPath ?>css/app.css rel=preload as=style>
    <link href=<?= $folderPath ?>js/app.js rel=preload as=script>
    <link href=<?= $folderPath ?>js/chunk-vendors.js rel=preload as=script>
    <link href=<?= $folderPath ?>css/app.css rel=stylesheet>
    <link rel="author" href="<?="https://{$_SERVER['HTTP_HOST']}"?>">
    <link rel="canonical" href="<?="https://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}"?>">
    <link rel="icon" type="image/png" href="<?="https://{$_SERVER['HTTP_HOST']}"?>/favicon.png">
    <meta name="description" content="<?=$data->template->open_graph_description;?>">
    <meta property="fb:app_id" content="1926125074305840">
    <meta property="og:url" content="<?="https://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}"?>">
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?=$data->template->open_graph_title;?>">
    <meta property="og:image" content="<?=$data->template->open_graph_image;?>">
    <meta property="og:description" content="<?=$data->template->open_graph_description;?>">
    <meta property="twitter:title" content="<?=$data->template->open_graph_title;?>">
    <meta property="twitter:description" content="<?=$data->template->open_graph_description;?>">
    <meta property="twitter:image" content="<?=$data->template->open_graph_image;?>">
    <meta name=theme-color content=#1D1D1B>
    <link rel=manifest href=<?= $folderPath ?>manifest.json>

    <title><?=$data->template->open_graph_title;?></title>
    <script>
        var $storeData = <?=$json?>;
        var $defaultSlug = '<?=$defaultSlug?>';
        // var webpackPublicPath = '/';
    </script>
</head>
<body>
    <noscript><strong>Este sitio necesita de Javascript para funcionar. Por favor activalo para continuar.</strong></noscript>
    <div id="app"></div>
    <script src=<?= $folderPath ?>js/chunk-vendors.js></script>
    <script src=<?= $folderPath ?>js/app.js></script>
</body>
</html>