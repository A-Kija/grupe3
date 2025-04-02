import { useEffect, useRef, useState } from 'react';
import './App.css';


function App() {

    const [s1, setS1] = useState(3); // 1 s1 === 3
    const [s2, setS2] = useState(5); // 2 s2 === 5

    const [s3, setS3] = useState(8);

    const startas = useRef(false);

    const goFun = _ => {
        setS1(s => s + 2); // 3 s1 = 3 + 2 : 5
        setS2(s => s * s1); // 4 s2 = 5 * s1   s1 pas mus nespejo atsinaujint ir liko senas 3
    }

    const goOk = _ => {
        setS1(s => s + 2);
    }

    useEffect(_ => {

        if (s1 === 3) { // apeiname useEffect paleidima uzsikrovomo metu
            return;
        }

        setS2(s => s * s1 + s3);


    }, [s1, s3]); // 3 => 5


    useEffect(_ => {

        if (!startas.current) {
            startas.current = true;
            return;
        }


        console.log('s2, bet ne uzsikraunant');

    }, [s2]);


    useEffect(_ => console.log('EFEKTAS!'), []); // nuo nieko nepriklauso
    useEffect(_ => console.log('EFEKTAS S1!', s1), [s1]); // priklauso nuo s1


  return (
    <>
    <h1>USE EFFECT {s2}</h1>
    <button className="red" onClick={goFun}>Go</button>
    <button className="green" onClick={goOk}>Go OK</button>

    </>
  );
}

export default App;