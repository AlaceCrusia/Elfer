import * as React from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import "bootstrap/dist/css/bootstrap.min.css";
import "./IconTabs.css";

export default function IconTabs() {
  return (
    <div className="icontabs">
      <>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Link to="/Notes">
                    <Nav.Link eventKey="first" className="sidebar_nav">
                      <MenuBookRoundedIcon color="action" fontSize="small" />
                    </Nav.Link>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link to="/youtube">
                    <Nav.Link eventKey="second" className="sidebar_nav">
                      <SubscriptionsRoundedIcon
                        color="action"
                        fontSize="small"
                      />
                    </Nav.Link>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link to="/Notes">
                    <Nav.Link eventKey="third" className="sidebar_nav">
                      <ForumRoundedIcon color="action" fontSize="small" />
                    </Nav.Link>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link to="/chat/net">
                    <Nav.Link eventKey="fourth" className="sidebar_nav">
                      <AccountCircleRoundedIcon
                        color="action"
                        fontSize="small"
                      />
                    </Nav.Link>
                  </Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
      </>
    </div>
  );
}
