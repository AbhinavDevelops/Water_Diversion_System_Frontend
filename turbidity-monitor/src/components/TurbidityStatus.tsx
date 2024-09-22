import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Status {
    water_there: boolean;
    turbidity: number;
}

const TurbidityStatus: React.FC = () => {
    const [status, setStatus] = useState<Status>({
        water_there: false,
        turbidity: 0,
    });

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get<Status>('http://localhost:3000/status');
                setStatus(response.data);
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ textAlign: 'center', color: '#333', fontSize: '2rem', marginBottom: '20px' }}>Turbidity Monitor</h1>
            {status.water_there ? (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '1.2rem', color: '#555' }}>There is water</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>Turbidity: {status.turbidity}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '20px' }}>
                        {status.turbidity > 2500 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <p style={{ color: '#D32F2F', fontWeight: 'bold' }}>High turbidity</p>
                                <p style={{ color: '#D32F2F', marginBottom: '10px' }}>Diverting to red LED</p>
                                <div style={{
                                    backgroundColor: 'red',
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 10px rgba(255, 0, 0, 0.7)',
                                }}></div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <p style={{ color: '#388E3C', fontWeight: 'bold' }}>Low turbidity</p>
                                <p style={{ color: '#388E3C', marginBottom: '10px' }}>Diverting to green LED</p>
                                <div style={{
                                    backgroundColor: 'green',
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 10px rgba(0, 255, 0, 0.7)',
                                }}></div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#555' }}>There is no water</p>
            )}
        </div>
    );
};

export default TurbidityStatus;
