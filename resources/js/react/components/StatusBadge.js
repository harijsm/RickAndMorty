const StatusBadge = (props) => {
    let color = "badge bg-secondary";
    if (props.status === "Alive") {
        color = "badge bg-success";
    } else if (props.status === "Dead") {
        color = "badge bg-danger";
    }
    return <span className={color}>{props.status}</span>;
}

export default StatusBadge;