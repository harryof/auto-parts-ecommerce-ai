import pistonImg from "../img/поршни.jpg";
import klapanMercedes from "../img/комплект клапанов mercedes.jpg";
import GrmChain from "../img/цепь грм ауди.jpg";
import clutch from "../img/сцепление ауди.jpg";
import val from "../img/вал корданный toyota.jpg";
import fluidagb from "../img/масло акпп bmw.jpg";
import koylovers from "../img/подвеска_bmw.jpg";
import lavers_mercedes from "../img/рычаги_мерседес.jpg";
import springs_audi from "../img/пружины_audiA6.jpg";
import kolodki_audi from "../img/колодки_ауди.jpg";
import disk_toyota from "../img/тормозные_диски_тойота.jpg";
import brakes_fluid_bmw from "../img/масло_тормоза_bmw.jpg";
import tail from "../img/спойлер_бмв.jpeg";
import baggage from "../img/багажник_на_крышу.jpg";
import bodykit from "../img/обвес.jpg";
import fara from "../img/fara_audi.jpg";
import tumanki from "../img/tumanki_camry.jpg";
import svet from "../img/svet_bmw.jpg";
import vihlop from "../img/vihlop.jpg";
import turbo from "../img/turbo.jpg";
import chip from "../img/chip.jpg";
import wax from "../img/wax.jpg";
import polish from "../img/polirol.jpg";
import shampoo from "../img/schampoo.jpg";
import lether from "../img/lether.jpg";
import salon from "../img/salon.jpg";
import vozduh from "../img/vozduh.jpg";
import motor_oil_bmw from "../img/motor_oil_bmw.jpg";
import motor_oil_mercedes from "../img/motor_oil_mercedes.jpg";
import motor_oil_audi from "../img/motor_oil_audi.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  inStock: boolean;
  categoryId: string;
  subCategoryId: string;
  isHit?: boolean;
  isNew?: boolean;
  isRecommended?: boolean;
  oldPrice?: number | null;
  article?: string;
  rating?: number;
}

