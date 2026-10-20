(function () {

  function getSessionUserId() {
    return sessionStorage.getItem("savedId") || "";
  }

  function hasValidSession() {
    return sessionStorage.getItem("isLoggedIn") === "true" && !!getSessionUserId();
  }

  window.getAuditUserId = function () {
    if (!hasValidSession()) {
      window.location.replace("index.html");
      throw new Error("Your login session has expired. Please log in again.");
    }
    return getSessionUserId();
  };

  if (!hasValidSession()) {
    window.location.replace("index.html");
    return;
  }

  if (typeof BroadcastChannel === "function") {
    const channel = new BroadcastChannel("alamhow_user_auth");
    channel.onmessage = function (event) {
      if (event.data && event.data.loggedOut) {
        sessionStorage.clear();
        window.location.replace("index.html");
      }
    };
  }
})();
