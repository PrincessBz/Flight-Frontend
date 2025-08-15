import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
    const [airports, setAirports] = useState([]);
    const [selectedAirportId, setSelectedAirportId] = useState('');
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const formatTime = (isoString) => {
        return new Date(isoString).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // 1. Fetch all airports when the component first loads
    useEffect(() => {
        fetch('http://Flight-api-app1-env.eba-5t8pa5i9.us-east-2.elasticbeanstalk.com/api/airports')
            .then(response => response.json())
            .then(data => {
                setAirports(data);
                if (data.length > 0) {
                    setSelectedAirportId(data[0].id);
                }
            })
            .catch(err => setError('Could not fetch airports. Is the backend running?'));
    }, []);

    // 2. Fetch flights whenever the selectedAirportId changes
    useEffect(() => {
        if (!selectedAirportId) {
            setFlights([]);
            return;
        }
        setLoading(true);
        setError(null);
        setFlights([]);
        fetch(`http://Flight-api-app1-env.eba-5t8pa5i9.us-east-2.elasticbeanstalk.com/api/flights/departures?airportId=${selectedAirportId}`)
            .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
            .then(data => {
                setFlights(data);
            })
            .catch(err => {
                setError('Could not fetch flights. Check the airport ID and backend.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [selectedAirportId]);

    const handleAirportChange = (event) => {
        setSelectedAirportId(event.target.value);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Flight Departures</h1>
                <div className="controls">
                    <label htmlFor="airport-select">Select Airport:</label>
                    <select id="airport-select" value={selectedAirportId} onChange={handleAirportChange}>
                        {airports.map(airport => (
                            <option key={airport.id} value={airport.id}>
                                {airport.name} ({airport.code})
                            </option>
                        ))}
                    </select>
                </div>

                {error && <div className="error-message">{error}</div>}
                {loading && <div className="spinner"></div>}

                <table className="flights-table">
                    <thead>
                    <tr>
                        <th>Flight #</th>
                        <th>Airline</th>
                        <th>Destination</th>
                        <th>Departure Time</th>
                        <th>Gate</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {flights.length > 0 ? (
                        flights.map(flight => (
                            <tr key={flight.id}>
                                <td>{flight.flightNumber}</td>
                                <td>{flight.airlineName}</td>
                                <td>{flight.destinationAirport.code}</td>
                                <td>{formatTime(flight.departureTime)}</td>
                                <td>{flight.gateNumber}</td>
                                <td className={`status-${flight.status.toLowerCase().replace(' ', '-')}`}>
                                    {flight.status}
                                </td>

                            </tr>
                        ))
                    ) : (
                        !loading && (
                            <tr>
                                <td colSpan="6">No departures found for this airport.</td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            </header>
        </div>
    )
}

export default App