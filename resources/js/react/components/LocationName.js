const LocationName = (props) => {
    let locationName = _.get(props.location, "name", "Unknown");
    return (
        <p className="card-text">
            <small className="text-muted">Last known location:</small> <span>{locationName}</span>
        </p>
    );
};

export default LocationName;