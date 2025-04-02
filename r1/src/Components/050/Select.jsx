export default function Select() {

    const animals = [
        {id: 5, animal: 'Bebras'},
        {id: 8, animal: 'Zebras'},
        {id: 15, animal: 'Barsukas'},
        {id: 57, animal: 'Briedis'},
        {id: 552, animal: 'Zuikis'}
    ]


    return (
        <fieldset>
            <legend>Select</legend>
            <div className="result"></div>
            <select value="57">
                {
                   animals.map(a => 
                    <option key={a.id} value={a.id}>{a.animal}</option>
                   ) 
                }
            </select>
        </fieldset>
    );

}