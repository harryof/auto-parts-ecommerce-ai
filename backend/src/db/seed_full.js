const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'autoparts',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});


const categories = [
  {
    id: 'spare-parts', name: 'Автозапчасти',
    description: 'Оригинальные и качественные запчасти для всех марок автомобилей', icon: 'Settings2',
    subs: [
      { id: 'engine-parts',   name: 'Двигатель',                     description: 'Поршни, кольца, вкладыши, клапаны и другие детали двигателя' },
      { id: 'body-parts',     name: 'Кузовные детали',               description: 'Крылья, двери, капоты, бамперы и другие кузовные элементы' },
      { id: 'washer',         name: 'Омыватель и стеклоочиститель',   description: 'Бачки, насосы омывателя и резинки стеклоочистителей' },
      { id: 'hvac',           name: 'Отопление и вентиляция салона',  description: 'Радиаторы отопителя, вентиляторы, клапаны печки' },
      { id: 'suspension',     name: 'Подвеска',                      description: 'Амортизаторы, рычаги, шаровые опоры и пружины' },
      { id: 'bearings',       name: 'Подшипники',                    description: 'Ступичные, опорные и другие подшипники' },
      { id: 'gaskets',        name: 'Прокладки',                     description: 'Прокладки ГБЦ, коллектора, поддона и другие уплотнения' },
      { id: 'steering',       name: 'Рулевое управление',            description: 'Рейки, тяги, наконечники и ГУР' },
      { id: 'interior-parts', name: 'Салон',                         description: 'Сиденья, панели, ручки, молдинги' },
      { id: 'exhaust',        name: 'Система выпуска газов',         description: 'Глушители, катализаторы, трубы, резонаторы' },
      { id: 'brake-system',   name: 'Тормоза',                       description: 'Колодки, диски, суппорты и тормозные шланги' },
      { id: 'transmission',   name: 'Трансмиссия',                   description: 'МКПП, АКПП, сцепление, карданные и полуоси' },
      { id: 'cooling',        name: 'Система охлаждения',            description: 'Радиаторы, термостаты, помпы и шланги' },
      { id: 'fuel-system',    name: 'Топливная система',             description: 'Топливные насосы, форсунки, фильтры топлива' },
    ],
  },
  {
    id: 'auto-chemistry', name: 'Автокосметика и автохимия',
    description: 'Средства для ухода за автомобилем снаружи и внутри', icon: 'Droplets',
    subs: [
      { id: 'car-care',      name: 'Уход за кузовом',            description: 'Шампуни, полироли, воски и защитные покрытия' },
      { id: 'interior-care', name: 'Уход за салоном',            description: 'Очистители, освежители воздуха, пропитки кожи' },
      { id: 'glass-care',    name: 'Уход за стёклами',           description: 'Незамерзайки, антидождь, очистители стёкол' },
      { id: 'tech-fluids',   name: 'Технические жидкости',       description: 'Тормозная, охлаждающая, гидравлическая жидкости' },
      { id: 'degreasers',    name: 'Очистители и обезжириватели', description: 'Очистители двигателя, битума, тормозов' },
    ],
  },
  {
    id: 'autoelectronics', name: 'Автоэлектроника',
    description: 'Современная электроника для комфорта и безопасности', icon: 'Cpu',
    subs: [
      { id: 'dashcam',    name: 'Видеорегистраторы',    description: 'Одно- и двухканальные регистраторы с GPS' },
      { id: 'radar',      name: 'Радар-детекторы',      description: 'Гибриды с GPS-базой и встроенным регистратором' },
      { id: 'navigation', name: 'Навигаторы',           description: 'GPS-навигаторы с картами России и СНГ' },
      { id: 'parking',    name: 'Парктроники и камеры', description: 'Датчики парковки, камеры заднего вида' },
      { id: 'audio',      name: 'Автозвук',             description: 'Магнитолы, акустика, усилители, сабвуферы' },
      { id: 'alarm',      name: 'Сигнализации',         description: 'GSM-сигнализации, иммобилайзеры, замки' },
    ],
  },
  {
    id: 'batteries', name: 'АКБ и аксессуары',
    description: 'Автомобильные аккумуляторы и сопутствующие аксессуары', icon: 'BatteryFull',
    subs: [
      { id: 'lead-acid',      name: 'Свинцово-кислотные АКБ',  description: 'Классические аккумуляторы для большинства авто' },
      { id: 'agm',            name: 'AGM аккумуляторы',        description: 'Необслуживаемые AGM для авто с системой Start-Stop' },
      { id: 'gel',            name: 'Гелевые АКБ',             description: 'Высокотехнологичные гелевые для премиум-класса' },
      { id: 'chargers',       name: 'Зарядные устройства',     description: 'Зарядники, пуско-зарядные устройства, десульфаторы' },
      { id: 'battery-access', name: 'Аксессуары для АКБ',      description: 'Клеммы, провода прикуривания, держатели' },
    ],
  },
  {
    id: 'accessories', name: 'Аксессуары',
    description: 'Полезные аксессуары для комфорта и удобства в дороге', icon: 'Star',
    subs: [
      { id: 'interior-access', name: 'Аксессуары для салона',  description: 'Коврики, чехлы, органайзеры, подстаканники' },
      { id: 'exterior-access', name: 'Аксессуары для кузова',  description: 'Брызговики, дефлекторы, молдинги, накладки' },
      { id: 'roof-cargo',      name: 'Багажники и боксы',      description: 'Рейлинги, поперечины, боксы на крышу' },
      { id: 'trailer',         name: 'Фаркопы и прицепы',      description: 'Прицепные устройства, фаркопы, электрика' },
      { id: 'comfort',         name: 'Комфорт в дороге',       description: 'Подушки, подголовники, компрессоры, фонари' },
    ],
  },
  {
    id: 'tuning', name: 'Декор и тюнинг',
    description: 'Улучшение внешнего вида и характеристик автомобиля', icon: 'Paintbrush',
    subs: [
      { id: 'body-kits',       name: 'Обвесы и спойлеры',   description: 'Спойлеры, обвесы, накладки и аэродинамические элементы' },
      { id: 'stickers',        name: 'Наклейки и плёнки',   description: 'Виниловые плёнки, наклейки, молдинги' },
      { id: 'lighting',        name: 'Светотехника тюнинг', description: 'LED фары, DRL, подсветка днища и арок' },
      { id: 'engine-tuning',   name: 'Тюнинг двигателя',    description: 'Чип-тюнинг, турбо-комплекты, спортвыхлоп' },
      { id: 'interior-tuning', name: 'Тюнинг салона',       description: 'Спортивные руль, педали, рычаг КПП, накладки' },
    ],
  },
  {
    id: 'tools', name: 'Инструмент',
    description: 'Профессиональные инструменты для ремонта и обслуживания', icon: 'Wrench',
    subs: [
      { id: 'hand-tools',    name: 'Ручной инструмент',            description: 'Ключи, отвёртки, плоскогубцы, наборы инструментов' },
      { id: 'power-tools',   name: 'Электроинструмент',            description: 'Дрели, шуруповёрты, болгарки, компрессоры' },
      { id: 'jacks',         name: 'Домкраты и опоры',             description: 'Подкатные, бутылочные домкраты и опоры' },
      { id: 'diagnostic',    name: 'Диагностическое оборудование', description: 'OBD2-сканеры, тестеры, осциллоскопы' },
      { id: 'special-tools', name: 'Спецоборудование',             description: 'Съёмники, приспособления для конкретных узлов' },
    ],
  },
  {
    id: 'fasteners', name: 'Крепеж, метизы',
    description: 'Болты, гайки, шпильки и другие крепёжные элементы', icon: 'Bolt',
    subs: [
      { id: 'bolts-nuts',      name: 'Болты и гайки',      description: 'Болты, гайки, шайбы различных размеров и категорий' },
      { id: 'wheel-bolts',     name: 'Колёсный крепеж',    description: 'Болты и гайки для колёс, секреты, ключи' },
      { id: 'studs',           name: 'Шпильки и штифты',   description: 'Резьбовые шпильки, штифты, анкеры' },
      { id: 'clamps',          name: 'Хомуты и зажимы',    description: 'Червячные, ленточные хомуты, стяжки' },
      { id: 'clips-retainers', name: 'Клипсы и фиксаторы', description: 'Пластиковые клипсы, ретейнеры, накладки' },
    ],
  },
  {
    id: 'oil', name: 'Масла, смазки и жидкости',
    description: 'Моторные, трансмиссионные масла и технические жидкости', icon: 'Gauge',
    subs: [
      { id: 'engine-oil',       name: 'Моторные масла',         description: 'Синтетика, полусинтетика и минеральные масла' },
      { id: 'transmission-oil', name: 'Трансмиссионные масла',  description: 'Масла для МКПП, АКПП и раздаточных коробок' },
      { id: 'greases',          name: 'Смазки',                 description: 'Литол, Шрус, графитовая и высокотемпературная смазки' },
      { id: 'antifreeze',       name: 'Антифриз и тосол',       description: 'Охлаждающие жидкости G11, G12, G13' },
      { id: 'brake-fluid',      name: 'Тормозная жидкость',     description: 'DOT3, DOT4, DOT5.1 для любых тормозных систем' },
    ],
  },
  {
    id: 'filters', name: 'Фильтры для авто',
    description: 'Воздушные, масляные, топливные и салонные фильтры', icon: 'Filter',
    subs: [
      { id: 'air-filter',       name: 'Воздушные фильтры',  description: 'Фильтры очистки воздуха для двигателя' },
      { id: 'oil-filter',       name: 'Масляные фильтры',   description: 'Фильтры очистки моторного масла' },
      { id: 'fuel-filter',      name: 'Топливные фильтры',  description: 'Фильтры грубой и тонкой очистки топлива' },
      { id: 'cabin-filter',     name: 'Салонные фильтры',   description: 'Фильтры пыльцы и угольные фильтры' },
      { id: 'hydraulic-filter', name: 'Гидравлические',     description: 'Фильтры для ГУР и гидравлических систем' },
    ],
  },
  {
    id: 'wheels', name: 'Шины, диски',
    description: 'Летние, зимние шины и диски различных производителей', icon: 'Circle',
    subs: [
      { id: 'summer-tires',   name: 'Летние шины',         description: 'Летние шины ведущих мировых производителей' },
      { id: 'winter-tires',   name: 'Зимние шины',         description: 'Шипованные и нешипованные зимние шины' },
      { id: 'allseason-tires',name: 'Всесезонные шины',    description: 'Универсальные шины для любой погоды' },
      { id: 'alloy-wheels',   name: 'Литые диски',         description: 'Легкосплавные диски R15–R22' },
      { id: 'steel-wheels',   name: 'Штампованные диски',  description: 'Стальные штампованные диски R13–R18' },
      { id: 'wheel-caps',     name: 'Колпаки и крышки',    description: 'Декоративные колпаки, крышки ступиц, нипели' },
    ],
  },
  {
    id: 'wipers', name: 'Щётки стеклоочистителя',
    description: 'Бескаркасные и каркасные щётки для любого автомобиля', icon: 'Minus',
    subs: [
      { id: 'frameless-wipers', name: 'Бескаркасные щётки', description: 'Современные аэродинамические бескаркасные щётки' },
      { id: 'framed-wipers',    name: 'Каркасные щётки',    description: 'Классические каркасные щётки для всех сезонов' },
      { id: 'rear-wipers',      name: 'Задние щётки',       description: 'Щётки для заднего стекла' },
      { id: 'wiper-blades',     name: 'Резинки для щёток',  description: 'Сменные резиновые элементы для любых щёток' },
    ],
  },
  {
    id: 'electrical', name: 'Электрооборудование',
    description: 'Лампы, реле, предохранители и проводка', icon: 'Zap',
    subs: [
      { id: 'bulbs',        name: 'Лампы',                 description: 'Галогенные, LED и ксеноновые лампы для фар и ПТФ' },
      { id: 'relays-fuses', name: 'Реле и предохранители', description: 'Реле, предохранители, блоки предохранителей' },
      { id: 'wiring',       name: 'Проводка и разъёмы',    description: 'Провода, колодки, клеммы и другая проводка' },
      { id: 'starters',     name: 'Стартеры и генераторы', description: 'Стартеры, генераторы, регуляторы напряжения' },
      { id: 'sensors',      name: 'Датчики и катушки',     description: 'Датчики АБС, кислорода, давления, катушки зажигания' },
    ],
  },
];

