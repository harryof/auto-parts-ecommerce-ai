const fs = require('fs');

const carModels = [
  { make: 'Toyota', model: 'Camry XV70', year: 2021, wmi: 'JTN' },
  { make: 'Toyota', model: 'Corolla E210', year: 2020, wmi: 'JT2' },
  { make: 'Toyota', model: 'RAV4 XA50', year: 2022, wmi: 'JTJ' },
  { make: 'Kia', model: 'Rio IV', year: 2019, wmi: 'KNAT' },
  { make: 'Hyundai', model: 'Solaris II', year: 2020, wmi: 'KMH' },
  { make: 'Hyundai', model: 'Creta I', year: 2018, wmi: 'KMH' },
  { make: 'Volkswagen', model: 'Polo V', year: 2015, wmi: 'WVW' },
  { make: 'Volkswagen', model: 'Tiguan II', year: 2021, wmi: 'WVG' },
  { make: 'Skoda', model: 'Octavia A8', year: 2022, wmi: 'TMB' },
  { make: 'Skoda', model: 'Rapid', year: 2018, wmi: 'TMB' },
  { make: 'Renault', model: 'Duster', year: 2016, wmi: 'VF1' },
  { make: 'Lada', model: 'Vesta', year: 2020, wmi: 'XTA' },
  { make: 'Lada', model: 'Granta', year: 2019, wmi: 'XTA' },
  { make: 'Nissan', model: 'Qashqai J11', year: 2017, wmi: 'SJN' },
  { make: 'Mazda', model: 'CX-5 KF', year: 2020, wmi: 'JMZ' },
  { make: 'Ford', model: 'Focus III', year: 2014, wmi: 'WF0' },
  { make: 'Honda', model: 'CR-V V', year: 2021, wmi: 'JHL' },
  { make: 'BMW', model: '3 Series G20', year: 2022, wmi: 'WBA' },
  { make: 'Mercedes-Benz', model: 'E-Class W213', year: 2019, wmi: 'WDD' },
  { make: 'Audi', model: 'A4 B9', year: 2021, wmi: 'WAU' },
  { make: 'Volvo', model: 'XC90 II', year: 2023, wmi: 'YV1' },
  { make: 'Porsche', model: 'Cayenne III', year: 2022, wmi: 'WP0' }
];

function generateRandomVIN(wmi) {
  const chars = '0123456789ABCDEFGHJKLMNPRSTUVWXYZ';
  let vin = wmi;
  
  while (vin.length < 17) {
    vin += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return vin;
}

const dataset = [];


carModels.forEach(car => {
  for (let i = 0; i < 3; i++) {
    const vin = generateRandomVIN(car.wmi);
    dataset.push({
      vin: vin,
      make: car.make,
      model: car.model,
      year: car.year,
      full_name: `${car.make} ${car.model} ${car.year}`
    });
  }
});


dataset.sort(() => 0.5 - Math.random());

fs.writeFileSync('vins_dataset.json', JSON.stringify(dataset, null, 2));
console.log(`✅ Сгенерирован датасет из ${dataset.length} VIN номеров в файле vins_dataset.json`);
