import { Map, GoogleApiWrapper } from 'google-maps-react';

const MapPage = (props) => {
    return (
        <div>
        <h1>Map Marker API</h1>
    
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
           <div>
            </div>
        );
    });

    return (
        <div className="locationList">
            {locationNodes}
        </div>
    );
};

 const MapContainer = function(props){
     return (
         <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 47.444, lng: -122.176}}
            />
     );
 }

const setup = function(csrf) {
   
    ReactDOM.render(
        <MapContainer />, document.querySelector("#map")
    )
   
    ReactDOM.render(
        <MapPage csrf={csrf} />, document.querySelector("#map")
    );

    ReactDOM.render(
        <LocationList locations={[]} />, document.querySelector("#locations")
    )
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
    
};

$(document).ready(function() {
    getToken();
    initMap();
});

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAhbypdR7ewb2NJ-73kum-rPI2oUzoXL5I'
})(MapContainer)