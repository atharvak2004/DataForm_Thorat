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
        marginBottom: 2,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: 4,
        borderRight: '1px solid #ddd',
        flex: 1,
    },
    twoColSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stampContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    stamp: {
        width: 100,
        height: 100,
    },
    listItem: {
        padding: 1
    }

});

function IndRegPage3({ data }) {
    return (
        <Page size="A4" style={styles.page}>
            <View style={styles.outerBorder}>

                {/* Reference Section */}
                <View style={styles.section}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, { flex: 2 }]}>Reference No - {data.referenceNo}</Text>
                        <Text style={styles.tableCell}>Report Date - {data.reportDate}</Text>
                    </View>
                </View>

                {/* Online Status */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>J. Online Status of Vehicle</Text>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, { width: '50%' }]}>Online Status of Vehicle</Text>
                        <Text style={[styles.tableCell, { width: '50%' }]}>{data.onlineStatus}</Text>
                    </View>
                </View>

                {/* Vehicle Valuation */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>K. Vehicle Valuation</Text>
                    <View style={{ padding: 8 }}>
                        <Text>
                            Based on the above condition details and present market cost / trend, this type of vehicle{"\n"}
                            can fetch up to <Text style={{ fontWeight: 'bold', fontSize: 16 }}> RS {data.valuation}/-  </Text>approx.
                        </Text>
                    </View>
                </View>

                {/* Declaration */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>L. Declaration</Text>
                    <View style={{}}>
                        {[
                            '-  This report is issued without prejudice and subject to terms & conditions of whom it may concern.',
                            '-  I have no direct or indirect interest in the asset/vehicle being valued.',
                            '-  The information furnished above is true and correct to the best of my knowledge and belief, and is based on documentation provided. Legitimacy of the documents provided is to be verified by the competent authority.',
                            '-  This report is issued at the request of the owner/financer of the vehicle/asset and is intended for vehicle loan or other relevant purposes. Acceptance of the proposal is at the sole discretion of the concerned Bank/Financier.'
                        ].map((item, index) => (
                            <View key={index} style={styles.listItem}>

                                <Text>{item}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Stamp & Signature */}
                <View style={styles.stampContainer}>
                    <Image style={styles.stamp} src="/assets/Stamp_img.png" />
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, textAlign: 'center' }}>
                        Piyush S. Joshi
                    </Text>
                    <Text style={{ color: '#666', textAlign: 'center', fontSize: 14, marginBottom:5, }}>
                        Surveyor and Loss Assessor, Latur
                    </Text>
                    <Text style={{ textAlign: 'center' }}>IRDAI Lic No: 121775</Text>
                    <Text style={{ textAlign: 'center' }}>IIISLA Membership No: L/W/107223</Text>
                </View>

            </View>

        </Page>
    );
}

export default IndRegPage3;