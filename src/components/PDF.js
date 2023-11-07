// import React from "react";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFViewer,
// } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "white",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
//   item: {
//     marginBottom: 5,
//   },
//   line: {
//     borderBottom: "1 solid black",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   customRow: {
//     width: "100mm",
//     height: "20mm",
//     textAlign: "center",
//     margin: 30,
//   },
// });

// const data = [
//   { name: "Item 1", price: "$10", qty: 2 },
//   { name: "Item 2", price: "$15", qty: 3 },
//   { name: "Item 3", price: "$8", qty: 1 },
// ];

// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         {data.map((item, index) => (
//           <View key={index} style={styles.customRow}>
//             <Text>Name: {item.name}</Text>
//             <Text>Price: {item.price}</Text>
//             <Text>Quantity: {item.qty}</Text>
//           </View>
//         ))}
//       </View>
//       <View style={styles.line}></View>
//     </Page>
//   </Document>
// );

// const PDF = () => {
//   return (
//     <div>
//       <PDFViewer width="100%" height={500}>
//         <MyDocument />
//       </PDFViewer>
//     </div>
//   );
// };

// export default PDF;
