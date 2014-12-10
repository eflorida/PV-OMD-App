angular.module('starter.controllers', [])


//---------------------
// Controllers
//----------------------------------------------------------------------------------------------
.controller('CurrentIssueCtrl', function($scope, $http, $localstorage, $ionicLoading, JSONPService, FileService) {

  //If the file already exists in local storage, use it
  $scope.localJSON = function(){
    //Try to load from local storage on page load
    console.log('localJSON: Initial page load');
    $scope.localCurrentIssueJSON = JSON.parse(window.localStorage['localCurrentIssue'] || '{}');

    //Automatically compare local JSON with server
    $scope.compareJSON();
  };

  //Load JSON file from remote server and save to local storage
  $scope.getJSONP = function(){

    //HTTP Get with JSONP callback
    JSONPService.getJSONP()

    .then(function (response) {
      //Save response to local storage as a string (can't save objects)
      console.log('getJSONP: Save JSONP to local storage');
      window.localStorage['localCurrentIssue'] = JSON.stringify(response.data);

      //Parse local storage string as JSON
      $scope.localCurrentIssueJSON = JSON.parse(window.localStorage['localCurrentIssue'] || '{}');

      //Download related article files
      //FileManagerService.getFiles($scope.localCurrentIssueJSON.fileLocation);
    });

    //Download latest cover image
    FileService.downloadFile()

    .then(function (response) {
      console.log('file successfully downloaded!');
      $scope.localImgFile = response;
    });

  };

  //Get JSONP from remote server, compare date with local storage version, add download
  //button if newer
  $scope.compareJSON = function(){
    if ($scope.localCurrentIssueJSON[0] === undefined) {
      //There is no local file, so must get remote JSONP
      console.log('compareJSON: local issueDate undefined, get remote, nothing to compare')
      //HTTP Get with JSONP callback
      JSONPService.getJSONP()

      .then(function (response) {
        //Save response to local storage as a string (can't save objects)
        console.log('compare->getJSONP: Save JSONP to local storage');
        window.localStorage['localCurrentIssue'] = JSON.stringify(response.data);

        //Parse local storage string as JSON
        $scope.localCurrentIssueJSON = JSON.parse(window.localStorage['localCurrentIssue'] || '{}');
      });
    } else {
      //HTTP Get with JSONP callback
      JSONPService.getJSONP()

      .then(function (response) {
        //Save response to variable for comparing to local storage version
        $scope.serverLatestJSON = response.data;
        console.log('serverJSON=>'+$scope.serverLatestJSON[0].issueDate);
        console.log('localJSON=>'+$scope.localCurrentIssueJSON[0].issueDate);

        if ($scope.localCurrentIssueJSON[0].issueDate < $scope.serverLatestJSON[0].issueDate) {
          //The server file is newer, update isLatest value to reveal download button
          console.log('Update isLatest to false');
          $scope.localCurrentIssueJSON[0].isLatest = false;
        } else {
          console.log('Local JSON IS the latest, isLatest remains true');
        };
      });
    };
  };

  //Automatically load local JSON data on page load
  $scope.localJSON();

})

.controller('CurrentIssueArticleCtrl', function($scope, $http, $stateParams, $ionicModal, $timeout) {
  //Pass article URL data to the ng-include for currentIssue-article.html
  $scope.articleData = $stateParams;
  
  this.GotoLink = function (url) {
    window.open(url,'_system');
  }

  // Form data for the login modal
  $scope.interAdData = {};

  // Create the modal that we will use later
  $ionicModal.fromTemplateUrl('templates/interAd-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.showInterAd();
  });

  // Triggered in the modal to close it
  $scope.closeInterAd = function() {
    $scope.modal.hide();
  };

  // Open the settings modal
  $scope.showInterAd = function() {
    $scope.modal.show();
  };

})

.controller('NewslettersCtrl', function($scope, $http) {

})

// Action-Based Controllers - services?
//--------------------------------------
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.settingsData = {};

  // Create the modal that we will use later
  $ionicModal.fromTemplateUrl('templates/settings.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the modal to close it
  $scope.closeSettings = function() {
    $scope.modal.hide();
  };

  // Open the settings modal
  $scope.showSettings = function() {
    $scope.modal.show();
  };

})

.controller('InterAdModalCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.interAdData = {};

  // Create the modal that we will use later
  $ionicModal.fromTemplateUrl('templates/interAd-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.showInterAd();
  });

  // Triggered in the modal to close it
  $scope.closeInterAd = function() {
    $scope.modal.hide();
  };

  // Open the settings modal
  $scope.showInterAd = function() {
    $scope.modal.show();
  };

})

.controller('ExternalLinkCtrl', function() {
  this.GotoLink = function (url) {
    window.open(url,'_system');

    //How to use in app:
    //ng-click="GotoLink('http://ui.technotects.com/lnc/')"

    /*
    //Twitter checker
    // If Mac//

    var twitterCheck = function(){

    appAvailability.check('facebook://', function(availability) {
        // availability is either true or false
        if(availability) { window.open('facebook://facebook.com/newod', '_system', 'location=no');}
        else{window.open(url, '_system', 'location=no'); };
    });
    };

    //If Android

    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

    if(isAndroid) {

    twitterCheck = function(){    

    appAvailability.check('com.facebook.android', function(availability) {
        // availability is either true or false
        if(availability) {window.open('facebook://facebook.com/newod', '_system', 'location=no');}
        else{window.open(url, '_system', 'location=no');};
    });
    };
    };
    */
  }

});