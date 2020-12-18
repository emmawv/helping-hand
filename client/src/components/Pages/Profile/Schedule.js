import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    MonthView,
    Appointments
} from '@devexpress/dx-react-scheduler-material-ui';


class Schedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            schedulerData: undefined
        }
    }

    componentDidMount = () => {
        const schedulerDataArr = []

        this.props.appointments.map(elm => {
            if (this.props.loggedUser.role === 'PATIENT') {
                const data = { startDate: elm.dateStart, endDate: elm.dateEnd, title: `${elm.psychId.name} ${elm.psychId.surname}` }
                schedulerDataArr.push(data)
            } else if (this.props.loggedUser.role === 'DOC') {
                const data = { startDate: elm.dateStart, endDate: elm.dateEnd, title: `${elm.userId.name} ${elm.userId.surname}` }
                schedulerDataArr.push(data)
            }
        })
        schedulerDataArr.sort((a, b) => a.startDate.localeCompare(b.startDate))
        this.setState({ schedulerData: schedulerDataArr })
    }

    render() {

        const { schedulerData } = this.state

        return (

            <Paper>
                <Scheduler
                    data={schedulerData}
                    height={300}
                >
                    <ViewState />
                    <MonthView />
                    <Appointments />
                </Scheduler>
            </Paper>
        )
    }
}

export default Schedule
