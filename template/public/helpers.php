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

function getFilesInFolder($folder, $extension, $ignore = []){
    $ignoreFiles = [];
    foreach ($ignore as $value) array_push($ignoreFiles, $folder.$value);
    return array_diff(glob($folder.'/*.'.$extension), $ignoreFiles);
}

function getEnvVar($envUrls){
    $env = 0;
    if(
        isset($_GET['env']) && 
        is_numeric($_GET['env']) && 
        $_GET['env'] > -1 &&
        $_GET['env'] < count($envUrls)
    ) $env = $_GET['env'];
    return $env;
}

function printCsv($data){
    /*header("Content-Description: File Transfer"); 
    header("Content-Disposition: attachment; filename=export.csv"); 
    header("Content-Type: application/csv;");*/

    $productos = array();
    foreach ($data->productos as $key => $value) {
        array_push(
        	$productos, 
        	formatProductData(
        		$value,
        		'https://'.$data->template->tienda_url.'/'.$data->tienda_slug.'/producto/'.$value->slug,
        		'product'
        	)
    	);
    }

    $combos = array();
    foreach ($data->combos as $key => $value) {
        array_push(
        	$combos, 
        	formatProductData(
        		$value,
        		'https://'.$data->template->tienda_url.'/'.$data->tienda_slug.'/combo/'.$value->slug,
        		'bundle'
        	)
    	);
    }

    $header = ['id', 'title', 'description', 'availability', 'condition', 'price', 'link', 'image_link', 'brand'];

    $file = fopen('php://output', 'w');
   
    fputcsv($file, $header);
    foreach ($productos as $key => $value) fputcsv($file, $value);
    foreach ($combos as $key => $value) fputcsv($file, $value);

    fclose($file);

    die();
}

function getStock($value, $type){
	switch ($type) {
		case 'product':
			$articles = $value->articulos;
			foreach ($articles as $key => $value) return $value->stock > 0 ? 'in stock' : 'out of stock';
			break;
		
		case 'bundle':
			$products = $value->productos;
			$articles = array();
			foreach ($products as $key => $val) 
				array_push($articles, $val->articulos);

			foreach ($articles as $key => $val) 
				foreach ($val as $key => $art) 
					if ($art->stock <= 0) return 'out of stock';

			return 'in stock';
	}

	return null;
}

function formatProductData($value, $url, $type){
	return [
        intval($value->id.($type == 'bundle' ? '20' : '')),
        ctype_upper($value->name) ? strtolower(ucfirst($value->name)) : $value->name,
        strip_tags($value->description),
        getStock($value, $type),
        'new',
        $value->price,
        $url,
        getImageLink($value),
        'ABRE'
    ];
}

function getImageLink($product){
    $media;

    if(count($product->media) == 0) return null;

    foreach ($product->media as $key => $value) {
        if($value->primary_media) $media = $value->url;
    }

    if($media) return $media;

    return $product->media[0]->url;
}
?>