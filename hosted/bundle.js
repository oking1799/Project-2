"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var handleLocation = function handleLocation(e) {
  e.preventDefault();

  if ($("#nameField").val() == '' || $("#countryField").val() == '') {
    handleError("a name and a country are needed");
    return false;
  }

  sendAjax('POST', $("#locationForm").attr("action"), $("#locationForm").serialize(), function (data) {
    loadSearchedLocations();
  });
  console.log($("#locationForm").serialize());
  return false;
};

var searchLocation = function searchLocation(e) {
  e.preventDefault(); //make sure to return relevant search data later

  console.log($("#searchForm").serialize());
  sendAjax('GET', $("#searchForm").attr("action"), $("#searchForm").serialize(), function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(LocationList, {
      locations: data.locations
    }), document.querySelector("#locations"));
  });
  return false;
};

var MapForm = function MapForm(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Location Ratings"), /*#__PURE__*/React.createElement("form", {
    id: "locationForm",
    onSubmit: handleLocation,
    name: "locationForm",
    action: "/map",
    method: "POST",
    className: "locationForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "locationName"
  }, "name: "), /*#__PURE__*/React.createElement("input", {
    id: "nameField",
    type: "text",
    name: "name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "country"
  }, "country: "), /*#__PURE__*/React.createElement("input", {
    id: "countryField",
    type: "text",
    name: "country"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "description"
  }, "description: "), /*#__PURE__*/React.createElement("input", {
    id: "descriptionField",
    type: "float",
    name: "description"
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
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeLocationSubmit",
    type: "submit",
    value: "make Location"
  })));
};

var LocationSearch = function LocationSearch(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Locations"), /*#__PURE__*/React.createElement("p", null, "On this page you can find locations created by other users! filter results with a search"), /*#__PURE__*/React.createElement("form", {
    id: "searchForm",
    onSubmit: searchLocation,
    name: "searchForm",
    action: "/search",
    method: "GET",
    className: "searchForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "nameSearch"
  }, "Search By Name: "), /*#__PURE__*/React.createElement("input", {
    id: "nameSearch",
    type: "text",
    name: "name"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "searchSubmit",
    type: "submit",
    value: "search Location"
  })));
};

var LocationPage = function LocationPage(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    id: "locationTitle"
  }, props.name), /*#__PURE__*/React.createElement("h2", {
    id: "countryTitle"
  }, props.country), /*#__PURE__*/React.createElement("h3", {
    id: "ratingTitle"
  }, props.rating, "/5"), /*#__PURE__*/React.createElement("p", {
    id: "descriptionTitle"
  }, props.description), /*#__PURE__*/React.createElement("p", {
    id: "reviewTitle"
  }, props.review));
};

var LocationList = function LocationList(props) {
  console.log(props);

  if (props.locations.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "locationList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "noLocation"
    }, "No Locations found!"));
  }

  var locationNodes = props.locations.map(function (location) {
    return /*#__PURE__*/React.createElement("div", {
      key: location._id,
      className: "location"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "locationName"
    }, " Name: ", location.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "locationCountry"
    }, " Country: ", location.country, " "), /*#__PURE__*/React.createElement("h3", {
      className: "locationDescription"
    }, " Reason For Visit: ", location.description, " "), /*#__PURE__*/React.createElement("h3", {
      className: "locationRating"
    }, " Rating: ", location.rating, " "), /*#__PURE__*/React.createElement("h3", {
      className: "locationReview"
    }, " Review: ", location.review, " "));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "locationList"
  }, locationNodes);
};

var loadLocationsFromServer = function loadLocationsFromServer(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(MapForm, {
    csrf: csrf
  }), document.querySelector("#mapContainer"));
  ReactDOM.render( /*#__PURE__*/React.createElement(LocationList, {
    locations: []
  }), document.querySelector("#locations"));
  sendAjax('GET', '/getLocations', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(LocationList, {
      locations: data.locations
    }), document.querySelector("#locations"));
  });
};

var loadAllLocationsFromServer = function loadAllLocationsFromServer(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(LocationSearch, {
    csrf: csrf
  }), document.querySelector("#mapContainer"));
  sendAjax('GET', '/getAllLocations', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(LocationList, {
      locations: data.locations
    }), document.querySelector("#locations"));
  });
};

var loadSearchedLocations = function loadSearchedLocations() {
  sendAjax('GET', '/search', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(LocationList, {
      locations: data.locations
    }), document.querySelector("#locations"));
  });
};

var renderLocationPage = function renderLocationPage(div) {
  var element = div.getElementById("name");
  console.log(element);
  sendAjax('GET', '/search', element.serialize(), function (data) {
    /*#__PURE__*/
    React.createElement(LocationPage, {
      locations: data.locations
    }), document.querySelector("#mapContainer");
  });
};

var setup = function setup(csrf) {
  var makeButton = document.querySelector("#makeButton");
  var allButton = document.querySelector("#allButton");
  var locationBlocks = document.querySelectorAll("#location");
  console.log("locations " + locationBlocks);
  makeButton.addEventListener("click", function (e) {
    e.preventDefault();
    loadLocationsFromServer(csrf);
    return false;
  });
  allButton.addEventListener("click", function (e) {
    e.preventDefault();
    loadAllLocationsFromServer(csrf);
    return false;
  });

  var _iterator = _createForOfIteratorHelper(locationBlocks),
      _step;

  try {
    var _loop = function _loop() {
      var div = _step.value;
      div.addEventListener('click', function (e) {
        renderLocationPage(div);
      });
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  loadLocationsFromServer(csrf);
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
  console.log("ajax Sent " + data);
  console.log("Success!" + success);
};
