import { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import "./liveGraph.css";

const LiveGraph = (props) => {

    // ComponentDidMount / ComponentWillUnmount
    useEffect(() => {
        
    }, []);

    // ComponentWillUpdate
    useEffect(() => {

    }, []);

    return (
        <ResponsiveContainer width="80%" height={400}>
            <LineChart width={800} height={400} data={props.liveData}> 
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis 
                    dataKey="time"
                    type="auto"
                    domain={['dataMin', 'dataMax']}
                />
                <YAxis 
                    domain={['auto', 'auto']}
                     width={60}
                />
                <Tooltip />
                <Legend />
                <Line 
                    name={props.name}
                    dataKey={"value"}
                    type="monotone"
                    stroke="#01fd26"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );

}

export default LiveGraph;
