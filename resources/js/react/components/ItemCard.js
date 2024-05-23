import StatusBadge from "./StatusBadge";
import LocationName from "./LocationName";

const ItemCard = (props) => {
    const name = _.get(props.data, "name", "");
    const species = _.get(props.data, "species", "");
    const status = _.get(props.data, "status", "");
    const image = _.get(props.data, "image", "");
    const location = _.get(props.data, "location", {});

    return (
        <div className="col" role='button' onClick={() => props.onClickItem(true, props.data)}>
            <div className="card mb-4">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={image}
                            className='card-img-top'
                            alt={name}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">
                                {species} <StatusBadge status={status} />
                            </p>
                            <LocationName location={location} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;