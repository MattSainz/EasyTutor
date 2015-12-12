angular.module('app.controllers', [])

  .controller('signInCtrl', ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {
    $scope.data = {
      name: ''
    };
    var user = UserService.getUser();


    $scope.signUp = function () {
      user.name = $scope.data.name;
      UserService.setUser(user);
      $state.go('signup');
    };

    $scope.login = function () {
      user.name = $scope.data.name;
      UserService.setUser(user);
      $state.go('tabsController.tutors');
    };

    $scope.browse = function () {
      user.name = 'No Name';
      UserService.setUser(user);
      $state.go('tabsController.tutors');
    }
  }])

  .controller('signupCtrl', ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {
    $scope.data = {student: false, tutor: false};

    $scope.continue = function () {

      var user = UserService.getUser();
      user.student = $scope.data.student;
      user.tutor = $scope.data.tutor;
      UserService.setUser(user);

      if ($scope.data.student && $scope.data.tutor) {
        $state.go('studentSignup', {both: true});
      } else if ($scope.data.student) {
        $state.go('studentSignup');
      } else {
        $state.go('tutorSignup');
      }
    };
  }])

  .controller('studentSignupCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    '$ionicPopup',
    'UserService',
    function ($scope, $state, $stateParams, $ionicPopup, UserService) {
      $scope.data = {
        classList: [
          {
            class: 'Biology',
            checked: false
          },
          {
            class: 'Physics',
            checked: false
          },
          {
            class: 'Data Structures',
            checked: false
          }
        ],
        newClass: '',
        grade: '',
        school: ''
      };

      $scope.add = function () {
        var pop = $ionicPopup.show({
          template: '<input type="text" ng-model="data.newClass">',
          title: 'Enter A new Class',
          subTitle: 'Please use normal things',
          scope: $scope,
          buttons: [
            {text: 'Cancel'},
            {
              text: '<b>Add</b>',
              type: 'button-positive',
              onTap: function (e) {
                if (!$scope.data.newClass) {
                  //don't allow the user to close unless he enters wifi password
                  e.preventDefault();
                } else {
                  $scope.data.classList.push({
                    class: $scope.data.newClass,
                    data: true
                  });
                  $scope.data.newClass = '';
                  pop.close();
                }
              }
            }
          ]
        });
      };

      $scope.next = function () {
        var user = UserService.getUser();
        user.needsHelpIn = $scope.data.classList;
        user.grade = $scope.data.grade;
        user.school = $scope.data.school;
        UserService.setUser(user);
        if ($stateParams.both) {
          $state.go('tutorSignup', {both: $stateParams.both});
        } else {
          $state.go('payment', {both: $stateParams.both, last: 'student'});
        }
      };
    }
  ])

  .controller('tutorSignupCtrl', [
    '$scope',
    '$state',
    '$ionicPopup',
    '$stateParams',
    'UserService',
    function ($scope, $state, $ionicPopup, $stateParams, UserService) {
      $scope.showPersional = $stateParams.both;

      $scope.data = {
        classList: [
          {
            class: 'Biology',
            checked: false
          },
          {
            class: 'Physics',
            checked: false
          },
          {
            class: 'Data Structures',
            checked: false
          }
        ],
        newClass: ''
      };

      $scope.add = function () {
        var pop = $ionicPopup.show({
          template: '<input type="text" ng-model="data.newClass">',
          title: 'Enter A new Class',
          subTitle: 'Please use normal things',
          scope: $scope,
          buttons: [
            {text: 'Cancel'},
            {
              text: '<b>Add</b>',
              type: 'button-positive',
              onTap: function (e) {
                if (!$scope.data.newClass) {
                  //don't allow the user to close unless he enters wifi password
                  e.preventDefault();
                } else {
                  $scope.data.classList.push({
                    class: $scope.data.newClass,
                    data: true
                  });
                  $scope.data.newClass = '';
                  pop.close();
                }
              }
            }
          ]
        });
      };

      $scope.next = function () {
        var user = UserService.getUser();
        user.canTeach = $scope.data.classList;
        UserService.setUser(user);
        $state.go('payment', {both: $stateParams.both, last: 'tutor'});
      }
    }
  ])

  .controller('paymentCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    '$ionicHistory',
    'UserService',
    function ($scope, $state, $stateParams, $ionicHistory, UserService) {
      $scope.both = $stateParams.both;
      $scope.last = $stateParams.last;
      $scope.data = {
        credit: 'Not Provided',
        svg: 'Not Provided',
        address: 'Not Provided',
        state: 'Not Provided',
        zip: 'Not Provided',
        bankAccount: 'Not Provided',
        routingNumber: 'Not Provided'
      };
      $scope.next = function () {
        var user = UserService.getUser();
        user.creditCard = $scope.data.credit;
        user.svt = $scope.data.svt;
        user.address = $scope.data.address;
        user.state = $scope.data.state;
        user.zip = $scope.data.zip;
        user.bankAccount = $scope.data.bankAccount;
        user.routingNumber = $scope.data.routingNumber;
        UserService.setUser(user);
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('finished');
      };
    }])

  .controller('finishedCtrl', ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {
    $scope.user = UserService.getUser();
  }])

  .controller('tutorsCtrl', [
    '$scope',
    '$state',
    '$filter',
    '$sce',
    'TutorService',
    '$ionicHistory',
    '$ionicSideMenuDelegate',
    function ($scope, $state, $filter, $sce, TutorService, $ionicHistory, $ionicSideMenuDelegate) {

      $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
      };

      $scope.data = {
        tutors: [
          {
            name: 'Bill',
            rating: 4,
            bio: 'Likes science and long walks on the beach',
            hours: 'Mon Wed 1-3PM',
            rate: 10,
            classes: [
              {class: 'Biology', rate: 20},
              {class: 'Data Structures', rate: 30}
            ]
          },
          {
            name: 'Fred',
            rating: 3,
            bio: 'Likes food and long walks on the beach',
            hours: 'Mon Fri 1-3PM',
            rate: 10,
            classes: [
              {class: 'Math', rate: 20},
              {class: 'Data Structures', rate: 30}
            ]
          },
          {
            name: 'Frank',
            rating: 2,
            bio: 'Likes science and long walks on the beach',
            hours: 'Mon Wed 1-3PM',
            rate: 30,
            classes: [
              {class: 'Biology', rate: 20},
              {class: 'Data Structures', rate: 30}
            ]
          },
          {
            name: 'Ted',
            rating: 1,
            bio: 'Likes nothing',
            rate: 300,
            hours: 'When I want to',
            classes: [
              {class: 'Poly Sci', rate: 200}
            ]
          },
          {
            name: 'Bob',
            rating: 4,
            bio: 'Likes science and long walks on the beach',
            hours: 'Mon Wed 1-3PM',
            rate: 30,
            classes: [
              {class: 'Biology', rate: 20},
              {class: 'Data Structures', rate: 30}
            ]
          },
          {
            name: 'Ned',
            rating: 2,
            bio: 'Likes science and long walks on the beach',
            hours: 'Mon Wed 1-3PM',
            rate: 35,
            classes: [
              {class: 'Biology', rate: 20},
              {class: 'Data Structures', rate: 30}
            ]
          },
          {
            name: 'Flanders',
            rating: 1,
            bio: 'Likes science and long walks on the beach',
            hours: 'Mon Wed 1-3PM',
            rate: 35,
            classes: [
              {class: 'Biology', rate: 20},
              {class: 'Data Structures', rate: 30}
            ]
          },
          {
            name: 'Homer',
            rating: 4,
            rate: 45,
            bio: 'Likes beer and long walks on the beach',
            hours: 'Mon Wed 1-3PM',
            classes: [
              {class: 'Nuclear Physics', rate: 20}
            ]
          },
          {
            name: 'Bart',
            rating: 3,
            rate: 35,
            bio: 'Likes science and long walks on the beach',
            hours: 'Mon Wed 1-3PM',
            classes: [
              {class: 'Biology', rate: 20},
              {class: 'Data Structures', rate: 30}
            ]
          }
        ],
        searchText: ''
      };

      $scope.getStars = function (n) {
        var toRet = '<span>';
        var emptyStars = 4 - n;
        for (var i = 0; i < emptyStars; i++) {
          toRet += '<i class="icon ion-ios-star-outline"> </i>'
        }
        for (var i = 0; i < n; i++) {
          toRet += '<i class="icon ion-ios-star"> </i>'
        }
        return $sce.trustAsHtml(toRet + '</span>');
      };

      $scope.setTutor = function (t) {
        TutorService.setTutor(t);
        $state.go('tabsController.tutor');
      };

    }])

  .controller('tutorCtrl', ['$scope', '$state', '$stateParams', '$http', 'TutorService', '$sce', '$ionicHistory', function ($scope, $state, $stateParams, $http, TutorService, $sce, $ionicHistory) {
    $scope.tutor = TutorService.getTutor();
    $scope.image = '';
    $http.get('https://randomuser.me/api/?gender=male').then(function (ret) {
      $scope.image = ret.data.results[0].user.picture.medium;
    });

    $scope.getStars = function (n) {
      var toRet = '<span>';
      var emptyStars = 4 - n;
      for (var i = 0; i < emptyStars; i++) {
        toRet += '<i class="icon ion-ios-star-outline"> </i>'
      }
      for (var i = 0; i < n; i++) {
        toRet += '<i class="icon ion-ios-star"> </i>'
      }
      return $sce.trustAsHtml(toRet + '</span>');
    };

    $scope.reserveTutor = function () {
      TutorService.setTutor($scope.tutor);
      $ionicHistory.clearCache().then(function () {
        $state.go('tabsController.session');
      });
    };
  }])

  .controller('sessionCtrl', ['$scope', '$state', 'TutorService', 'SessionService', '$ionicHistory', function ($scope, $state, TutorService, SessionService, $ionicHistory) {
    $scope.tutor = TutorService.getTutor();
    $scope.data = {
      location: '',
      date: '',
      notes: '',
      time: ''
    };

    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    $scope.hire = function () {
      var session = {
        tutor: $scope.tutor,
        location: $scope.data.location,
        date: $scope.data.date,
        time: $scope.data.time,
        notes: $scope.data.notes,
        status: 'upcomming'
      };
      SessionService.addSession(session);
      $ionicHistory.clearCache().then(function () {
        $ionicHistory.clearHistory();
        $state.go('tabsController.sessions')
      });
    };

    $scope.cancel = function () {
      TutorService.setTutor({});
      $ionicHistory.clearCache().then(function () {
        $ionicHistory.clearHistory();
        $state.go('tabsController.tutors');
      });
    };
  }])

  .controller('sessionsCtrl', ['$scope', '$state', 'SessionService', '$ionicHistory', function ($scope, $state, SessionService, $ionicHistory) {
    $ionicHistory.clearCache().then(function () {
      var sessions = SessionService.getSessions();
      $scope.upcomingSessions = [];
      $scope.pastSessions = [];
      for (var i in sessions) {
        if (new Date(sessions[i].date) >= new Date()) {
          $scope.upcomingSessions.push(sessions[i]);
        } else {
          $scope.pastSessions.push(sessions[i]);
        }
      }

      $scope.loadSession = function (session) {
        $ionicHistory.clearCache().then(function () {
          $ionicHistory.clearHistory();
          console.log(session);
          $state.go('tabsController.savedSession', {session: session})
        });
      };
    });
  }])
  .controller('savedSessionCtrl', [
    '$scope',
    '$state',
    '$ionicHistory',
    '$stateParams',
    function ($scope, $state, $ionicHistory, $stateParams) {
      $scope.session = $stateParams.session;


      $scope.messageTutor = function () {
        var conversation = [
          {user: 'me', text: 'Hi you set for later?'},
          {user: $scope.session.tutor.name, text: 'Sure Am!'}
        ];
        $state.go('tabsController.message', {conversation: conversation})
      };

      $scope.cancel = function () {

      };
    }
  ])
  .controller('settingsCtrl', ['$scope', '$state', 'UserService', '$ionicHistory', function ($scope, $state, UserService, $ionicHistory) {
    $scope.user = UserService.getUser();

    $scope.data = {
      schoolEdit: false,
      statusEdit: false
    };

    $scope.bye = function () {
      UserService.setUser({});
      $ionicHistory.clearCache().then(function () {
        $ionicHistory.clearHistory();
        $state.go('signIn');
      });
    };

    $scope.billing = function () {
      $state.go('tabsController.billing');
    };

    $scope.classes = function () {
      $state.go('tabsController.classes');
    };

    $scope.appSettings = function () {
      $state.go('tabsController.appSettings');
    };
  }])
  .controller('billingCtrl', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.user = UserService.getUser();
  }])
  .controller('classesCtrl', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.user = UserService.getUser();
  }])
  .controller('appSettingsCtrl', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.user = UserService.getUser();
  }])

  .controller('hireCtrl', ['$scope', '$state', function ($scope, $state) {

  }])

  .controller('helpNowCtrl', ['$scope', '$state', function ($scope, $state) {

  }])

  .controller('messagesCtrl', ['$scope', '$state', 'SessionService', function ($scope, $state, SessionService) {
    $scope.sessions = SessionService.getSessions();
    $scope.loadMessage = function (session) {
      var conversation = [
        {user: 'me', text: 'Hi you set for later?'},
        {user: session.tutor.name, text: 'Sure Am!'}
      ];
      $state.go('tabsController.message', {conversation: conversation})
    }
  }])
  .controller('messageCtrl', ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
    $scope.conversation = $stateParams.conversation;
    $scope.data = {
      text: ''
    };
    $scope.send = function () {
      $scope.conversation.push({user: 'Me', text: $scope.data.text});
      $scope.data.text = '';
    };
  }])
  .controller('menuController', ['$scope', '$ionicSideMenuDelegate', function ($scope, $ionicSideMenuDelegate) {

  }])
  .controller('allDoneCtrl', ['$scope', '$state', function ($scope, $state) {

  }])
  .controller('tabsController', ['$scope', '$ionicSideMenuDelegate', '$ionicHistory', function ($scope, $ionicSideMenuDelegate, $ionicHistory) {
    $scope.$root.showMenuIcon = true;
    $scope.$on('$ionicView.enter', function (e) {
      var title = $ionicHistory.currentTitle();
      if(title == 'Tutors' || title == 'Help Now'){
        $scope.$root.showMenuIcon = true;
      }else{
        $scope.$root.showMenuIcon = false;
      }
    });
    $scope.openMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    }
  }])
;
