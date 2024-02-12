import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Sidebar_pannel from "../sidebar/Sidebar_pannel";
import Navbar from "../../components/navbar/Navbar-screen";
import Performa_widgets from "../../pages/widgets/Performa_widgets";

import PortModal from "../Modals/PortModal";
import DocumentModal from "../Modals/DocumentModal";
import ShipmentTermsModal from "../Modals/ShipmentTermsModal";
import ProductModal from "../Modals/ProductModal";
import MaterialModal from "../Modals/MaterialModal";
import PaymentTermModal from "../Modals/PaymentTermModal";
import PackageModal from "../Modals/PackageModal";
import ConsigneeModal from "../Modals/ConsigneeModal";
import NotifyModal from "../Modals/NotifyModal";
import BuyerModal from "../Modals/BuyerModal";

import axios from "axios";

import CountryData from "../countryJson/cs.json";

function Performa_form(props) {
  // APIs data
  const [selectports, setSelectPorts] = useState([]);

  const [selectdoc, setSelectDoc] = useState([]);
  const [selectshipmentTerm, setSelectshipmentTerms] = useState([]);
  const [selectpaymentTerm, setSelectPaymentterm] = useState([]);
  const [selectProductTerm, setselectProductTerm] = useState([]);
  const [selectPackageTerm, setselectPackageTerm] = useState([]);
  const [selectmaterialTerm, setselectmaterialTerm] = useState([]);
  const [selectcommonname, setselectcommonname] = useState([]);

 // const history = useHistory();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [buyerOrder, setBuyerOrder] = useState("");
  const [orderdate, setOrderDate] = useState("");
  const [Consignee, setConsignee] = useState("");
  const [notify, setNotify] = useState("");
  const [buyername, setBuyername] = useState("");
  const [port, setPort] = useState("");
  const [precarriage, setPrecarriage] = useState("");
  const [receiptcarrier, setReceiptcarrier] = useState("");
  const [vessel, setVesselNo] = useState("");
  const [salesBroker, setSalesBroker] = useState("");
  const [currency, setCurrency] = useState("");
  const [countryload, setCountryLoad] = useState("");
  const [countrydis, setCountryDischarge] = useState("");
  const [conversion, setConversion] = useState("");
  const [bank, setBank] = useState("");
  const [document, setDocument] = useState("");
  const [shipment, setShipment] = useState("");
  const [shipmentterm, setShipmentTerm] = useState("");
  const [paymentterm, setPaymentTerm] = useState("");
  const [product, setProduct] = useState("");
  const [packages, setPackages] = useState("");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [netweight, setNetweight] = useState("");
  const [grossweight, setGrossweight] = useState("");
  const [packagetype, setPackagetype] = useState("");
  const [qualityspec, setQualtiyspec] = useState("");

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [stateid, setStateid] = useState([]);

  const [error, setError] = useState(false);

  function handlePort(e) {
    const getportname = e.target.options[e.target.selectedIndex].text;
    console.log(getportname);
    setPort(getportname);
  }
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
  function handleBuyerName(e) {
    const getbuyername = e.target.options[e.target.selectedIndex].text;
    console.log(getbuyername);
    setBuyername(getbuyername);
  }
  function handleDocuments(e) {
    const getDocname = e.target.options[e.target.selectedIndex].text;
    console.log(getDocname);
    setDocument(getDocname);
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
  function handleProduct(e) {
    const getProductname = e.target.options[e.target.selectedIndex].text;
    console.log(getProductname);
    setProduct(getProductname);
  }
  function handlePackageTerm(e) {
    const getpackagename = e.target.options[e.target.selectedIndex].text;
    console.log(getpackagename);
    setPackages(getpackagename);
  }
  function handlematerialTerm(e) {
    const getmaterialname = e.target.options[e.target.selectedIndex].text;
    console.log(getmaterialname);
    setMaterial(getmaterialname);
  }

  function handleCountry(e) {
    const getcountryid = e.target.value;
    const getcountryname =
      e.target.options[e.target.selectedIndex].getAttribute("name");
    setCountry(getcountryname);
    const getstatedata = CountryData.find(
      (country) => country.country_id === getcountryid
    ).states;
    setStateid(getstatedata);
  }
  function handleCountryLoading(e) {
    const getcountryloadname =
      e.target.options[e.target.selectedIndex].getAttribute("name");
    setCountryLoad(getcountryloadname);
  }
  function handleCountryDischarge(e) {
    const getcountrydisname =
      e.target.options[e.target.selectedIndex].getAttribute("name");
    setCountryDischarge(getcountrydisname);
  }
  function handleState(e) {
    const getstatename = e.target.options[e.target.selectedIndex].text;
    console.log(getstatename);
    setState(getstatename);
  }

  function handleSalesBroker(e) {
    const getsales = e.target.value;
    setSalesBroker(getsales);
  }

// purchase Order   
useEffect(() => {
  axios
    .get(`http://127.0.0.1:8000/expo/get_purchase_details/${prno}/`)
    .then((response) => {
      setCustomerDetails(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, [prno]);

console.log(prno);



  // Api for geting the Port data
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
      .get("http://127.0.0.1:8000/expo/sendDocdata/")
      .then((response) => {
        setSelectDoc(response.data);
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

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/expo/sendpackagename/")
      .then((response) => {
        setselectPackageTerm(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/expo/sendmaterialname/")
      .then((response) => {
        setselectmaterialTerm(response.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let isError = false;

    if (name.trim() === "") {
      isError = true;
    }
    if (buyerOrder.trim() === "") {
      isError = true;
    }
    if (orderdate.trim() === "") {
      isError = true;
    }

    if (date.trim() === "") {
      isError = true;
    }

    setError(isError);
    if (!isError) {
      var performa_values = {
        name,
        date,
        buyerOrder,
        orderdate,
        Consignee,
        notify,
        buyername,
        country,
        state,
        port,
        precarriage,
        vessel,
        receiptcarrier,
        salesBroker,
        currency,
        countryload,
        countrydis,
        conversion,
        bank,
        document,
        shipment,
        shipmentterm,
        paymentterm,
        product,
        packages,
        material,
        quantity,
        price,
        totalPrice,
        unit,
        netweight,
        grossweight,
        packagetype,
        qualityspec,
      };
      console.log("Form data:", performa_values);
      axios
        .post("http://127.0.0.1:8000/expo/performa/", performa_values)
        .then((response) => {
          // Handle the response from the server
          console.log("API response:", response.data);
        })
        .catch((error) => {
          // Handle any errors
          console.error("API error:", error);
        });
      // history.push('/perfoma');
      window.location.href = "/performa";
    }
  };

  return (
    <div className="performa-head">
      <Sidebar_pannel />
      <div className="performacontainer">
        <Navbar />
        <div className="widget">
          <Performa_widgets type="Total_sale" />
          <Performa_widgets type="Toal_receipt" />
          <Performa_widgets type="Total_Due" />
          <Performa_widgets type="Total_Expenses" />
        </div>
        <div className="maincontainer">
          <h1
            style={{ color: "#3E4AB6", fontSize: "28px", marginBottom: "50px" }}
          >
            New Perfoma
          </h1>
          <div className="formcontainer">
            <form action="" method="" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <label>
                    PI no:
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col">
                  <label>
                    Date:
                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col">
                  <label>
                    Buyer Order No.:
                    <input
                      type="text"
                      className="form-control"
                      value={buyerOrder}
                      onChange={(e) => setBuyerOrder(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col">
                  <label>
                    Order Date:
                    <input
                      type="date"
                      className="form-control"
                      value={orderdate}
                      onChange={(e) => setOrderDate(e.target.value)}
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
                    Country
                    <select
                      name="country"
                      className="form-control"
                      onChange={(e) => {
                        handleCountry(e);
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
                <div className="col-3">
                  <label>
                    State
                    <select
                      name="state"
                      className="form-control"
                      onChange={(e) => {
                        handleState(e);
                      }}
                    >
                      <option> --Select the State -- </option>
                      {stateid.map((getstate, index) => (
                        <option
                          name={getstate.state_name}
                          value={getstate.state_id}
                          key={index}
                        >
                          {getstate.state_name}
                        </option>
                      ))}
                    </select>
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
                {/* <label>Buyer Name</label> */}
                <div className="col-6" style={{ display: "flex" }}>
                  <select
                    name="notify"
                    className="form-control"
                    onChange={(e) => {
                      handleBuyerName(e);
                    }}
                  >
                    <option> --Select the Buyer -- </option>
                    {selectcommonname.map((option, index) => (
                      <option key={index} value={option.Names}>
                        {" "}
                        {option.Names}{" "}
                      </option>
                    ))}
                  </select>
                  <BuyerModal />
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <label>Port Name</label>
                <div className="col-6" style={{ display: "flex" }}>
                  <select
                    name="port"
                    className="form-control"
                    onChange={(e) => {
                      handlePort(e);
                    }}
                  >
                    <option> --Select the Port -- </option>
                    {selectports.map((option, index) => (
                      <option key={index} value={option.port}>
                        {" "}
                        {option.port}{" "}
                      </option>
                    ))}
                  </select>
                  <PortModal />
                </div>
                <div className="col-6">
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
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-3">
                  Place Of Receipt By Pre Carrier:
                  <input
                    type="text"
                    className="form-control"
                    value={receiptcarrier}
                    onChange={(e) => setReceiptcarrier(e.target.value)}
                  />
                </div>
                <div className="col-3">
                  Vessel/Flight No:
                  <input
                    type="text"
                    className="form-control"
                    value={vessel}
                    onChange={(e) => setVesselNo(e.target.value)}
                  />
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
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-3">
                  <label>
                    Country of Loading:
                    <select
                      name="country"
                      className="form-control"
                      onChange={(e) => {
                        handleCountryLoading(e);
                      }}
                    >
                      <option> --Select the country Load-- </option>
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
                <div className="col-3">
                  <label>
                    Country of Discharge:
                    <select
                      name="country"
                      className="form-control"
                      onChange={(e) => {
                        handleCountryDischarge(e);
                      }}
                    >
                      <option> --Select the country Discharge -- </option>
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
                <div className="col-3">
                  <label>
                    Conversion
                    <input
                      type="number"
                      className="form-control"
                      value={conversion}
                      onChange={(e) => setConversion(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-3">
                  <label>
                    Bank
                    <input
                      type="text"
                      className="form-control"
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <label>Documents</label>
                <div className="col-6" style={{ display: "flex" }}>
                  <select
                    name="port"
                    className="form-control"
                    onChange={(e) => {
                      handleDocuments(e);
                    }}
                  >
                    <option> --Select the Document -- </option>
                    {selectdoc.map((option, index) => (
                      <option key={index} value={option.document}>
                        {option.document}
                      </option>
                    ))}
                  </select>
                  <DocumentModal />
                </div>
                <div className="col-6">
                  <label>
                    Shipment Period
                    <input
                      type="text"
                      className="form-control"
                      value={shipment}
                      onChange={(e) => setShipment(e.target.value)}
                    />
                  </label>
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
                <label>Product</label>
                <div className="col-2" style={{ display: "flex" }}>
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
                <div className="col-2">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="col-2">
                  <label>Price(USD)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="col-2">
                  <label>Total Price(USD)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                  />
                </div>

                <div className="col-2" style={{ display: "flex" }}>
                  {/* <ProductModal /> */}

                  <select
                    name="package"
                    className="form-control"
                    onChange={(e) => {
                      handlePackageTerm(e);
                    }}
                  >
                    <option> --Select the Package -- </option>
                    {selectPackageTerm.map((option, index) => (
                      <option key={index} value={option.packages}>
                        {option.packages}
                      </option>
                    ))}
                  </select>
                  <PackageModal />
                </div>
                {/* <label>
                  Material
                </label> */}
                <div className="col-2" style={{ display: "flex" }}>
                  <select
                    name="material"
                    className="form-control"
                    onChange={(e) => {
                      handlematerialTerm(e);
                    }}
                  >
                    <option>
                      <b> --Select the Material -- </b>{" "}
                    </option>
                    {selectmaterialTerm.map((option, index) => (
                      <option key={index} value={option.material}>
                        {option.material}
                      </option>
                    ))}
                  </select>
                  <MaterialModal />
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-2">
                  Unit:
                  <select
                    name="unit"
                    className="form-control"
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <option>--Select Unit----</option>
                    <option value="KGS">KGS</option>
                    {/* <option value="Litre">Litre</option> */}
                    <option value="Metric Ton">Metric Ton</option>
                    {/* <option value="Cubic Meter">Cubic Meter</option> */}
                    {/* <option value="Pallet">Pallet</option> */}
                  </select>
                </div>
                <div className="col-2">
                  <label>Net Weight:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={netweight}
                    onChange={(e) => setNetweight(e.target.value)}
                  />
                </div>
                <div className="col-2">
                  <label>Gross Weight:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={grossweight}
                    onChange={(e) => setGrossweight(e.target.value)}
                  />
                </div>
                <div className="col-2">
                  Package type:
                  <select
                    name="unit"
                    className="form-control"
                    onChange={(e) => setPackagetype(e.target.value)}
                  >
                    <option>--Select Package Type----</option>
                    <option value="Bags">Bags</option>
                    <option value="Boxes">Boxes</option>
                    <option value="Cartons">Cartons</option>
                    <option value="Pieces">Pieces</option>
                  </select>
                </div>
                <div className="col-2">
                  Quality spec :
                  <select
                    name="unit"
                    className="form-control"
                    onChange={(e) => setQualtiyspec(e.target.value)}
                  >
                    <option>--Select Quality spec----</option>
                    <option value="Goods">Goods</option>
                    <option value="Fragile Goods">Fragile Goods</option>
                    <option value="Dangerous goods">Dangerous goods</option>
                  </select>
                </div>
              </div>

              {error && <p>Please fill all fields correctly.</p>}
              <Button style={{ marginTop: "20px" }} type="submit">
                Save
              </Button>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performa_form;
