//---------------------
// Ionic App Module
//----------------------------------------------------------------------------------------------
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    initPushwoosh();
  });
})

//---------------------
// Angular-UI Routing
//----------------------------------------------------------------------------------------------
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/index.html",
          controller: 'ExternalLinkCtrl'
        }
      }
    })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.newsletters', {
      url: "/newsletters",
      views: {
        'menuContent' :{
          templateUrl: "templates/newsletters.html",
          controller: 'NewslettersCtrl',
          controller: 'ExternalLinkCtrl'
        }
      }
    })

    .state('app.newslettersIssue', {
      url: "/newslettersIssue/{folder}/{partialUrl}",
      views: {
        'menuContent' :{
          templateUrl: "templates/newslettersIssue.html",
          controller: 'CurrentIssueCtrl',
          controller: 'ExternalLinkCtrl'
        }
      }
    })

    .state('app.about', {
      url: "/about",
      views: {
        'menuContent' :{
          templateUrl: "templates/about.html",
          controller: 'ExternalLinkCtrl'
        }
      }
    })

    .state('app.currentissue', {
      url: "/currentissue",
      views: {
        'menuContent' :{
          templateUrl: "templates/currentissue.html",
          controller: 'CurrentIssueCtrl'
        }
      }
    })

    .state('app.currentissue-article', {
      url: "/currentissue-article/{folder}/{partialUrl}",
      views: {
        'menuContent' :{
          templateUrl: "templates/currentissue-article.html",
          controller: 'CurrentIssueArticleCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

