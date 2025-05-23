import { Page, View, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    padding: 33,
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
    justifyContent: "flex-start",
    gap: 10,
  },
  outerBorder: {
    border: '2pt solid black',
    padding: 8,
    flex: 1,
  },
  imageBox: {
    aspectRatio: 4 / 3,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  stampWrapper: {
    position: "absolute",
    top: "25%",
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

const IndTractorPage5 = ({ data }) => {
  const images = [data.image5, data.image6, data.image7, data.image8].filter(Boolean);
  const numImages = images.length;

  const getBoxWidth = () => {
    if (numImages <= 2) return "60%";
    if (numImages <= 4) return "50%";
    return "100%";
  };

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.outerBorder}>
        <View style={styles.gridContainer}>
          {images.map((src, index) => (
            <View key={index} style={[styles.imageBox, { width: getBoxWidth() }]}>
              <Image style={styles.image} src={src} />
            </View>
          ))}
        </View>

        <View style={styles.stampWrapper}>
          <Image style={styles.stamp} src="/assets/Stamp_img.png" />
        </View>
      </View>
    </Page>
  );
};

export default IndTractorPage5;
