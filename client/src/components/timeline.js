import React, { Component } from 'react';
import VerticalTimeline from './VerticalTimeline';
import VerticalTimelineElement from './VerticalTimelineElement';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    // fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
    fetch('http://localhost:5000/v2/total')
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json['total'],
          isLoaded: true
        });
      });
  }

  render() {
    let { items, isLoaded } = this.state;

    if (!isLoaded) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <VerticalTimeline className="vertial-timeline">
          {items.map(item => {
            return (
              <VerticalTimelineElement
                key={item.id}
                className="vertical-timeline-element"
                contentStyle={{ color: '#000' }}
                infoStyle={{ background: '#FBE0E0' }}
                date={item.date}
                dateStyle={{ color: '#000' }}
                iconStyle={{ background: '#000', color: '#fff' }}
                stats={{
                  totalConf: item.confirmed,
                  confPctIncDec: '(^872 / 0.44%)',
                  totalDead: item.deaths,
                  deadPctIncDec: '(^43 / 0.54%)',
                  totalRecr: item.recovered,
                  recrPctIncDec: '(^1,110 / 1.35%)'
                }}
              >
                <h3 className="vertical-timeline-element-title">
                  <u>WHAT HAPPEND ON THIS DAY?</u>
                </h3>
                <p>
                  [summary point 1] Lorem ipsum dolor sit amet, consectetur do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  [summary point 2] Lorem ipsum dolor sit a adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  [summary point 3] Lorem ipsum dolor sit amet, consectetur do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </VerticalTimelineElement>
            );
          })}
          <VerticalTimelineElement iconStyle={{ background: '#000', color: '#fff' }} />
        </VerticalTimeline>
      );
    }
  }
}

export default Timeline;
