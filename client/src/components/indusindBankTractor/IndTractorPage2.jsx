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
    marginTop: 2,
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
    padding: 1.7 ,
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

export function IndTractorPage2({ data }) {
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
          <Text style={styles.sectionHeader}>MAJOR ACCESSORIES</Text>
          {[
            ['1.', 'Cabin', data.cabin],
            ['2.', 'Load Body', data.loadBody],
            ['3.', 'Chassis', data.chassis],
            ['4.', 'Engine', data.engine],
            ['5.', 'Suspension', data.suspension],
            ['   ', '(Front & Rear Suspension)', data.frontandRearSuspension],
            ['6.', 'Transmission/STG System', data.transmissionorSTGSystem],
            ['7.', 'Battery', data.battery],
            ['8.', 'Odometer Reading', data.odometerReading],
            ['9.', 'Mechanical Condition', data.mechanicalCondition],
            ['10.', 'Paint Work', data.paintWork],
            ['11.', 'Steering Mechanism', data.steeringMechanism],
            ['   ', '(Steering Wheel/Steering Box)', data.steeringWheelorSteeringBox],
            ['   ', '(Steering Shaft &Column)', data.steeringShaftandColumn],
            ['   ', '(Steering Linkages)', data.steeringLinkages],
            ['12.', 'Electrical System', data.electricalSystem],
            ['     ', '(L&R Head Pump/Tail/Cluster Lamp)', data.landRHeadPumporTailorClusterorLamp],
            ['     ', '(Battery Make & Condition)', data.batteryMakenadCondition],
            ['13.', 'Axle/ Transmission System', data.axleorTransmissionSystem],
            ['   ', '(PR Axle/Gear Box/Propeller shaft)', data.pRAxleorGearBoxorPropellershaft],
            ['   ', '(Differential Housing Axle)', data.differentialHousingAxle],
            ['14.', 'Cooling System & Radiator', data.coolingSystemandRadiator],
            ['15.', 'Exhaust System (Silencer/Manifold)', data.exhaustSystem_SilencerorManifold],
            ['16.', 'Fuel Supply System (Fuel Tank & Pipes)', data.fuelSupplySystem_FuelTankandPipes],
            ['17.', 'Brake System (Pedal & Pipes)', data.brakeSystemPedalandPipes],
            ['18.', 'Others', data.others],
            ['', 'Wheel Discs', data.wheelDiscs],
            ['', 'Front Right Tyre', data.frontRightTyre],
            ['', 'Front Left Tyre', data.frontLeftTyre],
            ['', 'Rear Right Tyre', data.rearRightTyre],
            ['', 'Rear Left Tyre', data.rearLeftTyre],
          ].map(([num, label, value]) => (
            <View key={num} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '5%' }]}>{num}</Text>
              <Text style={[styles.tableCell, { width: '45%' }]}>{label}</Text>
              <Text style={[styles.tableCell, { width: '50%' }]}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>ORIGINAL RECORDS VERIFIED</Text>
          {[
            ['1.', 'If this Vehicle is recently inspected by the same/any other valuer ', data.ifThisVehicleIsRecentlyInspectedByTheSameOrAnyotherValuer],
            ['2.', 'Reason for Valuation', data.reasonforValuation],
            ['3.', 'Is this vehicle Migrated from other area?', data.vehicleMigratedFromOtherArea],
            ['4.', 'Is It Re-Registered Vehicle: Old Registration No.', data.reRegisteredVehicle],
            ['5.', 'Duplicate RC/Original RC', data.duplicateRCOrOriginalRC],
            ['6.', 'Is this a seized vehicle of Financier', data.seizedVehicleOfFinancier],
            ['  ', 'Name of the Financier', data.nameOfFinancier],
          ].map(([num, label, value]) => (
            <View key={num} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '5%' }]}>{num}</Text>
              <Text style={[styles.tableCell, { width: '45%' }]}>{label}</Text>
              <Text style={[styles.tableCell, { width: '50%' }]}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          {[
            ['', 'OVERALL CONDITION OF VEHICLE', data.overallConditionOfVehicle],
          ].map(([num, label, value]) => (
            <View key={num} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '50%' }]}>{label}</Text>
              <Text style={[styles.tableCell, { width: '50%' }]}>{value}</Text>
            </View>
          ))}
        </View>

        <Image src="/assets/Stamp_img.png" style={styles.stamp} />

      </View>
    </Page>
  );
}

export default IndTractorPage2;
