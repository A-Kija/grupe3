export default function Vartai({children, vartai}) {


    if (vartai) {
        return (
            <>
            {children}
            </>
        );
    }


    return <h2>Vartai uždaryti</h2>; 
}