const brands = ['Bosch', 'Valeo', 'NGK', 'Denso', 'Brembo', 'TRW', 'Lemforder', 'Sachs', 'KYB', 'Mann-Filter', 'Mahle', 'Febi', 'Ruville', 'SKF', 'Gates', 'Contitech', 'Mobil', 'Castrol', 'Motul', 'Shell'];

const carModels = [
  'Toyota Camry XV70 2018-2024',
  'Toyota Corolla E210 2018-2024',
  'Toyota RAV4 XA50 2018-2024',
  'Kia Rio IV 2017-2022',
  'Hyundai Solaris II 2017-2022',
  'Hyundai Creta I 2016-2021',
  'Volkswagen Polo V 2010-2020',
  'Volkswagen Tiguan II 2016-2024',
  'Skoda Octavia A8 2019-2024',
  'Skoda Rapid 2012-2020',
  'Renault Duster 2010-2021',
  'Lada Vesta 2015-2024',
  'Lada Granta 2011-2024',
  'Nissan Qashqai J11 2013-2021',
  'Mazda CX-5 KF 2017-2024',
  'Ford Focus III 2011-2019',
  'Honda CR-V V 2016-2022',
  'BMW 3 Series G20 2018-2024',
  'Mercedes-Benz E-Class W213 2016-2023',
  'Audi A4 B9 2015-2024',
  'Volvo XC90 II 2015-2024',
  'Porsche Cayenne III 2017-2024'
];

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomCars(min = 1, max = 5) {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...carModels].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateProducts() {
  const products = [];
  let idCounter = 1;

  for (const cat of categories) {
    for (const sub of cat.subs) {
      for (let i = 1; i <= 15; i++) {
        const brand = getRandomItem(brands);
        const price = Math.floor(Math.random() * 9500) + 500; 
        const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
        const isHit = Math.random() > 0.8;
        const isNew = Math.random() > 0.8;
        
        products.push({
          id: `prod-${sub.id}-${i}`,
          name: `${sub.name} ${brand} (Арт. ${idCounter})`,
          price: price,
          brand: brand,
          categoryId: cat.id,
          subcategoryId: sub.id,
          article: `${brand.substring(0,3).toUpperCase()}-${1000 + idCounter}`,
          rating: parseFloat(rating),
          reviewCount: Math.floor(Math.random() * 50),
          isHit: isHit,
          isNew: isNew,
          description: `Оригинальный высококачественный товар "${sub.name}" от надежного производителя ${brand}. Идеально подходит для ремонта и обслуживания вашего автомобиля. Обеспечивает долговечность и безопасность.`,
          specifications: JSON.stringify({
            "Производитель": brand,
            "Вес": `${(Math.random() * 5 + 0.1).toFixed(1)} кг`,
            "Гарантия": Math.random() > 0.5 ? "1 год" : "2 года",
            "Страна производства": getRandomItem(["Германия", "Япония", "Китай", "Корея", "Тайвань", "Польша", "Чехия", "Россия"])
          }),
          compatibleCars: getRandomCars(1, 6)
        });
        idCounter++;
      }
    }
  }
  return products;
}

