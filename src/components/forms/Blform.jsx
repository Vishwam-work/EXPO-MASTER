import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/invocie/invoice.scss";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Sidebar_pannel from "../../components/sidebar/Sidebar_pannel";
import Navbar from "../../components/navbar/Navbar-screen";
import Performa_widgets from "../../pages/widgets/Performa_widgets";

import { Link } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";

export default function Blform() {


  const [selectinvoice, setselectinvoice] = useState([]);

  const [error, setError] = useState(false);
  const [porformano, setporformano] = useState("");
  const [pordate, setPorDate] = useState("");
  
  const [blno, setblno] = useState("");
  const [bldate, setbldate] = useState("");

  const [invoiceno, setinvoiceno] = useState("");
  const [invoicedate, setinvoicedate] = useState("");

  const [container, setContainer] = useState("");
  const [csseal, setcsseal] = useState("");
  const [sb, setsb] = useState("");
  const [bl, setbl] = useState("");

  const [Consignee, setConsignee] = useState("");
  const [notify, setNotify] = useState("");
  const [pono, setPono] = useState("");
  const [precarriage, setPrecarriage] = useState("");
  const [salesBroker, setSalesBroker] = useState("");
  const [netweight, setNetweight] = useState("");
  const [grossweight, setGrossweight] = useState("");

  const [amount, setamount] = useState("");
  const [advamount, setAdvamount] = useState("");
  const [remaamount, setremaamount] = useState("");

  const [ponodate, setPonoDate] = useState("");
  const [customername, setCustomerName] = useState("");
  const [customeradd, setcustomeradd] = useState("");
  const [customerbank, setCustomerBank] = useState("");
  const [customercountry, setCustomerCountry] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currency, setCurrency] = useState("");
  const [rate, setRate] = useState("");
  const [rateunit, setRateUnit] = useState("");
  const [shipmentterm, setShipmentTerm] = useState("");
  const [paymentterm, setPaymentTerm] = useState("");
  const [packaging, setpackaging] = useState("");
  const [totalbag, setTotalbag] = useState("");
  const [shipmentdate, setShipmentDate] = useState("");
  const [documents, setDocuments] = useState("");
  const [countryload, setCountryLoad] = useState("");
  const [countrydis, setcountrydis] = useState("");
  const [portload, setPortload] = useState("");
  const [portdis, setPortdis] = useState("");
  const [unit, setUnit] = useState("");

  function handleinvoiceno(e) {
    const getinvo = e.target.options[e.target.selectedIndex].text;
    setinvoiceno(getinvo);
  }
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/expo/invoiceonly/")
      .then((response) => {
        setselectinvoice(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [invoicedetail, setinvoicedetail] = useState({
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
      .get(`http://127.0.0.1:8000/expo/get_invocie_detail/${invoiceno}/`)
      .then((response) => {
        setinvoicedetail(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [invoiceno]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let isError = false;
    if (blno.trim() === "") {
      isError = true;
    }
    if (bldate.trim() === "") {
      isError = true;
    }

    setError(isError);
    setbl(invoicedetail.bl)
    setporformano(invoicedetail.porforno)
    setinvoicedate(invoicedetail.invociedate)
    setContainer(invoicedetail.container)
    setcsseal(invoicedetail.csseal)
    setsb(invoicedetail.sb)
    setPorDate(invoicedetail.porfordate);
    setConsignee(invoicedetail.Consignee);
    setNotify(invoicedetail.Notify);
    setPrecarriage(invoicedetail.PreCarriage);
    setSalesBroker(invoicedetail.SalesBroker);
    setNetweight(invoicedetail.NetWeight);
    setGrossweight(invoicedetail.GrossWeight);
    setPono(invoicedetail.purno);
    setPonoDate(invoicedetail.ponodate);
    setCustomerName(invoicedetail.custname);
    setcustomeradd(invoicedetail.custadd);
    setCustomerBank(invoicedetail.custbank);
    setCustomerCountry(invoicedetail.custcountry);
    setProduct(invoicedetail.product);
    setQuantity(invoicedetail.quantity);
    setCurrency(invoicedetail.currency);
    setRate(invoicedetail.rate);
    setRateUnit(invoicedetail.rateunit);
    setShipmentTerm(invoicedetail.shipmentdate);
    setPaymentTerm(invoicedetail.paymentterm);
    setpackaging(invoicedetail.packaging);
    setTotalbag(invoicedetail.totalbag);
    setShipmentDate(invoicedetail.shipmentdate);
    setDocuments(invoicedetail.documents);
    setCountryLoad(invoicedetail.countryload);
    setcountrydis(invoicedetail.countrydis);
    setPortload(invoicedetail.portload);
    setPortdis(invoicedetail.portdis);
    setUnit(invoicedetail.unit);
    setamount(invoicedetail.Amount);
    setremaamount(invoicedetail.remaamount);

    if (!isError) {
      var bldraft_doc = {
        blno,
        bldate,
        invoiceno,
        invoicedate,
        pono,
        porformano,
        pordate,
        ponodate,
        customername,
        customeradd,
        customerbank,
        customercountry,
        currency,
        product,
        quantity,
        unit,
        rate,
        rateunit,
        shipmentterm,
        paymentterm,
        totalbag,
        documents,
        countryload,
        countrydis,
        portload,
        portdis,
        Consignee,
        notify,
        packaging,
        shipmentdate,
        precarriage,
        salesBroker,
        netweight,
        grossweight,
        amount,
        container,
        csseal,
        sb,
        bl,
        advamount,
        remaamount,
      };
      console.log("Invoice Form data:", bldraft_doc);
      axios
        .post("http://127.0.0.1:8000/expo/bldraft/", bldraft_doc)
        .then((response) => {
          // Handle the response from the server
          console.log("API response:", response.data);
        })
        .catch((error) => {
          // Handle any errors
          console.error("API error:", error);
        });
      // history.push('/perfoma');
      // window.location.href = "/performa";
    }
  };
  console.log(invoicedetail);
  return (
    <div className="invoice-head">
      <Sidebar_pannel />
      <div className="invoicecontainer">
        <Navbar />
        <div className="widget">
          <Performa_widgets type="Purchase_order" />
          <Performa_widgets type="Porforma" />
          <Performa_widgets type="Invoice" />
          <Performa_widgets type="BL_draft" />
        </div>
        <div className="maincontainer">
          <h1
            style={{ color: "#3E4AB6", fontSize: "28px", marginBottom: "50px" }}
          >
            New BL Draft
          </h1>
          <div className="formcontainer">
            <form action="" method="" onSubmit={handleSubmit}>
              <div className="row">
                <label>Inovice Number:</label>
                <div className="col-3" style={{ display: "flex" }}>
                  <select
                    name="cus"
                    className="form-control"
                    onChange={(e) => {
                      handleinvoiceno(e);
                    }}
                  >
                    <option> --Select the Invoice No -- </option>
                    {selectinvoice.map((option, index) => (
                      <option key={index} value={option.invoiceno}>
                        {" "}
                        {option.invoiceno}{" "}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-3">
                <label>
                    Bl Number:
                    <input
                      type="text"
                      className="form-control"
                      value={blno}
                      onChange={(e) => setblno(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                <label>
                    Bl Date:
                    <input
                      type="date"
                      className="form-control"
                      value={bldate}
                      onChange={(e) => setbldate(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <Table striped bordered hover size="sm">
                <thead className="thead-dark">
                  <th>Names</th>
                  <th>Values</th>
                </thead>
                <tbody>
                  {Object.entries(invoicedetail).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {error && <p>Please fill all fields correctly.</p>}
              <Button style={{ marginTop: "20px" }} type="submit">
                Save
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
