import React, { useState, useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";

const ShoppingList = props => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      await props.getItems();
    }
    !items && fetchItems();

    !props.item.loading && setItems(props.item.items);
  }, [items, props]);

  const deleteItem = id => props.deleteItem(id);

  return (
    <div>
      <Container>
        <ListGroup>
          {items && (
            <TransitionGroup className="shopping-list">
              {items.map(({ _id, name }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    {props.isAuthenticated ? (
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={() => deleteItem(_id)}
                      >
                        &times;
                      </Button>
                    ) : null}

                    {name}
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
        </ListGroup>
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
