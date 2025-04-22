import C from './C';

export default function B({count1}) {


    return (
        <fieldset className="border-sq">
            <legend>B</legend>
            <C count1={count1} />
        </fieldset>
    );
}