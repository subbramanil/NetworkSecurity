var selfEasyrtcid = "";


function connect() {
    console.log("connect() entry");
    easyrtc.setVideoDims(640,480);
    easyrtc.setRoomOccupantListener(convertListToButtons);
    easyrtc.easyApp("easyrtc.audioVideoSimple", "selfVideo", ["callerVideo"], loginSuccess, loginFailure);
    console.log("connect() exit");
 }


function clearConnectList() {
    console.log("clearConnectList() entry");
    var otherClientDiv = document.getElementById('otherClients');
    while (otherClientDiv.hasChildNodes()) {
        otherClientDiv.removeChild(otherClientDiv.lastChild);
    }
    console.log("clearConnectList() exit");
}


function convertListToButtons (roomName, data, isPrimary) {
    clearConnectList();
    console.log("convertListToButtons() entry");
    console.log(roomName + data + isPrimary);
    var otherClientDiv = document.getElementById('otherClients');
    for(var easyrtcid in data) {
        var button = document.createElement('button');
        button.onclick = function(easyrtcid) {
            return function() {
                performCall(easyrtcid);
            };
        }(easyrtcid);

        var label = document.createTextNode(easyrtc.idToName(easyrtcid));
        button.appendChild(label);
        otherClientDiv.appendChild(button);
    }
    console.log("convertListToButtons() exit");
}


function performCall(otherEasyrtcid) {
    console.log("performCall() entry");
    easyrtc.hangupAll();

    var successCB = function() {};
    var failureCB = function() {};
    easyrtc.call(otherEasyrtcid, successCB, failureCB);
    console.log("performCall() exit");
}


function loginSuccess(easyrtcid) {
    console.log("loginSuccess() entry");
    selfEasyrtcid = easyrtcid;
    document.getElementById("iam").innerHTML = "I am " + easyrtc.cleanId(easyrtcid);
    console.log("loginSuccess() exit");
}


function loginFailure(errorCode, message) {
    console.log("loginFailure() entry");
    easyrtc.showError(errorCode, message);
    console.log("loginFailure() exit");
}
