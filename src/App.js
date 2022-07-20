import { useState, useEffect } from "react";
import axios from "axios";
import { FaWind, FaMapMarkerAlt } from "react-icons/fa";

function App() {
    const [input, setInput] = useState("");
    const [cityName, setCityName] = useState("Erbil");
    const [countryName, setCountryName] = useState("Iraq");
    const [localTime, setLocalTime] = useState("");
    const [temp, setTemp] = useState("");
    const [condition, setCondition] = useState("");
    const [windSpeed, setWindSpeed] = useState("");
    const [windDir, setWindDir] = useState("");
    const [icon, setIcon] = useState();

    const getCityHandler = (e) => {
        e.preventDefault();
        setCityName(input);
    };

    useEffect(() => {
        // weather
        const weatherURL = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${cityName}&aqi=no`;
        axios
            .get(weatherURL)
            .then((res) => {
                setCondition(res.data.current.condition.text);
                setWindSpeed(res.data.current.wind_kph);
                setWindDir(res.data.current.wind_dir);
                setTemp(res.data.current.temp_c);
                setIcon(res.data.current.condition.icon);
                setCountryName(res.data.location.country);

                // getting the time
                const now = new Date(res.data.location.localtime);

                const time = now.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                setLocalTime(`${time}`);
            })
            .catch((err) => console.log(err));
    }, [cityName]);

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div
                    className="row container  mx-auto"
                    style={{ width: "400px" }}
                >
                    <form className="input-group" onSubmit={getCityHandler}>
                        <input
                            className="form-control"
                            placeholder="Cities in America"
                            autoComplete="off"
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                        />
                        <button
                            type="submit"
                            className="btn btn-outline-primary"
                            style={{ backgroundColor: "#fff" }}
                        >
                            search
                        </button>
                    </form>
                </div>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4">
                        <div
                            className="card"
                            style={{ color: "#4B515D", borderRadius: "35px" }}
                        >
                            <div className="card-body p-4">
                                <div className="d-flex">
                                    <h6 className="flex-grow-1">
                                        <FaMapMarkerAlt /> {cityName},{" "}
                                        {countryName}
                                    </h6>
                                    <h6>{localTime}</h6>
                                </div>

                                <div className="d-flex flex-column text-center mt-5 mb-4">
                                    <h1
                                        className="mb-0"
                                        style={{
                                            color: "#1C2331",
                                            fontSize: "4rem",
                                        }}
                                    >
                                        {" "}
                                        {temp}°C{" "}
                                    </h1>
                                    <span style={{ color: "#3600be" }}>
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
                                                <FaWind /> {windSpeed} Km/h,{" "}
                                                {windDir}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <img src={icon} width="100px" />
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
