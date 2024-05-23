import Loader from "./Loader";
import StatusBadge from "./StatusBadge";
import LocationName from "./LocationName";

const SingleItemView = (props) => {
    return (
        <div className={"position-fixed top-0 start-0 bottom-0 end-0 bg-white " + (props.isOpen ? "" : "d-none")}>
            {props.data.name ?
            <>
                <button
                    type="button"
                    className="mt-4 me-4 position-absolute end-0 top-0 btn-close"
                    onClick={() => props.onChangeSingleItemOpenState(false)}
                ></button>

                <div className="container mt-5 d-flex align-items-center justify-content-center">
                    <div className="row row-cols-1 row-cols-md-1 g-1">
                        <div className="col">
                        <div className="card" style={{maxWidth: "350px"}}>
                            <img src={props.data.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{props.data.name}</h5>
                                <p className="card-text">
                                    {props.data.species} <StatusBadge status={props.data.status} />
                                </p>
                                <LocationName location={props.data.location} />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            :
            <div className="mt-5">
                <Loader />
            </div>
            }
        </div>
    );
};

export default SingleItemView;