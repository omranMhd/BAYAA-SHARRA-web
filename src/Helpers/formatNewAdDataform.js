// هذا التابع باختصار يقوم بأخذ كل بيانات فورم اضافة اعلان ويقوم بتحوله واستخلاص منه بيانات متناسقة نظيفة لكي اخزنها في الباك إند
// هذا التابع أشبه بالمخرطة حيث يقوم بخرط اوبجكت الداتا وتنظيفه وفرزه وتهيئته لارساله للباك
function convertNewAdData(data) {
  const user = JSON.parse(localStorage.getItem("user"));
  let user_id = user != null ? user.id : 1;

  const contactNumber = {
    firstName: data.contactName1,
    firstPhone: `${data.phoneCode1}${data.phone1}`,
  };

  if (
    data.contactName2 !== "" &&
    data.contactName2 !== null &&
    data.contactName2 !== undefined
  ) {
    contactNumber.secondName = data.contactName2;
    contactNumber.secondPhone = `${data.phoneCode2}${data.phone2}`;
  }

  const advertisement = {
    user_id: user_id,
    address: JSON.stringify({
      country: data.country,
      city: data.city,
    }),
    title: data.title,
    description: data.description,
    contactNumber: JSON.stringify(contactNumber),
  };

  if (data.locationLatitude != null && data.locationLongitude != null) {
    advertisement.location = JSON.stringify({
      latitude: data.locationLatitude,
      longitude: data.locationLongitude,
    });
  }

  const photoes = data.photoes.filter((photo) => photo !== undefined);
  const filterFields = {};

  if (data.category === "RealEstates") {
    advertisement.category = data.subCategory;

    if (data.subCategory === "Apartment") {
      filterFields.area = data.area;
      filterFields.floor = data.floor;
      filterFields.roomCount = data.roomCount;
      filterFields.cladding = data.cladding;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.ownership = data.ownership;
      filterFields.sellOrRent = data.sellOrRent;
      filterFields.direction = data.direction;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    } else if (data.subCategory === "Office") {
      filterFields.area = data.area;
      filterFields.floor = data.floor;
      filterFields.roomCount = data.roomCount;
      filterFields.cladding = data.cladding;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.ownership = data.ownership;
      filterFields.sellOrRent = data.sellOrRent;
      filterFields.direction = data.direction;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    } else if (data.subCategory === "Villa") {
      filterFields.area = data.area;
      filterFields.roomCount = data.roomCount;
      filterFields.cladding = data.cladding;
      filterFields.floorsCount = data.floorsCount;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.ownership = data.ownership;
      filterFields.sellOrRent = data.sellOrRent;
      filterFields.direction = data.direction;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    } else if (data.subCategory === "Commercial store") {
      filterFields.area = data.area;
      filterFields.floor = data.floor;
      filterFields.cladding = data.cladding;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.ownership = data.ownership;
      filterFields.sellOrRent = data.sellOrRent;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    } else if (data.subCategory === "Land") {
      filterFields.area = data.area;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.ownership = data.ownership;
      filterFields.sellOrRent = data.sellOrRent;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    } else if (data.subCategory === "Farm") {
      filterFields.area = data.area;
      filterFields.roomCount = data.roomCount;
      filterFields.cladding = data.cladding;
      filterFields.floorsCount = data.floorsCount;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.ownership = data.ownership;
      filterFields.sellOrRent = data.sellOrRent;
      filterFields.direction = data.direction;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    } else if (data.subCategory === "Chalet") {
      filterFields.area = data.area;
      filterFields.floor = data.floor;
      filterFields.roomCount = data.roomCount;
      filterFields.cladding = data.cladding;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.ownership = data.ownership;
      filterFields.sellOrRent = data.sellOrRent;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    }
  } else if (data.category === "vehicles") {
    advertisement.category = data.subCategory;
    if (data.subCategory === "Spare parts") {
      filterFields.vehicleType = data.vehicleType;
      filterFields.status = data.SparePartStatus;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
    } else {
      filterFields.brand = data.vehicleBrand;
      filterFields.model = data.vehicleModel;
      filterFields.color = data.vehicleColor;
      filterFields.gear = data.gear;
      filterFields.manufactureYear = data.manufactureYear;
      filterFields.traveledDistance = data.traveledDistance;
      filterFields.engineCapacity = data.engineCapacity;
      filterFields.fuel = data.fuel;
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.paintStatus = data.paintStatus;
      filterFields.sellOrRent = data.sellOrRent;
      if (data.sellOrRent === "rent")
        filterFields.paymentMethodRent = data.paymentMethodRent;
    }
  } else if (data.category === "Electrical Electronic Devices") {
    advertisement.category = data.subCategory;
    if (data.subCategory === "Mobile" || data.subCategory === "Tablet") {
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.brand = data.mobOrTabBrand;
      filterFields.category = data.mobOrTabCategory;
      filterFields.ram = data.mobOrTabRam;
      filterFields.hard = data.mobOrTabHard;
      filterFields.status = data.deviceStatus;
      filterFields.batteryStatus = data.batteryStatus;
    } else if (data.subCategory === "Computer") {
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.brand = data.computerBrand;
      filterFields.category = data.computerCategory;
      filterFields.ram = data.computerRam;
      filterFields.hard = data.computerHard;
      filterFields.processor = data.processor;
      filterFields.status = data.deviceStatus;
      filterFields.screenType = data.screenType;
      filterFields.screenSize = data.screenSize;
    } else if (data.subCategory === "Accessories") {
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.deviceType = data.deviceType;
    } else {
      filterFields.price = data.price;
      filterFields.currency = data.currency;
      filterFields.status = data.deviceStatus;
    }
  } else if (data.category === "Furniture") {
    advertisement.category = data.subCategory;
    filterFields.material = data.material;
    filterFields.price = data.price;
    filterFields.currency = data.currency;
    filterFields.status = data.furnitureStatus;
  } else if (data.category === "Clothing and fashion") {
    advertisement.category = data.subCategory;
    filterFields.price = data.price;
    filterFields.currency = data.currency;
    filterFields.status = data.clothesStatus;
    filterFields.type = data.clothesType;
  } else if (
    data.category === "Animals" ||
    data.category === "Personal Collections" ||
    data.category === "Food and drinks" ||
    data.category === "Books and hobbies"
  ) {
    advertisement.category = data.subCategory;
    filterFields.price = data.price;
    filterFields.currency = data.currency;
  } else if (
    data.category === "Children equipment" ||
    data.category === "Sports and clubs" ||
    data.category === "Industrial equipment"
  ) {
    advertisement.category = data.category;
    filterFields.price = data.price;
    filterFields.currency = data.currency;
  } else if (data.category === "Services" || data.category === "Jobs") {
    advertisement.category = data.category;
  }

  return { advertisement, filterFields, photoes };
}

export { convertNewAdData };
