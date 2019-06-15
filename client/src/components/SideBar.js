import React, { useState, useContext } from "react";
import { slide as Menu } from "react-burger-menu";
import "./SideBar.css";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { getHistory } from "../actions/historyActions";
import getEvent from "../events";
import { distanceInWordsToNow } from "date-fns";

const MyContext = React.createContext();

// create the provider
export const MyProvider = props => {
  const [menuOpenState, setMenuOpenState] = useState(false);

  return (
    <MyContext.Provider
      value={{
        isMenuOpen: menuOpenState,
        toggleMenu: () => setMenuOpenState(!menuOpenState),
        stateChangeHandler: newState => setMenuOpenState(newState.isOpen)
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export const SideBarButton = () => {
  const ctx = useContext(MyContext);
  return (
    <Button
      size="sm"
      outline
      style={{ position: "absolute", top: "61px", right: "5px" }}
      onClick={ctx.toggleMenu}
    >
      History Feed
    </Button>
  );
};

const SideBar = props => {
  const [history, setHistory] = React.useState(null);
  const ctx = useContext(MyContext);

  React.useEffect(() => {
    setHistory(props.history.history);
  }, [props.history.history]);

  React.useEffect(() => {
    async function fetchHistory() {
      await props.getHistory(9);
    }
    if (!props.history.loading && !history) fetchHistory();
  }, [history, props]);

  const fetchMoreData = () => {
    props.getHistory(history.length + 5);
  };

  return (
    <Menu
      right
      disableAutoFocus
      pageWrapId={"page-wrap"}
      outerContainerId={"App"}
      customBurgerIcon={false}
      isOpen={ctx.isMenuOpen}
      onStateChange={state => ctx.stateChangeHandler(state)}
    >
      <>
        {history &&
          history.map((event, id) => {
            const { caption } = getEvent(event);

            return (
              <div style={{ marginTop: 7 }} key={id}>
                <span>{caption}</span>
                <span style={{ fontSize: "small", marginLeft: "23px" }}>
                  {`${distanceInWordsToNow(event.timestamp)} ago`}{" "}
                </span>
              </div>
            );
          })}
        {props.history.history.length < props.history.count ? (
          <Button
            style={{ width: "100%", marginTop: 7 }}
            onClick={fetchMoreData}
          >
            Load More
          </Button>
        ) : (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: 7,
              marginBottom: 7,
              borderTop: "1px solid grey",
              fontSize: "small"
            }}
          >
            No More Data
          </div>
        )}
      </>
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
