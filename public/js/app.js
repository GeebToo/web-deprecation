var app = angular
	.module('deprecatedWebApp', ['ngMaterial', 'ngAnimate', 'ngMdIcons'])
	.config(function($mdThemingProvider) {
  		$mdThemingProvider.theme('default')
    		.primaryPalette('teal')
    		.accentPalette('orange');
		}
	);