import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./SideBar.css";
import { connect } from "react-redux";
import { getHistory } from "../actions/historyActions";
import getEvent from "../events";

const SideBar = props => {
  const [history, setHistory] = React.useState(null);

  React.useEffect(() => {
    setHistory(props.history.history);
  }, [props.history.history]);

  React.useEffect(() => {
    async function fetchHistory() {
      await props.getHistory();
    }
    if (!props.history.loading && !history) fetchHistory();
  }, [history, props]);

  return (
    <Menu right {...props}>
      {history &&
        history.map((event, id) => {
          const { caption } = getEvent(event);

          return <span key={id}>{caption}</span>;
        })}
    </Menu>
  );
};

const mapStateToProps = state => ({
  history: state.history
});

export default connect(
  mapStateToProps,
  { getHistory }
)(SideBar);
