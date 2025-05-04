import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import InputText from "../common/InputText";
import TableData from "../common/TableData/TableData";

import { validationString } from "../../utils/validaciones";

import webService from "../../services/webService";

import { Hotel } from "../../types/Hotel";

import "./formHotel.css";

type FormHotelProps = {
  setPopupAlert: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      msg: string;
      variant: string;
    }>
  >;
  datosHoteles: Hotel[];
  recargarDatos: () => Promise<void>;
};

function FormHotel({
  setPopupAlert,
  datosHoteles,
  recargarDatos,
}: FormHotelProps) {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [valuesError, setValuesError] = useState({
    nombre: false,
    direccion: false,
  });
  const [dataHotels, setDataHotels] = useState(datosHoteles);
  const [hotelUpdate, setHotelUpdate] = useState<Hotel | null>(null);

  useEffect(() => {
    setDataHotels(datosHoteles);
  }, [datosHoteles]);

  const handleSaveHotel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = {
      nombre: validationString(nombre),
      direccion: validationString(direccion),
    };

    if (!errors.nombre && !errors.direccion) {
      if (hotelUpdate) {
        const updateHotel: Hotel = {
          id: hotelUpdate.id,
          name: nombre,
          address: direccion,
        };
        const resp = await webService(
          "Hotel",
          "updateHotel",
          "PUT",
          updateHotel
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
        const newHotel: Hotel = { name: nombre, address: direccion };
        const resp = await webService("Hotel", "insertHotel", "POST", newHotel);

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

  const handleUpdateHotel = (dataUpdate: Hotel) => {
    setNombre(dataUpdate.name);
    setDireccion(dataUpdate.address);
    setHotelUpdate(dataUpdate);
  };

  const limpiarForm = (): void => {
    setNombre("");
    setDireccion("");
    setHotelUpdate(null);
    setValuesError({
      nombre: false,
      direccion: false,
    });
  };

  return (
    <Container>
      <Form onSubmit={(e) => handleSaveHotel(e)}>
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
            <Button className="btnGuardar2" variant="success" type="submit">
              Guardar
            </Button>

            <Button variant="primary" type="button" onClick={limpiarForm}>
              Limpiar Formulario
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="table">
        <TableData
          headers={["ID", "NOMBRE", "DIRECCIÓN"]}
          contentHotel={dataHotels}
          dataUpdateHotel={handleUpdateHotel}
        />
      </Row>
    </Container>
  );
}

export default FormHotel;
