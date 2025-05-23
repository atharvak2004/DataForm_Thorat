import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';

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
    alignItems: 'center',
    marginBottom: 10,
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
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  section: {
    border: '1px solid #000',
    marginTop: 4,
    padding: 4,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 4,
    borderBottom: '1px solid black',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #ddd',

  },
  tableCell: {
    padding: 5,
    borderRight: '1px solid #ddd',
    borderLeft: '1px solid #ddd',
  },
  twoColSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stamp: {
    width: 100,
    position: 'absolute',
    right: 5,
    bottom:-50,
  },
});

function KotakBankPage2({ data }) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.outerBorder}>

        {/* Reference Section */}
        <View style={[styles.section, { marginTop: 8 }]}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>Report Ref No: KMBL/ {data.referenceNo}</Text>
            <Text style={styles.tableCell}>Date: {data.reportDate}</Text>
          </View>
        </View>

        {/* Permit & Tax Details */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>D. Permit Details & Tax Details</Text>
          {[
            ['1.', 'Type of Permit', data.permitType],
            ['2.', 'Permit valid Up to', data.permitValidUpto],
            ['3.', 'Tax paid Up to', data.taxPaidUpto],
          ].map(([num, label, value]) => (
            <View key={num} style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, width: '5%' }}>{num}</Text>
              <Text style={{ ...styles.tableCell, width: '20%' }}>{label}</Text>
              <Text style={{ ...styles.tableCell, width: '75%' }}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Insurance Details */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>E. Insurance Details</Text>
          {[
            ['1.', 'Name of Insurer', data.insurerName],
            ['2.', 'Policy Valid from', data.policyFrom],
            ['3.', 'Policy Valid Up to', data.policyUpto],
            ['4.', 'Type of Policy', data.policyType],
            ['5.', 'I.D.V.', data.idv],
          ].map(([num, label, value]) => (
            <View key={num} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '10%' }]}>{num}</Text>
              <Text style={[styles.tableCell, { width: '30%' }]}>{label}</Text>
              <Text style={[styles.tableCell, { width: '70%' }]}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Condition of the Asset */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>F. Condition of the Asset</Text>
          <View style={styles.twoColSection}>
            <View style={{ width: '48%' }}>
              {[
                ['1.', 'Engine', data.engineCondition],
                ['2.', 'Battery', data.batteryCondition],
                ['3.', 'Chassis', data.chassisCondition],
                ['4.', 'Transmission', data.transmissionCondition],
              ].map(([num, part, condition]) => (
                <View key={num} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: '10%' }]}>{num}</Text>
                  <Text style={[styles.tableCell, { width: '50%' }]}>{part}</Text>
                  <Text style={[styles.tableCell, { width: '40%' }]}>{condition}</Text>
                </View>
              ))}
            </View>
            <View style={{ width: '48%' }}>
              {[
                ['5.', 'Paint', data.paintCondition],
                ['6.', 'Suspension', data.suspensionCondition],
                ['7.', "Tires' condition", data.tireCondition],
                ['8.', 'Body Condition', data.bodyCondition],
              ].map(([num, part, condition]) => (
                <View key={num} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: '10%' }]}>{num}</Text>
                  <Text style={[styles.tableCell, { width: '50%' }]}>{part}</Text>
                  <Text style={[styles.tableCell, { width: '40%' }]}>{condition}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>G. ONLINE STATUS:</Text>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '50%' }]}>Online Status of Vehicle</Text>
            <Text style={[styles.tableCell, { width: '50%' }]}>{data.onlineStatus}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>H. Chassis Number Impression/ Photo: {data.chassisNo}</Text>
          <View style={{ height: 80, width: 400, padding: 8, border: '1px solid #ddd', justifyContent: 'center', alignItems: 'center' }}>
            {data.chassisImage ? (
              <Image src={data.chassisImage} style={{ width: '100%', height: '100%' }} />
            ) : (
              <Text style={{ fontSize: 10, color: '#888' }}>No Image Uploaded</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>I. VEHICLE REMARK & DETAILS:</Text>
          <View style={{ padding: 8 }}>
            <Text>• VEHICLE FOUND IN RUNNING CONDITION.</Text>
          </View>
        </View>

        <View style={{ alignItems: 'flex-end', marginTop: 16 }}>
          <Image src="/assets/Stamp_img.png" style={styles.stamp} />
        </View>
      </View>
    </Page>
  );
}

export default KotakBankPage2;