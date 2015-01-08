angular.module('starter.controllers', [])

//---------------------
// Controllers
//----------------------------------------------------------------------------------------------
.controller('HomeCtrl', function($scope) {
  //Use this function to trigger links to open in browser
  this.GotoLink = function (url) {
    window.open(url,'_system');
  };

  //If the file already exists in local storage, use it
  $scope.localJSON = function(){
    //Try to load from local storage on page load
    console.log('localJSON: Initial page load');
    $scope.localCurrentIssueJSON = JSON.parse(window.localStorage['localCurrentIssue'] || '{}');
  };

  //Automatically load local JSON data on page load
  $scope.localJSON();

})

.controller('CurrentIssueCtrl', function($scope, $http, $localstorage, JSONPService) {
      //Global variable for testing
      $scope.devMode = false;
      
  //If the file already exists in local storage, use it
  $scope.localJSON = function(){
    //Try to load from local storage on page load
    console.log('localJSON: Initial page load');
    $scope.localCurrentIssueJSON = JSON.parse(window.localStorage['localCurrentIssue'] || '{}');

    //Automatically compare local JSON with server
    $scope.compareJSON();
  };

  //Load JSON file from remote server and save to local storage
  $scope.getJSONP = function() {

    //HTTP Get with JSONP callback
    JSONPService.getJSONP()

        .then(function (response) {
          //Save response to local storage as a string (can't save objects)
          console.log('getJSONP: Save JSONP to local storage');
          window.localStorage['localCurrentIssue'] = JSON.stringify(response.data);

          //Parse local storage string as JSON
          $scope.localCurrentIssueJSON = JSON.parse(window.localStorage['localCurrentIssue'] || '{}');
        });

    //Download latest cover image
    $scope.localFileInfo = {
        remoteFolder: 'images/cover',
        remoteFileName: 'cover.jpg',
        filePath: 'OMD/currentIssue/img',
        fileName: 'cover.jpg'
      };

    //FileService.downloadFile($scope.localFileInfo)
    //
    //.then(function (response) {
    //  console.log('dynamic cover image file successfully downloaded!');
    //  $scope.localImgFile = response;
    //});

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

        if ($scope.localCurrentIssueJSON[0].issueDate < $scope.serverLatestJSON[0].issueDate || $scope.devMode === true) {
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

.controller('CurrentIssueArticleCtrl', function($scope, $http, $stateParams, $ionicModal, $filter, FileService) {
  //Pass article URL data to the ng-include for currentIssue-article.html
  $scope.articleData = $stateParams;

  //Save Article to local storage
  $scope.saveArticle = function(){
    console.log('saveArticle started...');
    //Parse local saved articles JSON - create empty array if file doesn't exist
    $scope.localSavedArticlesJSON = JSON.parse(window.localStorage['localSavedArticles'] || '{}');
    //Get Current Issue metaData array and this article array
    $scope.localCurrentIssueJSON = JSON.parse(window.localStorage['localCurrentIssue'] || '{}');

    $scope.filteredArticleArray = $filter('filter')($scope.localCurrentIssueJSON, $scope.localCurrentIssueJSON.articleID = $scope.articleData.articleID);
    if ($scope.filteredArticleArray[0].articleID) {
      $scope.articleData.isDownloaded = true;
      //push isDownloaded = true in localCurrentIssueJSON[i] where articleID=$scope.articleData.articleID
      angular.forEach($scope.localCurrentIssueJSON, function(u, i){
        if (u.articleID === $scope.articleData.articleID){
          //save file to local storage and update JSON config isDownloaded value
          //Set the value
          $scope.localCurrentIssueJSON[i].isDownloaded = true;
          //Save updated JSON file to localStorage
          window.localStorage['localCurrentIssue'] = JSON.stringify($scope.localCurrentIssueJSON);
          //Save the .html file to file system
          //$scope.localFileInfo = {
          //  remoteFolder: 'archive',
          //  remoteFileName: $scope.articleData.fileName,
          //  filePath: 'OMD/savedArticles/'+$scope.articleData.year+'/'+$scope.articleData.month+'/',
          //  fileName: $scope.articleData.fileName
          //};
          //
          //FileService.downloadFile($scope.localFileInfo)
          //    .then(function () {
          //      console.log('file successfully downloaded!');
          //    });
        }
      });
      //Check if any article with same issueDate has already been saved - aka, issueDate exists in savedArticle issueDates
      $scope.firstSaveCurrentMonth = true;
      angular.forEach($scope.localSavedArticlesJSON[0].issueDates, function(u, i){
        if ($scope.localCurrentIssueJSON[0].issueDate === u) {
          $scope.firstSaveCurrentMonth = false;
        };
      });
      if ($scope.firstSaveCurrentMonth) {
        //First save from issue, save issueDate to savedArticle issueDates array
        $scope.localSavedArticlesJSON[0].issueDates.push($scope.localCurrentIssueJSON[0].issueDate);
        $scope.localSavedArticlesJSON[0].formattedDates.push($scope.localCurrentIssueJSON[0].issueMonth+', '+$scope.localCurrentIssueJSON[0].issueYear);
      };
      //Check to see if article with same ID already exists in savedArticlesJSON, if not, concat array
      $scope.newSavedarticle = true;
      angular.forEach($scope.localSavedArticlesJSON, function(u, i){
        if ($scope.filteredArticleArray.articleID = u.articleID) {
          $scope.alreadySavedarticle = false;
        };
      });
      if ($scope.newSavedarticle) {
        //Add filteredArticleArray to local savedArticle array, then save full array to localStorage
        //First add issueDate/month/year from localCurrentIssueJSON into filteredArticleArray
        $scope.filteredArticleArray[0]["issueDate"] = $scope.localCurrentIssueJSON[0].issueDate;
        $scope.filteredArticleArray[0]["issueMonth"] = $scope.localCurrentIssueJSON[0].issueMonth;
        $scope.filteredArticleArray[0]["issueYear"] = $scope.localCurrentIssueJSON[0].issueYear;

        $scope.localSavedArticlesJSON = $scope.localSavedArticlesJSON.concat($scope.filteredArticleArray);
        window.localStorage['localSavedArticles'] = JSON.stringify($scope.localSavedArticlesJSON);
        console.log('Filtered Array - '+JSON.stringify($scope.localSavedArticlesJSON));
      };

    }
  };

  //Use this function to trigger links to open in browser
  $scope.GotoLink = function (url) {
    window.open(url,'_system');
  };

  // Form data for the login modal
  $scope.interAdData = {};
  // Create the modal that we will use later
  $ionicModal.fromTemplateUrl('templates/interAd-modal.html', {
    scope: $scope })
    .then(function(modal) {
      //Display the modal
      $scope.modal = modal;
      //If internet connection is available - show ad
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

.controller('SavedArticlesCtrl', function($scope) {
      var loadSampleArticleData =
          [
            {
              "issueDates"    : ["201403", "201411", "201412"],
              "formattedDates": ["March, 2014", "November, 2014", "December, 2014"]
            },
            {
              "title"         :"DME drugs multiply",
              "author"        :"By Veeral S. Sheth, MD, MBA, FACS and Seenu M. Hariprasad, MD",
              "subTitle"      :"Two new steroid implants offer two-pronged attack, durability.",
              "issueDate"     :"201411",
              "issueMonth"    :"November",
              "issueYear"     :"2014",
              "fileName"      :"OMD_November_A04.html"
            },
            {
              "title"         :"Diabetes, the eye, and the treatment of both",
              "author"        :"By Erik Florida, Contributing Editor",
              "subTitle"      :"Diabetic eye disease creates a major challenge in the development of vision-sustaining drugs.",
              "issueDate"     :"201411",
              "issueMonth"    :"November",
              "issueYear"     :"2014",
              "fileName"      :"OMD_November_A05.html"
            },
            {
              "title"         :"Which DME patients are right for surgery?",
              "author"        :"By Apurva Patel, MD",
              "subTitle"      :"Despite an expanding formulary to treat diabetic macular edema, some patients\' singular situations call for a surgical approach.",
              "issueDate"     :"201412",
              "issueMonth"    :"December",
              "issueYear"     :"2014",
              "fileName"      :"OMD_November_A06.html"
            },
            {
              "title"         :"A photographer\'s perspective on DME imaging",
              "author"        :"By Bill Kekevian, Senior Associate Editor",
              "subTitle"      :"While some practices rely solely on OCT, others continue to depend on fluorescein angiography.",
              "issueDate"     :"201403",
              "issueMonth"    :"March",
              "issueYear"     :"2014",
              "fileName"      :"OMD_November_A07.html"
            }];
  //window.localStorage['localSavedArticles'] = JSON.stringify(loadSampleArticleData);
  //Load saved articles json from local Storage, or create new empty array
  $scope.localSavedArticlesJSON = JSON.parse(window.localStorage['localSavedArticles'] || '{}');
  //console.log('From Local Storage - '+JSON.stringify($scope.localSavedArticlesJSON));
  //$scope.sortedDates = {};
  //angular.forEach($scope.localSavedArticlesJSON[0].issueDates, function(currentDate, i){
  //  //for each $scope.localSavedArticlesJSON where u = u2, add to currentMonth array
  //  angular.forEach($scope.localSavedArticlesJSON, function(articleDate, ii){
  //    if (articleDate.issueDate == currentDate) {
  //      var thisDate = articleDate.issueMonth+', '+articleDate.issueYear;
  //      $scope.sortedDates.push(thisDate);
  //      $scope.articleSets = $scope.articleSets.concat($scope.localSavedArticlesJSON[ii]);
  //    }
  //  });
  //  console.log('sortedDates: '+$scope.sortedDates);
  //  console.log('articleSets: '+JSON.parse($scope.articleSets));
  //});


  //Use this function to trigger links to open in browser
  $scope.GotoLink = function (url) {
    window.open(url,'_system');
  };

})

.controller('SettingsCtrl', function($scope, $ionicPopup, $timeout) {
  //Check registration status and set checkbox
  //$scope.pushRegistration = true;
  //Confirm registration status and update checkbox

  // Call this to get push token if it is available
  //PushNotification.prototype.getPushToken = function (success) {
  //  $scope.pushRegistration = true;
  //};

  // Triggered on a button click, or some other target
  $scope.showPopup = function() {
    $scope.data = {}

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="password" ng-model="data.wifi">',
      title: 'Enter Wi-Fi Password',
      subTitle: 'Please use normal things',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.wifi) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return $scope.data.wifi;
            }
          }
        }
      ]
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 3000);
  };
  // A confirm dialog
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete All Articles',
      template: 'Are you sure you want to delete all articles? This cannot be undone.'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('I am sure');
        //delete all local files from article folder
      } else {
        console.log('Cancel, do not delete');
      }
    });
  };
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

.controller('ExternalLinkCtrl', function($scope) {

  $scope.GotoLink = function (url) {
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