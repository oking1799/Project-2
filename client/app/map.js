const handleLocation = (e) => {
    e.preventDefault();

    if($("#nameField").val() == '' || $("#countryField").val() == ''){
        handleError("a name and a country are needed");
        return false;
    }

    sendAjax('POST', $("#locationForm").attr("action"), $("#locationForm").serialize(), function() {
        loadLocationsFormServer();
    });
    console.log($("#locationForm").attr("action"));
    return false;
};

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



const LocationList = function(props) {
    console.log(props);
    if(props.locations.length === 0){
        return (
            <div className="locationList">
                <h3 className="noLocation">No Locations yet</h3>
            </div>
        );
    }

    const locationNodes = props.locations.map(function(location) {
        
        return (
           
           <div key={location._id} className="location">
               
               <h3 className="locationName"> Name: {location.name} </h3>
               <h3 className="locationCountry"> Country: {location.country} </h3>
               <h3 className="locationDescription"> description: {location.description} </h3>
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

