"use strict";

var handleLocation = function handleLocation(e) {
  e.preventDefault();

  if ($("#locationName").val() == '' || $("latitude").val() == '' || $("#longitude").val() == '') {
    console.log("NAME LAT AND LNG NEEDED");
    return false;
  }

  sendAjax('POST', $("#locationForm").attr("action"), $("#locationForm").serialize(), function () {
    loadLocationsFormServer();
  });
  console.log($("locationForm").serialize());
  return false;
};

var MapForm = function MapForm(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Map Marker API"), /*#__PURE__*/React.createElement("div", {
    id: "map"
  }), /*#__PURE__*/React.createElement("form", {
    id: "locationForm",
    action: "/addLocation",
    method: "post"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "locationName"
  }, "name: "), /*#__PURE__*/React.createElement("input", {
    id: "nameField",
    type: "text",
    name: "name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "latitide"
  }, "Latitude: "), /*#__PURE__*/React.createElement("input", {
    id: "latitudeField",
    type: "float",
    name: "latitude"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "longitude"
  }, "Longitude "), /*#__PURE__*/React.createElement("input", {
    id: "longitudeField",
    type: "float",
    name: "longitude"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "rating"
  }, "Rating "), /*#__PURE__*/React.createElement("input", {
    id: "ratingField",
    type: "number",
    min: "0",
    max: "5",
    step: "1",
    name: "rating"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "review"
  }, "Review "), /*#__PURE__*/React.createElement("input", {
    id: "reviewField",
    type: "text",
    name: "review"
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
    }, "No Locations yet sucka"));
  }

  var locationNodes = props.locations.map(function (location) {
    return /*#__PURE__*/React.createElement("div", {
      key: location._id,
      className: "location"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/gloop.jpg",
      alt: "icon",
      className: "iconDefault"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "locationName"
    }, " Name: ", location.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "locationLat"
    }, " Lat: ", location.latitude, " "), /*#__PURE__*/React.createElement("h3", {
      className: "locationLng"
    }, " Lng: ", location.longitude, " "), /*#__PURE__*/React.createElement("h3", {
      className: "locationRating"
    }, " Rating: ", location.rating, " "), /*#__PURE__*/React.createElement("h3", {
      className: "locationReview"
    }, " Review: ", location.review, " "));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "locationList"
  }, locationNodes);
};

function initMap() {
  var uluru = {
    lat: -25.344,
    lng: 131.036
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  console.log(map);
}

var loadLocationsFormServer = function loadLocationsFormServer() {
  sendAjax('GET', '/getLocations', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(LocationList, {
      locations: data.locations
    }), document.querySelector("#locations"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(MapForm, {
    csrf: csrf
  }), document.querySelector("#mapContainer"));
  ReactDOM.render( /*#__PURE__*/React.createElement(LocationList, {
    locations: []
  }), document.querySelector("#locations"));
  initMap();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
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
