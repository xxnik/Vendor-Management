import { StyleSheet } from "react-native";

import COLORS from "../../../constants/colors";

export default StyleSheet.create({

section:{

backgroundColor:COLORS.card,

borderRadius:20,

padding:20,

marginBottom:20,

shadowColor:"#000",

shadowOpacity:0.08,

shadowRadius:10,

shadowOffset:{
width:0,
height:3
},

elevation:5

},

title:{

fontSize:18,

fontWeight:"700",

marginBottom:15,

color:"#2C3E50"

},

inputContainer:{

height:55,

borderRadius:14,

backgroundColor:"#FDFDFD",

borderWidth:1,

borderColor:"#E5E7EB",

paddingHorizontal:18,

flexDirection:"row",

justifyContent:"space-between",

alignItems:"center"

},

inputText:{

fontSize:16,

fontWeight:"600",

color:"#374151"

},

addButton: {

backgroundColor:"#EC5AA7",

marginTop:15,

height:50,

borderRadius:14,

justifyContent:"center",

alignItems:"center",

flexDirection:"row"

},

  addButtonText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"700",
    marginLeft:8
  },

  modalBackground:{

flex:1,

backgroundColor:"rgba(0,0,0,0.35)",

justifyContent:"center",

padding:25

},

modalCard:{

backgroundColor:"#FFF7D1",

borderRadius:20,

padding:20,

maxHeight:"70%"

},

modalTitle:{

fontSize:20,

fontWeight:"700",

marginBottom:20,

textAlign:"center",

color:"#2C3E50"

},

vendorItem:{

flexDirection:"row",

alignItems:"center",

paddingVertical:15,

borderBottomWidth:1,

borderBottomColor:"#ECECEC"

},

vendorName:{

marginLeft:15,

fontSize:16,

fontWeight:"600"

},

closeButton:{

marginTop:20,

backgroundColor:"#EC5AA7",

height:48,

justifyContent:"center",

alignItems:"center",

borderRadius:14

},

closeButtonText:{

color:"#fff",

fontSize:16,

fontWeight:"700"

},

calendarCard: {
  width: "90%",
  maxWidth: 420,
  backgroundColor: "#FFF7D1",
  borderRadius: 20,
  padding: 18,
},

calendarTitle: {
  fontSize: 20,
  fontWeight: "700",
  marginBottom: 15,
  textAlign: "center",
  color: "#2C3E50",
},

tableInput: {
  flex: 1,
  height: 40,
  borderWidth: 1,
  borderColor: "#D1D5DB",
  borderRadius: 8,
  textAlign: "center",
  backgroundColor: "#FFFFFF",
},

initialStockCard: {
  backgroundColor: "#FFF9C9",
  borderRadius: 6,
  paddingHorizontal: 23,
  paddingTop: 10,
  paddingBottom: 22,
  marginBottom: 20,
},

initialStockTitle: {
  fontSize: 22,
  fontWeight: "800",
  color: "#1F2A44",
  marginBottom: 6,
},

initialStockSubtitle: {
  fontSize: 12,
  color: "#6B7280",
  marginBottom: 32,
},

initialStockTopInput: {
  height: 34,
  backgroundColor: "#C5DDEC",
  borderRadius: 4,
  paddingHorizontal: 11,
  fontSize: 14,
  color: "#1F2A44",
  marginBottom: 23,
},

initialStockItem: {
    borderTopWidth: 1,
    borderTopColor: "#B8D6E7",
    paddingTop: 14,
    paddingBottom: 14,
    marginTop: 0,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
  },

  initialStockItemWithBorder: {
    borderTopWidth: 1,
    borderTopColor: "#B8D6E7",
  },

  initialStockItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  initialStockNameWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },

  initialStockItemName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2A44",
  },

  initialStockPrice: {
    fontSize: 13,
    color: "#5E6A7A",
    fontWeight: "700",
  },

  initialStockQtyInput: {
    height: 44,
    minWidth: 90,
    backgroundColor: "#C5DDEC",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#1F2A44",
    fontWeight: "700",
  },

  initialStockReadOnlyValue: {
    height: 44,
    minWidth: 90,
    backgroundColor: "#C5DDEC",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingTop: 10,
    fontSize: 16,
    color: "#1F2A44",
    fontWeight: "700",
    textAlign: "center",
  },

initialStockButton: {
  height: 36,
  borderRadius: 5,
  backgroundColor: "#FB5AA9",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: -2,
},

initialStockButtonText: {
  marginLeft: 9,
  color: "#FFFFFF",
  fontSize: 12,
  fontWeight: "800",
},

leftoverStockCard: {
  backgroundColor: "#FFF9C9",
  borderRadius: 6,
  paddingHorizontal: 23,
  paddingTop: 24,
  paddingBottom: 22,
  marginBottom: 20,
},

