import randomColor from '../../functions/randomColor';

export default function Color() {


    // return (
    //     <h1>Ate</h1>
    // );

    const B = 30;
    let C;

    if (B > 20) {
        C = 'Labas';
    } else {
        C = 'Ate';
    }

    // console.log(randomColor());

    const moreA = count => {
        let A = '';
        for (let i = 0; i < count; i++) {
            A += 'a';
        }
        return A;
    }


    return (
        <>
            <h3>{C} from color {randomColor()}</h3>
            <div>matematika:
                {
                    1 +
                    2 + 7
                    - 5
                }
                tokia suma</div>
            {/* <div>{const A = 40}</div> */}
            {/* {
                if (true) {
                    5 + 5
                } else {
                    5 * 5
                }
            } */}
            {
                10 > 11
                    ?
                    <b>{5 + 5}</b>
                    :
                    <b>{5 * 5}</b>
            }
            <h6>{moreA(10)}</h6>
        </>
    );


}