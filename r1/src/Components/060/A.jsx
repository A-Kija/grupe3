import B from './B';

export default function A({count1}) {


    return (
        <fieldset className="border-sq">
            <legend>A</legend>
            <B count1={count1} />
        </fieldset>
    );
}