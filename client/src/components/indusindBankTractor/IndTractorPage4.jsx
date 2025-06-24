import { Page, View, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    padding: 40,
    lineHeight: 1.2,
    backgroundColor: 'white',
    width: '210mm',
    minHeight: '297mm',
    flexDirection: "column",
    position: "relative",
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  outerBorder: {
    border: '2pt solid black',
    padding: 8,
    flex: 1,
  },
  imageBox: {
    width: "48%",
    height: "48%",  
    marginBottom: "2%",
    backgroundColor: "#f0f0f0",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
 stampWrapper: {
    position: "absolute",
    top: "40%",
    left: "40%",
    transform: "translate(-50%, -50%)",
    width: 200,
    height: 200,
  },
  stamp: {
    width: "100%",
    height: "100%",
  },
});

const IndTractorPage4 = ({ data }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.outerBorder}>
      <View style={styles.gridContainer}>
        <View style={styles.imageBox}>
          <Image style={styles.image} src={data.image1} />
        </View>
        <View style={styles.imageBox}>
          <Image style={styles.image} src={data.image2} />
        </View>
        <View style={styles.imageBox}>
          <Image style={styles.image} src={data.image3} />
        </View>
        <View style={styles.imageBox}>
          <Image style={styles.image} src={data.image4} />
        </View>
      </View>

      <View style={styles.stampWrapper}>
        <Image style={styles.stamp} src="/assets/Stamp_img.png" />
      </View>
    </View>
  </Page>
);

export default IndTractorPage4;
