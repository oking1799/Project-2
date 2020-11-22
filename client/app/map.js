const MapPage = (props) => {
    return (
        <div>
        <h1>Map Marker API</h1>
    <div id="map"></div>
    <form id="locationForm" action="/addLocation" method="post">
        <label for="locationName">name: </label>
        <input id="nameField" type="text" name="name" value="uluru"/>
        <label for="latitide">Latitude: </label>
        <input id="latitudeField" type="float" name="latitude" value="-25.344"/>
        <label for="longitude">Longitude </label>
        <input id="longitudeField" type="float" name="longitude" value="131.036"/>
        <label for="rating">Rating </label>
        <input id="ratingField" type="number" min="0" max = "5" step="1" name="rating" value="5"/>
        <label for="review">Review </label>
        <input id="reviewField" type="text" name="review" value="Biggest rock I ever did see!"/>
        <input type="submit" value="Add Location" />
    </form>
    <form id="locationFormGet" action="/getLocation" method="get">
      <label for="query">Search for a Specific Location</label>
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

const locationList = function(props) {
    if(props.locations.length === 0){
        return (
            <div className="locationList">
                <h3 className="noLocation">No Locations yet</h3>
            </div>
        );
    }

    const locationNodes = props.locations.map(function(location) {
        //console.log("talent" + domo.talent)
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

const setup = function(csrf) {
    ReactDOM.render(
        <MapPage csrf={csrf} />, document.querySelector("#map")
    );

    ReactDOM.render(
        <locationList locations={[]} />, document.querySelector("#locations")
    )
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});