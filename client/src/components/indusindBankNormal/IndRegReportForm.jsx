import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageCropper from "../ImageCropper";
import FileInput from "../FileInput";

function convertFormDataToRows(formData) {
  const headers = Object.keys(formData);
  const values = headers.map(key => formData[key] || "");
  return { headers, rows: [values] };
}

export default function IndRegReportForm({ onSubmit }) {
  const { vehicleNo } = useParams();
  const [image, setImage] = useState('');
  const [currentPage, setCurrentPage] = useState('choose-img');
  const [selectedImageKey, setSelectedImageKey] = useState('');

  const [formData, setFormData] = useState({
    referenceNo: "",
    reportDate: "",
    salesPerson: "",

    borrowerName: "",
    address: "",
    mobileNo: "-",
    vehicleNo: "",
    makerName: "",
    model: "",
    engineNo: "",
    chassisNo: "",

    makeAndModel: "",
    registrationDate: "",
    ownerSerialNo: "",
    yearOfManufacture: "",
    rlwGvw: "",
    unladenWeight: "",
    fuelUsed: "",
    seatingCapacity: "",
    classOfVehicle: "",
    typeOfBody: "",
    color: "",
    fitnessValidity: "",
    hypothecation: "",

    inspectionLocation: "",
    inspectionDate: "",
    inspectionTime: "",


    permitType: "-",
    permitValidUpto: "-",
    taxPaidUpto: "-",

    insurerName: "PLEASE VERIFY",
    policyFrom: "PLEASE VERIFY",
    policyUpto: "PLEASE VERIFY",
    policyType: "PLEASE VERIFY",
    idv: "-",


    engineCondition: "GOOD",
    batteryCondition: "FAIR",
    chassisCondition: "GOOD",
    transmissionCondition: "FAIR",
    paintCondition: "GOOD",
    suspensionCondition: "FAIR",
    tireCondition: "FAIR",
    bodyCondition: "GOOD",


    docAadhar: "",
    docRC: "",
    docInsurance: "",
    docFitness: "",
    docPermit: "",
    docTax: "",

    onlineStatus: "-",

    valuation: "",

    chassisImage: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    image6: "",
    image7: "",
    image8: "",
    lastUpdated: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [rowIndex, setRowIndex] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (vehicleNo) {
      (async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/report1/find/${vehicleNo}`);
          if (!res.ok) throw new Error("Vehicle not found");

          const { rowData, rowIndex } = await res.json();
          setFormData(rowData);
          setRowIndex(rowIndex);
          setEditMode(true);
        } catch (err) {
          console.error("Error fetching report:", err);
          alert("Vehicle not found.");
        }
      })();
    }
  }, [vehicleNo]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { rows } = convertFormDataToRows(formData);
    const values = rows[0];

    try {
      const url = editMode
        ? `${import.meta.env.VITE_API_URL}/report1/update/${rowIndex}`
        : `${import.meta.env.VITE_API_URL}/report1`;

      const body = JSON.stringify({
        values: [values],
        rawFormData: formData,
      });


      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const result = await response.text();
      alert(result);
      onSubmit(formData);
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save data.");
    }
  };

  const searchByvehicleNo = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/report1/find/${searchInput}`);
      const { rowData, rowIndex } = await res.json();
      setFormData(rowData);
      setRowIndex(rowIndex);
      setEditMode(true);
    } catch (err) {
      alert("Vehicle not found.");
    }
  };

  const onGeneralImageSelected = (selectedImg, imageKey) => {
    setImage(selectedImg);
    setSelectedImageKey(imageKey);
    setCurrentPage("crop-img");
  };

  const onChassisImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setSelectedImageKey("chassisImage");
    setCurrentPage("crop-img");
  };

  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setImage('');
    setSelectedImageKey('');
  };

  const onCropDone = (cloudinaryUrl) => {
    if (selectedImageKey) {
      setFormData((prev) => ({
        ...prev,
        [selectedImageKey]: cloudinaryUrl,
      }));
    }
    setImage('');
    setSelectedImageKey('');
    setCurrentPage("choose-img");
  };
  return (
    <div className=" p-10 text-xl ">
      <h1 className="text-4xl mb-14 font-semibold text-center">INDUSIND BANK REPORT</h1>
      <div className="bg-gray-200 rounded-xl p-10 max-w-5xl w-full mx-auto border border-gray-300 mb-10">
        <h2 className="text-2xl font-semibold mb-2">Search Vehicle Number to Update</h2>
        <input type="text" placeholder="Enter Vehicle No (e.g., MH12AB0000)" value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border border-gray-400 rounded p-2 w-1/2 mr-2" />
        <button type="button" onClick={searchByvehicleNo} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Search
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-6 bg-gray-50  rounded-xl p-10 max-w-5xl w-full mx-auto border border-gray-300">
        <label htmlFor="referenceNo">Reference No:</label>
        <input className='border border-red-600 rounded-lg p-2' id="referenceNo" name="referenceNo" placeholder="IND/2025/1" value={formData.referenceNo} onChange={handleChange} />

        <label htmlFor="reportDate">Report Date:</label>
        <input className='border border-red-600 rounded-lg p-2' type="date" id="reportDate" name="reportDate" placeholder="Report Date" value={formData.reportDate} onChange={handleChange} />

        <label htmlFor="salesPerson">Name of Sales Person:</label>
        <select className='border border-red-600 rounded-lg p-2' id="salesPerson" name="salesPerson" value={formData.salesPerson} onChange={handleChange}>
          <option value="">-</option>
          <option value="MR. ARJUN PAWAR (IMFSR25404A)">MR. ARJUN PAWAR (IMFSR25404A)</option>
          <option value="MR. TUSHAR K PAUL (R09629)">MR. TUSHAR K PAUL (R09629)</option>
          <option value="MR. YOGESH SUDHAKAR KOLGE-PATIL (R16777)">MR. YOGESH SUDHAKAR KOLGE-PATIL (R16777)</option>
          <option value="MR. ASHOK JADHAV (IBLR22129)">MR. ASHOK JADHAV (IBLR22129)</option>
          <option value="MR. LAXMIKANT BABURAO SHAHIR (IMFSR16209)">MR. LAXMIKANT BABURAO SHAHIR (IMFSR16209)</option>
          <option value="MR. HANUMAN DADABHAU TODEKAR (IBLR13022)">MR. HANUMAN DADABHAU TODEKAR (IBLR13022)</option>
          <option value="MR. VIJAY SURYKART WAGHMARE (R25976)">MR. VIJAY SURYKART WAGHMARE (R25976)</option>
          <option value="MR. PRADIP BABURAO MUNDE (IBLR20930)">MR. PRADIP BABURAO MUNDE (IBLR20930)</option>
          <option value="MR. BALASAHEB VIKAS GUTTE (IBLR25362)">MR. BALASAHEB VIKAS GUTTE (IBLR25362)</option>
          <option value="MR. VYANKATI VACHISHT PANCHAL (IMFSR49733A)">MR. VYANKATI VACHISHT PANCHAL (IMFSR49733A)</option>
          <option value="MR. YOGESH RAMRAO MUNDE (IBLR26374)">MR. YOGESH RAMRAO MUNDE (IBLR26374)</option>
          <option value="MR. SURESH BHAGWAN PHAD (IBLR07301)">MR. SURESH BHAGWAN PHAD (IBLR07301)</option>
          <option value="MR. SANGA RAHUL MAHADEV (IBLR16440)">MR. SANGA RAHUL MAHADEV (IBLR16440)</option>
        </select>
        <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
          <h2 className="text-3xl font-bold mb-5 ">Section A: Vehicle Particulars: Physical</h2>
          <label htmlFor="borrowerName">Borrower's Name:</label>
          <input className='border border-red-600 rounded-lg p-2' name='borrowerName' id="borrowerName" placeholder="Borrower's Name" value={formData.borrowerName} onChange={handleChange} />

          <label htmlFor="address">Address:</label>
          <input className='border border-red-600 rounded-lg p-2' id="address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />

          <label htmlFor="mobileNo">Mobile No.:</label>
          <input className='border border-black rounded-lg p-2' id="mobileNo" name="mobileNo" placeholder="Mobile No." value={formData.mobileNo} onChange={handleChange} />

          <label htmlFor="vehicleNo">Vehicle No:</label>
          <input className='border border-red-600 rounded-lg p-2' id='vehicleNo' name="vehicleNo" placeholder="Vehicle No." value={formData.vehicleNo} onChange={handleChange} />

          <label htmlFor="makerName">Maker's Name:</label>
          <select className='border border-red-600 rounded-lg p-2' id="makerName" name="makerName" value={formData.makerName} onChange={handleChange}>
            <option value="">-</option>
            <option value="TATA MOTORS LTD">TATA MOTORS LTD</option>
            <option value="MAHINDRA AND MAHINDRA">MAHINDRA AND MAHINDRA</option>
            <option value="ASHOK LEYLAND LTD">ASHOK LEYLAND LTD</option>
            <option value="VE COMMERCIAL VEHICLE LTD (EICHER)">VE COMMERCIAL VEHICLE LTD (EICHER)</option>
            <option value="MARUTI SUZUKI ">MARUTI SUZUKI </option>
            <option value="HYUNDAI MOTORS">HYUNDAI MOTORS</option>
            <option value="FORD MOTORS">FORD MOTORS</option>
            <option value="TOYOTA KIRLOSKAR MOTORS LTD">TOYOTA KIRLOSKAR MOTORS LTD</option>
            <option value="HONDA MOTOR">HONDA MOTOR</option>
            <option value="FORCE MOTORS">FORCE MOTORS</option>
            <option value="BHARAT BENZ MOTOR">BHARAT BENZ MOTOR</option>
            <option value="JCB INDIA LTD">JCB INDIA LTD</option>
            <option value="NEW HOLLAND">NEW HOLLAND</option>
            <option value="KUBOTA TACTORS">KUBOTA TACTORS</option>
          </select>


          <label htmlFor="model">Model:</label>
          <input className='border border-red-600 rounded-lg p-2' id="model" name="model" placeholder="model" value={formData.model} onChange={handleChange} />

          <label htmlFor="engineNo">Engine No:</label>
          <input className='border border-red-600 rounded-lg p-2' id="engineNo" name="engineNo" placeholder="engineNo" value={formData.engineNo} onChange={handleChange} />

          <label htmlFor="chassisNo">Chassis No:</label>
          <input className='border border-red-600 rounded-lg p-2' id="chassisNo" name="chassisNo" placeholder="chassisNo" value={formData.chassisNo} onChange={handleChange} />
        </span>

        <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
          <h2 className="text-3xl font-bold mb-5 ">Section B: Registration Particulars (As per RC):</h2>

          <label htmlFor="registrationDate">Registration Date:</label>
          <input className='border border-red-600 rounded-lg p-2' id="registrationDate" name="registrationDate" placeholder="Registration Date" value={formData.registrationDate} onChange={handleChange} />

          <label htmlFor="ownerSerialNo">Owner Serial No.:</label>
          <input className='border border-red-600 rounded-lg p-2' type="number" id="ownerSerialNo" name="ownerSerialNo" placeholder="owner Serial No." value={formData.ownerSerialNo} onChange={handleChange} />

          <label htmlFor="yearOfManufacture">Year of Manufacture:</label>
          <input className='border border-red-600 rounded-lg p-2' id="yearOfManufacture" name="yearOfManufacture" placeholder="yearOfManufacture" value={formData.yearOfManufacture} onChange={handleChange} />

          <label htmlFor="rlwGvw">Rlw / Gvw:</label>
          <input className='border border-red-600 rounded-lg p-2' type="number" id="rlwGvw" name="rlwGvw" placeholder="rlwGvw" value={formData.rlwGvw} onChange={handleChange} />

          <label htmlFor="unladenWeight">Unladen-Weight:</label>
          <input className='border border-red-600 rounded-lg p-2' type="number" id="unladenWeight" name="unladenWeight" placeholder="unladenWeight" value={formData.unladenWeight} onChange={handleChange} />

          <label htmlFor="fuelUsed">Fuel Used:</label>
          <input className='border border-red-600 rounded-lg p-2' id="fuelUsed" name="fuelUsed" placeholder="fuelUsed" value={formData.fuelUsed} onChange={handleChange} />

          <label htmlFor="seatingCapacity">Seating Capacity:</label>
          <input className='border border-red-600 rounded-lg p-2' type="number" id="seatingCapacity" name="seatingCapacity" placeholder="seatingCapacity" value={formData.seatingCapacity} onChange={handleChange} />

          <label htmlFor="classOfVehicle">Class of Vehicle:</label>
          <input className='border border-red-600 rounded-lg p-2' id="classOfVehicle" name="classOfVehicle" placeholder="classOfVehicle" value={formData.classOfVehicle} onChange={handleChange} />

          <label htmlFor="typeOfBody">Type of Body:</label>
          <input className='border border-red-600 rounded-lg p-2' id="typeOfBody" name="typeOfBody" placeholder="typeOfBody" value={formData.typeOfBody} onChange={handleChange} />

          <label htmlFor="color">Color:</label>
          <input className='border border-red-600 rounded-lg p-2' id="color" name="color" placeholder="color" value={formData.color} onChange={handleChange} />

          <label htmlFor="fitnessValidity">Fitness Validity:</label>
          <input className='border border-red-600 rounded-lg p-2' id="fitnessValidity" name="fitnessValidity" placeholder="fitnessValidity" value={formData.fitnessValidity} onChange={handleChange} />

          <label htmlFor="hypothecation">Hypothecation:</label>
          <input className='border border-red-600 rounded-lg p-2' id="hypothecation" name="hypothecation" placeholder="hypothecation" value={formData.hypothecation} onChange={handleChange} />

        </span>

        <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
          <h2 className="text-3xl font-bold mb-5 ">Section C: Inspection Details</h2>

          <label htmlFor="inspectionLocation">Inspection Location:</label>
          <input className='border border-red-600 rounded-lg p-2' id="inspectionLocation" name="inspectionLocation" placeholder="inspectionLocation" value={formData.inspectionLocation} onChange={handleChange} />

          <label htmlFor="inspectionDate">Inspection Date:</label>
          <input className='border border-red-600 rounded-lg p-2' id="inspectionDate" name="inspectionDate" placeholder="inspectionDate" value={formData.inspectionDate} onChange={handleChange} />

          <label htmlFor="inspectionTime">Inspection Time:</label>
          <input className='border border-red-600 rounded-lg p-2' id="inspectionTime" name="inspectionTime" placeholder="inspectionTime" value={formData.inspectionTime} onChange={handleChange} />

        </span>

        <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
          <h2 className="text-3xl font-bold mb-5 ">Section D: Permit Details& Tax Details</h2>

          <label htmlFor="permitType">Type of Permit</label>
          <select className='border border-black rounded-lg p-2' id="permitType" name="permitType" value={formData.permitType} onChange={handleChange}>
            <option value="">-</option>
            <option value="ALL INDIA PERMIT">ALL INDIA PERMIT</option>
            <option value="STATE PERMIT">STATE PERMIT</option>
            <option value="NOT IN ORDER">NOT IN ORDER</option>
            <option value="GOODS PERMIT">GOODS PERMIT</option>
            <option value="CONTRACT CARRIAGE PERMIT(PASSENGER)">CONTRACT CARRIAGE PERMIT(PASSENGER)</option>
          </select>

          <label htmlFor="permitValidUpto">Permit Valid Upto:</label>
          <input className='border border-black rounded-lg p-2' id="permitValidUpto" name="permitValidUpto" placeholder="permitValidUpto" value={formData.permitValidUpto} onChange={handleChange} />

          <label htmlFor="taxPaidUpto">Tax Paid Upto:</label>
          <select className='border border-red-600 rounded-lg p-2' id="taxPaidUpto" name="taxPaidUpto" value={formData.taxPaidUpto} onChange={handleChange}>
            <option value="">-</option>
            <option value="OTT">OTT</option>
            <option value="LTT">LTT</option>
          </select>
        </span>

        <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
          <h2 className="text-3xl font-bold mb-5 ">Section E: Insurance Details</h2>

          <label htmlFor="insurerName">Name of Insurer</label>
          <select className='border border-red-600 rounded-lg p-2' id="insurerName" name="insurerName" value={formData.insurerName} onChange={handleChange}>
            <option value="">-</option>
            <option value="PLEASE VERITFY">PLEASE VERIFY</option>
            <option value="Acko General Insurance Ltd">Acko General Insurance Ltd</option>
            <option value="Agriculture Insurance Company of India Ltd.">Agriculture Insurance Company of India Ltd.</option>
            <option value="Bajaj Allianz General Insurance Co. Ltd.">Bajaj Allianz General Insurance Co. Ltd.</option>
            <option value="Cholamandalam MS General Insurance Co. Ltd.">Cholamandalam MS General Insurance Co. Ltd.</option>
            <option value="Navi General Insurance Ltd.">Navi General Insurance Ltd.</option>
            <option value="Edelweiss General Insurance Co. Ltd.">Edelweiss General Insurance Co. Ltd.</option>
            <option value="Future Generali India Insurance Co. Ltd.">Future Generali India Insurance Co. Ltd.</option>
            <option value="Go Digit General Insurance Ltd.">Go Digit General Insurance Ltd.</option>
            <option value="HDFC ERGO General Insurance Co.Ltd.">HDFC ERGO General Insurance Co.Ltd.</option>
            <option value="ICICI LOMBARD General Insurance Co. Ltd.">ICICI LOMBARD General Insurance Co. Ltd.</option>
            <option value="IFFCO TOKIO General Insurance Co. Ltd.">IFFCO TOKIO General Insurance Co. Ltd.</option>
            <option value="Kotak Mahindra General Insurance Co. Ltd.">Kotak Mahindra General Insurance Co. Ltd.</option>
            <option value="Liberty General Insurance Ltd.">Liberty General Insurance Ltd.</option>
            <option value="Magma HDI General Insurance Co. Ltd.">Magma HDI General Insurance Co. Ltd.</option>
            <option value="National Insurance Co. Ltd.">National Insurance Co. Ltd.</option>
            <option value="Raheja QBE General Insurance Co. Ltd.">Raheja QBE General Insurance Co. Ltd.</option>
            <option value="Reliance General Insurance Co. Ltd.">Reliance General Insurance Co. Ltd.</option>
            <option value="Royal Sundaram General Insurance Co. Ltd.">Royal Sundaram General Insurance Co. Ltd.</option>
            <option value="SBI General Insurance Co. Ltd.">SBI General Insurance Co. Ltd.</option>
            <option value="Shriram General Insurance Co. Ltd.">Shriram General Insurance Co. Ltd.</option>
            <option value="Tata AIG General Insurance Co. Ltd.">Tata AIG General Insurance Co. Ltd.</option>
            <option value="The New India Assurance Co. Ltd.">The New India Assurance Co. Ltd.</option>
            <option value="The Oriental Insurance Co. Ltd.">The Oriental Insurance Co. Ltd.</option>
            <option value="United India Insurance Co. Ltd.">United India Insurance Co. Ltd.</option>
            <option value="Universal Sompo General Insurance Co. Ltd.">Universal Sompo General Insurance Co. Ltd.</option>
            <option value="Bharti Axa General Insurance Co. Ltd.">Bharti Axa General Insurance Co. Ltd.</option>
          </select>

          <label htmlFor="policyFrom">Policy From:</label>
          <input className='border border-black rounded-lg p-2' id="policyFrom" name="policyFrom" placeholder="policyFrom" value={formData.policyFrom} onChange={handleChange} />

          <label htmlFor="policyUpto">Policy Upto:</label>
          <input className='border border-black rounded-lg p-2' id="policyUpto" name="policyUpto" placeholder="policyUpto" value={formData.policyUpto} onChange={handleChange} />

          <label htmlFor="policyType">Policy Type:</label>
          <input className='border border-black rounded-lg p-2' id="policyType" name="policyType" placeholder="policyType" value={formData.policyType} onChange={handleChange} />

          <label htmlFor="idv">IDV:</label>
          <input className='border border-black rounded-lg p-2' id="idv" name="idv" placeholder="idv" value={formData.idv} onChange={handleChange} />
        </span>

        <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
          <h2 className="text-3xl font-bold mb-5 ">Section F: Condition of the Asset</h2>

          <label htmlFor="engineCondition">Engine Condition:</label>
          <select className='border border-black rounded-lg p-2' id="engineCondition" name="engineCondition" value={formData.engineCondition} onChange={handleChange}>
            <option value="">-</option>
            <option value="GOOD">GOOD</option>
            <option value="FAIR">FAIR</option>
            <option value="NOT IN ORDER">NOT IN ORDER</option>
            <option value="MISSING">MISSING</option>
            <option value="FOUND DAMAGED">FOUND DAMAGED</option>
          </select>

          <label htmlFor="batteryCondition">Battery Condition:</label>
          <select className='border border-black rounded-lg p-2' id="batteryCondition" name="batteryCondition" value={formData.batteryCondition} onChange={handleChange}>
            <option value="">-</option>
            <option value="GOOD">GOOD</option>
            <option value="FAIR">FAIR</option>
            <option value="NOT IN ORDER">NOT IN ORDER</option>
            <option value="MISSING">MISSING</option>
            <option value="FOUND DAMAGED">FOUND DAMAGED</option>
          </select>

          <label htmlFor="chassisCondition">Chassis Condition:</label>
          <select className='border border-black rounded-lg p-2' id="chassisCondition" name="chassisCondition" value={formData.chassisCondition} onChange={handleChange}>
            <option value="">-</option>
            <option value="GOOD">GOOD</option>
            <option value="FAIR">FAIR</option>
            <option value="NOT IN ORDER">NOT IN ORDER</option>
            <option value="MISSING">MISSING</option>
            <option value="FOUND DAMAGED">FOUND DAMAGED</option>
          </select>

          <label htmlFor="transmissionCondition">Transmission Condition:</label>
          <select className='border border-black rounded-lg p-2' id="transmissionCondition" name="transmissionCondition" value={formData.transmissionCondition} onChange={handleChange}>
            <option value="">-</option>
            <option value="GOOD">GOOD</option>
            <option value="FAIR">FAIR</option>
            <option value="NOT IN ORDER">NOT IN ORDER</option>
            <option value="MISSING">MISSING</option>
            <option value="FOUND DAMAGED">FOUND DAMAGED</option>
          </select>

          <label htmlFor="paintCondition">Paint Condition:</label>
          <select className='border border-black rounded-lg p-2' id="paintCondition" name="paintCondition" value={formData.paintCondition} onChange={handleChange}>
            <option value="">-</option>
            <option value="GOOD">GOOD</option>
            <option value="FAIR">FAIR</option>
            <option value="NOT IN ORDER">NOT IN ORDER</option>
            <option value="MISSING">MISSING</option>
            <option value="FOUND DAMAGED">FOUND DAMAGED</option>
          </select>

          <label htmlFor="suspensionCondition">Suspension Condition:</label>
          <select className='border border-black rounded-lg p-2' id="suspensionCondition" name="suspensionCondition" value={formData.suspensionCondition} onChange={handleChange}>
            <option value="">-</option>
            <option value="GOOD">GOOD</option>
            <option value="FAIR">FAIR</option>
            <option value="NOT IN ORDER">NOT IN ORDER</option>
            <option value="MISSING">MISSING</option>
            <option value="FOUND DAMAGED">FOUND DAMAGED</option>
          </select>

          <label htmlFor="tireCondition">Tire Condition:</label>
          <select className='border border-black rounded-lg p-2' id="tireCondition" name="tireCondition" value={formData.tireCondition} onChange={handleChange}>
            <option value="">-</option>
            <option value="GOOD">GOOD</option>
            <option value="FAIR">FAIR</option>
            <option value="NOT IN ORDER">NOT IN ORDER</option>
            <option value="MISSING">MISSING</option>
            <option value="FOUND DAMAGED">FOUND DAMAGED</option>
          </select>

          <label htmlFor="bodyCondition">Body Condition:</label>
          <select className='border border-black rounded-lg p-2' id="bodyCondition" name="bodyCondition" value={formData.bodyCondition} onChange={handleChange}>
            <option value="">-</option>
            <option value="GOOD">GOOD</option>
            <option value="FAIR">FAIR</option>
            <option value="NOT IN ORDER">NOT IN ORDER</option>
            <option value="MISSING">MISSING</option>
            <option value="FOUND DAMAGED">FOUND DAMAGED</option>
          </select>

        </span>

        <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
          <h2 className="text-3xl font-bold mb-5 ">Section G: Documentation Provided</h2>

          <label htmlFor="docAadhar">Aadhar Card:</label>
          <select className='border border-red-600 rounded-lg p-2' id="docAadhar" name="docAadhar" value={formData.docAadhar} onChange={handleChange}>
            <option value="">-</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>

          <label htmlFor="docRC">RC:</label>
          <select className='border border-red-600 rounded-lg p-2' id="docRC" name="docRC" value={formData.docRC} onChange={handleChange}>
            <option value="">-</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>

          <label htmlFor="docInsurance">Insurance:</label>
          <select className='border border-red-600 rounded-lg p-2' id="docInsurance" name="docInsurance" value={formData.docInsurance} onChange={handleChange}>
            <option value="">-</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>

          <label htmlFor="docFitness">Fitness:</label>
          <select className='border border-black rounded-lg p-2' id="docFitness" name="docFitness" value={formData.docFitness} onChange={handleChange}>
            <option value="">-</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>

          <label htmlFor="docPermit">Permit:</label>
          <select className='border border-black rounded-lg p-2' id="docPermit" name="docPermit" value={formData.docPermit} onChange={handleChange}>
            <option value="">-</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>

          <label htmlFor="docTax">Tax:</label>
          <select className='border border-black rounded-lg p-2 ' id="docTax" name="docTax" value={formData.docTax} onChange={handleChange}>
            <option value="">-</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </span>


        {/* Chassis Section */}
        <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
          <h2 className="text-3xl font-bold mb-5">Section I: Chassis Number Impression/ Photo</h2>
          <h4 className="text-2xl font-semibold">Chassis Number Image</h4>

          {currentPage === "crop-img" && selectedImageKey === "chassisImage" ? (
            <ImageCropper
              image={image}
              onCropDone={onCropDone}
              onCropCancel={onCropCancel}
              vehicleNo={formData.vehicleNo}
              imageKey="chassisImage"
            />
          ) : formData.chassisImage ? (
            <div>
              <img src={formData.chassisImage} alt="Chassis Preview" className="w-48 h-auto rounded shadow" />
              <p>Preview of cropped chassis image</p>
              <button
                type="button"
                onClick={() => {
                  setImage(formData.chassisImage);
                  setSelectedImageKey("chassisImage");
                  setCurrentPage("crop-img");
                }}
                className="bg-blue-500 text-white p-2 rounded mt-2 mr-4"
              >
                Crop Again
              </button>
              <button
                type="button"
                onClick={() => {
                  setImage('');
                  setFormData((prev) => ({ ...prev, chassisImage: "" }));
                }}
                className="bg-gray-400 text-white p-2 rounded mt-2"
              >
                Upload New Image
              </button>
            </div>
          ) : (
            <FileInput onImageSelected={onChassisImageSelected} />
          )}
        </span>


        <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
          <h2 className="text-3xl font-bold mb-5 ">Section J: Online Status of Vehicle</h2>

          <label htmlFor="salesPerson">Online Status:</label>
          <select className='border border-red-600 rounded-lg p-2 ' id="onlineStatus" name="onlineStatus" value={formData.onlineStatus} onChange={handleChange}>
            <option value="">-</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="BLACKLISTED">BLACKLISTED</option>
          </select>
        </span>

        <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
          <h2 className="text-3xl font-bold mb-5 ">Section K: Vehicle Valuation</h2>

          <label htmlFor="valuation">Valuation:</label>
          <input className='border border-red-600 rounded-lg p-2 ' type="number" id="valuation" name="valuation" placeholder="valuation" value={formData.valuation} onChange={handleChange} />
        </span>

        {[...Array(8)].map((_, i) => {
          const key = `image${i + 1}`;
          const page = i < 4 ? 'Page4' : 'Page5';

          return (
            <div key={key} className="mb-6">
              <h5 className="text-xl font-semibold">Image {i % 4 + 1} ({page})</h5>

              {currentPage === "crop-img" && selectedImageKey === key ? (
                <ImageCropper
                  image={image}
                  onCropDone={onCropDone}
                  onCropCancel={onCropCancel}
                  vehicleNo={formData.vehicleNo}
                  imageKey={key}
                />
              ) : (
                <div>
                  <FileInput onImageSelected={(img) => onGeneralImageSelected(img, key)} />

                  {formData[key] && (
                    <div className="mt-2">
                      <img
                        src={formData[key]}
                        alt={`Preview of ${key}`}
                        className="w-48 h-auto rounded shadow"
                      />
                      <p>Preview of cropped {key}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setImage(formData[key]);
                          setSelectedImageKey(key);
                          setCurrentPage("crop-img");
                        }}
                        className="bg-blue-500 text-white p-2 rounded mt-2 mr-4"
                      >
                        Crop Again
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, [key]: "" }));
                        }}
                        className="bg-gray-400 text-white p-2 rounded mt-2"
                      >
                        Upload New Image
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        <button type="submit" className="bg-blue-500 w-4/12 rounded-xl p-2 mt-2">
          Generate PDF
        </button>
      </form>

    </div>
  );
}
