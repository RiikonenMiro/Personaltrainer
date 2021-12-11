import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import { BarChart, XAxis, YAxis, Bar, Tooltip} from 'recharts';

export default function Statistics() {

    const [trainings, setTrainings] = useState([]);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => {

                let trainingData = [];

                data.map(training => {
                    const duration = { name: training.activity, duration: training.duration };
                    trainingData.push(duration);
                })

                let result = _(data)
                    .groupBy("activity")
                    .map((name, id) => ({
                        name: id,
                        duration: _.sumBy(name, 'duration'),
                    }))
                    .value()
                setTrainings(result);
            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <h2>Statistics</h2>
            <p>Duration (min)</p>
            <BarChart style={{ marginTop: '10px' }} width={1200} height={600} data={trainings}>
                <XAxis dataKey="name" />
                <YAxis dataKey="duration" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="duration" fill="#4DCB88" />
            </BarChart>
        </div>
    );
}