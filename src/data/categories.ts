import zapchasti from "../img/запчасти.jpg";
import tuning from "../img/тюнинг.jpg";
import authohim from "../img/автохимия.jpg";
import accum from "../img/аккумуляторы.jpg";
import acsessuary from "../img/аксессуары.jpg";
import inst from "../img/инструменты.jpg";
import crep from "../img/крепеж.jpg";
import odezda from "../img/одежда.jpg";
import maslo from "../img/maslo.jpg";
import motor from "../img/motor.jpg";
import kpp from "../img/kpp.jpg";
import hodchast from "../img/hodchast.jpg";
import tormoza from "../img/tormoza.jpg";
import vneshtuning from "../img/vneshtuning.jpg";
import svet from "../img/svetotech.jpg";
import tuningmotor from "../img/tuningmotor.jpg";

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  subCategories: SubCategory[];
}

export const categories: Category[] = [
  {
    id: "spare-parts",
    name: "Запчасти",
    description:
      "Оригинальные и качественные запчасти для всех марок автомобилей",
    image: zapchasti,
    subCategories: [
      {
        id: "engine-parts",
        name: "Двигатель",
        description:
          "Поршни, кольца, вкладыши, клапаны и другие детали двигателя",
        image: motor,
      },
      {
        id: "transmission",
        name: "Коробка передач",
        description: "Комплектующие для МКПП и АКПП, сцепление, карданные валы",
        image: kpp,
      },
      {
        id: "suspension",
        name: "Ходовая часть",
        description:
          "Амортизаторы, пружины, рычаги, шаровые опоры и другие элементы подвески",
        image: hodchast,
      },
      {
        id: "brake-system",
        name: "Тормоза",
        description: "Тормозные колодки, диски, суппорты и тормозные шланги",
        image: tormoza,
      },
    ],
  },
  {
    id: "tuning",
    name: "Тюнинг",
    description:
      "Комплектующие для улучшения внешнего вида и характеристик автомобиля",
    image: tuning,
    subCategories: [
      {
        id: "body-kits",
        name: "Внешний тюнинг",
        description:
          "Спойлеры, обвесы, багажники на крышу и другие элементы внешнего тюнинга",
        image: vneshtuning,
      },
      {
        id: "lighting",
        name: "Светотехника",
        description:
          "LED фары, противотуманные фары, подсветка салона и другие элементы освещения",
        image: svet,
      },
      {
        id: "engine-tuning",
        name: "Тюнинг двигателя",
        description:
          "Чип-тюнинг, турбо-комплекты, выпускные системы и другие элементы для увеличения мощности",
        image: tuningmotor,
      },
    ],
  },
  {
    id: "auto-chemistry",
    name: "Автохимия и автокосметика",
    description: "Средства для ухода за автомобилем и его обслуживания",
    image: authohim,
    subCategories: [
      {
        id: "car-care",
        name: "Уход за кузовом",
        description: "Шампуни, полироли, воски и защитные покрытия для кузова",
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        id: "interior-care",
        name: "Уход за салоном",
        description:
          "Средства для чистки салона, освежители воздуха и другие аксессуары",
        image:
          "https://images.unsplash.com/photo-1555215695-300b0ca6ba4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        id: "technical-fluids",
        name: "Технические жидкости",
        description:
          "Тормозная жидкость, антифриз, жидкость ГУР и другие технические жидкости",
        image:
          "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
    ],
  },
  {
    id: "batteries",
    name: "Аккумуляторы",
    description: "Автомобильные аккумуляторы различных типов и производителей",
    image: accum,
    subCategories: [
      {
        id: "lead-acid",
        name: "Свинцовые аккумуляторы",
        description: "Классические аккумуляторы для большинства автомобилей",
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        id: "agm",
        name: "AGM аккумуляторы",
        description:
          "Современные необслуживаемые аккумуляторы с технологией AGM",
        image:
          "https://images.unsplash.com/photo-1555215695-300b0ca6ba4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        id: "gel",
        name: "Гелевые аккумуляторы",
        description:
          "Высокотехнологичные гелевые аккумуляторы для премиум-автомобилей",
        image:
          "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
    ],
  },
  {
    id: "accessories",
    name: "Аксессуары",
    description: "Полезные аксессуары для комфорта и безопасности",
    image: acsessuary,
    subCategories: [
      {
        id: "interior",
        name: "Аксессуары для салона",
        description:
          "Чехлы, коврики, органайзеры, подстаканники и другие аксессуары для салона",
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        id: "electronics",
        name: "Автоэлектроника",
        description:
          "Видеорегистраторы, радар-детекторы, навигаторы и другие электронные устройства",
        image:
          "https://images.unsplash.com/photo-1555215695-300b0ca6ba4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        id: "security",
        name: "Безопасность",
        description:
          "Сигнализации, иммобилайзеры, блокировки руля и другие средства защиты",
        image:
          "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
    ],
  },
  {
    id: "tools",
    name: "Инструменты",
    description: "Профессиональные инструменты для ремонта и обслуживания",
    image: inst,
    subCategories: [
      {
        id: "hand-tools",
        name: "Ручной инструмент",
        description:
          "Наборы ключей, отверток, пассатижей и другой ручной инструмент",
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        id: "diagnostic",
        name: "Диагностика",
        description:
          "Сканеры, тестеры, манометры и другое диагностическое оборудование",
        image:
          "https://images.unsplash.com/photo-1555215695-300b0ca6ba4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        id: "special-tools",
        name: "Спец. инструмент",
        description:
          "Специальные инструменты для ремонта конкретных узлов автомобиля",
        image:
          "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
    ],
  },
  {
    id: "wheels",
    name: "Колёсный крепеж и диски",
    description: "Диски, шины и крепежные элементы",
    image: crep,
    subCategories: [
      {
        id: "wheels",
        name: "Автомобильные диски",
        description:
          "Литые и штампованные диски различных размеров и производителей",
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        id: "tires",
        name: "Автомобильные шины",
        description:
          "Летние, зимние и всесезонные шины различных производителей",
        image:
          "https://images.unsplash.com/photo-1555215695-300b0ca6ba4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        id: "wheel-accessories",
        name: "Крепеж и аксессуары",
        description:
          "Болты, гайки, колпаки, балансировочные грузики и другие аксессуары",
        image:
          "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
    ],
  },
  {
    id: "clothing",
    name: "Одежда и атрибутика",
    description: "Одежда и аксессуары с символикой автомобильных брендов",
    image: odezda,
    subCategories: [
      {
        id: "clothes",
        name: "Одежда с логотипами",
        description:
          "Футболки, толстовки, куртки с логотипами автомобильных брендов",
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        id: "accessories",
        name: "Аксессуары с логотипами",
        description:
          "Бейсболки, сумки, рюкзаки, значки с символикой автомобильных брендов",
        image:
          "https://images.unsplash.com/photo-1555215695-300b0ca6ba4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        id: "gifts",
        name: "Автосувениры",
        description: "Модели автомобилей, кружки, брелоки и другие сувениры",
        image:
          "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
    ],
  },
  {
    id: "oil",
    name: "Масла и технические жидкости",
    description: "Моторные и трансмиссионные масла, технические жидкости",
    image: maslo,
    subCategories: [
      {
        id: "engine-oil",
        name: "Моторные масла",
        description:
          "Синтетические, полусинтетические и минеральные моторные масла",
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        id: "transmission-oil",
        name: "Трансмиссионные масла",
        description: "Масла для МКПП, АКПП и раздаточных коробок",
        image:
          "https://images.unsplash.com/photo-1555215695-300b0ca6ba4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        id: "special-fluids",
        name: "Технические жидкости",
        description:
          "Тормозная жидкость, антифриз, жидкость ГУР и другие специальные жидкости",
        image:
          "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
    ],
  },
];
