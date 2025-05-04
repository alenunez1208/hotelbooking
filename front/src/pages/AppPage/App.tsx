import { useState, useEffect } from "react";
import { Container, Row, Col, Tabs, Tab, Alert } from "react-bootstrap";

import "../../style/App.css";

import FormHotelBooking from "../../components/FormHotelBooking/FormHotelBooking";
import FormHotel from "../../components/FormHotel/FormHotel";
import FormClient from "../../components/FormClient/FormClient";

import webService from "../../services/webService";

function App() {
  const [popupAlert, setPopupAlert] = useState({
    open: false,
    msg: "",
    variant: "",
  });
  const [datosClientes, setDatosClientes] = useState([]);
  const [datosHotel, setDatosHotel] = useState([]);
  const [datosHotelBooking, setDatosHotelBooking] = useState([]);

  useEffect(() => {
    handleCargarDatosHoteles();
    handleCargarDatosClientes();
    handleCargarDatosHotelesBooking();
  }, []);

  const handleCargarDatosHoteles = async () => {
    const resp = await webService("Hotel", "getHotel", "GET");
    setDatosHotel(resp?.data);
  };

  const handleCargarDatosClientes = async () => {
    const resp = await webService("Client", "getClient", "GET");
    console.log(resp);
    setDatosClientes(resp?.data);
  };
  const handleCargarDatosHotelesBooking = async () => {
    const resp = await webService("HotelBooking", "getHotelBooking", "GET");
    setDatosHotelBooking(resp?.data);
  };

  return (
    <Container fluid>
      <Row>
        <div className="header">
          <h1>Hotel Booking</h1>
        </div>
      </Row>

      <Row>
        <Col>
          {popupAlert.open && (
            <Alert
              variant={popupAlert.variant}
              className="popup"
              onClose={() =>
                setPopupAlert({
                  open: false,
                  msg: "",
                  variant: "",
                })
              }
              dismissible
            >
              <Alert.Heading>{popupAlert.msg}</Alert.Heading>
            </Alert>
          )}
          <Tabs
            defaultActiveKey="hotelbooking"
            id="fill-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="hotelbooking" title="Reservas">
              <FormHotelBooking
                datosReservas={datosHotelBooking}
                datosClientes={datosClientes}
                datosHoteles={datosHotel}
                recargarDatos={handleCargarDatosHotelesBooking}
                setPopupAlert={setPopupAlert}
              />
            </Tab>
            <Tab eventKey="hotel" title="Hoteles">
              <FormHotel
                datosHoteles={datosHotel}
                recargarDatos={handleCargarDatosHoteles}
                setPopupAlert={setPopupAlert}
              />
            </Tab>
            <Tab eventKey="client" title="Clientes">
              <FormClient
                datosClientes={datosClientes}
                recargarDatos={handleCargarDatosClientes}
                setPopupAlert={setPopupAlert}
              />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
