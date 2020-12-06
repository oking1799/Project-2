let isPremium = false;

let snagCSRF;

let currentPage = "user";

const handleLocation = (e) => {
    e.preventDefault();

    if($("#nameField").val() == '' || $("#countryField").val() == ''){
        handleError("a name and a country are needed");
        return false;
    }

    sendAjax('POST', $("#locationForm").attr("action"), $("#locationForm").serialize(), (data) => {
        loadLocationsFromServer();
    });
    console.log($("#locationForm").serialize());
    return false;
};

const searchLocation = (e) => {
    e.preventDefault();

     //make sure to return relevant search data later
     console.log($("#searchForm").serialize());
    sendAjax('GET', $("#searchForm").attr("action"), $("#searchForm").serialize(), (data) => {
        ReactDOM.render(
            <LocationList locations={data.locations} />, document.querySelector("#locations")
        );
    });
    
    return false;
}



const MapForm = (props) => {
    return (
        <div>
        <h1>Location Ratings</h1>
        
    
    <form id="locationForm" 
            onSubmit={handleLocation} 
            name="locationForm" 
            action="/map"  
            method="POST"
            className="locationForm">

        <label htmlFor="locationName">name: </label>
        <input id="nameField" type="text" name="name" />
        <label htmlFor="country">country: </label>
        <input id="countryField" type="text" name="country" />
        <label htmlFor="description">description: </label>
        <input id="descriptionField" type="float" name="description" />
        <label htmlFor="rating">Rating </label>
        <input id="ratingField" type="number" min="0" max = "5" step="1" name="rating" />
        <label htmlFor="review">Review </label>
        <input id="reviewField" type="text" name="review" />
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="makeLocationSubmit" type="submit" value="make Location" />
    </form>
   
    </div>
    
    );
};

const LocationSearch = (props) => {
    return(
    <div>
        <h1>Locations</h1>
        <p>On this page you can find locations created by other users! filter results with a search</p>
        <form id="searchForm" 
            onSubmit={searchLocation} 
            name="searchForm" 
            action="/search"  
            method="GET"
            className="searchForm">

        <label htmlFor="nameSearch">Search By Name: </label>
        <input id="nameSearch" type="text" name="name" />
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="searchSubmit" type="submit" value="search Location" />
            </form>

     </div>
    );
}

const Ads = () => {
    return(
        <div id="adImages">
        <img src="/assets/img/gloop.jpg" alt="Ad 1" className="ad1" />
        <img src="/assets/img/gloop.jpg" alt="Ad 2" className="ad2" />
        </div>
    );
}

const NoAds = () => {
    return(
        <div id="adImages">
        </div>
    );
}

const LocationPage = (props) => {
    console.log(props.props.name);
    return(
        <div className="popUp">
        <span className="helper"></span>
        <div>
        <div className="popupCloseButton"onClick={() => { removeLocationClick(snagCSRF) }}>&times;</div>
        <h1 id="locationTitle">Location: {props.props.name}</h1>
        <h2 id="countryTitle">Country: {props.props.country}</h2>
        <h3 id="ratingTitle">Rating: {props.props.rating}/5</h3>
        <p id="descriptionTitle">Reason For Visit: {props.props.description}</p>
        <p id="reviewTitle">Review: {props.props.review}</p>
        
        </div>
        </div>

    );
}

function handleClick(location){
    //e.preventDefault();
    console.log("button clicked " + location);
   
    renderLocationPage(location);
    $('.popUp').show();

}

function removeLocationClick(csrf){
    //e.preventDefault();
    //console.log("button clicked " + location);
    //console.log(currentPage);
    $('.popUp').hide();
    if(currentPage == "user"){
    ReactDOM.render(
        <MapForm csrf={csrf} />, document.querySelector("#mapContainer")
    );
}else{
    ReactDOM.render(
        <LocationSearch csrf={csrf} />, document.querySelector("#mapContainer")
    )

    
}

}

const LocationList = function(props) {
    console.log(props);
    if(props.locations.length === 0){
        return (
            <div className="locationList">
                <h3 className="noLocation">No Locations found!</h3>
            </div>
        );
    }

   
    
    const locationNodes = props.locations.slice(0).reverse().map(function(location) {
        console.log(location);
        return (
           
           <div key={location._id} className="location" >
               
               <h3 className="locationName"> Name: {location.name} </h3>
               <h3 className="locationRating"> Rating: {location.rating} </h3>
               <button className="trigger_popUp" onClick={() => { handleClick(location) }}>More Info</button>
            </div>
            
        );
    });

    return (
        <div className="locationList">
            {locationNodes}
        </div>
    );
};

    

const loadLocationsFromServer = (csrf) => {
    

    ReactDOM.render(
        <MapForm csrf={csrf} />, document.querySelector("#mapContainer")
    );

    ReactDOM.render(
        <LocationList locations={[]} />, document.querySelector("#locations")
    );
    sendAjax('GET', '/getLocations', null, (data) => {
        ReactDOM.render(
            <LocationList locations={data.locations} />, document.querySelector("#locations")
        );
    });
    if(isPremium == false){
        ReactDOM.render(
            <Ads />, document.querySelector("#ads")
        );
    }
};

const loadAllLocationsFromServer = (csrf) => {
    
ReactDOM.render(
    <LocationSearch csrf={csrf} />, document.querySelector("#mapContainer")
);
    sendAjax('GET', '/getAllLocations', null, (data) => {
        ReactDOM.render(
            <LocationList locations={data.locations} />, document.querySelector("#locations")
        );
    });
}

const loadSearchedLocations = () => {
    currentPage = "all";
    sendAjax('GET', '/search', null, (data) => {
        ReactDOM.render(
            <LocationList locations={data.locations} />, document.querySelector("#locations")
        );
    });


}

const renderLocationPage = (location) => {
    ReactDOM.render(
        <LocationPage props={location} />, document.querySelector("#mapContainer")
        );
  
}

const removeNonPremium = () => {
    ReactDOM.render(
        <NoAds />, document.querySelector("#ads")
    )
}

const setup = function(csrf) {
    const makeButton = document.querySelector("#makeButton");
    const allButton = document.querySelector("#allButton");
    const premiumButton = document.querySelector("#premiumButton");
    


    makeButton.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = "user";
        loadLocationsFromServer(csrf);
        return false;
    });

    allButton.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = "all";
        loadAllLocationsFromServer(csrf);
        return false;
    })

    premiumButton.addEventListener("click", (e) => {
        isPremium = true;
        removeNonPremium();
        premiumButton.innerHTML = "Premium User!";
    })

   
    
    

    

    loadLocationsFromServer(csrf);
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
        snagCSRF = result.csrfToken;
    });
    
};

$(document).ready(function() {
    getToken();
    
});

