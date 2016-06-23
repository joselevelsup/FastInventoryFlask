var eazy = angular.module("TakeItEazy", ["ui.router"]);

eazy.run(function($rootScope, $state, $stateParams){
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});

eazy.factory("eazy", function(){
  return{
    start: function(){
        document.getElementsByTagName('head')[0].innerHTML += "<meta name='viewport' content='initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width'> <link rel='stylesheet' href='static/libs/eazy-framework/css/eazy.css'/> <link rel='stylesheet' href='static/libs/eazy-framework/css/font-awesome.css'/>";
        // This is for the Cordova version
     // document.getElementsByTagName('head')[0].innerHTML += "<meta name='viewport' content='initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width'> <link rel='stylesheet' href='lib/eazy-framework/css/eazy.css'/> <link rel='stylesheet' href='lib/eazy-framework/css/font-awesome.css'/>";
    },
    menu: function(idname){
      var navmenu = angular.element(document.querySelector(idname));
      if(navmenu == null || navmenu == undefined){
        setTimeout(function(){
          throw new Error("Menu Name needs to be injected to eazy.menu()");
        }, 1000);
      }
      else{
        return{
          toggleMenu: function(){
            navmenu.css({
              "opacity": "1",
              "width": "18em"
            });
          },
          close: function(){
            navmenu.css({
              "opacity": "0",
              "width": "0em"
            });
          }
        }
      }
    },
    modal: function(idname){
      var thisModal = angular.element(document.querySelector(idname));
      if(thisModal == null || thisModal == undefined){
        setTimeout(function(){
          console.error("Modal Name needs to be injected to eazy.modal()");
        }, 1000);
      }
      else{
        return{
          open: function(bgColor, anim, delay){
           thisModal.css("display", "block");
           thisModal.children().css("backgroundColor", bgColor);
           if(anim == true){
             thisModal.css({
               "visibility": "visible",
               "-webkit-animation": "topin 1s"
             });
           }
         },
         close: function(){
           thisModal.css("display", "none");
         }
        }
      }
    }
  }
});

eazy.directive("eazyNavBar", function(){
  return{
    restrict: "EA",
    scope: {
      theme: '@theme'
    },
    replace: true,
    transclude: true,
    template: "<div class='eazy-nav nav-bar-{{theme}}'  ng-transclude></div>",
  }
});

eazy.directive("navTitle", function(){
  return{
    restrict: "E",
    replace: true,
    transclude: true,
    template: '<h3 ng-transclude ng-bind="$state.current.page.title"></h3>'
  }
});


eazy.directive("eazySideNav", function(){
  return{
    restrict: "EA",
    scope:{
      side: "@side"
    },
    replace: true,
    transclude: true,
    template: "<div class='eazy-side-nav {{side}}' ng-transclude></div>"
  }
});

eazy.directive("eazybtn", function(){
  return{
    restrict: "EA",
    scope: {
      theme: '@theme',
      icon: '@icon',
      text: '@text'
    },
    replace: true,
    transclude: true,
    template: "<button class='btn btn-{{theme}}' ng-transclude>{{text}} <i class='fa fa-lg fa-{{icon}}'></i></button>"
  }
});

eazy.directive("eazyLoading", function(){
  return{
    restrict: "EA",
    replace: true,
    transclude: true,
    template: "<div class='nav-loading'><div data-load='eazy-load'></div></div>"
  }
});

eazy.directive("eazyContent", function(){
  return{
    restrict: "E",
    replace: true,
    transclude: true,
    template: "<div class='content' ng-transclude></div>"
  }
});
