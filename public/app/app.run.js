import app from './app.module';

app.run(function($rootScope, $http, $location, $localStorage, $state, ROUTER) {
  'ngInject';
  if ($localStorage.user) {
    $http.defaults.headers.common.Authorization = `Bearer ${$localStorage.user.token}`;
    $rootScope.authenticated = true;
  }
	
  $rootScope.$on('$locationChangeStart', function() {
    var publicPages = [ROUTER.LOGIN.PATH];
    var restrictedPage = publicPages.indexOf($location.path()) === -1;
    if (restrictedPage && !$localStorage.user) {
      $state.go(ROUTER.LOGIN.NAME);
    }
  });
});
