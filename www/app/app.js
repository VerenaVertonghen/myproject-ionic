// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', 
['ionic', 'base64', 'ui.router','LocalStorageModule',
  'starter.controllers', 'starter.services','starter.directives','starter.filters',
  'starter.UserService','starter.StateService','starter.CategoryService','starter.NotificationService',
  'starter.UserCtrl','starter.StateCtrl','starter.CategoryCtrl','starter.NotificationCtrl'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // if (window.cordova && window.cordova.plugins.Keyboard) {
    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    // }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
  });
})

//.constant("apiUrl","http://localhost:6002")
.constant("apiUrl","http://cosycare.eu-gb.mybluemix.net")
.constant("welcomeNotificationId","556d7a25a198311f0033d3fb")


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
      url: '/login',
      cache: false,
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  .state('register', {
      url: '/register',
      cache: false,
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
  })

  .state('app', {
    url: "/app",
    //cache: false,
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.profile', {
    url: "/profile",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/profile.html",
        controller: 'UserCtrl'
      }
    }
  })

  .state('app.caretaker', {
    url: "/caretaker",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/caretaker.html"
      }
    }
  })

  .state('app.settings', {
    cache: false,
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "templates/settings.html"
      }
    }
  })

  .state('app.assistance', {
    url: "/assistance",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/assistance.html"
      }
    }
  })

  .state('app.notifications', {
    url: "/notifications",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/notifications.html",
        controller: 'NotificationsCtrl'
      }
    }
  })

  .state('app.notification', {
    url: "/notifications/:notificationId",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/notification.html",
        controller: 'NotificationCtrl'
      }
    }
  })

  .state('app.notification1', {
    url: "/notification1",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/notification1.html",
        controller: 'Notification1Ctrl'
      }
    }
  })

  .state('app.notification2', {
    url: "/notification2",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/notification2.html",
        controller: 'Notification2Ctrl'
      }
    }
  })

  .state('app.notificationfinal', {
    url: "/notificationfinal",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/notificationfinal.html",
        controller: 'NotificationFinalCtrl'
      }
    }
  })

  .state('app.states', {
    url: "/states",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/states.html",
        controller: 'StatesCtrl'
      }
    }
  })

  .state('app.state', {
    url: "/states/:stateId",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/state.html",
        controller: 'StateCtrl'
      }
    }
  })

  .state('app.state1', {
    url: "/state1",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/state1.html",
        controller: 'State1Ctrl'
      }
    }
  })

  .state('app.state2', {
    url: "/state2",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/state2.html",
        controller: 'State2Ctrl'
      }
    }
  })

  .state('app.state3', {
    url: "/state3",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/state3.html",
        controller: 'State3Ctrl'
      }
    }
  })

  .state('app.statefinal', {
    url: "/statefinal",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/statefinal.html",
        controller: 'StateFinalCtrl'
      }
    }
  })

  ;
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/register');
});
