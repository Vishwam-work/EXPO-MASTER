import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Sidebar_pannel from "../sidebar/Sidebar_pannel";
import Navbar from "../../components/navbar/Navbar-screen";
import Performa_widgets from "../../pages/widgets/Performa_widgets";
import axios from "axios";
export default function Invoiceform() {
  const [error, setError] = useState(false);

  const [invoiceno, setinvoiceno] = useState("");
  const [invoicedate, setinvoicedate] = useState("");

  const [selectporno, setselectporno] = useState([]);

  const [porformano, setporformano] = useState("");
  const [pordate, setPorDate] = useState("");

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

  const [porformadetail, setporformadetail] = useState({
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
    document: "",
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
  const renderDocumentList = () => {
    if (!porformadetail.document) {
      return null;
    }

    const documentArray = porformadetail.document.split(",").map((document, index) => <li key={index}>{document.trim()}</li>);
    console.log("document array", documentArray);
    return <ul>{documentArray}</ul>;
  };



  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/expo/get_porforma_details/${porformano}/`)
      .then((response) => {
        setporformadetail(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [porformano]);
  console.log(porformadetail);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/expo/purnoonly/")
      .then((response) => {
        setselectporno(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function habdleporno(e) {
    const getporno = e.target.options[e.target.selectedIndex].text;
    setporformano(getporno);
  }

  // Submit Form handle

  const handleSubmit = (e) => {
    e.preventDefault();

    const remain =  (advamount==0)?('0'):(porformadetail.Amount-advamount)

    let isError = false;
    if (invoiceno.trim() === "") {
      isError = true;
    }
    if (invoicedate.trim() === "") {
      isError = true;
    }
    if (container.trim() === "") {
      isError = true;
    }
    if (csseal.trim() === "") {
      isError = true;
    }
    
    if (sb.trim() === "") {
      isError = true;
    }
    if (bl.trim() === "") {
      isError = true;
    }

    setError(isError);

    setPorDate(porformadetail.porfordate);
    setConsignee(porformadetail.Consignee);
    setNotify(porformadetail.Notify);
    setPrecarriage(porformadetail.PreCarriage);
    setSalesBroker(porformadetail.SalesBroker);
    setNetweight(porformadetail.NetWeight);
    setGrossweight(porformadetail.GrossWeight);
    setPono(porformadetail.purno);
    setPonoDate(porformadetail.ponodate);
    setCustomerName(porformadetail.custname);
    setcustomeradd(porformadetail.custadd);
    setCustomerBank(porformadetail.custbank);
    setCustomerCountry(porformadetail.custcountry);
    setProduct(porformadetail.product);
    setQuantity(porformadetail.quantity);
    setCurrency(porformadetail.currency);
    setRate(porformadetail.rate);
    setRateUnit(porformadetail.rateunit);
    setShipmentTerm(porformadetail.shipmentdate);
    setPaymentTerm(porformadetail.paymentterm);
    setpackaging(porformadetail.packaging);
    setTotalbag(porformadetail.totalbag);
    setShipmentDate(porformadetail.shipmentdate);
    setDocuments(porformadetail.document);
    setCountryLoad(porformadetail.countryload);
    setcountrydis(porformadetail.countrydis);
    setPortload(porformadetail.portload);
    setPortdis(porformadetail.portdis);
    setUnit(porformadetail.unit);
    setamount(porformadetail.Amount);
    setremaamount(remain)

    if (!isError) {
      var invoice_doc = {
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
      console.log("Invoice Form data:", invoice_doc);
      axios
        .post("http://127.0.0.1:8000/expo/invoicedoc/", invoice_doc)
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
            New Invoice
          </h1>
          <div className="formcontainer">
            <form action="" method="" onSubmit={handleSubmit}>
              <div className="row">
                <label>Porforma Number:</label>
                <div className="col-3" style={{ display: "flex" }}>
                  <select
                    name="cus"
                    className="form-control"
                    onChange={(e) => {
                      habdleporno(e);
                    }}
                  >
                    <option> --Select the Porforma No -- </option>
                    {selectporno.map((option, index) => (
                      <option key={index} value={option.prno}>
                        {" "}
                        {option.porforno}{" "}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    Poforma date:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.porfordate}
                      onChange={(e) => setPorDate(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Invoice Number:
                    <input
                      type="text"
                      className="form-control"
                      value={invoiceno}
                      onChange={(e) => setinvoiceno(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    invoice Date:
                    <input
                      type="date"
                      className="form-control"
                      value={invoicedate}
                      onChange={(e) => setinvoicedate(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-3">
                  <label>
                    Customer Name:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.custname}
                      // readOnly
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Customer Country:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.custcountry}
                      // readOnly
                      onChange={(e) => setCustomerCountry(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Customer Bank:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.custbank}
                      // readOnly
                      onChange={(e) => setCustomerBank(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Customer Add:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.custadd}
                      // readOnly
                      onChange={(e) => setcustomeradd(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-3">
                  <label>
                    Consignee:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.Consignee}
                      // readOnly
                      onChange={(e) => setConsignee(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Notify:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.Notify}
                      // readOnly
                      onChange={(e) => setNotify(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Currency:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Product:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.product}
                      onChange={(e) => setProduct(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-3">
                  <label>
                    Quantity:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Unit:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Rate:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.rate}
                      onChange={(e) => setRate(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Rate Unit:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.rateunit}
                      onChange={(e) => setRateUnit(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-3">
                  <label>
                    Packaging:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.packaging}
                      onChange={(e) => setpackaging(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Total Bags:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.totalbag}
                      onChange={(e) => setTotalbag(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Shipment term:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.shipmentterm}
                      onChange={(e) => setShipmentTerm(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Payment term:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.paymentterm}
                      onChange={(e) => setPaymentTerm(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-3">
                  <label>
                    Country Load:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.countryload}
                      onChange={(e) => setCountryLoad(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Port Load:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.portload}
                      onChange={(e) => setPortload(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Country Discharge:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.countrydis}
                      onChange={(e) => setcountrydis(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Port Discharge:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.portdis}
                      onChange={(e) => setPortdis(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-3">
                  <label>Pre Carriage:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={porformadetail.PreCarriage}
                    onChange={(e) => setPrecarriage(e.target.value)}
                  />
                </div>
                <div className="col-3">
                  <label>Sales Broker:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={porformadetail.SalesBroker}
                    onChange={(e) => setSalesBroker(e.target.value)}
                  />
                </div>

                <div className="col-3">
                  <label>Net Weight:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={porformadetail.NetWeight}
                    onChange={(e) => setNetweight(e.target.value)}
                  />
                </div>
                <div className="col-3">
                  <label>Gross Weight:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={porformadetail.GrossWeight}
                    onChange={(e) => setGrossweight(e.target.value)}
                  />
                </div>
              </div>

              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-3">
                  <label>Container</label>
                  <input
                    type="text"
                    className="form-control"
                    value={container}
                    onChange={(e) => setContainer(e.target.value)}
                  />
                </div>
                <div className="col-3">
                  <label>CS Seal</label>
                  <input
                    type="text"
                    className="form-control"
                    value={csseal}
                    onChange={(e) => setcsseal(e.target.value)}
                  />
                </div>
                <div className="col-3">
                  <label>Shipment Billing</label>
                  <input
                    type="text"
                    className="form-control"
                    value={sb}
                    onChange={(e) => setsb(e.target.value)}
                  />
                </div>
                <div className="col-3">
                  <label>Bill of Loading</label>
                  <input
                    type="text"
                    className="form-control"
                    value={bl}
                    onChange={(e) => setbl(e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-3">
                  <label>
                    Shipment Date:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.shipmentdate}
                      onChange={(e) => setShipmentDate(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Advanced:
                    <input
                      type="number"
                      className="form-control"
                      value={advamount}
                      onChange={(e) => setAdvamount(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Remain amount:
                    <input
                      type="text"
                      className="form-control"
                      value={
                       
                      

                          (advamount==0)?('0'):(porformadetail.Amount-advamount)
                        
                      }
                      onChange={(e) => setremaamount(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Amount:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.Amount}
                      onChange={(e) => setamount(e.target.value)}
                    />
                  </label>
                </div>
               
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-6">
                  <label>
                    Documents:
                    <input
                      type="text"
                      className="form-control"
                      value={porformadetail.document}
                      onChange={(e) => setDocuments(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  Document List
                  {renderDocumentList()}
                </div>
              </div>

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
