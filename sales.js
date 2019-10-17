const salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

const companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

const sum = function(arr) {
  let total = 0;
  for (let cash in arr) {
    total += arr[cash];
  }
  return total;
};

const taxed = function(cash, tax) {
  let cashTax = cash * tax;
  return cashTax;
};

const brandObj = function(cashed, taxed) {
  let singleB = {};
  singleB["totalSales"] = cashed;
  singleB["totalTaxes"] = taxed;
  return singleB;
};

const addBrand = function(brand , tempB, record) {
  let word = brand;
  let tmp = tempB;
  let rec = record;
  let modBrand = rec[word];
  modBrand["totalSales"] = modBrand["totalSales"] + tmp["totalSales"];
  modBrand["totalTaxes"] = modBrand["totalTaxes"] + tmp["totalTaxes"];
  rec[word] = modBrand;
  return rec;
};

const calculateSalesTax = function(salesData, taxRates) {
  // Implement your code here
  let taxR = taxRates;
  let salesD = salesData;
  let record = {};

  for (let item in salesD) {
    let tax = 0;
    let company = salesD[item];
    let brand = company["name"];
    let prov = company["province"];
    let sale = company["sales"];
    if (prov in taxR) {
      tax = taxR[prov];
    }
    let money = sum(sale);
    let taxedMoney = taxed(money, tax);
    if (brand in record) {
      let tempB = brandObj(money, taxedMoney);
      record = addBrand(brand, tempB, record);
    } else {
      record[brand] = brandObj(money, taxedMoney);
    }
  }
  return record;
};

console.log(calculateSalesTax(companySalesData, salesTaxRates));