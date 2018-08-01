import React from "react";


class Sender extends React.Component {
  render() {
    return (
      this.props.history.map((msgs, i) => {
        return (
          <div key={i} className={(msgs.id === this.props.sender) ? 'message message-personal new' : 'message message new' }>
            <h2 key={i}> {msgs.msg} </h2>
          </div>
        )
      })
    )
	}
}

export default Sender;
