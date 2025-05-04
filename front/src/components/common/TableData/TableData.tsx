import React from "react";
import { Table } from "react-bootstrap";

import { Hotel } from "../../../types/Hotel";
import { Client } from "../../../types/Client";
import { HotelBookingComplete } from "../../../types/HotelBooking";

import "./tableData.css";

type TableDataProps = {
  headers: string[];
  contentClient?: Client[];
  contentHotel?: Hotel[];
  contentHotelBooking?: HotelBookingComplete[];
  dataUpdateHotel?: (dataUpdate: Hotel) => void;
  dataUpdateClient?: (dataUpdate: Client) => void;
  dataUpdateHotelBooking?: (dataUpdate: HotelBookingComplete) => void;
};

function TableData({
  headers,
  contentClient,
  contentHotel,
  contentHotelBooking,
  dataUpdateHotel,
  dataUpdateClient,
  dataUpdateHotelBooking,
}: TableDataProps) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers.map((tit) => (
            <th key={tit}>{tit}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataUpdateClient && contentClient ? (
          contentClient.map((client) => (
            <tr
              className="rowTable"
              onClick={() => dataUpdateClient(client)}
              key={client.id}
            >
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.address}</td>
              <td>{client.phone}</td>
            </tr>
          ))
        ) : dataUpdateHotelBooking && contentHotelBooking ? (
          contentHotelBooking.map((hotelBook) => (
            <tr
              className="rowTable"
              onClick={() => dataUpdateHotelBooking(hotelBook)}
              key={hotelBook.id}
            >
              <td>{hotelBook.id}</td>
              <td>{hotelBook.name}</td>
              <td>{hotelBook.address}</td>
              <td>{hotelBook.clientName}</td>
              <td>{hotelBook.hotelName}</td>
            </tr>
          ))
        ) : dataUpdateHotel && contentHotel ? (
          contentHotel.map((hotel) => (
            <tr
              className="rowTable"
              onClick={() => dataUpdateHotel(hotel)}
              key={hotel.id}
            >
              <td>{hotel.id}</td>
              <td>{hotel.name}</td>
              <td>{hotel.address}</td>
            </tr>
          ))
        ) : (
          <>NO HAY DATOS</>
        )}
      </tbody>
    </Table>
  );
}

export default TableData;
