export default function Loader({show}) {


    if (!show) {
        return null;
    }

    return (
        <div className="loader-bin">
            <span className="loader"></span>
        </div>
    );

}