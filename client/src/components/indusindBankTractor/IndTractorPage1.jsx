import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    padding: 33,
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
    marginBottom: 3,
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
    marginBottom: 3,
  },
  section: {
    border: '1px solid #000',
    marginTop: 4,
    padding: 4,
  },
  sectionHeader: {
    fontSize: 14,
    marginBottom: 4,
    backgroundColor: '#f0f0f0',
    padding: 4,
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: 3.5,
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
    marginBottom: 3,
  },
  stamp: {
    width: 100,
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: 0.1,
    borderRight: '1px solid #ddd',
  },
  ratingTable: {
    marginVertical: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #ddd',
  },
  ratingLabel: {
    width: '60%',
    padding: 2,
  },
  ratingValue: {
    width: '40%',
    padding: 2,
  },
});

export function IndTractorPage1({ data }) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.outerBorder}>
        <View style={styles.header}>
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

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            ASSET VALUATION REPORT - INDUSIND BANK LTD.
          </Text>


          {/* Reference Details */}
          <View style={styles.twoColGrid}>
            <Text>Reference No: {data.referenceNo}</Text>
            <Text>Report Date: {data.reportDate}</Text>
          </View>
          <View style={styles.twoColGrid}>
            <Text>Bank request Ref no.: {data.bankRequestRefNo}</Text>
            <Text>Requested by: {data.salesPerson}</Text>
          </View>
        </View>
        {/* General Information */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>GENERAL INFORMATION</Text>

          {[
            ['1.', 'Borrower', data.borrowerName],
            ['2.', 'Registered Owner', data.regOwner],
            ['3.', 'Sr No of Reg Owner', data.srNoOfRegOwner],
          ].map(([num, label, value]) => (
            <View key={num} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '5%' }]}>{num}</Text>
              <Text style={[styles.tableCell, { width: '35%' }]}>{label}</Text>
              <Text style={[styles.tableCell, { width: '60%' }]}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Inspection Details */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>INSPECTION DETAILS</Text>
          {[
            ['1.', 'Date & Time of Inspection', `${data.dateOfInspection} ${data.TimeOfInspection}`],
            ['2.', 'Place of Inspection', data.placeOfInspection],
            ['3.', 'Valuation for Funding', data.valuationForFunding],
            ['4.', 'Valuation for Sale:', data.valuationForSale],


          ].map(([num, label, value]) => (
            <View key={num} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '5%' }]}>{num}</Text>
              <Text style={[styles.tableCell, { width: '35%' }]}>{label}</Text>
              <Text style={[styles.tableCell, { width: '60%' }]}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Vehicle Particulars */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>VEHICLE PARTICULARS</Text>
          {[
            ['1.', 'Registration No.', data.registrationNo],
            ['2.', 'Date of Registration', data.dateOfReg],
            ['3.', 'RTO', data.rto],
            ['4.', 'Dealer from whom Purchased', data.dealerFromWhomPurchased],
            ['5.', 'Name of the Manufacture', data.nameOfTheManufacture],
            ['6.', 'Year of Manufacture', data.yearOfManufacture],
            ['7.', 'Vehicle Age', data.vehicleAge],
            ['8.', 'Make/Model', `${data.nameOfTheManufacture} ${data.makeAndModel}`],
            ['9.', 'Chassis Number', data.chassisNo],
            ['10.', 'Engine Number', data.engineNo],
            ['11.', 'Class of Vehicle & Type of Body', data.classOfVehicleandTypeOfBody],
            ['12.', 'Colour of the Vehicle', data.color],
            ['13.', 'Seating Capacity', data.seatingCapacity],
            ['14.', 'Carrying Capacity', data.carryingCapacity],
            ['15.', 'RLW / ULW', data.rlwULW],
            ['16.', 'Type of Fuel', data.fuelUsed],
            ['17.', 'Hypothecation in the name of', data.hypothecationInTheNameOf],
            ['18.', 'Hypothecation effective since', data.hypothecationEffectiveSince],
            ['19.', 'Average Collection Per day', data.averageCollectionPerDay],
            ['', 'Verification:', data.verification],


          ].map(([num, label, value]) => (
            <View key={num} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '5%' }]}>{num}</Text>
              <Text style={[styles.tableCell, { width: '30%' }]}>{label}</Text>
              <Text style={[styles.tableCell, { width: '65%' }]}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>FITNESS/PERMIT/ROAD TAX DETAILS</Text>
          {[
            ['1.', 'Fitness Valid Up to', data.fitnessValidUpto],
            ['2.', 'Permit No/Date', data.permitNoOrDate],
            ['3.', 'Nature of Permit', data.natureOfPermit],
            ['4.', 'Permit Valid Up to', data.permitValidUpto],
            ['5.', 'Permit Holder Name', data.permitHolderName],
            ['6.', 'Route of Permit', data.routeOfPermit],
            ['7.', 'Tax Token Paid Up to', data.taxTokenPaidUpto],


          ].map(([num, label, value]) => (
            <View key={num} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '5%' }]}>{num}</Text>
              <Text style={[styles.tableCell, { width: '35%' }]}>{label}</Text>
              <Text style={[styles.tableCell, { width: '60%' }]}>{value}</Text>
            </View>
          ))}
        </View>
        <Image src="/assets/Stamp_img.png" style={styles.stamp} />
      </View>

    </Page>
  );
}

export default IndTractorPage1;