export const products: Product[] = [
  // Запчасти - Двигатель
  {
    id: "piston-kit-bmw-m54",
    name: "Поршневой комплект BMW M54",
    description: "Комплект поршней с кольцами и пальцами для двигателя BMW M54",
    price: 45000,
    image: pistonImg,
    brand: "BMW",
    inStock: true,
    categoryId: "spare-parts",
    subCategoryId: "engine-parts",
    isHit: true,
    isNew: false,
    isRecommended: true,
  },
  {
    id: "valve-kit-mercedes-m271",
    name: "Комплект клапанов Mercedes M271",
    description:
      "Комплект впускных и выпускных клапанов для двигателя Mercedes M271",
    price: 35000,
    image: klapanMercedes,
    brand: "Mercedes",
    inStock: true,
    categoryId: "spare-parts",
    subCategoryId: "engine-parts",
    isHit: false,
    isNew: true,
    isRecommended: true,
  },
  {
    id: "timing-chain-audi-2.0t",
    name: "Цепь ГРМ Audi 2.0 TFSI",
    description:
      "Комплект цепи ГРМ с натяжителем и успокоителем для Audi 2.0 TFSI",
    price: 28000,
    image: GrmChain,
    brand: "Audi",
    inStock: true,
    categoryId: "spare-parts",
    subCategoryId: "engine-parts",
    isHit: true,
    isNew: false,
    isRecommended: false,
  },

  // Запчасти - Коробка передач
  {
    id: "clutch-kit-audi-a4",
    name: "Комплект сцепления Audi A4",
    description: "Комплект сцепления для Audi A4 с двигателем 2.0 TDI",
    price: 28000,
    image: clutch,
    brand: "Audi",
    inStock: true,
    categoryId: "spare-parts",
    subCategoryId: "transmission",
  },
  {
    id: "driveshaft-toyota-camry",
    name: "Карданный вал Toyota Camry",
    description: "Карданный вал для Toyota Camry 2018-2022",
    price: 32000,
    image: val,
    brand: "Toyota",
    inStock: true,
    categoryId: "spare-parts",
    subCategoryId: "transmission",
  },
  {
    id: "gearbox-oil-bmw",
    name: "Масло для АКПП BMW",
    description: "Синтетическое масло для автоматической коробки передач BMW",
    price: 2500,
    image: fluidagb,
    brand: "BMW",
    inStock: true,
    categoryId: "spare-parts",
    subCategoryId: "transmission",
  },

  // Запчасти - Ходовая часть
  {
    id: "shock-absorbers-bmw-3",
    name: "Комплект амортизаторов BMW 3 Series",
    description: "Комплект амортизаторов для BMW 3 Series 2019-2022",
    price: 42000,
    image: koylovers,
    brand: "BMW",
    inStock: true,
    categoryId: "spare-parts",
    subCategoryId: "suspension",
  },
  {
    id: "control-arms-mercedes-c",
    name: "Рычаги подвески Mercedes C-Class",
    description: "Комплект рычагов подвески для Mercedes C-Class 2018-2022",
    price: 38000,
    image: lavers_mercedes,
    brand: "Mercedes",
    inStock: true,
    categoryId: "spare-parts",
    subCategoryId: "suspension",
  },
  {
    id: "springs-audi-a6",
    name: "Комплект пружин Audi A6",
    description: "Комплект пружин подвески для Audi A6 2019-2022",
    price: 25000,
    image: springs_audi,
    brand: "Audi",
    inStock: true,
    categoryId: "spare-parts",
    subCategoryId: "suspension",
  },

  // Запчасти - Тормоза
  {
    id: "brake-pads-audi-a6",
    name: "Тормозные колодки Audi A6",
    description: "Комплект тормозных колодок для Audi A6 2019-2022",
    price: 12000,
    image:kolodki_audi,
    brand: "Audi",
    inStock: true,
    categoryId: "spare-parts",
    subCategoryId: "brake-system",
  },
  {
    id: "brake-discs-toyota-camry",
    name: "Тормозные диски Toyota Camry",
    description: "Комплект тормозных дисков для Toyota Camry 2018-2022",
    price: 15000,
    image: disk_toyota,
    brand: "Toyota",
    inStock: true,
    categoryId: "spare-parts",
    subCategoryId: "brake-system",
  },
  {
    id: "brake-fluid-bmw",
    name: "Тормозная жидкость BMW",
    description: "Тормозная жидкость DOT4 для BMW",
    price: 1500,
    image: brakes_fluid_bmw,
    brand: "BMW",
    inStock: true,
    categoryId: "spare-parts",
    subCategoryId: "brake-system",
  },

  // Тюнинг - Внешний тюнинг
  {
    id: "spoiler-bmw-m4",
    name: "Спойлер BMW M4",
    description: "Карбоновый спойлер для BMW M4 2020-2022",
    price: 65000,
    image: tail,
    brand: "BMW",
    inStock: true,
    categoryId: "tuning",
    subCategoryId: "body-kits",
  },
  {
    id: "roof-rack-mercedes-glc",
    name: "Багажник на крышу Mercedes GLC",
    description:
      "Аэродинамический багажник на крышу для Mercedes GLC 2019-2022",
    price: 45000,
    image:baggage,
    brand: "Mercedes",
    inStock: true,
    categoryId: "tuning",
    subCategoryId: "body-kits",
  },
  {
    id: "body-kit-audi-rs6",
    name: "Обвес Audi RS6",
    description: "Полный комплект обвеса для Audi RS6 Avant",
    price: 180000,
    image:bodykit,
    brand: "Audi",
    inStock: true,
    categoryId: "tuning",
    subCategoryId: "body-kits",
  },

  // Тюнинг - Светотехника
  {
    id: "led-headlights-audi-a4",
    name: "LED фары Audi A4",
    description: "Комплект LED фар для Audi A4 2019-2022",
    price: 85000,
    image: fara,
    brand: "Audi",
    inStock: true,
    categoryId: "tuning",
    subCategoryId: "lighting",
  },
  {
    id: "fog-lights-toyota-camry",
    name: "Противотуманные фары Toyota Camry",
    description: "Комплект противотуманных фар для Toyota Camry 2018-2022",
    price: 25000,
    image: tumanki,
    brand: "Toyota",
    inStock: true,
    categoryId: "tuning",
    subCategoryId: "lighting",
  },
  {
    id: "interior-lighting-bmw",
    name: "Подсветка салона BMW",
    description: "Комплект LED подсветки салона для BMW 3/4/5 Series",
    price: 15000,
    image: svet,
    brand: "BMW",
    inStock: true,
    categoryId: "tuning",
    subCategoryId: "lighting",
  },

  // Тюнинг - Тюнинг двигателя
  {
    id: "chip-tuning-bmw-m4",
    name: "Чип-тюнинг BMW M4",
    description: "Программное обеспечение для увеличения мощности BMW M4",
    price: 45000,
    image: chip,
    brand: "BMW",
    inStock: true,
    categoryId: "tuning",
    subCategoryId: "engine-tuning",
  },
  {
    id: "exhaust-mercedes-c63",
    name: "Выпускная система Mercedes C63",
    description: "Спортивная выпускная система для Mercedes C63 AMG",
    price: 120000,
    image: vihlop,
    brand: "Mercedes",
    inStock: true,
    categoryId: "tuning",
    subCategoryId: "engine-tuning",
  },
  {
    id: "turbo-kit-audi-rs3",
    name: "Турбо-комплект Audi RS3",
    description: "Комплект для увеличения мощности двигателя Audi RS3",
    price: 250000,
    image: turbo,
    brand: "Audi",
    inStock: true,
    categoryId: "tuning",
    subCategoryId: "engine-tuning",
  },

  // Автохимия - Уход за кузовом
  {
    id: "car-wax-bmw",
    name: "Воск для кузова BMW",
    description: "Защитный воск для кузова автомобиля",
    price: 2500,
    image: wax,
    brand: "BMW",
    inStock: true,
    categoryId: "auto-chemistry",
    subCategoryId: "car-care",
  },
  {
    id: "polish-mercedes",
    name: "Полироль Mercedes",
    description: "Полироль для удаления царапин и восстановления блеска",
    price: 1800,
    image: polish,
    brand: "Mercedes",
    inStock: true,
    categoryId: "auto-chemistry",
    subCategoryId: "car-care",
  },
  {
    id: "shampoo-audi",
    name: "Шампунь Audi",
    description: "Профессиональный шампунь для мойки автомобиля",
    price: 1200,
    image: shampoo,
    brand: "Audi",
    inStock: true,
    categoryId: "auto-chemistry",
    subCategoryId: "car-care",
  },

  // Автохимия - Уход за салоном
  {
    id: "interior-cleaner-bmw",
    name: "Очиститель салона BMW",
    description: "Средство для очистки пластиковых и кожаных поверхностей",
    price: 1500,
    image: salon,
    brand: "BMW",
    inStock: true,
    categoryId: "auto-chemistry",
    subCategoryId: "interior-care",
  },
  {
    id: "air-freshener-mercedes",
    name: "Освежитель воздуха Mercedes",
    description: "Ароматизатор салона с запахом новой машины",
    price: 800,
    image: vozduh,
    brand: "Mercedes",
    inStock: true,
    categoryId: "auto-chemistry",
    subCategoryId: "interior-care",
  },
  {
    id: "leather-care-audi",
    name: "Средство для кожи Audi",
    description: "Средство для ухода за кожаным салоном",
    price: 2000,
    image: lether,
    brand: "Audi",
    inStock: true,
    categoryId: "auto-chemistry",
    subCategoryId: "interior-care",
  },

  // Аккумуляторы - Свинцовые
  {
    id: "battery-bmw-60ah",
    name: "Аккумулятор BMW 60Ah",
    description: "Свинцовый аккумулятор 60Ah для BMW",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    brand: "BMW",
    inStock: true,
    categoryId: "batteries",
    subCategoryId: "lead-acid",
  },
  {
    id: "battery-mercedes-70ah",
    name: "Аккумулятор Mercedes 70Ah",
    description: "Свинцовый аккумулятор 70Ah для Mercedes",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    brand: "Mercedes",
    inStock: true,
    categoryId: "batteries",
    subCategoryId: "lead-acid",
  },
  {
    id: "battery-audi-80ah",
    name: "Аккумулятор Audi 80Ah",
    description: "Свинцовый аккумулятор 80Ah для Audi",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1555215695-300b0ca6ba4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    brand: "Audi",
    inStock: true,
    categoryId: "batteries",
    subCategoryId: "lead-acid",
  },

  // Аксессуары - Аксессуары для салона
  {
    id: "car-mats-bmw",
    name: "Коврики BMW",
    description: "Комплект ковриков в салон BMW",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    brand: "BMW",
    inStock: true,
    categoryId: "accessories",
    subCategoryId: "interior",
  },
  {
    id: "seat-covers-mercedes",
    name: "Чехлы на сиденья Mercedes",
    description: "Комплект чехлов на сиденья Mercedes",
    price: 8000,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    brand: "Mercedes",
    inStock: true,
    categoryId: "accessories",
    subCategoryId: "interior",
  },
  {
    id: "organizer-audi",
    name: "Органайзер Audi",
    description: "Органайзер для багажника Audi",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1555215695-300b0ca6ba4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    brand: "Audi",
    inStock: true,
    categoryId: "accessories",
    subCategoryId: "interior",
  },

  // Инструменты - Ручной инструмент
  {
    id: "tool-kit-bmw",
    name: "Набор инструментов BMW",
    description: "Профессиональный набор инструментов BMW",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    brand: "BMW",
    inStock: true,
    categoryId: "tools",
    subCategoryId: "hand-tools",
  },
  {
    id: "wrench-set-mercedes",
    name: "Набор ключей Mercedes",
    description: "Комплект гаечных ключей Mercedes",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    brand: "Mercedes",
    inStock: true,
    categoryId: "tools",
    subCategoryId: "hand-tools",
  },
  {
    id: "screwdriver-set-audi",
    name: "Набор отверток Audi",
    description: "Профессиональный набор отверток Audi",
    price: 8000,
    image:
      "https://images.unsplash.com/photo-1555215695-300b0ca6ba4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    brand: "Audi",
    inStock: true,
    categoryId: "tools",
    subCategoryId: "hand-tools",
  },

  // Колёсный крепеж - Автомобильные диски
  {
    id: "wheels-bmw-19",
    name: 'Диски BMW 19"',
    description: 'Комплект легкосплавных дисков 19" для BMW',
    price: 120000,
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    brand: "BMW",
    inStock: true,
    categoryId: "wheels",
    subCategoryId: "wheels",
  },
  {
    id: "wheels-mercedes-20",
    name: 'Диски Mercedes 20"',
    description: 'Комплект легкосплавных дисков 20" для Mercedes',
    price: 150000,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    brand: "Mercedes",
    inStock: true,
    categoryId: "wheels",
    subCategoryId: "wheels",
  },
  {
    id: "wheels-audi-21",
    name: 'Диски Audi 21"',
    description: 'Комплект легкосплавных дисков 21" для Audi',
    price: 180000,
    image:
      "https://images.unsplash.com/photo-1555215695-300b0ca6ba4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    brand: "Audi",
    inStock: true,
    categoryId: "wheels",
    subCategoryId: "wheels",
  },

  // Одежда - Одежда с логотипами
  {
    id: "tshirt-bmw-m",
    name: "Футболка BMW M",
    description: "Футболка с логотипом BMW M",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    brand: "BMW",
    inStock: true,
    categoryId: "clothing",
    subCategoryId: "clothes",
  },
  {
    id: "hoodie-mercedes-amg",
    name: "Толстовка Mercedes-AMG",
    description: "Толстовка с логотипом Mercedes-AMG",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    brand: "Mercedes",
    inStock: true,
    categoryId: "clothing",
    subCategoryId: "clothes",
  },
  {
    id: "jacket-audi-rs",
    name: "Куртка Audi RS",
    description: "Куртка с логотипом Audi RS",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1555215695-300b0ca6ba4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    brand: "Audi",
    inStock: true,
    categoryId: "clothing",
    subCategoryId: "clothes",
  },

  // Масла - Моторные масла
  {
    id: "oil-bmw-5w30",
    name: "Масло BMW 5W-30",
    description: "Синтетическое моторное масло 5W-30 для BMW",
    price: 1200,
    image: motor_oil_bmw,
    brand: "BMW",
    inStock: true,
    categoryId: "oil",
    subCategoryId: "engine-oil",
    isHit: true,
    isNew: true,
    isRecommended: true,
  },
  {
    id: "oil-mercedes-0w40",
    name: "Масло Mercedes 0W-40",
    description: "Синтетическое моторное масло 0W-40 для Mercedes",
    price: 1500,
    image: motor_oil_mercedes,
    brand: "Mercedes",
    inStock: true,
    categoryId: "oil",
    subCategoryId: "engine-oil",
    isHit: false,
    isNew: true,
    isRecommended: true,
  },
  {
    id: "oil-audi-5w40",
    name: "Масло Audi 5W-40",
    description: "Синтетическое моторное масло 5W-40 для Audi",
    price: 1300,
    image: motor_oil_audi,
    brand: "Audi",
    inStock: true,
    categoryId: "oil",
    subCategoryId: "engine-oil",
    isHit: true,
    isNew: false,
    isRecommended: true,
  },
];
