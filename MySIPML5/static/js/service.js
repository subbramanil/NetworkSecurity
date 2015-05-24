/**
 * Created by Subbu on 5/8/15.
 */

sipApp.factory('SIPService', function () {

    var factory = {};

    factory.getUser = function () {
        console.log("SIPService.getUser() entry");

        console.log("SIPService.getUser() exit");
    }

    return factory;
});

