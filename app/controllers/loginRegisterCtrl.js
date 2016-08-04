"use strict";

app.controller("loginRegisterCtrl", function($scope, $route, AuthFactory, UsersFactory){    // injecting the scope here...
  $scope.registerMode = true;                                                               // ...from loginRegister.html

  $scope.newUser = {
    email: "",                                                // ng-model on loginRegister.html is filling this in
    uid: null                                                 // getting set below with "$scope.newUser.uid = object.uid;"
  };

  
  $scope.activateRegisterMode = function(){                   // REGISTER is set to the "on state" depending on which button user clicks
    $scope.registerMode = true;                               // IF ng-show="registerMode" is TRUE, show Registration Form html
  };
  

  $scope.activateLoginMode = function(){                      // LOGIN is set to the "on state" depending on which button user clicks
    $scope.registerMode = false;                              // IF ng-show="!registerMode" is TRUE (false :P), show Login Form html
  };


  $scope.onRegisterClick = function(){                        // Registers NEW user with their email and password input from loginRegister.html
    AuthFactory.createUser($scope.newUser.email, $scope.regPassword)        //captures email and password using ng-model="regEmail" / "...Password"
    .then(function(object){console.log("Register",object);
      $scope.newUser.uid = object.uid;
      UsersFactory.postUser($scope.newUser);
  })

                            // is the semicolon on line 24 messing this up?
    .catch(function(error){                                   // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  };


  $scope.onLoginClick = function(){                           // Logs in EXISTING user with their email and password input from loginRegister.html
    AuthFactory.loginUser($scope.loginEmail, $scope.loginPassword);         //captures email and password using ng-model="loginEmail" / "...Password"
  };

  
});
