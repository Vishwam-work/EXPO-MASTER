import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip);
export default function Analysis() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [consigneeData, setConsigneeData] = useState({});

  const [flag, setFlag] = useState(false);
  const [selectblno, setselectblno] = useState([]);
  const [blno, setblno] = useState("");

  const [bldraftdetail, setbldraftdetail] = useState({
    blno: "",
    bldraft: "",
    invoiceno: "",
    invociedate: "",
    container: "",
    csseal: "",
    sb: "",
    bl: "",
    advamount: "",
    remaamount: "",
    porforno: "",
    porfordate: "",
    purno: "",
    ponodate: "",
    custname: "",
    custadd: "",
    custbank: "",
    custcountry: "",
    currency: "",
    product: "",
    quantity: "",
    unit: "",
    rate: "",
    rateunit: "",
    shipmentterm: "",
    paymentterm: "",
    totalbag: "",
    documents: "",
    countryload: "",
    countrydis: "",
    portload: "",
    portdis: "",
    packaging: "",
    shipmentdate: "",
    Consignee: "",
    Notify: "",
    NetWeight: "",
    GrossWeight: "",
    PreCarriage: "",
    SalesBroker: "",
    Amount: "",
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/expo/get_all_details/${blno}/`)
      .then((response) => {
        setbldraftdetail(response.data);
        setFlag(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [blno]);

  console.log("---==>", bldraftdetail);
  useEffect(() => {
    if (selectedMonth && selectedYear) {
      //   axios.get(`http://127.0.0.1:8000/expo/get_analysis_data/${selectedMonth}/${selectedYear}/`)
      axios
        .get(
          `http://127.0.0.1:8000/expo/get_analysis_data/?month=${selectedMonth}&year=${selectedYear}`
        )
        .then((response) => {
          setConsigneeData(response.data.consignee_totals);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedMonth, selectedYear]);
  const consigneeArray = Object.entries(consigneeData).map(([name, value]) => ({
    name,
    value,
  }));
  console.log(Object.keys(consigneeData));
  console.log("--=-=-=-=>", consigneeArray);
  const data = {
    labels: Object.keys(consigneeData),
    datasets: [
      {
        data: Object.values(consigneeData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          position: "bottom",
        },
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          console.log("------------------>", data);
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var label = dataset.labels[tooltipItem.index] || "";

          return label + ": $" + dataset.data[tooltipItem.index];
        },
      },
    },
  };

  const chartSize = {
    width: 400, // Set the width of the chart
    height: 400, // Set the height of the chart
  };
  //   console.log(data.datasets)
  //   console.log(consigneeData)

  function handlebldraft(e) {
    const getblno = e.target.options[e.target.selectedIndex].text;
    setblno(getblno);
  }
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/expo/blonly/")
      .then((response) => {
        setselectblno(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className="main-container">
      <div
        className="analysis"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div
          className="inputs"
          style={{ height: "100%", width: "40%", textAlign: "center" }}
        >
          <h3>Please Select Month and Year</h3>
          <select
            name="month"
            className="form-control"
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">-- Select Month -- </option>
            <option value="JAN">January</option>
            <option value="FEB">February</option>
            <option value="MARCH">March</option>
            <option value="April">April</option>
            <option value="MAY">May</option>
            <option value="JUNE">June</option>
            <option value="JULY">July</option>
            <option value="AUG">August</option>
            <option value="SEPT">September</option>
            <option value="OCT">October</option>
            <option value="NOV">November</option>
            <option value="DEC">December</option>
          </select>
          <select
            name="month"
            className="form-control"
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">-- Select Year -- </option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div
          className="chart-analysis"
          style={{ height: "500px", width: "500px", textAlign: "center" }}
        >
          Total Sale By Consignee
          <Pie data={data} options={options} {...chartSize} />
        </div>
      </div>
      <div className="table" style={{ marginTop: "50px" }}>
        <Table striped bordered hover size="sm">
          <thead className="thead-dark">
            <tr>
              <th>Consignee</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {consigneeArray.map((consignee, index) => (
              <tr key={index}>
                <td>{consignee.name}</td>
                <td>{consignee.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="track" style={{ marginTop: "20px" }}>
        <h1>Track details of Complete Order</h1>
        <div className="dropdown">
          <select
            name="cus"
            className="form-control"
            onChange={(e) => {
              handlebldraft(e);
            }}
          >
            <option> --Select the No -- </option>
            {selectblno.map((option, index) => (
              <option key={index} value={option.blno}>
                {" "}
                {option.blno}{" "}
              </option>
            ))}
          </select>
        </div>
        <div className="trackblock">
          {flag == false ? (
            <div></div>
          ) : (
            <div className="main">
              <div
                className="purchaseorder"
                style={{
                  border: "2px solid black",
                  width: "50%",
                  marginTop: "20px",
                  marginLeft: "20%",
                }}
              >
                <h3>Purchase order : {bldraftdetail.purno}</h3>
                <ul>
                  <li>Purchase No : {bldraftdetail.purno}</li>
                  <li>Purchase Date : {bldraftdetail.ponodate}</li>
                  <li>Customer Name :{bldraftdetail.custname}</li>
                  <li>Customer bank :{bldraftdetail.custbank}</li>
                  <li>Customer Quatity :{bldraftdetail.quantity}</li>
                  <li>BlDraft :{bldraftdetail.unit}</li>
                </ul>
              </div>
              <div
                className="porforma"
                style={{
                  border: "2px solid black",
                  width: "50%",
                  marginTop: "20px",
                  marginLeft: "20%",
                }}
              >
             
                <h3>Porforma Invoice : {bldraftdetail.porforno}</h3>
                <ul>
                  <li>Purchase No : {bldraftdetail.porforno}</li>
                  <li>Purchase Date : {bldraftdetail.porfordate}</li>
                  <li>Product :{bldraftdetail.product}</li>
                  <li>Shipment Term :{bldraftdetail.shipmentterm}</li>
                  <li>Payment Term :{bldraftdetail.paymentterm}</li>
              
                  <li>Total Bag :{bldraftdetail.totalbag}</li>
                  <li>Consignee :{bldraftdetail.Consignee}</li>
                  <li>Amount :{bldraftdetail.Amount}</li>
                </ul>
              </div>
              <div
                className="invoice"
                style={{
                  border: "2px solid black",
                  width: "50%",
                  marginTop: "20px",
                  marginLeft: "20%",
                }}
              >
             
                <h3>Invoice : {bldraftdetail.invoiceno}</h3>
                <ul>
                  <li>Invoice No : {bldraftdetail.invoiceno}</li>
                  <li>Inovice Date : {bldraftdetail.invociedate}</li>
                  <li>Product :{bldraftdetail.container}</li>
                  <li>Csseal :{bldraftdetail.csseal}</li>
                  <li>sb :{bldraftdetail.sb}</li>
                  <li>Unit :{bldraftdetail.unit}</li>
                  <li>Advance :{bldraftdetail.advamount}</li>
                  <li>Remain Amount :{bldraftdetail.remaamount}</li>
                  <li>PreCarriage :{bldraftdetail.PreCarriage}</li>
                  <li>Sales Broker :{bldraftdetail.SalesBroker}</li>
                </ul>
              </div>
              <div
                className="bldraft"
                style={{
                  border: "2px solid black",
                  width: "50%",
                  marginTop: "20px",
                  marginLeft: "20%",
                }}
              >
                








             
                <h3>BL Draft No : {bldraftdetail.blno}</h3>
                <ul>
                  <li>Invoice No : {bldraftdetail.blno}</li>
                  <li>Inovice Date : {bldraftdetail.bldraft}</li>
                  <li>Product :{bldraftdetail.product}</li>
                  <li>documents :{bldraftdetail.documents}</li>
                  <li>custname :{bldraftdetail.custname}</li>
                  <li>custcountry :{bldraftdetail.custcountry}</li>
                  <li>NetWeight :{bldraftdetail.NetWeight}</li>
                  <li>GrossWeight :{bldraftdetail.GrossWeight}</li>
                 
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
