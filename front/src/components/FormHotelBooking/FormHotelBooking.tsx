import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";

import { Hotel } from "../../types/Hotel";
import { Client } from "../../types/Client";
import { HotelBooking, HotelBookingComplete } from "../../types/HotelBooking";

import InputText from "../common/InputText";
import TableData from "../common/TableData/TableData";

import "./formHotelBooking.css";

import { converSelectFormat } from "../../utils/generics";
import { validationString } from "../../utils/validaciones";

import webService from "../../services/webService";

type FormHotelBookingProps = {
  setPopupAlert: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      msg: string;
      variant: string;
    }>
  >;
  datosReservas: HotelBookingComplete[];
  recargarDatos: () => Promise<void>;
  datosClientes: Client[];
  datosHoteles: Hotel[];
};

function FormHotelBooking({
  setPopupAlert,
  datosReservas,
  recargarDatos,
  datosClientes,
  datosHoteles,
}: FormHotelBookingProps) {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [hotelSelect, setHotelSelect] = useState<Hotel | null>(null);
  const [clientSelect, setClientSelect] = useState<Client | null>(null);
  const [valuesError, setValuesError] = useState({
    nombre: false,
    direccion: false,
    client: false,
    hotel: false,
  });
  const [dataHotelsBooking, setDataHotelsBooking] = useState(datosReservas);
  const [hotelBookingUpdate, setHotelBookingUpdate] =
    useState<HotelBookingComplete | null>(null);

  useEffect(() => {
    setDataHotelsBooking(datosReservas);
  }, [datosReservas]);

  const handleSaveHotelBooking = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const errors = {
      nombre: validationString(nombre),
      direccion: validationString(direccion),
      client: clientSelect === null,
      hotel: hotelSelect === null,
    };

    if (
      !errors.nombre &&
      !errors.direccion &&
      !errors.client &&
      !errors.client
    ) {
      if (hotelBookingUpdate) {
        const updateHotelBooking: HotelBooking = {
          id: hotelBookingUpdate.id,
          name: nombre,
          address: direccion,
          clientId: clientSelect?.id ?? 0,
          hotelId: hotelSelect?.id ?? 0,
        };
        const resp = await webService(
          "HotelBooking",
          "updateHotelBooking",
          "PUT",
          updateHotelBooking
        );

        if (resp?.status === 200) {
          setPopupAlert({
            open: true,
            msg: resp.data.message,
            variant: "success",
          });
        } else {
          setPopupAlert({
            open: true,
            msg: "Error en la acción",
            variant: "danger",
          });
        }
      } else {
        const newHotelBooking: HotelBooking = {
          name: nombre,
          address: direccion,
          clientId: clientSelect?.id ?? 0,
          hotelId: hotelSelect?.id ?? 0,
        };
        const resp = await webService(
          "HotelBooking",
          "insertHotelBooking",
          "POST",
          newHotelBooking
        );

        if (resp?.status === 200) {
          setPopupAlert({
            open: true,
            msg: resp.data.message,
            variant: "success",
          });
        } else {
          setPopupAlert({
            open: true,
            msg: "Error en la acción",
            variant: "danger",
          });
        }
      }

      recargarDatos();
      limpiarForm();
    }

    setValuesError(errors);
  };

  const handleUpdateHotelBooking = (dataUpdate: HotelBookingComplete) => {
    setNombre(dataUpdate.name);
    setDireccion(dataUpdate.address);
    setClientSelect(
      datosClientes.find((cli) => dataUpdate.clientId === cli.id) || null
    );
    setHotelSelect(
      datosHoteles.find((hot) => dataUpdate.hotelId === hot.id) || null
    );
    setHotelBookingUpdate(dataUpdate);
  };

  const limpiarForm = (): void => {
    setNombre("");
    setDireccion("");
    setClientSelect(null);
    setHotelSelect(null);
    setHotelBookingUpdate(null);
    setValuesError({
      nombre: false,
      direccion: false,
      client: false,
      hotel: false,
    });
  };

  return (
    <Container>
      <Form onSubmit={(e) => handleSaveHotelBooking(e)}>
        <Row>
          <Col>
            <InputText
              label="Nombre"
              placeholder="Nombre"
              type="text"
              onChangeEvent={setNombre}
              error={valuesError.nombre}
              value={nombre}
            />
          </Col>
          <Col>
            <InputText
              label="Dirección"
              placeholder="Dirección"
              type="text"
              onChangeEvent={setDireccion}
              error={valuesError.direccion}
              value={direccion}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Clientes</Form.Label>
              <Select
                options={converSelectFormat(datosClientes)}
                onChange={(val) => {
                  setClientSelect(
                    val
                      ? datosClientes.find(
                          (client) => client.id === val.value
                        ) || null
                      : null
                  );
                }}
                value={
                  clientSelect
                    ? { value: clientSelect.id, label: clientSelect.name }
                    : null
                }
                placeholder={"Selecciona un cliente"}
                isClearable
                className={valuesError.client ? "errorSelect" : ""}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Hoteles</Form.Label>
              <Select
                options={converSelectFormat(datosHoteles)}
                onChange={(val) => {
                  setHotelSelect(
                    val
                      ? datosHoteles.find((hotel) => hotel.id === val.value) ||
                          null
                      : null
                  );
                }}
                value={
                  hotelSelect
                    ? { value: hotelSelect.id, label: hotelSelect.name }
                    : null
                }
                placeholder={"Selecciona un hotel"}
                isClearable
                className={valuesError.hotel ? "errorSelect" : ""}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="btnGuardar" variant="success" type="submit">
              Guardar
            </Button>

            <Button
              className="btnGuardar"
              variant="primary"
              type="button"
              onClick={limpiarForm}
            >
              Limpiar Formulario
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="table">
        <TableData
          headers={["ID", "NOMBRE", "DIRECCIÓN", "CLIENTE", "HOTEL"]}
          contentHotelBooking={dataHotelsBooking}
          dataUpdateHotelBooking={handleUpdateHotelBooking}
        />
      </Row>
    </Container>
  );
}

export default FormHotelBooking;
