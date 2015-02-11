'use strict';

/**
 * @ngdoc function
 * @name gmapStylistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gmapStylistApp
 */
angular.module('gmapStylistApp')

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyB7YXoHGTXoXMqZfXojJKU_8trH8Go_gH4',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
  });
})


.controller('MainCtrl', function ($scope, $modal, uiGmapGoogleMapApi) {





$scope.basemaplayers =[];

$scope.clearStyle = function (StyleToClear, key, state) {
	if(!state) {
		delete StyleToClear[key];
	}
};


$scope.removeLayer = function (index) {
	$scope.map.options.styles.splice(index, 1);
};



$scope.addLayer = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'views/layersModal.tpl',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {

	    var newLayer = {
	    	featureType: selectedItem.featureType,
	    	elementType: selectedItem.elementType,
			stylers:[]	    	
	    };      
	    $scope.map.options.styles.push(newLayer);

    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  };


$scope.testFunction = function() {


    $scope.map.control.getGMap().setOptions({styles: $scope.map.options.styles});
    return;
};


// uiGmapGoogleMapApi is a promise.
// The "then" callback function provides the google.maps object.
uiGmapGoogleMapApi.then(function(maps) {

$scope.map = {
center: {
latitude: 51.47732,
longitude: -0.00037
},
options: {
maxZoom: 20,
minZoom: 3,
styles: []
},
zoom: 5,
control: {}
};

});



   $scope.$watch('map.options.styles', function(newVal, oldVal) {
   			
   			//console.log(newVal, oldVal);
           //$scope.map.control.getGMap().setOptions({styles: $scope.map.options.styles});
    		//return;
   });



  });

//--------------------------------------------------------------------------------
// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('gmapStylistApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {


//------------------------------------------------------------



$scope.FeatureTypes = [
			{label:'All', value:'all'},
			{label:'Administrative', value:'administrative', Level1: [

					{label:'Country', value:'country'},
					{label:'Province', value:'province'},
					{label:'Locality', value:'locality'},
					{label:'Neighborhood', value:'neighborhood'},
					{label:'Land parcel', value:'land_parcel'}
			]},

			{label:'Landscape', value:'landscape' , Level1: [

				{label:'Man made', value:'man_made'},
				{label:'Natural', value:'natural', Level2: [

							{label:'Land cover', value:'landcover'},
							{label:'Terrain', value:'terrain'}

				]}
			]},

			{label:'Point of interest', value:'poi', Level1:[

					{label:'Attraction', value:'attraction'},
					{label:'Business', value:'business'},
					{label:'Government', value:'government'},
					{label:'Medical', value:'medical'},
					{label:'Park', value:'park'},
					{label:'Place of worship', value:'place_of_worship'},
					{label:'School', value:'school'},
					{label:'Sports complex', value:'sports_complex'}
			]},

			{label:'Road', value:'road', Level1:[
					{label:'Highway', value:'highway', Level2: [
							{label:'Controlled access', value:'controlled_access'}
					]},					
					{label:'Arterial', value:'arterial'},
					{label:'Local', value:'local'}
			]}, 

			{label:'Transit', value:'transit', Level1 :[

					{label:'Line', value:'line'},
					{label:'Station', value:'station', Level2: [
							{label:'Airport', value:'airport'},
							{label:'Bus', value:'bus'},
							{label:'Rail', value:'rail'}
					]}
			]},
			{label:'Water', value:'water', Level1:[]}


	];

$scope.selectedFeatureType = {Level0: $scope.FeatureTypes[0], Level1:'', Level2:''};

//------------------------------------------------------------

$scope.ElementTypes = [
	{label:'All', value:'all'},
	{label:'Geometry', value:'geometry', Level1 :[
				{label:'Fill', value:'fill'},
				{label:'Stroke', value:'stroke'}
	]},
	{label:'Labels', value:'labels', Level1 :[

				{label:'Text', value:'text', Level2: [
						{label:'Fill', value:'fill'},
						{label:'Stroke', value:'stroke'}
				]},
				{label:'Icon', value:'icon'}
	]}
];

$scope.selectedElementType = {Level0: $scope.ElementTypes[0], Level1:'', Level2:''};

//------------------------------------------------------------

$scope.featureType="all";
$scope.elementType="all";


$scope.selectAction = function(selType,selNum) {

	if(selType === 1) {

		switch(selNum) {
			case 1:
				$scope.selectedFeatureType.Level1 = '';
				$scope.selectedFeatureType.Level2 = '';
				$scope.featureType = $scope.selectedFeatureType.Level0.value;
				break;

			case 2:
				$scope.selectedFeatureType.Level2 = '';
				$scope.featureType = $scope.selectedFeatureType.Level0.value + '.' + $scope.selectedFeatureType.Level1.value;
				break;

			case 3:
				$scope.featureType = $scope.selectedFeatureType.Level0.value + '.' + $scope.selectedFeatureType.Level1.value + '.' + $scope.selectedFeatureType.Level2.value;
				break;

		}

	}

	if(selType === 2) {

		switch(selNum) {
			case 1:
				$scope.selectedElementType.Level1 = '';
				$scope.selectedElementType.Level2 = '';
				$scope.elementType = $scope.selectedElementType.Level0.value;
				break;

			case 2:
				$scope.selectedElementType.Level2 = '';
				$scope.elementType = $scope.selectedElementType.Level0.value + '.' + $scope.selectedElementType.Level1.value;
				break;

			case 3:

				$scope.elementType = $scope.selectedElementType.Level0.value + '.' + $scope.selectedElementType.Level1.value + '.' + $scope.selectedElementType.Level2.value;
				break;
		}

	}

};

  $scope.ok = function () {
  	$modalInstance.close({featureType: $scope.featureType,elementType: $scope.elementType});
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});