const handleLocation = (e) => {
    e.preventDefault();

    if($("#locationName").val() == '' || $("latitude").val() == '' || $("#longitude").val() == ''){
        handleError("Lat Lng and Name all needed");
        return false;
    }

    sendAjax('POST', $("#locationForm").attr("action"), $("#locationForm").serialize(), function() {
        loadLocationsFormServer();
    });
    console.log($("#locationForm").serialize());
    return false;
}

const MapForm = (props) => {
    return (
        <div>
        <h1>Map Marker API</h1>
        
    <div id='map'></div>
    <form id="locationForm" 
            onSubmit={handleLocation} 
            name="locationForm" 
            action="/map"  
            method="POST"
            className="locationForm">

        <label htmlFor="locationName">name: </label>
        <input id="nameField" type="text" name="name" />
        <label htmlFor="latitide">Latitude: </label>
        <input id="latitudeField" type="float" name="latitude" />
        <label htmlFor="longitude">Longitude </label>
        <input id="longitudeField" type="float" name="longitude" />
        <label htmlFor="rating">Rating </label>
        <input id="ratingField" type="number" min="0" max = "5" step="1" name="rating" />
        <label htmlFor="review">Review </label>
        <input id="reviewField" type="text" name="review" />
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input type="submit" value="Add Location" />
    </form>
    
    </div>
    );
};



const LocationList = function(props) {
    console.log(props);
    if(props.locations.length === 0){
        return (
            <div className="locationList">
                <h3 className="noLocation">No Locations yet sucka</h3>
            </div>
        );
    }

    const locationNodes = props.locations.map(function(location) {
        
        return (
           <div key={location._id} className="location">
               <img src="/assets/img/gloop.jpg" alt="icon" className="iconDefault" />
               <h3 className="locationName"> Name: {location.name} </h3>
               <h3 className="locationLat"> Lat: {location.latitude} </h3>
               <h3 className="locationLng"> Lng: {location.longitude} </h3>
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



const loadLocationsFormServer = () => {
    sendAjax('GET', '/getLocations', null, (data) => {
        ReactDOM.render(
            <LocationList locations={data.locations} />, document.querySelector("#locations")
        );
    });
};

const setup = function(csrf) {
   
    ReactDOM.render(
        <MapForm csrf={csrf} />, document.querySelector("#mapContainer")
    );

    ReactDOM.render(
        <LocationList locations={[]} />, document.querySelector("#locations")
    );

  loadLocationsFormServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
    
};

$(document).ready(function() {
    getToken();
    
});

