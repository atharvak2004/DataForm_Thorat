import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        fontSize: 10,
        padding: 40,
        lineHeight: 1.2,
        backgroundColor: 'white',
        width: '210mm',
        minHeight: '297mm',
    },
    outerBorder: {
        border: '2pt solid black',
        padding: 8,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    },
    qrCode: {
        width: 80,
        marginRight: 16,
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
    },
    mainTitle: {
        fontSize: 18,
        marginBottom: 6,
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 14,
        color: '#444',
        marginBottom: 2,
    },
    section: {
        border: '1px solid #000',
        marginTop: 2,
        padding: 4,
    },
    sectionHeader: {
        fontSize: 14,
        marginBottom: 4,
        backgroundColor: '#f0f0f0',
        padding: 4,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: 1.2,
        borderRight: '1px solid #ddd',
    },
    gridRow: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    gridLabel: {
        width: '30%',
    },
    gridValue: {
        width: '70%',
        borderBottom: '1px solid #ddd',
    },
    twoColGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
        marginRight: 5,
    },
    col: {
        width: '48%',
    },
    signatureBox: {
        marginTop: 20,
        paddingTop: 10,
        borderTop: '1px solid #000',
    },
    stamp: {
        width: 100,
        position: 'absolute',
        right: 30,
        bottom: 30,
    },
    verticalBorder: {
        paddingRight: 25,
        paddingLeft: 10,
    },
    salesPersonName: {
        width: '70%',
        textAlign: 'left',
    },

});

export function IndRegPage1({ data }) {
    return (
        <Page size="A4" style={styles.page}>
            <View style={styles.outerBorder}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Image src="/assets/QR_img.jpg" style={styles.qrCode} />
                    <View style={styles.headerText}>
                        <Text style={styles.mainTitle}>PIYUSH S. JOSHI</Text>
                        <Text style={styles.subText}>Surveyor & Loss Assessor (Motor)</Text>
                        <Text style={styles.subText}>I.R.D.A. Govt of India Lic No. 121775 Valid Upto:13/12/2026</Text>
                        <Text style={{ fontSize: 10 }}>
                            101, Shilpshri Apartment, Kailas Nagar, Latur-413512 {"\n"}
                            Mob: 8275599131 | Email: piyushjoshisla@gmail.com
                        </Text>
                        <Text style={{ fontSize: 10, }}>BENEFICIARY NUMBER:- BEN244790</Text>
                    </View>
                </View>

                {/* Valuation Report */}
                <View style={[styles.section, { marginTop: 8 }]}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, { flex: 2 }]}>Reference No - {data.referenceNo}</Text>
                        <Text style={styles.tableCell}>Report Date - {data.reportDate}</Text>
                    </View>
                </View>

                {/* Reference Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Reference Details:</Text>
                    <View style={styles.twoColGrid}>
                        <View style={styles.verticalBorder}>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 4 }}>INDUSIND BANK LTD.</Text>
                            <Text>NAME OF SALES PERSON: {data.salesPerson}</Text>
                        </View>
                    </View>
                </View>

                {/* Vehicle Particulars */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>A. Vehicle Particulars (Physical):</Text>
                    {[
                        ['1.', 'Borrower Name', data.borrowerName],
                        ['2.', 'Address', data.address],
                        ['3.', 'Mobile No', data.mobileNo],
                        ['4.', 'Vehicle No', data.vehicleNo],
                        ['5.', 'Vehicle Maker\'s Name', data.makerName],
                        ['6.', 'Vehicle Model', data.model],
                        ['7.', 'Engine Number', data.engineNo],
                        ['8.', 'Chassis Number', data.chassisNo],
                    ].map(([num, label, value]) => (
                        <View key={num} style={styles.tableRow}>
                            <Text style={[styles.tableCell, { width: '5%' }]}>{num}</Text>
                            <Text style={[styles.tableCell, { width: '25%' }]}>{label}</Text>
                            <Text style={[styles.tableCell, { width: '70%' }]}>{value}</Text>
                        </View>
                    ))}
                </View>

                {/* Registration Particulars */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>B. Registration Particulars (As per RC):</Text>
                    {[
                        ['1.', 'Vehicle No.', data.vehicleNo],
                        ['2.', 'Make And Model', `${data.makerName} ${data.model}`],
                        ['3.', 'Date of registration', data.registrationDate],
                        ['4.', 'Registered owner Name', data.borrowerName],
                        ['5.', 'Address of regd. Owner', data.address],
                        ['6.', 'Owner\'s Serial no', data.ownerSerialNo],
                        ['7.', 'Year of manufacture', data.yearOfManufacture],
                        ['8.', 'R.L.W./G.V.W.', data.rlwGvw],
                        ['9.', 'Un-laden weight', data.unladenWeight],
                        ['10.', 'Fuel used', data.fuelUsed],
                        ['11.', 'Seating capacity', data.seatingCapacity],
                        ['12.', 'Class of Vehicle', data.classOfVehicle],
                        ['13.', 'Type of Body', data.typeOfBody],
                        ['14.', 'Colour', data.color],
                        ['15.', 'Fitness Valid up to', data.fitnessValidity],
                        ['16.', 'Hypothecation If Any', data.hypothecation],
                    ].map(([num, label, value]) => (
                        <View key={num} style={styles.tableRow}>
                            <Text style={[styles.tableCell, { width: '5%' }]}>{num}</Text>
                            <Text style={[styles.tableCell, { width: '25%' }]}>{label}</Text>
                            <Text style={[styles.tableCell, { width: '70%' }]}>{value}</Text>
                        </View>
                    ))}
                </View>

                {/* Inspection Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>C. Inspection Details</Text>
                    {[
                        ['1.', 'Inspection Location', data.inspectionLocation],
                        ['2.', 'Inspection Date', data.inspectionDate],
                        ['3.', 'Inspection Time', data.inspectionTime],
                    ].map(([num, label, value]) => (
                        <View key={num} style={styles.tableRow}>
                            <Text style={[styles.tableCell, { width: '5%' }]}>{num}</Text>
                            <Text style={[styles.tableCell, { width: '25%' }]}>{label}</Text>
                            <Text style={[styles.tableCell, { width: '70%' }]}>{value}</Text>
                        </View>
                    ))}
                </View>



                <Image src="/assets/Stamp_img.png" style={styles.stamp} />
            </View>
        </Page>
    );
}

export default IndRegPage1;
