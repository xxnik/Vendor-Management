// import iceCreams from "./iceCreams";


// function getDateSeed(dateKey) {
//   return dateKey
//     .replace(/-/g, "")
//     .split("")
//     .reduce((total, value) => total + Number(value), 0);
// }

// export function getHistoryReports(dateKey) {
//   const seed = getDateSeed(dateKey);

//   return vendors.map((vendor, vendorIndex) => {
//     const initialStock = {};
//     const leftoverStock = {};

//     iceCreams.forEach((item, itemIndex) => {
//       const initial =
//         14 + ((seed + vendorIndex * 5 + itemIndex * 4) % 16);

//       const sold =
//         3 + ((seed + vendorIndex * 3 + itemIndex * 2) % 8);

//       initialStock[item.id] = String(initial);
//       leftoverStock[item.id] = String(Math.max(initial - sold, 0));
//     });

//     return {
//       vendor,
//       initialStock,
//       leftoverStock,
//     };
//   });
// }
