<?php
    error_reporting(0);
    include 'helpers.php';

    $folderPath = '/';
    $defaultSlug = 'abre';
    $frontApiUrl = 'https://www.abrecultura.com/front-api/';

    $envUrls = [
        'https://abrecultura.s3.amazonaws.com/storage/prod/', 
        'https://abrecultura-dev.s3.amazonaws.com/storage/staging/', 
        'https://abrecultura-dev.s3.amazonaws.com/storage/dev/'
    ];


    $files = json_decode(file_get_contents($frontApiUrl), true);

    $json = fetchJson($envUrls, getSlug($defaultSlug, $folderPath), getEnvVar($envUrls));

    if($json === false)
    {
      header("Location: https://www.abrecultura.com/");
      die();
    }

    $data = getData($json);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5,shrink-to-fit=no">
    <link rel="preconnect" href="https://abrecultura.s3.amazonaws.com" crossorigin>
    <link rel="preconnect" href="https://mate.abrecultura.com" crossorigin>
    <link href=<?= $files['app-css'] ?> rel=preload as=style>
    <link href=<?= $files['app-js'] ?> rel=preload as=script>
    <link href=<?= $files['chunk-vendors-js'] ?> rel=preload as=script>
    <link href=<?= $files['app-css'] ?> rel=stylesheet>
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

    <title><?=$data->template->open_graph_title;?></title>
    <script>
        var $storeData = <?=$json?>;
        var $defaultSlug = '<?=$defaultSlug?>';
        // var webpackPublicPath = '/';
    </script>
    <style>
    #loadingScreen {
      width: 100%;
      height: 100%;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
    }

    #loadingScreen svg {
      width: 50px;
      height: 50px;
      display: block;
      margin: 0 auto;
    }

    #loadingScreen .loadContainer {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }

    #loadingScreen img {
      max-width: 300px;
      margin-bottom: 20px;
    }

    #loadingScreen .spin {
      animation: fa-spin 2s infinite linear;
    }

    @keyframes fa-spin {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }

      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  </style>
</head>
<body>
    <div id="app"></div>
    <div id="loadingScreen">
      <noscript>
        <strong>Este sitio necesita de Javascript para funcionar. Por favor activalo para continuar.</strong>
      </noscript>
      <div class="loadContainer">
        <?php if(!empty($data->template->open_graph_title)): ?> <img src="<?=$data->template->etiqueta;?>"> <?php endif; ?>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="spin">
          <path d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z" />
        </svg>
      </div>
  </div>
    <script src="https://browser.sentry-cdn.com/5.6.3/bundle.min.js" integrity="sha384-/Cqa/8kaWn7emdqIBLk3AkFMAHBk0LObErtMhO+hr52CntkaurEnihPmqYj3uJho" crossorigin="anonymous"></script>
    <script type="text/javascript">
    	Sentry.init({ 
    		dsn: 'https://28289135d9014006aca44f6e12fd3f8e@sentry.io/1536222',
    		ignoreErrors: ['UnhandledRejection', 'strict mode'],
    	});
	</script>

    <script src=<?= $files['chunk-vendors-js'] ?>></script>
    <script src=<?= $files['app-js'] ?>></script>

    <script src="https://www.gstatic.com/firebasejs/6.3.5/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/6.3.3/firebase-performance.js"></script>
    <script>
	  if(typeof firebase !== 'undefined' && firebase){
	  	try{
	  		var firebaseConfig = {
	        apiKey: "AIzaSyCd_RRoR3DoGYz4gCL4Pp-PtuTCvNOD2qs",
	        authDomain: "waffle-e6985.firebaseapp.com",
	        databaseURL: "https://waffle-e6985.firebaseio.com",
	        projectId: "waffle-e6985",
	        storageBucket: "",
	        messagingSenderId: "183271898269",
	        appId: "1:183271898269:web:4fa35bb9bd9bbe9b"
	      };
	      firebase.initializeApp(firebaseConfig);
		  firebase.performance();
	  	}catch(err){
	      console.log(err);
	  	}
	  }
	  
    </script>
</body>
</html>