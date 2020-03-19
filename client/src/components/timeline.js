import React, { Component } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false  
        }
    }

    componentDidMount() {
        // fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
        fetch('http://localhost:5000/v2/total')
        .then(res => res.json())
        .then(json => {
            this.setState({
                items: json['total'],
                isLoaded: true
            })
        })
    }

    render() {
        let { items, isLoaded }  = this.state

        if (!isLoaded) {
            return <h1>Loading...</h1>
        }
        else {
            return (
                <VerticalTimeline layout="1-column">
                    {items.map(item => (
                        <VerticalTimelineElement
                            key={item.id}
                            contentStyle={{ color: "#000" }}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        >
                            <h3 className="vertical-timeline-element-title">{item.date}</h3>
                            <h5>Confirmed: {item.confirmed}</h5>      
                            <h5>Deaths: {item.deaths}</h5>
                            <h5>Recovered: {item.recovered}</h5>
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            )
        }
    }
}

export default Timeline;