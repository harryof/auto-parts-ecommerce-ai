/**
 * Seed-скрипт: заполняет базу данных начальными данными.
 * По одному товару в каждой подкатегории — это только шаблон.
 * Дальнейшее наполнение делается через pgAdmin, DBeaver или SQL-запросы (см. README.md).
 */

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

// ─────────────────────────────────────────────────────────────
// КАТЕГОРИИ И ПОДКАТЕГОРИИ
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// ТОВАРЫ — по одному на каждую подкатегорию (шаблон)
// ─────────────────────────────────────────────────────────────
const products = [
  // spare-parts
  { id: 'sample-engine-parts-001',  name: 'Поршневой комплект (образец)',      price: 15000, brand: 'Mahle',       categoryId: 'spare-parts',     subcategoryId: 'engine-parts',   article: 'MHL-001', rating: 4.5, reviewCount: 0, isHit: true,  description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-body-parts-001',    name: 'Крыло переднее левое (образец)',    price: 8000,  brand: 'Bodyline',    categoryId: 'spare-parts',     subcategoryId: 'body-parts',     article: 'BL-001',  rating: 4.0, reviewCount: 0, isNew: true,  description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-washer-001',        name: 'Бачок омывателя (образец)',         price: 1200,  brand: 'Bosch',       categoryId: 'spare-parts',     subcategoryId: 'washer',         article: 'BSH-WS1', rating: 4.2, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-hvac-001',          name: 'Радиатор отопителя (образец)',      price: 5500,  brand: 'Valeo',       categoryId: 'spare-parts',     subcategoryId: 'hvac',           article: 'VL-H001', rating: 4.3, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-suspension-001',    name: 'Амортизатор передний (образец)',    price: 7000,  brand: 'Bilstein',    categoryId: 'spare-parts',     subcategoryId: 'suspension',     article: 'BLS-001', rating: 4.7, reviewCount: 0, isHit: true,  description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-bearings-001',      name: 'Ступичный подшипник (образец)',     price: 2500,  brand: 'SKF',         categoryId: 'spare-parts',     subcategoryId: 'bearings',       article: 'SKF-001', rating: 4.6, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-gaskets-001',       name: 'Прокладка ГБЦ (образец)',          price: 3200,  brand: 'Victor Reinz',categoryId: 'spare-parts',     subcategoryId: 'gaskets',        article: 'VR-001',  rating: 4.4, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-steering-001',      name: 'Рулевая тяга (образец)',            price: 4500,  brand: 'Lemforder',   categoryId: 'spare-parts',     subcategoryId: 'steering',       article: 'LF-001',  rating: 4.5, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-interior-001',      name: 'Ручка двери внутренняя (образец)', price: 900,   brand: 'AutoParts',   categoryId: 'spare-parts',     subcategoryId: 'interior-parts', article: 'AP-001',  rating: 4.1, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-exhaust-001',       name: 'Глушитель задний (образец)',        price: 6000,  brand: 'Bosal',       categoryId: 'spare-parts',     subcategoryId: 'exhaust',        article: 'BS-E001', rating: 4.3, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-brake-001',         name: 'Тормозные колодки передние (образец)', price: 3500, brand: 'Brembo',  categoryId: 'spare-parts',     subcategoryId: 'brake-system',   article: 'BRM-001', rating: 4.8, reviewCount: 0, isHit: true, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-transmission-001',  name: 'Комплект сцепления (образец)',      price: 12000, brand: 'LuK',         categoryId: 'spare-parts',     subcategoryId: 'transmission',   article: 'LUK-001', rating: 4.5, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-cooling-001',       name: 'Радиатор охлаждения (образец)',     price: 9000,  brand: 'NRF',         categoryId: 'spare-parts',     subcategoryId: 'cooling',        article: 'NRF-001', rating: 4.4, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-fuel-001',          name: 'Топливный насос (образец)',         price: 5000,  brand: 'Pierburg',    categoryId: 'spare-parts',     subcategoryId: 'fuel-system',    article: 'PB-001',  rating: 4.3, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },

  // auto-chemistry
  { id: 'sample-car-care-001',      name: 'Автошампунь концентрат (образец)', price: 800,  brand: 'Koch Chemie', categoryId: 'auto-chemistry', subcategoryId: 'car-care',      article: 'KC-001',  rating: 4.7, reviewCount: 0, isNew: true, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-interior-care-001', name: 'Очиститель салона (образец)',      price: 600,  brand: 'GYEON',       categoryId: 'auto-chemistry', subcategoryId: 'interior-care', article: 'GY-001',  rating: 4.5, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-glass-care-001',    name: 'Незамерзающая жидкость (образец)', price: 400,  brand: 'Felix',       categoryId: 'auto-chemistry', subcategoryId: 'glass-care',    article: 'FLX-001', rating: 4.2, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-tech-fluids-001',   name: 'Антифриз G12 (образец)',           price: 500,  brand: 'Mannol',      categoryId: 'auto-chemistry', subcategoryId: 'tech-fluids',   article: 'MN-001',  rating: 4.4, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-degreasers-001',    name: 'Очиститель тормозов (образец)',    price: 450,  brand: 'Liqui Moly',  categoryId: 'auto-chemistry', subcategoryId: 'degreasers',    article: 'LM-001',  rating: 4.6, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },

  // autoelectronics
  { id: 'sample-dashcam-001',   name: 'Видеорегистратор 4K (образец)',  price: 8000, brand: 'Navitel',  categoryId: 'autoelectronics', subcategoryId: 'dashcam',    article: 'NV-001', rating: 4.5, reviewCount: 0, isNew: true, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-radar-001',     name: 'Радар-детектор (образец)',       price: 6500, brand: 'Escort',   categoryId: 'autoelectronics', subcategoryId: 'radar',      article: 'ES-001', rating: 4.3, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-navigation-001',name: 'GPS-навигатор (образец)',        price: 5000, brand: 'Garmin',   categoryId: 'autoelectronics', subcategoryId: 'navigation', article: 'GR-001', rating: 4.4, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-parking-001',   name: 'Камера заднего вида (образец)', price: 2500, brand: 'ParkMaster',categoryId: 'autoelectronics', subcategoryId: 'parking',    article: 'PM-001', rating: 4.2, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-audio-001',     name: 'Автомагнитола 2DIN (образец)',  price: 7000, brand: 'Pioneer',  categoryId: 'autoelectronics', subcategoryId: 'audio',      article: 'PNR-001',rating: 4.6, reviewCount: 0, isHit: true, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-alarm-001',     name: 'Сигнализация GSM (образец)',    price: 9000, brand: 'StarLine', categoryId: 'autoelectronics', subcategoryId: 'alarm',      article: 'SL-001', rating: 4.8, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },

  // batteries
  { id: 'sample-lead-acid-001',  name: 'Аккумулятор 60 Ач (образец)',          price: 5500, brand: 'Varta',     categoryId: 'batteries', subcategoryId: 'lead-acid',      article: 'VRT-001', rating: 4.6, reviewCount: 0, isHit: true, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-agm-001',        name: 'AGM аккумулятор 70 Ач (образец)',      price: 9000, brand: 'Exide',     categoryId: 'batteries', subcategoryId: 'agm',            article: 'EX-001',  rating: 4.7, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-gel-001',        name: 'Гелевый аккумулятор 80 Ач (образец)', price: 12000,brand: 'Optima',    categoryId: 'batteries', subcategoryId: 'gel',            article: 'OPT-001', rating: 4.9, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-chargers-001',   name: 'Зарядное устройство (образец)',        price: 3000, brand: 'Ctek',      categoryId: 'batteries', subcategoryId: 'chargers',       article: 'CTK-001', rating: 4.8, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-batt-acc-001',   name: 'Клеммы для АКБ (образец)',             price: 300,  brand: 'AutoProfi', categoryId: 'batteries', subcategoryId: 'battery-access', article: 'AP-K001', rating: 4.0, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },

  // accessories
  { id: 'sample-int-acc-001',  name: 'Коврики в салон (образец)',    price: 2500, brand: '3D Mats',  categoryId: 'accessories', subcategoryId: 'interior-access', article: '3DM-001', rating: 4.5, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-ext-acc-001',  name: 'Брызговики (образец)',         price: 800,  brand: 'Rival',    categoryId: 'accessories', subcategoryId: 'exterior-access', article: 'RVL-001', rating: 4.3, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-roof-001',     name: 'Бокс на крышу 450л (образец)',price: 18000,brand: 'Thule',    categoryId: 'accessories', subcategoryId: 'roof-cargo',      article: 'TH-001',  rating: 4.7, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-trailer-001',  name: 'Фаркоп съёмный (образец)',    price: 8000, brand: 'Berg',     categoryId: 'accessories', subcategoryId: 'trailer',         article: 'BRG-001', rating: 4.4, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-comfort-001',  name: 'Компрессор автомобильный (образец)', price: 1500, brand: 'Berkut', categoryId: 'accessories', subcategoryId: 'comfort',     article: 'BK-001',  rating: 4.6, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },

  // tuning
  { id: 'sample-body-kit-001',   name: 'Спойлер универсальный (образец)',  price: 5000, brand: 'TuneMax', categoryId: 'tuning', subcategoryId: 'body-kits',       article: 'TM-001', rating: 4.2, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-stickers-001',   name: 'Виниловая плёнка матовая (образец)',price: 1200,brand: 'KPMF',    categoryId: 'tuning', subcategoryId: 'stickers',        article: 'KP-001', rating: 4.0, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-lighting-001',   name: 'LED дневные ходовые огни (образец)',price: 3000,brand: 'Philips', categoryId: 'tuning', subcategoryId: 'lighting',        article: 'PH-001', rating: 4.5, reviewCount: 0, isNew: true, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-eng-tuning-001', name: 'Спортивный воздушный фильтр (образец)',price:2500,brand:'K&N',   categoryId: 'tuning', subcategoryId: 'engine-tuning',   article: 'KN-001', rating: 4.6, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-int-tuning-001', name: 'Спортивное рулевое колесо (образец)',price:4500,band:'Sparco',   categoryId: 'tuning', subcategoryId: 'interior-tuning', article: 'SP-001', rating: 4.3, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },

  // tools
  { id: 'sample-hand-tools-001',  name: 'Набор ключей 24 предмета (образец)',    price: 3500, brand: 'Kraftool', categoryId: 'tools', subcategoryId: 'hand-tools',    article: 'KT-001', rating: 4.6, reviewCount: 0, isHit: true, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-power-tools-001', name: 'Шуруповёрт аккумуляторный (образец)',  price: 5000, brand: 'DeWalt',   categoryId: 'tools', subcategoryId: 'power-tools',   article: 'DW-001', rating: 4.8, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-jacks-001',       name: 'Домкрат подкатной 2т (образец)',       price: 4200, brand: 'Stels',    categoryId: 'tools', subcategoryId: 'jacks',         article: 'ST-001', rating: 4.4, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-diagnostic-001',  name: 'OBD2 сканер (образец)',                price: 2000, brand: 'Launch',   categoryId: 'tools', subcategoryId: 'diagnostic',    article: 'LAU-001',rating: 4.7, reviewCount: 0, isNew: true, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-special-001',     name: 'Съёмник шаровых опор (образец)',       price: 1500, brand: 'Car-Tool', categoryId: 'tools', subcategoryId: 'special-tools', article: 'CT-001', rating: 4.3, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },

  // fasteners
  { id: 'sample-bolts-001',   name: 'Набор болтов M10 (образец)',      price: 350, brand: 'Wurth',    categoryId: 'fasteners', subcategoryId: 'bolts-nuts',      article: 'WU-001', rating: 4.2, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-wbolts-001',  name: 'Болты колёсные M12x1.5 (образец)',price: 800, brand: 'H&R',      categoryId: 'fasteners', subcategoryId: 'wheel-bolts',     article: 'HR-001', rating: 4.5, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-studs-001',   name: 'Шпильки M8 упаковка 20шт (образец)',price:400,brand: 'Wurth',   categoryId: 'fasteners', subcategoryId: 'studs',           article: 'WU-002', rating: 4.1, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-clamps-001',  name: 'Хомуты червячные набор (образец)', price: 250,brand: 'Норм',    categoryId: 'fasteners', subcategoryId: 'clamps',          article: 'NR-001', rating: 4.0, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-clips-001',   name: 'Пластиковые клипсы 100шт (образец)',price:300,brand: 'AutoFix', categoryId: 'fasteners', subcategoryId: 'clips-retainers', article: 'AF-001', rating: 4.0, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },

  // oil
  { id: 'sample-engine-oil-001',  name: 'Масло моторное 5W-30 4л (образец)',       price: 2200, brand: 'Castrol',    categoryId: 'oil', subcategoryId: 'engine-oil',       article: 'CS-001', rating: 4.8, reviewCount: 0, isHit: true, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-trans-oil-001',   name: 'Масло трансмиссионное 75W-90 (образец)',  price: 800,  brand: 'Liqui Moly', categoryId: 'oil', subcategoryId: 'transmission-oil', article: 'LQ-001', rating: 4.6, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-grease-001',      name: 'Смазка ШРУС-4 400г (образец)',            price: 350,  brand: 'Литол',      categoryId: 'oil', subcategoryId: 'greases',          article: 'LT-001', rating: 4.3, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-antifreeze-001',  name: 'Антифриз G12+ 5л (образец)',              price: 700,  brand: 'Felix',      categoryId: 'oil', subcategoryId: 'antifreeze',       article: 'FX-001', rating: 4.4, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-brake-fluid-001', name: 'Тормозная жидкость DOT4 500мл (образец)', price: 400,  brand: 'Sintec',     categoryId: 'oil', subcategoryId: 'brake-fluid',      article: 'SN-001', rating: 4.5, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },

  // filters
  { id: 'sample-air-f-001',  name: 'Фильтр воздушный (образец)',   price: 900,  brand: 'Mann',  categoryId: 'filters', subcategoryId: 'air-filter',       article: 'MN-AF1', rating: 4.5, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-oil-f-001',  name: 'Фильтр масляный (образец)',    price: 500,  brand: 'Bosch', categoryId: 'filters', subcategoryId: 'oil-filter',       article: 'BS-OF1', rating: 4.6, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-fuel-f-001', name: 'Фильтр топливный (образец)',   price: 700,  brand: 'Mann',  categoryId: 'filters', subcategoryId: 'fuel-filter',      article: 'MN-FF1', rating: 4.4, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-cabin-f-001',name: 'Фильтр салонный угольный (образец)',price:600,brand:'Filtron',categoryId: 'filters', subcategoryId: 'cabin-filter',    article: 'FLT-01', rating: 4.3, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-hydr-f-001', name: 'Фильтр гидравлический ГУР (образец)',price:400,brand:'Hengst',categoryId: 'filters', subcategoryId: 'hydraulic-filter',article: 'HG-001', rating: 4.2, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },

  // wheels
  { id: 'sample-summer-001',   name: 'Шина летняя 205/55 R16 (образец)',      price: 4500, brand: 'Michelin',  categoryId: 'wheels', subcategoryId: 'summer-tires',   article: 'MC-001', rating: 4.7, reviewCount: 0, isHit: true, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-winter-001',   name: 'Шина зимняя шипованная (образец)',      price: 5200, brand: 'Nokian',    categoryId: 'wheels', subcategoryId: 'winter-tires',   article: 'NK-001', rating: 4.8, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-allseas-001',  name: 'Шина всесезонная 205/55 R16 (образец)',price: 4800, brand: 'Continental',categoryId: 'wheels', subcategoryId: 'allseason-tires',article: 'CN-001', rating: 4.5, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-alloy-001',    name: 'Диск литой R17 (образец)',              price: 7000, brand: 'OZ',        categoryId: 'wheels', subcategoryId: 'alloy-wheels',   article: 'OZ-001', rating: 4.6, reviewCount: 0, isNew: true, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-steel-001',    name: 'Диск штампованный R15 (образец)',       price: 2500, brand: 'Mefro',     categoryId: 'wheels', subcategoryId: 'steel-wheels',   article: 'MF-001', rating: 4.0, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-caps-001',     name: 'Колпаки колёсные R15 (образец)',        price: 1200, brand: 'Autoprofi', categoryId: 'wheels', subcategoryId: 'wheel-caps',     article: 'AU-001', rating: 3.9, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },

  // wipers
  { id: 'sample-frameless-001',name: 'Щётка бескаркасная 650мм (образец)', price: 700, brand: 'Bosch',   categoryId: 'wipers', subcategoryId: 'frameless-wipers', article: 'BS-W1', rating: 4.5, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-framed-001',   name: 'Щётка каркасная 530мм (образец)',    price: 400, brand: 'Valeo',   categoryId: 'wipers', subcategoryId: 'framed-wipers',    article: 'VL-W1', rating: 4.2, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-rear-001',     name: 'Щётка задняя 280мм (образец)',       price: 350, brand: 'Trico',   categoryId: 'wipers', subcategoryId: 'rear-wipers',      article: 'TC-W1', rating: 4.1, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-blades-001',   name: 'Резинка для щётки 600мм (образец)',  price: 150, brand: 'Alca',    categoryId: 'wipers', subcategoryId: 'wiper-blades',     article: 'AL-W1', rating: 4.0, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },

  // electrical
  { id: 'sample-bulbs-001',   name: 'Лампа H7 55W (образец)',             price: 250, brand: 'Osram',  categoryId: 'electrical', subcategoryId: 'bulbs',        article: 'OS-001', rating: 4.4, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-relays-001',  name: 'Реле поворотов (образец)',           price: 300, brand: 'Bosch',  categoryId: 'electrical', subcategoryId: 'relays-fuses', article: 'BS-R01', rating: 4.2, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-wiring-001',  name: 'Провод автомобильный 4мм² (образец)',price: 200, brand: 'КВТ',    categoryId: 'electrical', subcategoryId: 'wiring',       article: 'KVT-01', rating: 4.0, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-starters-001',name: 'Стартер восстановленный (образец)',  price: 5500,brand: 'AS-PL',  categoryId: 'electrical', subcategoryId: 'starters',    article: 'ASPL-1', rating: 4.5, reviewCount: 0, description: 'Образец товара. Замените на реальный.' },
  { id: 'sample-sensors-001', name: 'Датчик ABS передний (образец)',      price: 1200,brand: 'Bosch',  categoryId: 'electrical', subcategoryId: 'sensors',      article: 'BS-S01', rating: 4.6, reviewCount: 0, isNew: true, description: 'Образец товара. Замените на реальный.' },
];

// ─────────────────────────────────────────────────────────────
// ВЫПОЛНЕНИЕ
// ─────────────────────────────────────────────────────────────
async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // --- Категории
    console.log('📂 Заполнение категорий...');
    for (const cat of categories) {
      await client.query(
        `INSERT INTO categories (id, name, description, icon)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (id) DO UPDATE SET name=$2, description=$3, icon=$4`,
        [cat.id, cat.name, cat.description, cat.icon]
      );

      // --- Подкатегории
      for (const sub of cat.subs) {
        await client.query(
          `INSERT INTO subcategories (id, category_id, name, description)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (id) DO UPDATE SET name=$3, description=$4`,
          [sub.id, cat.id, sub.name, sub.description]
        );
      }
    }
    console.log(`  ✅ ${categories.length} категорий и подкатегорий добавлены`);

    // --- Товары
    console.log('📦 Заполнение товаров (образцы)...');
    for (const p of products) {
      await client.query(
        `INSERT INTO products
          (id, name, description, price, brand, in_stock,
           category_id, subcategory_id, article, rating, review_count,
           is_hit, is_new, is_recommended)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
         ON CONFLICT (id) DO UPDATE SET
           name=$2, description=$3, price=$4, brand=$5`,
        [
          p.id, p.name, p.description || '', p.price, p.brand || null, p.inStock !== false,
          p.categoryId, p.subcategoryId, p.article || null,
          p.rating || 0, p.reviewCount || 0,
          p.isHit || false, p.isNew || false, p.isRecommended || false,
        ]
      );
    }
    console.log(`  ✅ ${products.length} товаров добавлены`);

    await client.query('COMMIT');
    console.log('\n🎉 Seed выполнен успешно!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Ошибка при seed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
