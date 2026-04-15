import { useEffect, useState, useRef } from 'react';
import LiveGraph from "../../components/LiveGraph/liveGraph";

const CPUDashboard = () => {

    const POLLING_INTERVAL = 1000; // Every second

    // Initialize State
    const [liveCPUData, setLiveCPUData] = useState<Array<{time: string, value: number}>>([]);
    const pollingRef = useRef(0);


    // ComponentWillUpdate
    useEffect(() => {
        const fetchMetrics = async () => {
            const cpu_response = await fetch('http://localhost:3000/cpu');
            const cpu_result = await cpu_response.json();

            const snapshot_response = await fetch('http://localhost:3000/snapshot');
            const snapshot_result = await snapshot_response.json();
            console.log(snapshot_result.data[0].timestamp);
            setLiveCPUData(prevData => {
                const timestamp = snapshot_result.data[0].timestamp;
                const timeLabel = new Date(timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });

                const newData = [...prevData, {time: timeLabel, value: cpu_result.data[0].usage_percent}];
                return newData.slice(-60);
            });

        };

        const beginPolling = () => {
            fetchMetrics();
            pollingRef.current = setInterval(() => {
                fetchMetrics();
            }, POLLING_INTERVAL);
        };

        beginPolling();

        return () => {
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
            }
        };

    }, []);

    return (
        <div>
            <LiveGraph 
                liveData={liveCPUData}
                name={"CPU Usage %"}
            />
        </div>
    );
}

export default CPUDashboard