const generatedProducts = generateProducts();

async function seedFull() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    
    console.log('📂 Заполнение категорий и подкатегорий...');
    for (const cat of categories) {
      await client.query(
        `INSERT INTO categories (id, name, description, icon)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (id) DO UPDATE SET name=$2, description=$3, icon=$4`,
        [cat.id, cat.name, cat.description, cat.icon]
      );

      for (const sub of cat.subs) {
        await client.query(
          `INSERT INTO subcategories (id, category_id, name, description)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (id) DO UPDATE SET name=$3, description=$4`,
          [sub.id, cat.id, sub.name, sub.description]
        );
      }
    }
    console.log(`  ✅ ${categories.length} категорий добавлены`);

    
    console.log(`📦 Заполнение товаров (${generatedProducts.length} шт.)...`);
    let count = 0;
    for (const p of generatedProducts) {
      await client.query(
        `INSERT INTO products
          (id, name, description, price, brand, in_stock,
           category_id, subcategory_id, article, rating, review_count,
           is_hit, is_new, specifications, compatible_cars)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
         ON CONFLICT (id) DO UPDATE SET
           name=$2, description=$3, price=$4, brand=$5,
           specifications=$14, compatible_cars=$15`,
        [
          p.id, p.name, p.description, p.price, p.brand, true,
          p.categoryId, p.subcategoryId, p.article,
          p.rating, p.reviewCount, p.isHit, p.isNew,
          p.specifications, p.compatibleCars
        ]
      );
      count++;
      if (count % 200 === 0) {
        console.log(`  ... добавлено ${count} товаров`);
      }
    }
    console.log(`  ✅ ${generatedProducts.length} товаров успешно добавлены`);

    await client.query('COMMIT');
    console.log('\n🎉 Расширенный Seed выполнен успешно!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Ошибка при seed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seedFull();