leftoverStockTitle: {
  fontSize: 22,
  fontWeight: "800",
  color: "#1F2A44",
  marginBottom: 6,
},

leftoverStockSubtitle: {
  fontSize: 12,
  color: "#6B7280",
  marginBottom: 27,
},

leftoverStockItem: {
    marginBottom: 10,
  },

  leftoverStockItemWithBorder: {
    borderTopWidth: 1,
    borderTopColor: "#B8D6E7",
    paddingTop: 14,
  },

  leftoverStockItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  leftoverStockNameWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },

  leftoverStockItemName: {
    marginLeft: 9,
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2A44",
  },

  leftoverStockPrice: {
    fontSize: 13,
    color: "#5E6A7A",
    fontWeight: "700",
  },

  leftoverStockQtyInput: {
    height: 44,
    minWidth: 90,
    backgroundColor: "#C5DDEC",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#1F2A44",
    fontWeight: "700",
  },

  leftoverStockReadOnlyValue: {
    height: 44,
    minWidth: 90,
    backgroundColor: "#C5DDEC",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingTop: 10,
    fontSize: 16,
    color: "#1F2A44",
    fontWeight: "700",
    textAlign: "center",
  },

leftoverStockEmptyText: {
  backgroundColor: "#C5DDEC",
  borderRadius: 4,
  paddingHorizontal: 12,
  paddingVertical: 12,
  color: "#5E6A7A",
  fontSize: 14,
  fontWeight: "600",
},

leftoverStockButton: {
  height: 36,
  borderRadius: 5,
  backgroundColor: "#FB5AA9",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 14,
},

leftoverStockButtonText: {
  marginLeft: 9,
  color: "#FFFFFF",
  fontSize: 12,
  fontWeight: "800",
},

summaryHeader: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 15,
},

summaryTitle: {
  marginLeft: 10,
  fontSize: 20,
  fontWeight: "700",
  color: "#2C3E50",
},

infoText: {
  fontSize: 15,
  marginBottom: 6,
  color: "#555",
  fontWeight: "600",
},

table: {
  minWidth: 650,
  marginTop: 20,
},

tableHeader: {
  flexDirection: "row",
  backgroundColor: "#EC5AA7",
  borderRadius: 10,
  paddingVertical: 12,
  paddingHorizontal: 10,
},

headerText: {
  color: "#fff",
  fontWeight: "700",
  textAlign: "center",
},

tableRow: {
  flexDirection: "row",
  borderBottomWidth: 1,
  borderBottomColor: "#ECECEC",
  paddingVertical: 14,
  paddingHorizontal: 10,
},

rowText: {
  textAlign: "center",
  color: "#2C3E50",
  fontSize: 15,
},

totalCard: {
  marginTop: 15,
  backgroundColor: "#ffffff",
  borderRadius: 12,
  padding: 16,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  elevation: 2,
},

totalLabel: {
  fontSize: 16,
  fontWeight: "700",
  color: "#2C3E50",
},

totalValue: {
  fontSize: 18,
  fontWeight: "700",
  color: "#EC5AA7",
},

historyBadge: {
  alignSelf: "flex-start",
  marginTop: 10,
  backgroundColor: "#FCE7F3",
  color: "#BE185D",
  fontSize: 13,
  fontWeight: "700",
  paddingHorizontal: 12,
  paddingVertical: 7,
  borderRadius: 999,
},

historyVendorTitle: {
  marginBottom: 12,
  fontSize: 20,
  fontWeight: "800",
  color: "#2C3E50",
},

reportModal: {
  width: "90%",
  maxWidth: 420,
  backgroundColor: "#FFF7D1",
  borderRadius: 20,
  padding: 25,
  alignItems: "center",
},

reportTitle: {
  fontSize: 22,
  fontWeight: "700",
  marginVertical: 15,
  color: "#2C3E50",
},

reportInfo: {
  width: "100%",
  marginVertical: 20,
},

reportText: {
  fontSize: 16,
  marginBottom: 10,
  color: "#374151",
},

downloadButton: {
  width: "100%",
  height: 52,
  borderRadius: 14,
  backgroundColor: "#EC5AA7",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 12,
},

downloadButtonText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 16,
},

shareButton: {
  width: "100%",
  height: 52,
  borderRadius: 14,
  backgroundColor: "#2563EB",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 12,
},

shareButtonText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 16,
},

doneButton: {
  width: "100%",
  height: 52,
  borderRadius: 14,
  backgroundColor: "#22C55E",
  justifyContent: "center",
  alignItems: "center",
},

doneButtonText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 16,
},

emptyText: {
  textAlign: "center",
  color: "#6B7280",
  fontSize: 16,
  marginVertical: 20,
  fontWeight: "600",
},

});

