angular.module('app.services', [])

  .factory('BlankFactory', [function () {

  }])

  .service('UserService', [function () {
    var user = {
      name: 'John Doe',
      student: true,
      tutor: false,
      needsHelpIn: ['Everything'],
      canTeach: ['Nothing'],
      grade: 'Freshman',
      school: 'University of Colorado at Boulder',
      creditCard: '4662 1234 1234 0123',
      svg: '111',
      address: '6145 Gunslinger Dr.',
      state: 'Colorado',
      zip: '80918'
    };

    this.setUser = function (newUser) {
      user = newUser
    };
    this.getUser = function () {
      return user
    };
  }])

  .service('TutorService', function () {
    var tutor = {};
    this.setTutor = function (newTutor) {
      tutor = newTutor;
    };
    this.getTutor = function () {
      return tutor;
    };
  })

  .service('SessionService', function () {
    var sessions = [];
    this.getSessions = function () {
      return sessions;
    };

    this.addSession = function (session) {
      sessions.push(session);
    }
  });
