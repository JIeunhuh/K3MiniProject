import './tt.css'

const Test= () => {
    // useState 사용
    // const [locations, setLocations] = useState([]);
    // const getData = () => {
    //             let url = 'http://10.125.121.176:8080/restaurants';
    
    //             //fetch()
    //             fetch(url)
    //                 .then((resp) => resp.json())
    //                 .then((data) => setLocations(data))
    //                 .catch((err) => console.log(err));
    //         }
    // console.log(locations);
    // getData();
  return(
    <header class="masthead">
    <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
        <div class="d-flex justify-content-center">
            <div class="text-center">
                <h1 class="mx-auto my-0 text-uppercase">Grayscale</h1>
                <h2 class="text-white-50 mx-auto mt-2 mb-5">Test</h2>
                    <div class="button-container button-m">
                      <a class="btn btn-primary" href="https://github.com/">BT Test1</a>
                      <a class="btn btn-primary" href="https://github.com/sou05091/K3MiniProject">BT Test2</a>
                    </div>
           </div>
        </div>
    </div>
    </header>
);
}
export default Test;