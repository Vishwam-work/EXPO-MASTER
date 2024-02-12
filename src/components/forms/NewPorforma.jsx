import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Sidebar_pannel from "../sidebar/Sidebar_pannel";
import Navbar from "../../components/navbar/Navbar-screen";
import Performa_widgets from "../../pages/widgets/Performa_widgets";
import axios from "axios";

import ConsigneeModal from "../Modals/ConsigneeModal";
import NotifyModal from "../Modals/NotifyModal";
export default function NewPorforma() {
  const [error, setError] = useState(false);

  const [porformano, setporformano] = useState("");
  const [pordate, setPorDate] = useState("");
  const [selectprno, setselectprno] = useState([]);
  const [selectcommonname, setselectcommonname] = useState([]);
  const [prno, setprno] = useState("");
  const [Consignee, setConsignee] = useState("");
  const [notify, setNotify] = useState("");
  const [pono, setPono] = useState("");
  const [precarriage, setPrecarriage] = useState("");
  const [salesBroker, setSalesBroker] = useState("");
  const [netweight, setNetweight] = useState("");
  const [grossweight, setGrossweight] = useState("");
  const [amount, setamount] = useState("");

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

  const [selectedDocs, setSelectedDocs] = useState([]);
  const items = [
    "Certificate of analysis",
    "Inovice",
    "Specification",
    "Delcaration Certificate",
    "Shipment Details",
  ];

  const [purchaseOrderdetail, setpurchaseOrderdetail] = useState({
    purno: "",
    ponodate: "",
    custname: "",
    custadd: "",
    custbank: "",
    custcountr: "",
    currency: "",
    product: "",
    quantity: "",
    unit: "",
    rate: "",
    rateunit: "",
    shipmentte: "",
    paymentter: "",
    totalbag: "",
    documents: "",
    countryloa: "",
    countrydis: "",
    portload: "",
    portdi: "",
    packaging: "",
    shipmentdate: "",
    
  });
  const renderDocumentList = () => {
    if (!purchaseOrderdetail.documents) {
      return null;
    }

    const documentArray = purchaseOrderdetail.documents
      .split(",")
      .map((document, index) => <li key={index}>{document.trim()}</li>);
    console.log("document array", documentArray);
    return <ul>{documentArray}</ul>;
  };

  function handleConsignee(e) {
    const getConsginee = e.target.options[e.target.selectedIndex].text;
    console.log(getConsginee);
    setConsignee(getConsginee);
  }
  function handleNotify(e) {
    const getNotify = e.target.options[e.target.selectedIndex].text;
    console.log(getNotify);
    setNotify(getNotify);
  }
  function habdleprno(e) {
    const getprno = e.target.options[e.target.selectedIndex].text;
    setprno(getprno);
  }
  function handleSalesBroker(e) {
    const getsales = e.target.value;
    setSalesBroker(getsales);
  }
  // to get only names
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/expo/prnoonly/")
      .then((response) => {
        setselectprno(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/expo/sendcommonname/")
      .then((response) => {
        setselectcommonname(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //   extract all detail
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/expo/get_purchase_details/${prno}/`)
      .then((response) => {
        setpurchaseOrderdetail(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [prno]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount_no = purchaseOrderdetail.quantity*purchaseOrderdetail.rate

    let isError = false;
    if (porformano.trim() === "") {
      isError = true;
    }
    if (pordate.trim() === "") {
      isError = true;
    }
    setError(isError);

    setPono(purchaseOrderdetail.purno);
    setPonoDate(purchaseOrderdetail.ponodate);
    setCustomerName(purchaseOrderdetail.custname);
    setcustomeradd(purchaseOrderdetail.custadd);
    setCustomerBank(purchaseOrderdetail.custbank);
    setCustomerCountry(purchaseOrderdetail.custcountr);
    setProduct(purchaseOrderdetail.product);
    setQuantity(purchaseOrderdetail.quantity);
    setCurrency(purchaseOrderdetail.currency);
    setRate(purchaseOrderdetail.rate);
    setRateUnit(purchaseOrderdetail.rateunit);
    setShipmentTerm(purchaseOrderdetail.shipmentte);
    setPaymentTerm(purchaseOrderdetail.paymentter);
    setpackaging(purchaseOrderdetail.packaging);
    setTotalbag(purchaseOrderdetail.totalbag);
    setShipmentDate(purchaseOrderdetail.shipmentdate);
    setDocuments(purchaseOrderdetail.documents);
    setCountryLoad(purchaseOrderdetail.countryloa);
    setcountrydis(purchaseOrderdetail.countrydis);
    setPortload(purchaseOrderdetail.portload);
    setPortdis(purchaseOrderdetail.portdi);
    setUnit(purchaseOrderdetail.unit);
    setamount(amount_no)
    

    if (!isError) {
      var performa_doc = {
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
        amount
      };
      console.log("Porforma Form data:", performa_doc);
      axios
        .post("http://127.0.0.1:8000/expo/porformadoc/", performa_doc)
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
    <div className="performa-head">
      <Sidebar_pannel />
      <div className="performacontainer">
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
            New Porfoma
          </h1>
          <div className="formcontainer">
            <form action="" method="" onSubmit={handleSubmit}>
              <div className="row">
                <label>Order Number:</label>
                <div className="col-3" style={{ display: "flex" }}>
                  <select
                    name="cus"
                    className="form-control"
                    onChange={(e) => {
                      habdleprno(e);
                    }}
                  >
                    <option> --Select the Purchase No -- </option>
                    {selectprno.map((option, index) => (
                      <option key={index} value={option.prno}>
                        {" "}
                        {option.prno}{" "}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    Order Date:
                    <input
                      type="date"
                      className="form-control"
                      value={purchaseOrderdetail.ponodate}
                      onChange={(e) => setPonoDate(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Performa Number:
                    <input
                      type="text"
                      className="form-control"
                      value={porformano}
                      onChange={(e) => setporformano(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Performa Date:
                    <input
                      type="date"
                      className="form-control"
                      value={pordate}
                      onChange={(e) => setPorDate(e.target.value)}
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
                      value={purchaseOrderdetail.custname}
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
                      value={purchaseOrderdetail.custcountr}
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
                      value={purchaseOrderdetail.custbank}
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
                      value={purchaseOrderdetail.custadd}
                      // readOnly
                      onChange={(e) => setcustomeradd(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <label>Consignee:</label>
                <div className="col-6" style={{ display: "flex" }}>
                  <select
                    name="con"
                    className="form-control"
                    onChange={(e) => {
                      handleConsignee(e);
                    }}
                  >
                    <option> --Select the Consignee -- </option>
                    {selectcommonname.map((option, index) => (
                      <option key={index} value={option.Names}>
                        {" "}
                        {option.Names}{" "}
                      </option>
                    ))}
                  </select>
                  <ConsigneeModal />
                </div>
                <div className="col-3">
                  <label>
                    Currency:
                    <input
                      type="text"
                      className="form-control"
                      value={purchaseOrderdetail.currency}
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
                      value={purchaseOrderdetail.product}
                      onChange={(e) => setProduct(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <label>Notify Name</label>
                <div className="col-6" style={{ display: "flex" }}>
                  <select
                    name="notify"
                    className="form-control"
                    onChange={(e) => {
                      handleNotify(e);
                    }}
                  >
                    <option> --Select the Notify -- </option>
                    {selectcommonname.map((option, index) => (
                      <option key={index} value={option.Names}>
                        {" "}
                        {option.Names}{" "}
                      </option>
                    ))}
                  </select>
                  <NotifyModal />
                </div>
                <div className="col-3">
                  <label>
                    Quantity:
                    <input
                      type="text"
                      className="form-control"
                      value={purchaseOrderdetail.quantity}
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
                      value={purchaseOrderdetail.unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-3">
                  <label>
                    Rate:
                    <input
                      type="text"
                      className="form-control"
                      value={purchaseOrderdetail.rate}
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
                      value={purchaseOrderdetail.rateunit}
                      onChange={(e) => setRateUnit(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Packaging:
                    <input
                      type="text"
                      className="form-control"
                      value={purchaseOrderdetail.packaging}
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
                      value={purchaseOrderdetail.totalbag}
                      onChange={(e) => setTotalbag(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-6">
                  <label>
                    Shipment Term:
                    <input
                      type="text"
                      className="form-control"
                      value={purchaseOrderdetail.shipmentte}
                      onChange={(e) => setShipmentTerm(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-6">
                  <label>
                    Payment Term:
                    <input
                      type="text"
                      className="form-control"
                      value={purchaseOrderdetail.paymentter}
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
                      value={purchaseOrderdetail.countryloa}
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
                      value={purchaseOrderdetail.portload}
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
                      value={purchaseOrderdetail.countrydis}
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
                      value={purchaseOrderdetail.portdi}
                      onChange={(e) => setPortdis(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-3">
                Pre Carriage By:
                  <select
                    name="precarriage"
                    className="form-control"
                    onChange={(e) => {
                      setPrecarriage(e.target.value);
                    }}
                  >
                    <option>--Pre Carriage By--</option>
                    <option value="By Sea">By Sea</option>
                    <option value="By Air">By Air</option>
                    <option value="By Road">By Road</option>
                    <option value="By Other">By Other</option>
                  </select>
                </div>
              <div className="col-3">
                  Sales Broker:
                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <label>
                      <input
                        type="radio"
                        name="salesbroker"
                        value="Yes"
                        onChange={handleSalesBroker}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="salesbroker"
                        value="No"
                        onChange={handleSalesBroker}
                      />
                      No
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="salesbroker"
                        value="Not decided"
                        onChange={handleSalesBroker}
                      />
                      Not decided
                    </label>
                  </div>
                </div>
                <div className="col-3">
                  <label>Net Weight:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={netweight}
                    onChange={(e) => setNetweight(e.target.value)}
                  />
                </div>
                <div className="col-3">
                  <label>Gross Weight:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={grossweight}
                    onChange={(e) => setGrossweight(e.target.value)}
                  />
                </div>
               
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-3">
                  <label>
                    Amount
                    <input
                      type="text"
                      className="form-control"
                      value={purchaseOrderdetail.quantity*purchaseOrderdetail.rate}
                      onChange={(e) => setamount(purchaseOrderdetail.quantity*purchaseOrderdetail.rate)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Shipment Date:
                    <input
                      type="text"
                      className="form-control"
                      value={purchaseOrderdetail.shipmentdate}
                      onChange={(e) => setShipmentDate(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Documents:
                    <input
                      type="text"
                      className="form-control"
                      value={purchaseOrderdetail.documents}
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
