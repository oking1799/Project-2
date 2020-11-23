"use strict";

var _googleMapsReact = require("google-maps-react");

var MapPage = function MapPage(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Map Marker API"), /*#__PURE__*/React.createElement("form", {
    id: "locationForm",
    action: "/addLocation",
    method: "post"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "locationName"
  }, "name: "), /*#__PURE__*/React.createElement("input", {
    id: "nameField",
    type: "text",
    name: "name",
    value: "uluru"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "latitide"
  }, "Latitude: "), /*#__PURE__*/React.createElement("input", {
    id: "latitudeField",
    type: "float",
    name: "latitude",
    value: "-25.344"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "longitude"
  }, "Longitude "), /*#__PURE__*/React.createElement("input", {
    id: "longitudeField",
    type: "float",
    name: "longitude",
    value: "131.036"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "rating"
  }, "Rating "), /*#__PURE__*/React.createElement("input", {
    id: "ratingField",
    type: "number",
    min: "0",
    max: "5",
    step: "1",
    name: "rating",
    value: "5"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "review"
  }, "Review "), /*#__PURE__*/React.createElement("input", {
    id: "reviewField",
    type: "text",
    name: "review",
    value: "Biggest rock I ever did see!"
  }), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    value: "Add Location"
  })), /*#__PURE__*/React.createElement("form", {
    id: "locationFormGet",
    action: "/getLocation",
    method: "get"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "query"
  }, "Search for a Specific Location"), /*#__PURE__*/React.createElement("input", {
    id: "queryField",
    type: "text",
    name: "query"
  }), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    value: "Get Location",
    id: "getButton"
  }), /*#__PURE__*/React.createElement("select", {
    id: "methodSelect"
  }, /*#__PURE__*/React.createElement("option", {
    value: "get"
  }, "GET"), /*#__PURE__*/React.createElement("option", {
    value: "head"
  }, "HEAD"))), /*#__PURE__*/React.createElement("section", {
    id: "content"
  }));
};

var LocationList = function LocationList(props) {
  if (props.locations.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "locationList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "noLocation"
    }, "No Locations yet"));
  }

  var locationNodes = props.locations.map(function (location) {
    return /*#__PURE__*/React.createElement("div", null);
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "locationList"
  }, locationNodes);
};

function initMap() {
  var map;
  var uluru = {
    lat: -25.344,
    lng: 131.036
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
}

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(MapPage, {
    csrf: csrf
  }), document.querySelector("#map"));
  ReactDOM.render( /*#__PURE__*/React.createElement(LocationList, {
    locations: []
  }), document.querySelector("#locations"));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
  initMap();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
