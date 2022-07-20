import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [input, setInput] = useState("");
    const [cities, setCities] = useState([]);
    const [cityName, setCityName] = useState("");
    const [time, setTime] = useState("");
    const [temp, setTemp] = useState("");
    const [condition, setCondition] = useState("");
    const [windKPH, setWindKPH] = useState("");

    const getCityHandler = (e) => {
        e.preventDefault();
        setCityName(input);
    };

    useEffect(() => {
        // cities
        const citiesURL = `https://countriesnow.space/api/v0.1/countries/cities`;
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: "united states" }),
        };
        fetch(citiesURL, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setCityName(data.data[0]);
                setCities(data.data);
            });
        // weather
        const weatherURL = `http://api.weatherapi.com/v1/current.json?key=${
            process.env.REACT_APP_API_KEY
        }&q=${cityName || "Abbeville"}&aqi=no`;
        axios
            .get(weatherURL)
            .then((res) => {
                setCondition(res.data.current.condition.text);
                setWindKPH(res.data.current.wind_kph);
                setTemp(res.data.current.temp_c);
            })
            .catch((err) => console.log(err));
    }, [cityName]);

    // setting the time
    useEffect(() => {
        const now = new Date();

        const time = now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });

        setTime(`${time}`);
    }, []);

    return (
        <section className="vh-100" style={{ backgroundColor: "#ffffff" }}>
            <div className="container py-5 h-100">
                <div
                    className="row container  mx-auto"
                    style={{ width: "400px" }}
                >
                    <form className="input-group" onSubmit={getCityHandler}>
                        <input
                            className="form-control"
                            list="datalistOptions"
                            id="exampleDataList"
                            placeholder="Cities in America"
                            autoComplete="off"
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                        />
                        <datalist id="datalistOptions">
                            {cities.map((city) => {
                                return (
                                    <option value={city} key={city}>
                                        {city}
                                    </option>
                                );
                            })}
                        </datalist>
                        <button
                            type="submit"
                            className="btn btn-outline-primary"
                        >
                            search
                        </button>
                    </form>
                </div>
                <div className="row container d-flex justify-content-center align-items-center h-100 mx-auto">
                    <div className="col-md-8 col-lg-6 col-xl-4">
                        <div
                            className="card"
                            style={{ color: "#4B515D", borderRadius: "35px" }}
                        >
                            <div className="card-body p-4">
                                <div className="d-flex">
                                    <h6 className="flex-grow-1">{cityName}</h6>
                                    <h6>{time}</h6>
                                </div>

                                <div className="d-flex flex-column text-center mt-5 mb-4">
                                    <h6
                                        className="display-4 mb-0 font-weight-bold"
                                        style={{ color: "#1C2331" }}
                                    >
                                        {" "}
                                        {temp}°C{" "}
                                    </h6>
                                    <span
                                        className="small"
                                        style={{ color: "#868B94" }}
                                    >
                                        {condition}
                                    </span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <div
                                        className="flex-grow-1"
                                        style={{ fontSize: "1rem" }}
                                    >
                                        <div>
                                            <i
                                                className="fas fa-wind fa-fw"
                                                style={{ color: "#868B94" }}
                                            ></i>{" "}
                                            <span className="ms-1">
                                                {" "}
                                                {windKPH} km/h
                                            </span>
                                        </div>
                                        {/* <div>
                                            <i
                                                className="fas fa-tint fa-fw"
                                                style={{ color: "#868B94" }}
                                            ></i>{" "}
                                            <span className="ms-1"> 84% </span>
                                        </div>
                                        <div>
                                            <i
                                                className="fas fa-sun fa-fw"
                                                style={{ color: "#868B94" }}
                                            ></i>{" "}
                                            <span className="ms-1"> 0.2h </span>
                                        </div> */}
                                    </div>
                                    <div>
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp"
                                            width="100px"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default App;
