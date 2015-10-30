var app = angular
	.module('deprecatedWebApp', ['ngMaterial', 'ngAnimate', 'ngMdIcons'])
	.config(function($mdThemingProvider) {
  		$mdThemingProvider.theme('default')
    		.primaryPalette('teal')
    		.accentPalette('orange');
		}
	).config(function($mdDateLocaleProvider) {
    	$mdDateLocaleProvider.formatDate = function(date) {
        	return moment(date).format('YYYY/MM/DD');
    	};
	});