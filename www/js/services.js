angular.module('starter.services', [])

//---------------------
// Factories
//----------------------------------------------------------------------------------------------
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('$savedArticles', ['$http', function($http) {
  
}])


//---------------------
// Services
//----------------------------------------------------------------------------------------------
.service('JSONPService', function($http){        
  return {
    getJSONP: function() {
      //Pass in filename variable to make service generic
      return $http.jsonp('http://www.erikflorida.com/pv/index.php?callback=JSON_CALLBACK');
      //function JSON_CALLBACK(data) {
        //console.log ("JSONP data = " + data);
      //};
        //$http.jsonp('http://erikflorida.com/pv/callback.json?callback=JSON_CALLBACK');
      
      //return $http.jsonp('http://www.ophthalmologymanagement.com/content/issueconfigfile/currentissue.js?callback=JSON_CALLBACK');
    }
  };
})

.service('FileService', function($ionicLoading) {
  return {
    downloadFile: function() {

      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
          fs.root.getDirectory(
              "OMD/currentIssue/img",
              {
                  create: true
              },
              function(dirEntry) {
                  dirEntry.getFile(
                      "cover.jpg", 
                      {
                          create: true, 
                          exclusive: false
                      }, 
                      function gotFileEntry(fe) {
                          var p = fe.toURL();
                          fe.remove();
                          ft = new FileTransfer();
                          ft.download(
                              encodeURI("http://www.ophthalmologymanagement.com/content/images/cover/cover.jpg"),
                              p,
                              function(entry) {
                                  alert('cover image load success!');
                                  $scope.imgFile = entry.toURL();
                                  return ($scope.imgFile);
                              },
                              function(error) {
                                  alert("Download Error Source -> " + error.source);
                              },
                              false,
                              null
                          );
                      }, 
                      function() {
                          console.log("Get file failed");
                      }
                  );
              }
          );
      });
    },
    loadFile: function() {

      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
          fs.root.getDirectory(
              "OMD/currentIssue/img",
              {
                  create: false
              },
              function(dirEntry) {
                  dirEntry.getFile(
                      "cover.jpg", 
                      {
                          create: false, 
                          exclusive: false
                      }, 
                      function gotFileEntry(fe) {
                          $ionicLoading.hide();
                          return fe.toURL();
                      }, 
                      function(error) {
                          $ionicLoading.hide();
                          console.log("Error getting file");
                      }
                  );
              }
          );
      });
    }
  };
 
});

//---------------------
// Directives
//----------------------------------------------------------------------------------------------

