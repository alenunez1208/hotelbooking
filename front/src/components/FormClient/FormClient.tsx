import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import InputText from "../common/InputText";
import TableData from "../common/TableData/TableData";

import { validationString } from "../../utils/validaciones";

import webService from "../../services/webService";

import { Client } from "../../types/Client";

import "./formClient.css";

type FormClientProps = {
  setPopupAlert: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      msg: string;
      variant: string;
    }>
  >;
  datosClientes: Client[];
  recargarDatos: () => Promise<void>;
};

function FormClient({
  setPopupAlert,
  datosClientes,
  recargarDatos,
}: FormClientProps) {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [valuesError, setValuesError] = useState({
    nombre: false,
    direccion: false,
    telefono: false,
  });
  const [dataClients, setDataClients] = useState(datosClientes);
  const [clientUpdate, setClientUpdate] = useState<Client | null>(null);

  useEffect(() => {
    setDataClients(datosClientes);
  }, [datosClientes]);

  const handleSaveClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = {
      nombre: validationString(nombre),
      direccion: validationString(direccion),
      telefono: validationString(telefono),
    };

    if (!errors.nombre && !errors.direccion) {
      if (clientUpdate) {
        const updateClient: Client = {
          id: clientUpdate.id,
          name: nombre,
          address: direccion,
          phone: telefono,
        };
        const resp = await webService(
          "Client",
          "updateClient",
          "PUT",
          updateClient
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
        const newClient: Client = {
          name: nombre,
          address: direccion,
          phone: telefono,
        };
        const resp = await webService(
          "Client",
          "insertClient",
          "POST",
          newClient
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

  const handleUpdateClient = (dataUpdate: Client) => {
    setNombre(dataUpdate.name);
    setDireccion(dataUpdate.address);
    setTelefono(dataUpdate.phone);
    setClientUpdate(dataUpdate);
  };

  const limpiarForm = (): void => {
    setNombre("");
    setDireccion("");
    setTelefono("");
    setClientUpdate(null);
    setValuesError({
      nombre: false,
      direccion: false,
      telefono: false,
    });
  };

  return (
    <Container>
      <Form onSubmit={(e) => handleSaveClient(e)}>
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
          <Col>
            <InputText
              label="Teléfono"
              placeholder="Teléfono"
              type="text"
              onChangeEvent={setTelefono}
              error={valuesError.telefono}
              value={telefono}
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
          headers={["ID", "NOMBRE", "DIRECCIÓN", "TELÉFONO"]}
          contentClient={dataClients}
          dataUpdateClient={handleUpdateClient}
        />
      </Row>
    </Container>
  );
}

export default FormClient;
