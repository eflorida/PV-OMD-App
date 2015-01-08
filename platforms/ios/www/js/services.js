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
            //testing sample data: $http.jsonp('http://www.erikflorida.com/pv/index.php?callback=JSON_CALLBACK');
            var url = 'http://www.ophthalmologymanagement.com/omd-currentissue.aspx?callback=JSON_CALLBACK';

            return $http.jsonp(url)
                .success(function(data){
                    console.log('AngularJS jsonp success');
                })
                .error(function(data) {
                    console.log('JSONP Failed!'+data);
                });
        }
    };
})

.service('FileService', function($ionicLoading) {
  return {
    downloadFile: function(localFileInfo) {
        $ionicLoading.show({
            template: 'Loading...'
        });
        //console.log('PRe-load window - remote file: http://www.ophthalmologymanagement.com/content/'+localFileInfo.remoteFolder+'/'+localFileInfo.remoteFileName);
        //console.log('PRe-load window - local file resources:'+localFileInfo.filePath+localFileInfo.fileName);
        ionic.Platform.ready = function(){window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
                console.log('getting started...');
                fs.root.getDirectory(
                    localFileInfo.filePath,
                    {
                        create: true
                    },
                    function(dirEntry) {
                        dirEntry.getFile(
                            localFileInfo.fileName,
                            {
                                create: true,
                                exclusive: false
                            },
                            function gotFileEntry(fe) {
                                var p = fe.toURL();
                                fe.remove();
                                ft = new FileTransfer();
                                ft.download(
                                    encodeURI('http://www.ophthalmologymanagement.com/content/'+localFileInfo.remoteFolder+'/'+localFileInfo.remoteFileName),
                                    p,
                                    function(entry) {
                                        $ionicLoading.hide();
                                        $scope.imgFile = entry.toURL();
                                        alert('Download file Success!');
                                    },
                                    function(error) {
                                        $ionicLoading.hide();
                                        alert("Download Error Source -> " + error.source);
                                    },
                                    false,
                                    null
                                );
                            },
                            function() {
                                $ionicLoading.hide();
                                alert("Get file failed");
                            }
                        );
                    }
                );
            },
        function() {
            alert("Request for filesystem failed");
        })};
    },


    loadFile: function() {

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
            fs.root.getDirectory(
                locallocalFileInfo.filePath,
                {
                    create: false
                },
                function(dirEntry) {
                    dirEntry.getFile(
                        locallocalFileInfo.fileName,
                        {
                            create: false,
                            exclusive: false
                        },
                        function gotFileEntry(fe) {
                            $scope.savedFile = fe.toURL();
                        },
                        function(error) {
                            console.log("Error getting file");
                        }
                    );
                }
            );
        },
        function() {
            console.log("Error requesting filesystem");
        });
    }
  };
 
});



//---------------------
// Directives
//----------------------------------------------------------------------------------------------

