"use strict";

var isPremium = false;

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
}; //const LocationPage = (props) => {
//return(
//<div>
//<h1 id="locationTitle">{ props.name }</h1>
//<h2 id="countryTitle">{ props.country}</h2>
//<h3 id="ratingTitle">{ props.rating }/5</h3>
//<p id="descriptionTitle">{ props.description }</p>
//<p id="reviewTitle">{ props.review }</p>
//</div>
//);
//}


var LocationList = function LocationList(props) {
  console.log(props);

  if (props.locations.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "locationList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "noLocation"
    }, "No Locations found!"));
  }

  function handleClick(location) {
    //e.preventDefault();
    console.log(location);
  }

  var locationNodes = props.locations.slice(0).reverse().map(function (location) {
    return /*#__PURE__*/React.createElement("div", {
      key: location._id,
      className: "location",
      onclick: handleClick(location)
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
  sendAjax('GET', '/search', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(LocationList, {
      locations: data.locations
    }), document.querySelector("#locations"));
  });
};

var renderLocationPage = function renderLocationPage(div) {//let element = div.getElementById("name");
  //console.log(element);
  //sendAjax('GET', '/search', element.serialize(), (data) => {
  //ReactDOM.render(
  //<LocationPage locations={data.locations} />, document.querySelector("#mapContainer")
  //);
  // });
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
    loadLocationsFromServer(csrf);
    return false;
  });
  allButton.addEventListener("click", function (e) {
    e.preventDefault();
    loadAllLocationsFromServer(csrf);
    return false;
  });
  premiumButton.addEventListener("click", function (e) {
    isPremium = true;
    removeNonPremium();
  });
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
