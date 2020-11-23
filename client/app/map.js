let map;

const MapForm = (props) => {
    return (
        <div>
        <h1>Map Marker API</h1>
        
    <div id='map'></div>
    <form id="locationForm" action="/addLocation" method="post">
        <label htmlFor="locationName">name: </label>
        <input id="nameField" type="text" name="name" value="uluru"/>
        <label htmlFor="latitide">Latitude: </label>
        <input id="latitudeField" type="float" name="latitude" value="-25.344"/>
        <label htmlFor="longitude">Longitude </label>
        <input id="longitudeField" type="float" name="longitude" value="131.036"/>
        <label htmlFor="rating">Rating </label>
        <input id="ratingField" type="number" min="0" max = "5" step="1" name="rating" value="5"/>
        <label htmlFor="review">Review </label>
        <input id="reviewField" type="text" name="review" value="Biggest rock I ever did see!"/>
        <input type="submit" value="Add Location" />
    </form>
    <form id="locationFormGet" action="/getLocation" method="get">
      <label htmlFor="query">Search for a Specific Location</label>
      <input id="queryField" type="text" name="query"/>
        <input type="submit" value="Get Location" id="getButton" />
    <select id="methodSelect">
        <option value="get">GET</option>
        <option value="head">HEAD</option>
      </select>
    </form>
    <section id="content"></section>
    
    </div>
    );
};



const LocationList = function(props) {
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

 function initMap() {
    let uluru = {lat: -25.344, lng: 131.036};
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    console.log(map);
}

const setup = function(csrf) {
   
    ReactDOM.render(
        <MapForm csrf={csrf} />, document.querySelector("#mapContainer")
    );

    ReactDOM.render(
        <LocationList locations={[]} />, document.querySelector("#locations")
    );

    initMap();
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
    
};

$(document).ready(function() {
    getToken();
    
});

