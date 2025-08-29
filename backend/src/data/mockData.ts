import { Product } from "../modules/products/product.model.js";
import { Warehouse } from "../modules/warehouses/warehouse.model.js";

export const products: Product[] = [
    { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
    { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "BLR-A", stock: 50, demand: 80 },
    { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "PNQ-C", stock: 80, demand: 80 },
    { id: "P-1004", name: "Bearing 608ZZ", sku: "BRG-608-50", warehouse: "DEL-B", stock: 24, demand: 120 },
    { id: "P-1005", name: "Aluminum Spacer", sku: "SPC-10-25", warehouse: "BLR-A", stock: 60, demand: 40 },
    { id: "P-1006", name: "Rubber Grommet", sku: "GRM-05-100", warehouse: "DEL-B", stock: 200, demand: 150 },
    { id: "P-1007", name: "Stainless Steel Screw", sku: "SCR-SS-30", warehouse: "PNQ-C", stock: 90, demand: 60 },
    { id: "P-1008", name: "Copper Washer", sku: "WSR-CU-10", warehouse: "BLR-A", stock: 35, demand: 50 },
    { id: "P-1009", name: "Plastic Cap", sku: "CAP-PL-20", warehouse: "DEL-B", stock: 120, demand: 100 },
    { id: "P-1010", name: "Spring Pin", sku: "PIN-SPR-15", warehouse: "PNQ-C", stock: 75, demand: 90 },
    { id: "P-1011", name: "Lock Nut", sku: "NUT-LK-12", warehouse: "BLR-A", stock: 55, demand: 70 },
    { id: "P-1012", name: "Flat Washer", sku: "WSR-FL-08", warehouse: "DEL-B", stock: 100, demand: 110 },
    { id: "P-1013", name: "Hex Coupling Nut", sku: "NUT-HC-16", warehouse: "PNQ-C", stock: 40, demand: 30 },
    { id: "P-1014", name: "Threaded Rod", sku: "ROD-TH-100", warehouse: "BLR-A", stock: 20, demand: 25 },
    { id: "P-1015", name: "Brass Bushing", sku: "BSH-BR-12", warehouse: "DEL-B", stock: 60, demand: 45 },
    { id: "P-1016", name: "Ceramic Insulator", sku: "INS-CR-05", warehouse: "PNQ-C", stock: 30, demand: 20 },
    { id: "P-1017", name: "Nylon Spacer", sku: "SPC-NY-08", warehouse: "BLR-A", stock: 80, demand: 60 },
    { id: "P-1018", name: "Zinc Plated Screw", sku: "SCR-ZN-25", warehouse: "DEL-B", stock: 110, demand: 90 },
    { id: "P-1019", name: "Split Lock Washer", sku: "WSR-SPL-10", warehouse: "PNQ-C", stock: 45, demand: 55 },
    { id: "P-1020", name: "Tapered Roller Bearing", sku: "BRG-TR-20", warehouse: "BLR-A", stock: 22, demand: 30 },
    { id: "P-1021", name: "Stainless Steel Pin", sku: "PIN-SS-12", warehouse: "DEL-B", stock: 70, demand: 65 },
    { id: "P-1022", name: "Plastic Washer", sku: "WSR-PL-06", warehouse: "PNQ-C", stock: 95, demand: 80 },
    { id: "P-1023", name: "Hex Flange Nut", sku: "NUT-HF-14", warehouse: "BLR-A", stock: 50, demand: 40 },
    { id: "P-1024", name: "Aluminum Rivet", sku: "RIV-AL-10", warehouse: "DEL-B", stock: 130, demand: 120 },
    { id: "P-1025", name: "Steel Dowel Pin", sku: "PIN-ST-08", warehouse: "PNQ-C", stock: 60, demand: 70 },
    { id: "P-1026", name: "Copper Spacer", sku: "SPC-CU-05", warehouse: "BLR-A", stock: 40, demand: 35 },
    { id: "P-1027", name: "Rubber Washer", sku: "WSR-RB-12", warehouse: "DEL-B", stock: 85, demand: 90 },
    { id: "P-1028", name: "Threaded Insert", sku: "INS-TH-06", warehouse: "PNQ-C", stock: 55, demand: 50 },
    { id: "P-1029", name: "Brass Hex Nut", sku: "NUT-BR-10", warehouse: "BLR-A", stock: 38, demand: 42 },
    { id: "P-1030", name: "Steel Retaining Ring", sku: "RNG-ST-15", warehouse: "DEL-B", stock: 25, demand: 30 }
];

export const warehouses: Warehouse[] = [
    { code: "BLR-A", name: "Bangalore Central", city: "Bangalore", country: "India" },
    { code: "PNQ-C", name: "Pune Central", city: "Pune", country: "India" },
    { code: "DEL-B", name: "Delhi North", city: "Delhi", country: "India" }
  ];