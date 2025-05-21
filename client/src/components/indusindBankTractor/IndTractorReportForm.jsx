import React, { useState } from "react";
import ImageCropper from "../ImageCropper";
import FileInput from "../FileInput";

export default function IndTractorReportForm({ onSubmit }) {
    const [image, setImage] = useState('');
    const [currentPage, setCurrentPage] = useState('choose-img');
    const [imageAfterCrop, setImageAfterCrop] = useState('');
    const [formData, setFormData] = useState({
        referenceNo: "",
        reportDate: "",
        bankRequestRefNo: "",
        salesPerson: "",

        borrowerName: "",
        regOwner: "",
        srNoOfRegOwner: "",

        dateOfInspection: "",
        TimeOfInspection: "",
        placeOfInspection: "",
        valuationForFunding: "",
        valuationForSale: "",

        registrationNo: "",
        dateOfReg: "",
        rto: "",
        dealerFromWhomPurchased: "",
        nameOfTheManufacture: "",
        yearOfManufacture: "",
        vehicleAge: "-",
        makeAndModel: "",
        chassisNo: "",
        engineNo: "",
        classOfVehicleandTypeOfBody: "",
        color: "",
        seatingCapacity: "",
        carryingCapacity: "",
        rlwULW: "",
        fuelUsed: "",
        hypothecationInTheNameOf: "",
        hypothecationEffectiveSince: "-",
        averageCollectionPerDay: "-",
        verification: "DONE",

        fitnessValidUpto: "",
        permitNoOrDate: "-",
        natureOfPermit: "-",
        permitValidUpto: "-",
        permitHolderName: "-",
        routeOfPermit: "-",
        taxTokenPaidUpto: "LTT",

        cabin: "GOOD",
        loadBody: "NA",
        chassis: "GOOD",
        engine: "GOOD",
        suspension: "GOOD",
        frontandRearSuspension: "GOOD",
        transmissionorSTGSystem: "GOOD",
        battery: "AVERAGE",
        odometerReading: "-",
        mechanicalCondition: "GOOD",
        paintWork: "AVERAGE",
        steeringMechanism: "GOOD",
        steeringWheelorSteeringBox: "GOOD",
        steeringShaftandColumn: "GOOD",
        steeringLinkages: "GOOD",
        electricalSystem: "GOOD",
        landRHeadPumporTailorClusterorLamp: "GOOD",
        batteryMakenadCondition: "GOOD",
        axleorTransmissionSystem: "GOOD",
        pRAxleorGearBoxorPropellershaft: "GOOD",
        differentialHousingAxle: "GOOD",
        coolingSystemandRadiator: "GOOD",
        exhaustSystem_SilencerorManifold: "GOOD",
        fuelSupplySystem_FuelTankandPipes: "AVERAGE",
        brakeSystemPedalandPipes: "AVERAGE",
        others: "AVERAGE",
        wheelDiscs: "GOOD",
        frontRightTyre: "AVERAGE",
        frontLeftTyre: "AVERAGE",
        rearRightTyre: "AVERAGE",
        rearLeftTyre: "AVERAGE",

        ifThisVehicleIsRecentlyInspectedByTheSameOrAnyotherValuer: "INSPECTED BY ME",
        reasonforValuation: "FOR LOAN PURPOSE",
        vehicleMigratedFromOtherArea: "N/A",
        reRegisteredVehicle: "N/A",
        duplicateRCOrOriginalRC: "PLEASE VERIFY",
        seizedVehicleOfFinancier: "N/A",
        nameOfFinancier: "N/A",

        overallConditionOfVehicle: "-",

        insurerName: "-",
        insuredName: "-",
        policyNo: "-",
        insuredsDeclaredValue: "-",
        hypothecationIfAny: "-",
        accidentIfAny: "-",

        InvoiceValueVehicle: "-",
        marketValue: "",

        odoMeterPhotographs: "Y",
        RegnNoPlatePhotographs: "-",
        frameNoPhotographs: "-",
        frontPhotographs: "Y",
        sidePhotographs: "-",
        cabinPhotographs: "NA",

        chassisImage: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",
        image6: "",
        image7: "",
        image8: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onChassisImageSelected = (selectedImg) => {
        setImage(selectedImg);
        setCurrentPage("crop-img");
    };

    const onCropDone = (imgCroppedArea) => {
        if (!imgCroppedArea || !imgCroppedArea.width || !imgCroppedArea.height) {
            console.error("Invalid crop area:", imgCroppedArea);
            return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = imgCroppedArea.width;
        canvas.height = imgCroppedArea.height;
        const ctx = canvas.getContext("2d");

        const imageObj = new Image();
        imageObj.src = image;

        imageObj.onload = function () {
            ctx.drawImage(
                imageObj,
                imgCroppedArea.x,
                imgCroppedArea.y,
                imgCroppedArea.width,
                imgCroppedArea.height,
                0,
                0,
                imgCroppedArea.width,
                imgCroppedArea.height
            );

            const base64Image = canvas.toDataURL("image/jpeg");
            setImageAfterCrop(base64Image);
            setFormData((prev) => ({ ...prev, chassisImage: base64Image }));
            setCurrentPage("img-cropped");
        };
    };

    const onCropCancel = () => {
        setCurrentPage("choose-img");
        setImage('');
    };

    const onImageSelected = (selectedImg, imageKey) => {
        setFormData((prev) => ({
            ...prev,
            [imageKey]: selectedImg,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    return (
        <div className=" p-10 text-xl ">
            <h2 className="text-3xl mb-10">INDUSIND BANK LTD. REPORT FOR TRACTORS</h2>
            <form onSubmit={handleSubmit} className="flex flex-col lg:w-5/12 space-y-3 text-left p-5 bg-slate-200">
                <label htmlFor="referenceNo">Reference No:</label>
                <input className='border border-red-600 rounded-lg p-2' id="referenceNo" name="referenceNo" placeholder="IND/2025/1" value={formData.referenceNo} onChange={handleChange} />

                <label htmlFor="reportDate">Report Date:</label>
                <input className='border border-red-600 rounded-lg p-2' id="reportDate" name="reportDate" placeholder="Report Date" value={formData.reportDate} onChange={handleChange} />

                <label htmlFor="bankRequestRefNo">bankRequestRefNo:</label>
                <input className='border border-red-600 rounded-lg p-2' id="bankRequestRefNo" name="bankRequestRefNo" placeholder="bankRequestRefNo" value={formData.bankRequestRefNo} onChange={handleChange} />

                <label htmlFor="salesPerson">Name of Sales Person:</label>
                <input className='border border-red-600 rounded-lg p-2' id="salesPerson" name="salesPerson" placeholder="salesPerson" value={formData.salesPerson} onChange={handleChange} />

                <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
                    <h2 className="text-3xl font-bold mb-5 ">GENERAL INFORMATION</h2>

                    <label htmlFor="borrowerName">Borrower's Name:</label>
                    <input className='border border-red-600 rounded-lg p-2' name='borrowerName' id="borrowerName" placeholder="Borrower's Name" value={formData.borrowerName} onChange={handleChange} />

                    <label htmlFor="regOwner">Registered Owner:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="regOwner" name="regOwner" placeholder="regOwner" value={formData.regOwner} onChange={handleChange} />

                    <label htmlFor="srNoOfRegOwner">Sr No of Reg Owner:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="srNoOfRegOwner" name="srNoOfRegOwner" placeholder="srNoOfRegOwner" value={formData.srNoOfRegOwner} onChange={handleChange} />
                </span>

                <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
                    <h2 className="text-3xl font-bold mb-5 ">INSPECTION DETAILS</h2>

                    <label htmlFor="dateOfInspection">Date of Inspection</label>
                    <input className='border border-red-600 rounded-lg p-2' id="dateOfInspection" name="dateOfInspection" placeholder="Date Of Inspection" value={formData.dateOfInspection} onChange={handleChange} />

                    <label htmlFor="TimeOfInspection">Time of Inspection</label>
                    <input className='border border-red-600 rounded-lg p-2' id="TimeOfInspection" name="TimeOfInspection" placeholder="Time Of Inspection" value={formData.TimeOfInspection} onChange={handleChange} />

                    <label htmlFor="placeOfInspection">Place of Inspection:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="placeOfInspection" name="placeOfInspection" placeholder="placeOfInspection" value={formData.placeOfInspection} onChange={handleChange} />

                    <label htmlFor="valuationForFunding">Valuation for Funding:</label>
                    <input className='border border-black rounded-lg p-2' id="valuationForFunding" name="valuationForFunding" placeholder="valuationForFunding" value={formData.valuationForFunding} onChange={handleChange} />

                    <label htmlFor="valuationForSale"> Valuation for Sale:</label>
                    <input className='border border-black rounded-lg p-2' id="valuationForSale" name="valuationForSale" placeholder="valuationForSale" value={formData.valuationForSale} onChange={handleChange} />
                </span>

                <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
                    <h2 className="text-3xl font-bold mb-5 ">VEHICLE PARTICULARS</h2>

                    <label htmlFor="registrationNo">Registration No:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="registrationNo" name="registrationNo" placeholder="registrationNo" value={formData.registrationNo} onChange={handleChange} />

                    <label htmlFor="dateOfReg">Date of Registration:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="dateOfReg" name="dateOfReg" placeholder="dateOfReg" value={formData.dateOfReg} onChange={handleChange} />

                    <label htmlFor="rto">RTO:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="rto" name="rto" placeholder="rto" value={formData.rto} onChange={handleChange} />

                    <label htmlFor="dealerFromWhomPurchased"> Dealer from whom Purchased:</label>
                    <input className='border border-black rounded-lg p-2' id="dealerFromWhomPurchased" name="dealerFromWhomPurchased" placeholder="dealerFromWhomPurchased" value={formData.dealerFromWhomPurchased} onChange={handleChange} />

                    <label htmlFor="nameOfTheManufacture">Name of the Manufacture:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="nameOfTheManufacture" name="nameOfTheManufacture" placeholder="nameOfTheManufacture" value={formData.nameOfTheManufacture} onChange={handleChange} />

                    <label htmlFor="yearOfManufacture"> Year of Manufacture:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="yearOfManufacture" name="yearOfManufacture" placeholder="yearOfManufacture" value={formData.yearOfManufacture} onChange={handleChange} />

                    <label htmlFor="vehicleAge">Vehicle Age:</label>
                    <input className='border border-black rounded-lg p-2' id="vehicleAge" name="vehicleAge" placeholder="vehicleAge" value={formData.vehicleAge} onChange={handleChange} />

                    <label htmlFor="makeAndModel"> Make/Model:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="makeAndModel" name="makeAndModel" placeholder="makeAndModel" value={formData.makeAndModel} onChange={handleChange} />

                    <label htmlFor="chassisNo">Chassis Number:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="chassisNo" name="chassisNo" placeholder="chassisNo" value={formData.chassisNo} onChange={handleChange} />

                    <label htmlFor="engineNo"> Engine Number:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="engineNo" name="engineNo" placeholder="engineNo" value={formData.engineNo} onChange={handleChange} />

                    <label htmlFor="classOfVehicleandTypeOfBody">Class of Vehicle & Type of Body:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="classOfVehicleandTypeOfBody" name="classOfVehicleandTypeOfBody" placeholder="classOfVehicleandTypeOfBody" value={formData.classOfVehicleandTypeOfBody} onChange={handleChange} />

                    <label htmlFor="color">Colour of the Vehicle:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="color" name="color" placeholder="color" value={formData.color} onChange={handleChange} />

                    <label htmlFor="seatingCapacity">Seating Capacity:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="seatingCapacity" name="seatingCapacity" placeholder="seatingCapacity" value={formData.seatingCapacity} onChange={handleChange} />

                    <label htmlFor="carryingCapacity">Carrying Capacity:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="carryingCapacity" name="carryingCapacity" placeholder="carryingCapacity" value={formData.carryingCapacity} onChange={handleChange} />

                    <label htmlFor="rlwULW">RLW / ULW:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="rlwULW" name="rlwULW" placeholder="rlwULW" value={formData.rlwULW} onChange={handleChange} />

                    <label htmlFor="fuelUsed">Type of Fuel:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="fuelUsed" name="fuelUsed" placeholder="fuelUsed" value={formData.fuelUsed} onChange={handleChange} />

                    <label htmlFor="hypothecationInTheNameOf">Hypothecation in the name of:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="hypothecationInTheNameOf" name="hypothecationInTheNameOf" placeholder="hypothecationInTheNameOf" value={formData.hypothecationInTheNameOf} onChange={handleChange} />

                    <label htmlFor="hypothecationEffectiveSince">Hypothecation effective since:</label>
                    <input className='border border-black rounded-lg p-2' id="hypothecationEffectiveSince" name="hypothecationEffectiveSince" placeholder="hypothecationEffectiveSince" value={formData.hypothecationEffectiveSince} onChange={handleChange} />

                    <label htmlFor="averageCollectionPerDay">Average Collection Per day:</label>
                    <input className='border border-black rounded-lg p-2' id="averageCollectionPerDay" name="averageCollectionPerDay" placeholder="averageCollectionPerDay" value={formData.averageCollectionPerDay} onChange={handleChange} />

                    <label htmlFor="verification">Verification:</label>
                    <input className='border border-black rounded-lg p-2' id="verification" name="verification" placeholder="verification" value={formData.verification} onChange={handleChange} />
                </span>

                <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
                    <h2 className="text-3xl font-bold mb-5 ">FITNESS/PERMIT/ROAD TAX DETAILS</h2>

                    <label htmlFor="fitnessValidUpto"> Fitness Valid Up to:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="fitnessValidUpto" name="fitnessValidUpto" placeholder="fitnessValidUpto" value={formData.fitnessValidUpto} onChange={handleChange} />

                    <label htmlFor="permitNoOrDate">Permit No/Date:</label>
                    <input className='border border-black rounded-lg p-2' id="permitNoOrDate" name="permitNoOrDate" placeholder="permitNoOrDate" value={formData.permitNoOrDate} onChange={handleChange} />

                    <label htmlFor="natureOfPermit">Nature of Permit:</label>
                    <input className='border border-black rounded-lg p-2' id="natureOfPermit" name="natureOfPermit" placeholder="natureOfPermit" value={formData.natureOfPermit} onChange={handleChange} />

                    <label htmlFor="permitValidUpto">Permit Valid Up to:</label>
                    <input className='border border-black rounded-lg p-2' id="permitValidUpto" name="permitValidUpto" placeholder="permitValidUpto" value={formData.permitValidUpto} onChange={handleChange} />

                    <label htmlFor="permitHolderName">Permit Holder Name:</label>
                    <input className='border border-black rounded-lg p-2' id="permitHolderName" name="permitHolderName" placeholder="permitHolderName" value={formData.permitHolderName} onChange={handleChange} />

                    <label htmlFor="routeOfPermit">Route of Permit:</label>
                    <input className='border border-black rounded-lg p-2' id="routeOfPermit" name="routeOfPermit" placeholder="routeOfPermit" value={formData.routeOfPermit} onChange={handleChange} />

                    <label htmlFor="taxTokenPaidUpto">Tax Token Paid Up to:</label>
                    <input className='border border-red-600 rounded-lg p-2' id="taxTokenPaidUpto" name="taxTokenPaidUpto" placeholder="taxTokenPaidUpto" value={formData.taxTokenPaidUpto} onChange={handleChange} />
                </span>

                <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
                    <h2 className="text-3xl font-bold mb-5 ">MAJOR ACCESSORIES</h2>

                    <label htmlFor="cabin">Cabin:</label>
                    <input className='border border-black rounded-lg p-2' id="cabin" name="cabin" placeholder="GOOD" value={formData.cabin} onChange={handleChange} />

                    <label htmlFor="loadBody">Load Body:</label>
                    <input className='border border-black rounded-lg p-2' id="loadBody" name="loadBody" placeholder="NA" value={formData.loadBody} onChange={handleChange} />

                    <label htmlFor="chassis">Chassis:</label>
                    <input className='border border-black rounded-lg p-2' id="chassis" name="chassis" placeholder="GOOD" value={formData.chassis} onChange={handleChange} />

                    <label htmlFor="engine">Engine:</label>
                    <input className='border border-black rounded-lg p-2' id="engine" name="engine" placeholder="GOOD" value={formData.engine} onChange={handleChange} />

                    <label htmlFor="suspension">Suspension:</label>
                    <input className='border border-black rounded-lg p-2' id="suspension" name="suspension" placeholder="GOOD" value={formData.suspension} onChange={handleChange} />

                    <label htmlFor="frontandRearSuspension">(Front & Rear Suspension):</label>
                    <input className='border border-black rounded-lg p-2' id="frontandRearSuspension" name="frontandRearSuspension" placeholder="GOOD" value={formData.frontandRearSuspension} onChange={handleChange} />

                    <label htmlFor="transmissionorSTGSystem">Transmission/STG System:</label>
                    <input className='border border-black rounded-lg p-2' id="transmissionorSTGSystem" name="transmissionorSTGSystem" placeholder="GOOD" value={formData.transmissionorSTGSystem} onChange={handleChange} />

                    <label htmlFor="battery">Battery:</label>
                    <input className='border border-black rounded-lg p-2' id="battery" name="battery" placeholder="AVERAGE" value={formData.battery} onChange={handleChange} />

                    <label htmlFor="odometerReading">Odometer Reading:</label>
                    <input className='border border-black rounded-lg p-2' id="odometerReading" name="odometerReading" placeholder="-" value={formData.odometerReading} onChange={handleChange} />

                    <label htmlFor="mechanicalCondition"> Mechanical Condition:</label>
                    <input className='border border-black rounded-lg p-2' id="mechanicalCondition" name="mechanicalCondition" placeholder="GOOD" value={formData.mechanicalCondition} onChange={handleChange} />

                    <label htmlFor="paintWork">Paint Work:</label>
                    <input className='border border-black rounded-lg p-2' id="paintWork" name="paintWork" placeholder="AVERAGE" value={formData.paintWork} onChange={handleChange} />

                    <label htmlFor="steeringMechanism"> Steering Mechanism:</label>
                    <input className='border border-black rounded-lg p-2' id="steeringMechanism" name="steeringMechanism" placeholder="GOOD" value={formData.steeringMechanism} onChange={handleChange} />

                    <label htmlFor="steeringWheelorSteeringBox">(Steering Wheel/Steering Box):</label>
                    <input className='border border-black rounded-lg p-2' id="steeringWheelorSteeringBox" name="steeringWheelorSteeringBox" placeholder="GOOD" value={formData.steeringWheelorSteeringBox} onChange={handleChange} />

                    <label htmlFor="steeringShaftandColumn">(Steering Shaft &Column):</label>
                    <input className='border border-black rounded-lg p-2' id="steeringShaftandColumn" name="steeringShaftandColumn" placeholder="GOOD" value={formData.steeringShaftandColumn} onChange={handleChange} />

                    <label htmlFor="steeringLinkages">(Steering Linkages):</label>
                    <input className='border border-black rounded-lg p-2' id="steeringLinkages" name="steeringLinkages" placeholder="GOOD" value={formData.steeringLinkages} onChange={handleChange} />

                    <label htmlFor="electricalSystem"> Electrical System:</label>
                    <input className='border border-black rounded-lg p-2' id="electricalSystem" name="electricalSystem" placeholder="GOOD" value={formData.electricalSystem} onChange={handleChange} />

                    <label htmlFor="landRHeadPumporTailorClusterorLamp">(L&R Head Pump/Tail/Cluster Lamp):</label>
                    <input className='border border-black rounded-lg p-2' id="landRHeadPumporTailorClusterorLamp" name="landRHeadPumporTailorClusterorLamp" placeholder="GOOD" value={formData.landRHeadPumporTailorClusterorLamp} onChange={handleChange} />

                    <label htmlFor="batteryMakenadCondition">(Battery Make & Condition):</label>
                    <input className='border border-black rounded-lg p-2' id="batteryMakenadCondition" name="batteryMakenadCondition" placeholder="GOOD" value={formData.batteryMakenadCondition} onChange={handleChange} />

                    <label htmlFor="axleorTransmissionSystem">Axle/ Transmission System:</label>
                    <input className='border border-black rounded-lg p-2' id="axleorTransmissionSystem" name="axleorTransmissionSystem" placeholder="GOOD" value={formData.axleorTransmissionSystem} onChange={handleChange} />

                    <label htmlFor="pRAxleorGearBoxorPropellershaft">(PR Axle/Gear Box/Propeller shaft):</label>
                    <input className='border border-black rounded-lg p-2' id="pRAxleorGearBoxorPropellershaft" name="pRAxleorGearBoxorPropellershaft" placeholder="GOOD" value={formData.pRAxleorGearBoxorPropellershaft} onChange={handleChange} />

                    <label htmlFor="differentialHousingAxle">(Differential Housing Axle):</label>
                    <input className='border border-black rounded-lg p-2' id="differentialHousingAxle" name="differentialHousingAxle" placeholder="GOOD" value={formData.differentialHousingAxle} onChange={handleChange} />

                    <label htmlFor="coolingSystemandRadiator"> Cooling System & Radiator:</label>
                    <input className='border border-black rounded-lg p-2' id="coolingSystemandRadiator" name="coolingSystemandRadiator" placeholder="GOOD" value={formData.coolingSystemandRadiator} onChange={handleChange} />

                    <label htmlFor="exhaustSystem_SilencerorManifold"> Exhaust System (Silencer/Manifold):</label>
                    <input className='border border-black rounded-lg p-2' id="exhaustSystem_SilencerorManifold" name="exhaustSystem_SilencerorManifold" placeholder="GOOD" value={formData.exhaustSystem_SilencerorManifold} onChange={handleChange} />

                    <label htmlFor="fuelSupplySystem_FuelTankandPipes">Fuel Supply System (Fuel Tank & Pipes):</label>
                    <input className='border border-black rounded-lg p-2' id="fuelSupplySystem_FuelTankandPipes" name="fuelSupplySystem_FuelTankandPipes" placeholder="GOOD" value={formData.fuelSupplySystem_FuelTankandPipes} onChange={handleChange} />

                    <label htmlFor="brakeSystemPedalandPipes">Brake System (Pedal & Pipes):</label>
                    <input className='border border-black rounded-lg p-2' id="brakeSystemPedalandPipes" name="brakeSystemPedalandPipes" placeholder="AVERAGE" value={formData.brakeSystemPedalandPipes} onChange={handleChange} />

                    <label htmlFor="others">Others:</label>
                    <input className='border border-black rounded-lg p-2' id="others" name="others" placeholder="AVERAGE" value={formData.others} onChange={handleChange} />

                    <label htmlFor="wheelDiscs">Wheel Discs:</label>
                    <input className='border border-black rounded-lg p-2' id="wheelDiscs" name="wheelDiscs" placeholder="GOOD" value={formData.wheelDiscs} onChange={handleChange} />

                    <label htmlFor="frontRightTyre">Front Right Tyre:</label>
                    <input className='border border-black rounded-lg p-2' id="frontRightTyre" name="frontRightTyre" placeholder="AVERAGE" value={formData.frontRightTyre} onChange={handleChange} />

                    <label htmlFor="frontLeftTyre">Front Left Tyre:</label>
                    <input className='border border-black rounded-lg p-2' id="frontLeftTyre" name="frontLeftTyre" placeholder="AVERAGE" value={formData.frontLeftTyre} onChange={handleChange} />

                    <label htmlFor="rearRightTyre">Front Left Tyre:</label>
                    <input className='border border-black rounded-lg p-2' id="rearRightTyre" name="rearRightTyre" placeholder="AVERAGE" value={formData.rearRightTyre} onChange={handleChange} />

                    <label htmlFor="rearLeftTyre">Rear Left Tyre:</label>
                    <input className='border border-black rounded-lg p-2' id="rearLeftTyre" name="rearLeftTyre" placeholder="AVERAGE" value={formData.rearLeftTyre} onChange={handleChange} />
                </span>

                <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
                    <h2 className="text-3xl font-bold mb-5 ">ORIGINAL RECORDS VERIFIED</h2>

                    <label htmlFor="ifThisVehicleIsRecentlyInspectedByTheSameOrAnyotherValuer"> If this Vehicle is recently inspected by the same/any other valuer</label>
                    <input className='border border-black rounded-lg p-2' id="ifThisVehicleIsRecentlyInspectedByTheSameOrAnyotherValuer" name="ifThisVehicleIsRecentlyInspectedByTheSameOrAnyotherValuer" placeholder="INSPECTED BY ME" value={formData.ifThisVehicleIsRecentlyInspectedByTheSameOrAnyotherValuer} onChange={handleChange} />

                    <label htmlFor="reasonforValuation">Reason for Valuation</label>
                    <input className='border border-black rounded-lg p-2' id="reasonforValuation" name="reasonforValuation" placeholder="FOR LOAN PURPOSE" value={formData.reasonforValuation} onChange={handleChange} />

                    <label htmlFor="vehicleMigratedFromOtherArea">Is this vehicle Migrated from other area?</label>
                    <input className='border border-black rounded-lg p-2' id="vehicleMigratedFromOtherArea" name="vehicleMigratedFromOtherArea" placeholder="N/A" value={formData.vehicleMigratedFromOtherArea} onChange={handleChange} />

                    <label htmlFor="reRegisteredVehicle">Is It Re-Registered Vehicle: Old Registration No.</label>
                    <input className='border border-black rounded-lg p-2' id="reRegisteredVehicle" name="reRegisteredVehicle" placeholder="N/A" value={formData.reRegisteredVehicle} onChange={handleChange} />

                    <label htmlFor="duplicateRCOrOriginalRC">Duplicate RC/Original RC</label>
                    <input className='border border-black rounded-lg p-2' id="duplicateRCOrOriginalRC" name="duplicateRCOrOriginalRC" placeholder="PLEASE VERIFY" value={formData.duplicateRCOrOriginalRC} onChange={handleChange} />

                    <label htmlFor="seizedVehicleOfFinancier">Is this a seized vehicle of Financier</label>
                    <input className='border border-black rounded-lg p-2' id="seizedVehicleOfFinancier" name="seizedVehicleOfFinancier" placeholder="N/A" value={formData.seizedVehicleOfFinancier} onChange={handleChange} />

                    <label htmlFor="nameOfFinancier">Name of the Financier</label>
                    <input className='border border-black rounded-lg p-2' id="nameOfFinancier" name="nameOfFinancier" placeholder="N/A" value={formData.nameOfFinancier} onChange={handleChange} />
                </span>

                <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
                    <label htmlFor="overallConditionOfVehicle">OVER ALL CONDITION OF VEHICLE</label>
                    <input className='border border-red-600 rounded-lg p-2' id="overallConditionOfVehicle" name="overallConditionOfVehicle" placeholder="overallConditionOfVehicle" value={formData.overallConditionOfVehicle} onChange={handleChange} />
                </span>

                <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
                    <h2 className="text-3xl font-bold mb-5 ">INSURANCE</h2>

                    <label htmlFor="insurerName">INSURER</label>
                    <input className='border border-black rounded-lg p-2' id="insurerName" name="insurerName" placeholder="insurerName" value={formData.insurerName} onChange={handleChange} />

                    <label htmlFor="insuredName"> INSURED NAME</label>
                    <input className='border border-black rounded-lg p-2' id="insuredName" name="insuredName" placeholder="insuredName" value={formData.insuredName} onChange={handleChange} />

                    <label htmlFor="policyNo">POLICY NO</label>
                    <input className='border border-black rounded-lg p-2' id="policyNo" name="policyNo" placeholder="policyNo" value={formData.policyNo} onChange={handleChange} />

                    <label htmlFor="insuredsDeclaredValue"> INSURED'S DECLARED VALUE</label>
                    <input className='border border-black rounded-lg p-2' id="insuredsDeclaredValue" name="insuredsDeclaredValue" placeholder="insuredsDeclaredValue" value={formData.insuredsDeclaredValue} onChange={handleChange} />

                    <label htmlFor="hypothecationIfAny">HYPTHECATION IF ANY</label>
                    <input className='border border-black rounded-lg p-2' id="hypothecationIfAny" name="hypothecationIfAny" placeholder="hypothecationIfAny" value={formData.hypothecationIfAny} onChange={handleChange} />

                    <label htmlFor="accidentIfAny">ACCIDENT (IF ANY)</label>
                    <input className='border border-black rounded-lg p-2' id="accidentIfAny" name="accidentIfAny" placeholder="accidentIfAny" value={formData.accidentIfAny} onChange={handleChange} />
                </span>

                <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
                    <h2 className="text-3xl font-bold mb-5 ">VALUATION</h2>

                    <label htmlFor="InvoiceValueVehicle">INVOICE VALUE OF NEW VEHICLE</label>
                    <input className='border border-black rounded-lg p-2' id="InvoiceValueVehicle" name="InvoiceValueVehicle" placeholder="InvoiceValueVehicle" value={formData.ifThisVehicleIsRecentlyInspectedByTheSameOrAnyotherValuer} onChange={handleChange} />

                    <label htmlFor="marketValue">PRESENT MARKET VALUE</label>
                    <input className='border border-red-600 rounded-lg p-2' id="marketValue" name="marketValue" placeholder="marketValue" value={formData.marketValue} onChange={handleChange} />
                </span>

                <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
                    <h2 className="text-3xl font-bold mb-5 ">Section I: Chassis Number Impression/ Photo</h2>

                    <h4 className="text-2xl font-semibold ">Chassis Number Image</h4>
                    {currentPage === "choose-img" ? (
                        <FileInput onImageSelected={onChassisImageSelected} />
                    ) : currentPage === "crop-img" ? (
                        <ImageCropper
                            image={image}
                            onCropDone={onCropDone}
                            onCropCancel={onCropCancel}
                        />
                    ) : (
                        <div>
                            <div>
                                <img
                                    src={imageAfterCrop}
                                    alt="Cropped Preview"
                                    className="cropped-img"
                                    style={{ maxWidth: "200px" }}
                                />
                                <p>Preview of cropped chassis image</p>
                            </div>
                            <button type="button" onClick={() => setCurrentPage("crop-img")} className="bg-blue-400 hover:bg-blue-600 w-4/12 rounded-xl p-2 mt-2 mr-4">
                                Crop Again
                            </button>
                            <button type="button" onClick={() => { setCurrentPage("choose-img"); setImage(""); }} className="bg-blue-400 hover:bg-blue-600 w-4/12 rounded-xl p-2 mt-2">
                                Upload New Image
                            </button>
                        </div>
                    )}
                </span>

                <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
                    <h2 className="text-3xl font-bold mb-5 ">PHOTOGRAPHS OF THE FOLLOWING ATTACHED</h2>

                    <label htmlFor="odoMeterPhotographs">ODO METER</label>
                    <input className='border border-black rounded-lg p-2' id="odoMeterPhotographs" name="odoMeterPhotographs" placeholder="Y" value={formData.odoMeterPhotographs} onChange={handleChange} />

                    <label htmlFor="RegnNoPlatePhotographs">Registration Number Plate</label>
                    <input className='border border-black rounded-lg p-2' id="RegnNoPlatePhotographs" name="RegnNoPlatePhotographs" placeholder="-" value={formData.RegnNoPlatePhotographs} onChange={handleChange} />

                    <label htmlFor="frameNoPhotographs">Frame No</label>
                    <input className='border border-black rounded-lg p-2' id="frameNoPhotographs" name="frameNoPhotographs" placeholder="-" value={formData.frameNoPhotographs} onChange={handleChange} />

                    <label htmlFor="frontPhotographs">Front</label>
                    <input className='border border-black rounded-lg p-2' id="frontPhotographs" name="frontPhotographs" placeholder="Y" value={formData.frontPhotographs} onChange={handleChange} />

                    <label htmlFor="sidePhotographs">Side</label>
                    <input className='border border-black rounded-lg p-2' id="sidePhotographs" name="sidePhotographs" placeholder="-" value={formData.sidePhotographs} onChange={handleChange} />

                    <label htmlFor="cabinPhotographs">Cabin</label>
                    <input className='border border-black rounded-lg p-2' id="cabinPhotographs" name="cabinPhotographs" placeholder="NA" value={formData.cabinPhotographs} onChange={handleChange} />
                </span>

                <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">

                    <label htmlFor="placeOFValuation">PLACE AT WHICH VALUATION WAS DONE</label>
                    <input className='border border-black rounded-lg p-2' id="placeOFValuation" name="placeOFValuation" placeholder="placeOFValuation" value={formData.placeOFValuation} onChange={handleChange} />

                    <label htmlFor="dateOfValuation">DATE OF VALUATION</label>
                    <input className='border border-black rounded-lg p-2' type="date" id="dateOfValuation" name="dateOfValuation" placeholder="dateOfValuation" value={formData.dateOfValuation} onChange={handleChange} />

                    <label htmlFor="dateOfReportIssurnce">DATE OF REPORT ISSUANCE</label>
                    <input className='border border-black rounded-lg p-2' id="dateOfReportIssurnce" name="dateOfReportIssurnce" placeholder="dateOfReportIssurnce" value={formData.dateOfReportIssurnce} onChange={handleChange} />
                </span>

                <span className="flex flex-col space-y-3 text-left p-5 border border-black bg-white">
                    <h2 className="text-3xl font-bold mb-5 ">Images Section:</h2>

                    <h4 className="text-2xl font-semibold ">Image 1 (Page4)</h4>
                    <FileInput onImageSelected={(selectedImg) => onImageSelected(selectedImg, 'image1')} />

                    <h4 className="text-2xl font-semibold ">Image 2 (Page4)</h4>
                    <FileInput onImageSelected={(selectedImg) => onImageSelected(selectedImg, 'image2')} />

                    <h4 className="text-2xl font-semibold ">Image 3 (Page4)</h4>
                    <FileInput onImageSelected={(selectedImg) => onImageSelected(selectedImg, 'image3')} />

                    <h4 className="text-2xl font-semibold ">Image 4 (Page4)</h4>
                    <FileInput onImageSelected={(selectedImg) => onImageSelected(selectedImg, 'image4')} />

                    <hr className="h-2" />

                    <h4 className="text-2xl font-semibold ">Image 1 (Page5)</h4>
                    <FileInput onImageSelected={(selectedImg) => onImageSelected(selectedImg, 'image5')} />

                    <h4 className="text-2xl font-semibold ">Image 2 (Page5)</h4>
                    <FileInput onImageSelected={(selectedImg) => onImageSelected(selectedImg, 'image6')} />

                    <h4 className="text-2xl font-semibold ">Image 3 (Page5)</h4>
                    <FileInput onImageSelected={(selectedImg) => onImageSelected(selectedImg, 'image7')} />

                    <h4 className="text-2xl font-semibold ">Image 4 (Page5)</h4>
                    <FileInput onImageSelected={(selectedImg) => onImageSelected(selectedImg, 'image8')} />
                </span>
                <button type="submit" className="bg-blue-500 w-4/12 rounded-xl p-2 mt-2">
                    Generate PDF
                </button>
            </form>
        </div>
    );
}   