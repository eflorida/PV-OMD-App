

function initPushwoosh()
{
    var pushNotification = window.plugins.pushNotification;

    //set push notifications handler
    document.addEventListener('push-notification', function(event) {
        var title = event.notification.title;
        var userData = event.notification.userdata;

        if(typeof(userData) != "undefined") {
            console.warn('user data: ' + JSON.stringify(userData));
        }

        alert(title);
    });

    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
    pushNotification.onDeviceReady({ projectid: "917159501602", appid : "7A7DB-3FEEC" });

    //register for pushes
    pushNotification.registerDevice(
        function(status) {
            var pushToken = status;
            console.warn('Android push token: ' + pushToken);
            $scope.pushRegistration = true;
        },
        function(status) {
            console.warn(JSON.stringify(['Android failed to register ', status]));
        }
    );
}

function unregPushwoosh()
{
    var pushNotification = window.plugins.pushNotification;

    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
    pushNotification.onDeviceReady({ projectid: "917159501602", appid : "7A7DB-3FEEC" });

    //register for pushes
    pushNotification.unregisterDevice(
        function(status) {
            var pushToken = status;
            console.warn('Android push token: ' + pushToken);
        },
        function(status) {
            console.warn(JSON.stringify(['Android failed to register ', status]));
        }
    );
}
