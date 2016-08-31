'use strict';
angular.module('lanceSolidario')
    .run(['$rootScope', '$window', 'facebookAPI',
        function ($rootScope, $window, facebookAPI) {

            $rootScope.user = {};

            $window.fbAsyncInit = function () {
                // Executed when the SDK is loaded

                FB.init({
                    appId: '145525159212250',
                    channelUrl: 'app/channel.html',
                    status: true,
                    cookie: true,
                    xfbml: true,
                    version: 'v2.7'
                });

                facebookAPI.watchLoginChange();

            };

            (function (d) {

                var js,
                    id = 'facebook-jssdk',
                    ref = d.getElementsByTagName('script')[0];

                if (d.getElementById(id)) {
                    return;
                }

                js = d.createElement('script');
                js.id = id;
                js.async = true;
                js.src = '//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.7&appId=145525159212250';

                ref.parentNode.insertBefore(js, ref);

            }(document));

        }]);
