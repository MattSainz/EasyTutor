angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


      .state('signIn', {
        url: '/signIn',
        templateUrl: 'templates/signIn.html',
        controller: 'signInCtrl'
      })
      .state('signup', {
        url: '/whoAreYou',
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      })
      .state('studentSignup', {
        url: '/studentSignup',
        templateUrl: 'templates/studentSignup.html',
        controller: 'studentSignupCtrl',
        params: {both: false}
      })
      .state('tutorSignup', {
        url: '/tutorSignup',
        templateUrl: 'templates/tutorSignup.html',
        controller: 'tutorSignupCtrl',
        params: {both: false}
      })
      .state('payment', {
        url: '/payment',
        templateUrl: 'templates/payment.html',
        controller: 'paymentCtrl',
        params: {both: false, last: 'student'}
      })
      .state('finished', {
        url: '/finished',
        templateUrl: 'templates/finished.html',
        controller: 'finishedCtrl'
      })
      .state('tabsController.tutors', {
        url: '/tutors',
        views: {
          'tab1': {
            templateUrl: 'templates/tutors.html',
            controller: 'tutorsCtrl'
          }
        }
      })
      .state('tabsController.tutor', {
        url: '/tutor',
        views: {
          'tab1': {
            templateUrl: 'templates/tutor.html',
            controller: 'tutorCtrl'
          }
        }
      })
      .state('tabsController.helpNow', {
        url: '/helpNow',
        views: {
          'tab2': {
            templateUrl: 'templates/helpNow.html',
            controller: 'helpNowCtrl'
          }
        }
      })
      .state('tabsController.sessions', {
        url: '/sessions',
        views: {
          'tab3': {
            templateUrl: 'templates/sessions.html',
            controller: 'sessionsCtrl'
          }
        }
      }).
      state('tabsController.session', {
        url: '/session',
        views: {
          'tab1': {
            templateUrl: 'templates/session.html',
            controller: 'sessionCtrl'
          }
        }
      })
      .state('tabsController.savedSession', {
        url: '/saved_session',
        params: {session: {}},
        views: {
          'tab3': {
            templateUrl: 'templates/individual_session.html',
            controller: 'savedSessionCtrl'
          }
        }
      })
      .state('tabsController.settings', {
        url: '/settings',
        views: {
          'tab4': {
            templateUrl: 'templates/settings.html',
            controller: 'settingsCtrl'
          }
        }
      })
      .state('tabsController.billing', {
        url: '/billing',
        views: {
          'tab4': {
            templateUrl: 'templates/billing.html',
            controller: 'billingCtrl'
          }
        }
      })
      .state('tabsController.classes', {
        url: '/classes',
        views: {
          'tab4': {
            templateUrl: 'templates/classes.html',
            controller: 'classesCtrl'
          }
        }
      })
      .state('tabsController.appSettings', {
        url: '/appSettings',
        views: {
          'tab4': {
            templateUrl: 'templates/appSettings.html',
            controller: 'appSettingsCtrl'
          }
        }
      })
      .state('tabsController.messages', {
        url: '/messages',
        views: {
          'tab5': {
            templateUrl: 'templates/messages.html',
            controller: 'messagesCtrl'
          }
        }
      })
      .state('tabsController.message', {
        url: '/message',
        params: {conversation: []},
        views: {
          'tab5': {
            templateUrl: 'templates/message.html',
            controller: 'messageCtrl'
          }
        }
      })
      .state('tabsController', {
        url: '/tabsController',
        templateUrl: 'templates/tabsController.html',
        abstract: true,
        controller: 'tabsController'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/signIn');

  });
