"use strict";

var isPremium = false;
var snagCSRF;
var currentPage = "user";

var handleLocation = function handleLocation(e) {
  e.preventDefault();

  if ($("#nameField").val() == '' || $("#countryField").val() == '') {
    handleError("a name and a country are needed");
    return false;
  }

  sendAjax('POST', $("#locationForm").attr("action"), $("#locationForm").serialize(), function (data) {
    loadLocationsFromServer();
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

var Ads = function Ads() {
  return /*#__PURE__*/React.createElement("div", {
    id: "adImages"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/assets/img/gloop.jpg",
    alt: "Ad 1",
    className: "ad1"
  }), /*#__PURE__*/React.createElement("img", {
    src: "/assets/img/gloop.jpg",
    alt: "Ad 2",
    className: "ad2"
  }));
};

var NoAds = function NoAds() {
  return /*#__PURE__*/React.createElement("div", {
    id: "adImages"
  });
};

var LocationPage = function LocationPage(props) {
  console.log(props.props.name);
  return /*#__PURE__*/React.createElement("div", {
    className: "popUp"
  }, /*#__PURE__*/React.createElement("span", {
    className: "helper"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "popupCloseButton",
    onClick: function onClick() {
      removeLocationClick(snagCSRF);
    }
  }, "\xD7"), /*#__PURE__*/React.createElement("h1", {
    id: "locationTitle"
  }, "Location: ", props.props.name), /*#__PURE__*/React.createElement("h2", {
    id: "countryTitle"
  }, "Country: ", props.props.country), /*#__PURE__*/React.createElement("h3", {
    id: "ratingTitle"
  }, "Rating: ", props.props.rating, "/5"), /*#__PURE__*/React.createElement("p", {
    id: "descriptionTitle"
  }, "Reason For Visit: ", props.props.description), /*#__PURE__*/React.createElement("p", {
    id: "reviewTitle"
  }, "Review: ", props.props.review)));
};

function handleClick(location) {
  //e.preventDefault();
  console.log("button clicked " + location);
  $('.popUp').show();
  renderLocationPage(location);
}

function removeLocationClick(csrf) {
  //e.preventDefault();
  //console.log("button clicked " + location);
  //console.log(currentPage);
  $('.popUp').hide();

  if (currentPage == "user") {
    ReactDOM.render( /*#__PURE__*/React.createElement(MapForm, {
      csrf: csrf
    }), document.querySelector("#mapContainer"));
  } else {
    ReactDOM.render( /*#__PURE__*/React.createElement(LocationSearch, {
      csrf: csrf
    }), document.querySelector("#mapContainer"));
  }
}

var LocationList = function LocationList(props) {
  console.log(props);

  if (props.locations.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "locationList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "noLocation"
    }, "No Locations found!"));
  }

  var locationNodes = props.locations.slice(0).reverse().map(function (location) {
    console.log(location);
    return /*#__PURE__*/React.createElement("div", {
      key: location._id,
      className: "location"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "locationName"
    }, " Name: ", location.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "locationRating"
    }, " Rating: ", location.rating, " "), /*#__PURE__*/React.createElement("button", {
      className: "trigger_popUp",
      onClick: function onClick() {
        handleClick(location);
      }
    }, "More Info"));
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

  if (isPremium == false) {
    ReactDOM.render( /*#__PURE__*/React.createElement(Ads, null), document.querySelector("#ads"));
  }
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
  currentPage = "all";
  sendAjax('GET', '/search', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(LocationList, {
      locations: data.locations
    }), document.querySelector("#locations"));
  });
};

var renderLocationPage = function renderLocationPage(location) {
  ReactDOM.render( /*#__PURE__*/React.createElement(LocationPage, {
    props: location
  }), document.querySelector("#mapContainer"));
};

var removeNonPremium = function removeNonPremium() {
  ReactDOM.render( /*#__PURE__*/React.createElement(NoAds, null), document.querySelector("#ads"));
};

var setup = function setup(csrf) {
  var makeButton = document.querySelector("#makeButton");
  var allButton = document.querySelector("#allButton");
  var premiumButton = document.querySelector("#premiumButton");
  makeButton.addEventListener("click", function (e) {
    e.preventDefault();
    currentPage = "user";
    loadLocationsFromServer(csrf);
    return false;
  });
  allButton.addEventListener("click", function (e) {
    e.preventDefault();
    currentPage = "all";
    loadAllLocationsFromServer(csrf);
    return false;
  });
  premiumButton.addEventListener("click", function (e) {
    isPremium = true;
    removeNonPremium();
    premiumButton.innerHTML = "Premium User!";
  });
  loadLocationsFromServer(csrf);
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
    snagCSRF = result.csrfToken;
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
