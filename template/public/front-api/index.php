<?php
$url = 'https://www.abrecultura.com/';
$folderPath = '../version/';
$versionFolder = '1571338986';

echo json_encode([
	'chunk-vendors-js' => $url.'version/'.$versionFolder.'/js/chunk-vendors.js',
	'app-js' => $url.'version/'.$versionFolder.'/js/app.js',
	'app-css' => $url.'version/'.$versionFolder.'/css/app.css',
]);
