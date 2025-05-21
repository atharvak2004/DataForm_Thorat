import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';

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
    marginBottom: 2,
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
    marginBottom: 4,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 3,
  },
  section: {
    border: '1px solid #000',
    marginTop: 1.5,
    padding: 3,
  },
  sectionHeader: {
    fontSize: 12,
    marginBottom: 1.5,
    backgroundColor: '#f0f0f0',
    padding: 4,
  },
  sectionHeaderDeclare: {
    fontSize: 10,
    marginBottom: 1.5,
    backgroundColor: '#f0f0f0',
    padding: 2,
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
  },
  stamp: {
    width: 100,
    position: 'absolute',
    right: 30,
    bottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: 1,
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

export function IndTractorPage3({ data }) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.outerBorder}>
        <View style={[styles.section, { marginTop: 2 }]}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>REFERENCE NO - </Text>
            <Text style={styles.tableCell}>VEHICLE NUMBER - </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>INSURANCE</Text>
          {[
            ['1.', 'INSURER', data.insurerName],
            ['2.', 'INSURED NAME', data.insuredName],
            ['3.', 'POLICY NO', data.policyNo],
            ['4.', 'INSURED\'s DECLARED VALUE', data.insuredsDeclaredValue],
            ['5.', 'HYPTHECATION IF ANY',data.hypothecationIfAny ],
            ['6.', 'ACCIDENT (IF ANY)', data.accidentIfAny],
          ].map(([num, label, value]) => (
            <View key={num} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '5%' }]}>{num}</Text>
              <Text style={[styles.tableCell, { width: '30%' }]}>{label}</Text>
              <Text style={[styles.tableCell, { width: '65%' }]}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>VALUATION</Text>
          {[
            ['1.', 'INVOICE VALUE OF NEW VEHICLE', data.InvoiceValueVehicle ],
            ['2.', 'PRESENT MARKET VALUE', data.marketValue],
          ].map(([num, label, value]) => (
            <View key={num} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '5%' }]}>{num}</Text>
              <Text style={[styles.tableCell, { width: '40%' }]}>{label}</Text>
              <Text style={[styles.tableCell, { width: '55%' }]}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>PENCIL IMPRESSION OF CHASSIS NO/ FRAME NO: {data.chassisNo}</Text>
          <View style={{ height: 60, width: 400, padding: 8, border: '1px solid #ddd', justifyContent: 'center', alignItems: 'center' }}>
            {data.chassisImage ? (
              <Image src={data.chassisImage} style={{ width: '100%', height: '100%' }} />
            ) : (
              <Text style={{ fontSize: 10, color: '#888' }}>No Image Uploaded</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>PHOTOGRAPHS OF THE FOLLOWING ATTACHED</Text>
          {[
            ['1.', 'ODO METER', data.odoMeterPhotographs ],
            ['2.', 'Registration Number Plate', data.RegnNoPlatePhotographs ],
            ['3.', 'Frame No',data.frameNoPhotographs ],
            ['4.', 'Front', data.frontPhotographs ],
            ['5.', 'Side', data.sidePhotographs ],
            ['6.', 'Cabin',data.cabinPhotographs ],
          ].map(([num, label, value]) => (
            <View key={num} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '5%' }]}>{num}</Text>
              <Text style={[styles.tableCell, { width: '30%' }]}>{label}</Text>
              <Text style={[styles.tableCell, { width: '65%' }]}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeaderDeclare}>BASED ON PHYSICAL INSPECTION /CONDITION OF THE VEHICLE AS DESCRIBED IN THIS VALUATION REPORT, THE MARKET VALUE AS ON DATE OF INSPECTION - <Text style={{fontSize: 14}}>RS. {data.marketValue}</Text></Text>
          <View style={{}}>
            {['I hereby declare that:',
              'a)	The information furnished above is true & correct to the best of my knowledge & belief & is sourced from documentation provided, legitimacy of documents provided, to be verified by competent authority',
              'b) I have physically inspected the vehicle\'s chassis, engine, equipment, and accessories fitted in the vehicle',
              'c) I have no direct or Indirect Interest in the vehicle valued',
              'd) The vehicle is in a road worthy condition ',
              'This Valuation/Inspection Report is hereby given for Vehicle Loan Purpose only and it is at the sole discretion of the Bank/ Financier to accept or reject the proposal',
            ].map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>C. Inspection Details</Text>
          {[
            ['1.', 'PLACE AT WHICH VALUATION WAS DONE', data.placeOfInspection],
            ['2.', 'DATE OF VALUATION', data.dateOfInspection],
            ['3.', 'DATE OF REPORT ISSUANCE', data.reportDate],
          ].map(([num, label, value]) => (
            <View key={num} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '40%' }]}>{label}</Text>
              <Text style={[styles.tableCell, { width: '60%' }]}>{value}</Text>
            </View>
          ))}
        </View>
        <View>
          <Image src="/assets/Stamp_img.png" style={styles.stamp} />

          <View style={{ alignItems: 'flex-end' ,marginTop:100}}>
            <Text style={{ textAlign: 'center' , marginRight: 50 }}>SIGNATURE</Text>
            <Text style={{ textAlign: 'center' }}>VALUER NAME & OFFICIAL SEAL </Text>
          </View>
        </View>
      </View>
    </Page>
  );
}

export default IndTractorPage3;
