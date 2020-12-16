import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';


class Schedule extends Component {
    constructor() {
        super()
        this.state = {
            currentDate: Date.now(),
            schedulerData: undefined
        }
    }

    componentDidMount = () => this.props.appointments.map(elm => {
        const schedulerDataArr = []
        const data = { startDate: elm.dateStart, endDate: elm.dateEnd, title: `${elm.psychId.name} ${elm.psychId.surname}` }
        schedulerDataArr.push(data)
        this.setState({ schedulerData: schedulerDataArr })
    })

    render() {

        return (
            <Paper>
                {this.state.schedulerData ?
                <Scheduler
                        data={this.state.schedulerData}
                    >
                    <ViewState />
                    <WeekView 
                        startDayHour={11}
                        endDayHour={19}
                    />
                    <Appointments />
                    </Scheduler>
                    : null}
            </Paper>
        )
    }
}

export default Schedule
