import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Sidebar_pannel from "../sidebar/Sidebar_pannel";
import Navbar from "../../components/navbar/Navbar-screen";
import axios from "axios";
import CountryData from "../countryJson/cs.json";

import CustomerDetails from "../Modals/CustomerDetails";
import ProductModal from "../Modals/ProductModal";
import ShipmentTermsModal from "../Modals/ShipmentTermsModal";
import PaymentTermModal from "../Modals/PaymentTermModal";
import PortModal from "../Modals/PortModal";

function PurchaseOrder_form() {
  const [error, setError] = useState(false);

  const [pono, setPono] = useState("");
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

  const [selectProductTerm, setselectProductTerm] = useState([]);
  const [selectcustomer, selectcustomerdetail] = useState([]);
  const [selectshipmentTerm, setSelectshipmentTerms] = useState([]);
  const [selectpaymentTerm, setSelectPaymentterm] = useState([]);
  const [selectports, setSelectPorts] = useState([]);

  const [customerDetails, setCustomerDetails] = useState({
    customer_address: "",
    customer_bank: "",
    customer_country: "",
  });

  const handleCheckboxChange = (item) => {
    if (selectedDocs.includes(item)) {
      // Item is already selected, so remove it
      setSelectedDocs(
        selectedDocs.filter((selectedDocs) => selectedDocs !== item)
      );
    } else {
      // Item is not selected, so add it
      setSelectedDocs([...selectedDocs, item]);
    }
  };
  const selectedItemsText = selectedDocs.join(", ");
  function handleCustomerName(e) {
    const getcustomername = e.target.options[e.target.selectedIndex].text;
    setCustomerName(getcustomername);
  }
  function handleProduct(e) {
    const getProductname = e.target.options[e.target.selectedIndex].text;
    console.log(getProductname);
    setProduct(getProductname);
  }
  function handleShipmentTerm(e) {
    const getshipmentTerm = e.target.options[e.target.selectedIndex].text;
    console.log(getshipmentTerm);
    setShipmentTerm(getshipmentTerm);
  }
  function handlePaymentTerm(e) {
    const getpaymentterm = e.target.options[e.target.selectedIndex].text;
    console.log(getpaymentterm);
    setPaymentTerm(getpaymentterm);
  }
  function handleCountryLoad(e) {
    const getcountryloadname =
      e.target.options[e.target.selectedIndex].getAttribute("name");
    setCountryLoad(getcountryloadname);
  }
  function handleCountryDis(e) {
    const getcountrydisname =
      e.target.options[e.target.selectedIndex].getAttribute("name");
    setcountrydis(getcountrydisname);
  }

  function handlePortload(e) {
    const getportnameload = e.target.options[e.target.selectedIndex].text;
    // console.log(getportname);
    setPortload(getportnameload);
  }

  function handlePortdis(e) {
    const getportnamedis = e.target.options[e.target.selectedIndex].text;
    // console.log(getportname);
    setPortdis(getportnamedis);
  }
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/expo/sendPortdata/")
      .then((response) => {
        setSelectPorts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/expo/sendproductname/")
      .then((response) => {
        setselectProductTerm(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // to send the selected names data
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/expo/get_customer_details/${customername}/`)
      .then((response) => {
        setCustomerDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [customername]);

  console.log(customername);
  

  console.log("Details----------->", customerDetails);
  // to get only names
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/expo/customernameonly/")
      .then((response) => {
        selectcustomerdetail(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/expo/sendshipmentTerm/")
      .then((response) => {
        setSelectshipmentTerms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/expo/sendpaymentTerm/")
      .then((response) => {
        setSelectPaymentterm(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleSubmit = (e) => {
    const totalbagvalue = (unit=="KG")?((quantity *1000)/ parseInt(packaging)):(quantity)/ parseInt(packaging)
    e.preventDefault();
    setcustomeradd(customerDetails.customer_address)
    setCustomerBank(customerDetails.customer_bank)
    setCustomerCountry(customerDetails.customer_country)
    setTotalbag(totalbagvalue)
    setDocuments(selectedItemsText)

    let isError = false;

    if (pono.trim() === "") {
      isError = true;
    }

    setError(isError);
    if (!isError) {
      var purchase_order = {
        pono,
        ponodate,
        customername,
        // customername,
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
        packaging,
        shipmentdate
      };
      console.log("Form data:", purchase_order);
      axios
        .post("http://127.0.0.1:8000/expo/purchase_order_doc/", purchase_order)
        .then((response) => {
          // Handle the response from the server
          console.log("API response:", response.data);
        })
        .catch((error) => {
          // Handle any errors
          console.error("API error:", error);
        });
      // history.push('/perfoma');
      // window.location.href = "/purchaseorder";
    }
  };  
  return (
    <div className="purchase-head">
      <Sidebar_pannel />
      <div className="purchasecontainer">
        <Navbar />
        <div className="maincontainer">
          <h1
            style={{ color: "#3E4AB6", fontSize: "28px", marginBottom: "50px" }}
          >
            New Purchase Order
          </h1>
          <div className="formcontainer">
            <form action="" method="" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-3">
                  <label>
                    PO no:
                    <input
                      type="text"
                      className="form-control"
                      value={pono}
                      onChange={(e) => setPono(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    PO Date:
                    <input
                      type="date"
                      className="form-control"
                      value={ponodate}
                      onChange={(e) => setPonoDate(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Customer Country:
                    <input
                      type="text"
                      className="form-control"
                      value={customerDetails.customer_country}
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
                      value={customerDetails.customer_bank}
                      readOnly
                      onChange={(e) => setCustomerBank(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="row">
                <label>Customer Name:</label>
                <div className="col-6" style={{ display: "flex" }}>
                  <select
                    name="cus"
                    className="form-control"
                    onChange={(e) => {
                      handleCustomerName(e);
                    }}
                  >
                    <option> --Select the Customer -- </option>
                    {selectcustomer.map((option, index) => (
                      <option key={index} value={option.customer_name}>
                        {" "}
                        {option.customer_name}{" "}
                      </option>
                    ))}
                  </select>
                  <CustomerDetails />
                </div>
                <div className="col-6">
                  <label>
                    Customer Address:
                    <input
                      type="text"
                      className="form-control"
                      value={customerDetails.customer_address}
                      // readOnly
                      onChange={(e) => setcustomeradd(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <label>Product</label>
                <div className="col-3" style={{ display: "flex" }}>
                  {/* <ProductModal /> */}

                  <select
                    name="shipment"
                    className="form-control"
                    onChange={(e) => {
                      handleProduct(e);
                    }}
                  >
                    <option> --Select the Product -- </option>
                    {selectProductTerm.map((option, index) => (
                      <option key={index} value={option.product}>
                        {option.product}
                      </option>
                    ))}
                  </select>
                  <ProductModal />
                </div>
                <div className="col-3">
                  Currency :
                  <select
                    name="currency"
                    className="form-control"
                    onChange={(e) => {
                      setCurrency(e.target.value);
                    }}
                  >
                    <option selected>----Select Currency----------</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="AUD">AUD</option>
                    <option value="CAD">CAD</option>
                    <option value="CHF">CHF</option>
                    <option value="CNY">CNY</option>
                    <option value="HKD">HKD</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
                <div className="col-3">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="col-3">
                  <label>Unit</label>
                  <select
                    name="unit"
                    className="form-control"
                    onChange={(e) => {
                      setUnit(e.target.value);
                    }}
                  >
                    <option selected>----Select Unit----------</option>
                    <option value="KG">KG</option>
                    <option value="MTON">MTON</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-3">
                  <label>Rate</label>
                  <input
                    type="number"
                    className="form-control"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                </div>
                <div className="col-3">
                  <label>Unit</label>
                  <select
                    name="Rateunit"
                    className="form-control"
                    onChange={(e) => {
                      setRateUnit(e.target.value);
                    }}
                  >
                    <option selected>----Select Unit----------</option>
                    <option value="per MT">per MT</option>
                    <option value="per Kg">per Kg</option>
                  </select>
                </div>

                <div className="col-3">
                  Packaging :
                  <select
                    name="packaging"
                    className="form-control"
                    onChange={(e) => {
                      setpackaging(e.target.value);
                    }}
                  >
                    <option selected>----Select Package----------</option>
                    <option value="25">25 {unit}</option>
                    <option value="50">50 {unit}</option>
                    <option value="100">100 {unit}</option>
                    <option value="200">200 {unit}</option>
                    <option value="300">300 {unit}</option>
                    <option value="500">500 {unit}</option>
                    <option value="800">800 {unit}</option>
                    <option value="900">900 {unit}</option>
                    <option value="1000">1000 {unit}</option>
                    <option value="2000">2000 {unit}</option>
                  </select>
                </div>
                <div className="col-3">
                  Total Bags:
                  <input
                    type="text"
                    className="form-control"
                    value={ 
                      

                        (unit=="KG")?((quantity *1000)/ parseInt(packaging)):(quantity)/ parseInt(packaging)
                      }

    
                      
                    
                    // readOnly
                    onChange={(e) => setTotalbag(e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <label>Shipment Terms</label>
                <div className="col-6" style={{ display: "flex" }}>
                  <select
                    name="shipment"
                    className="form-control"
                    onChange={(e) => {
                      handleShipmentTerm(e);
                    }}
                  >
                    <option> --Select the ShipmentTerms -- </option>
                    {selectshipmentTerm.map((option, index) => (
                      <option key={index} value={option.shipment}>
                        {option.shipment}
                      </option>
                    ))}
                  </select>
                  <ShipmentTermsModal />
                </div>
                <div className="col-6" style={{ display: "flex" }}>
                  <select
                    name="pay"
                    className="form-control"
                    onChange={(e) => {
                      handlePaymentTerm(e);
                    }}
                  >
                    <option> --Select the PaymentTerm -- </option>
                    {selectpaymentTerm.map((option, index) => (
                      <option key={index} value={option.payment}>
                        {option.payment}
                      </option>
                    ))}
                  </select>
                  <PaymentTermModal />
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-3">
                  <label>
                    Country Loading
                    <select
                      name="country"
                      className="form-control"
                      onChange={(e) => {
                        handleCountryLoad(e);
                      }}
                    >
                      <option> --Select the country -- </option>
                      {CountryData.map((getcountry, index) => (
                        <option
                          name={getcountry.country_name}
                          value={getcountry.country_id}
                          key={index}
                        >
                          {getcountry.country_name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {/* <label>Port Discharge</label> */}
                <div className="col-3" style={{ display: "flex" }}>
                  <select
                    name="port"
                    className="form-control"
                    onChange={(e) => {
                      handlePortload(e);
                    }}
                  >
                    <option> --Select the Port Loading -- </option>
                    {selectports.map((option, index) => (
                      <option key={index} value={option.port}>
                        {" "}
                        {option.port}{" "}
                      </option>
                    ))}
                  </select>
                  <PortModal />
                </div>
                <div className="col-3">
                  <label>
                    Country Discharge
                    <select
                      name="country"
                      className="form-control"
                      onChange={(e) => {
                        handleCountryDis(e);
                      }}
                    >
                      <option> --Select the country -- </option>
                      {CountryData.map((getcountry, index) => (
                        <option
                          name={getcountry.country_name}
                          value={getcountry.country_id}
                          key={index}
                        >
                          {getcountry.country_name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {/* <label>Port Loading</label> */}
                <div className="col-3" style={{ display: "flex" }}>
                  <select
                    name="port"
                    className="form-control"
                    onChange={(e) => {
                      handlePortdis(e);
                    }}
                  >
                    <option> --Select the Port Discharge-- </option>
                    {selectports.map((option, index) => (
                      <option key={index} value={option.port}>
                        {" "}
                        {option.port}{" "}
                      </option>
                    ))}
                  </select>
                  <PortModal />
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-3">
                  <label>
                    Shipment Date:
                    <input
                      type="text"
                      className="form-control"
                      value={shipmentdate}
                      onChange={(e) => setShipmentDate(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-9">
                  <label>
                    Documents:
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        width: "100%",
                      }}
                    >
                      {items.map((item, index) => (
                        <div
                          key={index}
                          style={{ width: "30%", boxSizing: "border-box" }}
                        >
                          <label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedDocs.includes(item)}
                              onChange={() => handleCheckboxChange(item)}
                            />
                            {item}
                          </label>
                        </div>
                      ))}
                    </div>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <label>
                    Selected Documents:
                    <input
                      className="form-control"
                      type="text"
                      value={selectedItemsText}
                      // readOnly
                      onChange={(e)=>setDocuments(e.target.value)}
                    />
                  </label>
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
export default PurchaseOrder_form;
