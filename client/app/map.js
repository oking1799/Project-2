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

//const LocationPage = (props) => {
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

const LocationList = function(props) {
    console.log(props);
    if(props.locations.length === 0){
        return (
            <div className="locationList">
                <h3 className="noLocation">No Locations found!</h3>
            </div>
        );
    }

    const locationNodes = props.locations.map(function(location) {
        
        return (
           
           <div key={location._id} className="location">
               
               <h3 className="locationName"> Name: {location.name} </h3>
               <h3 className="locationCountry"> Country: {location.country} </h3>
               <h3 className="locationDescription"> Reason For Visit: {location.description} </h3>
               <h3 className="locationRating"> Rating: {location.rating} </h3>
               <h3 className="locationReview"> Review: {location.review} </h3>
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
    sendAjax('GET', '/search', null, (data) => {
        ReactDOM.render(
            <LocationList locations={data.locations} />, document.querySelector("#locations")
        );
    });
}

//const renderLocationPage = (div) => {

    //let element = div.getElementById("name");
    //console.log(element);
    //sendAjax('GET', '/search', element.serialize(), (data) => {
        //<LocationPage locations={data.locations} />, document.querySelector("#mapContainer")
    //});
//}

const setup = function(csrf) {
    const makeButton = document.querySelector("#makeButton");
    const allButton = document.querySelector("#allButton");
    //const locationBlocks = document.querySelectorAll("#location");
    //console.log("locations " + locationBlocks);

    makeButton.addEventListener("click", (e) => {
        e.preventDefault();
        loadLocationsFromServer(csrf);
        return false;
    });

    allButton.addEventListener("click", (e) => {
        e.preventDefault();
        loadAllLocationsFromServer(csrf);
        return false;
    })

   //for(const div of locationBlocks){
      // div.addEventListener('click', function(e){
           //renderLocationPage(div);
       //})
    //}
    
    

    

    loadLocationsFromServer(csrf);
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
    
};

$(document).ready(function() {
    getToken();
    
});

