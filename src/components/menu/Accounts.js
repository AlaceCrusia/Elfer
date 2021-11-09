import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Menu.css";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap');
</style>;

function Accounts() {
  return (
    <div className="menu">
      <div>
        <header class="menu__header">
          <span class="menu__title">Accounts</span>
          <hr />
        </header>
        <div className="menu__content">
          <Card>
            <Card.Body fontSize="small">card body.</Card.Body>
          </Card>
          <Card>
            <Card.Body fontSize="small">card body.</Card.Body>
          </Card>
          <Card>
            <Card.Body fontSize="small">card body.</Card.Body>
          </Card>
          <Card>
            <Card.Body fontSize="small">card body.</Card.Body>
          </Card>
          <Card>
            <Card.Body fontSize="small">card body.</Card.Body>
          </Card>
          <Card>
            <Card.Body fontSize="small">card body.</Card.Body>
          </Card>
          <Card>
            <Card.Body fontSize="small">card body.</Card.Body>
          </Card>
        </div>
      </div>

      <footer className="menu__footer">
        <Button className="btn" variant="dark">
          Add Section
        </Button>{" "}
      </footer>
    </div>
  );
}

export default Accounts;
