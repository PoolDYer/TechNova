import { Product, ProductCategory } from './types';




export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'ZenBook Pro Duo',
    category: ProductCategory.LAPTOP,
    price: 9499,
    description: 'La laptop definitiva para multitarea con doble pantalla 4K OLED.',
    specs: 'Intel Core i9, 32GB RAM, 1TB SSD, RTX 4060, Dual Screen OLED',
    image: '/images/zenbook-pro-duo.webp'
  },
  {
    id: '2',
    name: 'ThinkPad X1 Carbon',
    category: ProductCategory.LAPTOP,
    price: 7299,
    description: 'Ultraligera y resistente, ideal para ejecutivos y escritores que viajan.',
    specs: 'Intel Core i7, 16GB RAM, 512GB SSD, Intel Iris Xe, 1.1kg',
    image: '/images/ThinkPad X1 Carbon.webp'
  },
  {
    id: '3',
    name: 'Legion Pro 7i',
    category: ProductCategory.LAPTOP,
    price: 8999,
    description: 'Potencia pura para gaming y renderizado 3D pesado.',
    specs: 'Intel Core i9, 32GB RAM, 1TB SSD, RTX 4080, 240Hz Display',
    image: '/images/Legion Pro 7i.webp'
  },
  {
    id: '4',
    name: 'MacBook Air M3',
    category: ProductCategory.LAPTOP,
    price: 4499,
    description: 'Silenciosa, batería para todo el día. Perfecta para estudiantes de letras y humanidades.',
    specs: 'Apple M3 Chip, 8GB RAM, 256GB SSD, Fanless design',
    image: '/images/MacBook Air M3.webp'
  },
  {
    id: '5',
    name: 'GeForce RTX 4090',
    category: ProductCategory.COMPONENT,
    price: 8599,
    description: 'La tarjeta gráfica más potente para entrenamiento de IA y gaming 4K.',
    specs: '24GB GDDR6X, Ada Lovelace Architecture',
    image: '/images/GeForce RTX 4090.webp'
  },
  {
    id: '6',
    name: 'AMD Ryzen 9 7950X',
    category: ProductCategory.COMPONENT,
    price: 2399,
    description: 'Procesador tope de gama para compilación de código y simulaciones.',
    specs: '16 Cores, 32 Threads, up to 5.7GHz',
    image: 'images/AMD Ryzen 9 7950X.webp'
  },
  {
    id: '7',
    name: 'MX Master 3S',
    category: ProductCategory.ACCESSORY,
    price: 389,
    description: 'Mouse ergonómico de alta precisión, favorito de ingenieros y programadores.',
    specs: '8000 DPI, Quiet Clicks, MagSpeed Wheel',
    image: 'images/MX Master 3S.webp'
  },
  {
    id: '8',
    name: 'Keychron Q1 Pro',
    category: ProductCategory.ACCESSORY,
    price: 799,
    description: 'Teclado mecánico custom de aluminio. Experiencia de escritura premium.',
    specs: 'Wireless, QMK/VIA Support, Hot-swappable, RGB',
    image: 'images/Keychron Q1 Pro.webp'
  },
  {
    id: '9',
    name: 'Dell UltraSharp 32',
    category: ProductCategory.MONITOR,
    price: 3199,
    description: 'Monitor 6K con color preciso para diseñadores gráficos y editores.',
    specs: '32 inch, 6K Resolution, IPS Black Technology',
    image: 'images/Dell UltraSharp 32.webp'
  },
  {
    id: '10',
    name: 'Samsung Odyssey Neo G9',
    category: ProductCategory.MONITOR,
    price: 5499,
    description: 'Monitor curvo super ultrawide de 49 pulgadas para inmersión total.',
    specs: '49 inch, 240Hz, 1ms, Quantum Mini LED, 1000R Curvature',
    image: 'images/Samsung Odyssey Neo G9.webp'
  },
  {
    id: '11',
    name: 'Samsung 990 PRO 2TB',
    category: ProductCategory.COMPONENT,
    price: 899,
    description: 'Almacenamiento NVMe ultrarrápido, reduce tiempos de carga en juegos y SO.',
    specs: '2TB, PCIe 4.0 NVMe, Read speeds up to 7450 MB/s',
    image: 'images/Samsung 990 PRO 2TB.webp'
  },
  {
    id: '12',
    name: 'ASUS ROG Maximus Z790',
    category: ProductCategory.COMPONENT,
    price: 2899,
    description: 'Placa madre de gama entusiasta para overclocking extremo.',
    specs: 'LGA 1700, DDR5, PCIe 5.0, Wi-Fi 6E, AI Cooling',
    image: 'images/ASUS ROG Maximus Z790.webp'
  },
  {
    id: '13',
    name: 'Sony WH-1000XM5',
    category: ProductCategory.ACCESSORY,
    price: 1499,
    description: 'Auriculares con la mejor cancelación de ruido del mercado, ideales para oficina abierta.',
    specs: 'Noise Cancelling, 30hr Battery, LDAC, Crystal Clear Calls',
    image: 'images/Sony WH-1000XM5.webp'
  },
  {
    id: '14',
    name: 'G.SKILL Trident Z5 RGB',
    category: ProductCategory.COMPONENT,
    price: 759,
    description: 'Kit de memoria RAM DDR5 de alto rendimiento con estética gamer.',
    specs: '32GB (2x16GB), DDR5-6000MHz, CL30, RGB Lighting',
    image: 'images/G.SKILL Trident Z5 RGB.webp'
  },
  {
    id: '15',
    name: 'Logitech G Pro X Superlight 2',
    category: ProductCategory.ACCESSORY,
    price: 649,
    description: 'Mouse ultraligero para eSports, utilizado por profesionales.',
    specs: 'Sub-63g, HERO 2 Sensor, 2000Hz Polling Rate, Wireless',
    image: 'images/Logitech G Pro X Superlight 2.webp'
  },
  {
    id: '16',
    name: 'Corsair RM1000x Shift',
    category: ProductCategory.COMPONENT,
    price: 989,
    description: 'Fuente de poder modular con conectores laterales para fácil gestión de cables.',
    specs: '1000W, 80 Plus Gold, ATX 3.0 Compatible, Fully Modular',
    image: 'images/Corsair RM1000x Shift.webp'
  },
  {
    id: '17',
    name: 'Dell XPS 15',
    category: ProductCategory.LAPTOP,
    price: 8299,
    description: 'El equilibrio perfecto entre potencia y elegancia para creadores de contenido.',
    specs: 'Intel Core i7, 32GB RAM, RTX 4050, 3.5K OLED Touch',
    image: 'images/Dell XPS 15.webp'
  },
  {
    id: '18',
    name: 'LG UltraGear 27GR95QE',
    category: ProductCategory.MONITOR,
    price: 3499,
    description: 'Monitor OLED para gaming competitivo con tiempo de respuesta instantáneo.',
    specs: '27 inch, OLED, 240Hz, 0.03ms GtG, G-SYNC Compatible',
    image: 'images/LG UltraGear 27GR95QE.webp'
  },
  {
    id: '19',
    name: 'Lian Li O11 Dynamic Evo',
    category: ProductCategory.COMPONENT,
    price: 799,
    description: 'Gabinete versátil estilo pecera, el favorito para mostrar componentes.',
    specs: 'Mid-Tower, Dual Chamber, Reversible Mode, Tempered Glass',
    image: 'images/Lian Li O11 Dynamic Evo.webp'
  },
  {
    id: '20',
    name: 'Elgato Stream Deck MK.2',
    category: ProductCategory.ACCESSORY,
    price: 699,
    description: 'Controlador de estudio esencial para streamers y atajos de productividad.',
    specs: '15 LCD Keys, Customizable Icons, Drag & Drop Actions',
    image: 'images/Elgato Stream Deck MK.2.webp'
  },
  {
    id: '21',
    name: 'Wacom Intuos Pro M',
    category: ProductCategory.ACCESSORY,
    price: 1299,
    description: 'Tableta gráfica estándar de la industria para ilustradores digitales.',
    specs: '8192 Pressure Levels, Multi-touch, Bluetooth, 8 ExpressKeys',
    image: 'images/Wacom Intuos Pro M.webp'
  },
  {
    id: '22',
    name: 'Noctua NH-D15 chromax.black',
    category: ProductCategory.COMPONENT,
    price: 549,
    description: 'Disipador por aire legendario, rendimiento similar a refrigeración líquida.',
    specs: 'Dual Tower, 2x NF-A15 Fans, SecuFirm2 Mounting, All Black',
    image: 'images/Noctua NH-D15 chromax.black.webp'
  },
  {
    id: '23',
    name: 'Razer Blade 14',
    category: ProductCategory.LAPTOP,
    price: 9899,
    description: 'Laptop gaming ultra portátil con chasis de aluminio CNC.',
    specs: 'AMD Ryzen 9, RTX 4070, 16GB RAM, 1TB SSD, 14" QHD+ 240Hz',
    image: 'images/Razer Blade 14.webp'
  },
  {
    id: '24',
    name: 'Blue Yeti X',
    category: ProductCategory.ACCESSORY,
    price: 729,
    description: 'Micrófono USB profesional para podcasting, streaming y llamadas.',
    specs: '4-Capsule Array, LED Metering, Blue VO!CE Effects, USB',
    image: 'images/Blue Yeti X.webp'
  },
  {
    id: '25',
    name: 'BenQ PD3220U',
    category: ProductCategory.MONITOR,
    price: 4199,
    description: 'Monitor profesional para Mac, calibrado para precisión de color.',
    specs: '32 inch, 4K UHD, Thunderbolt 3, 100% sRGB, AQCOLOR',
    image: 'images/BenQ PD3220U.webp'
  },
  {
    id: '26',
    name: 'Logitech Brio 4K',
    category: ProductCategory.ACCESSORY,
    price: 899,
    description: 'Webcam de ultra alta definición con soporte HDR para videoconferencias.',
    specs: '4K Ultra HD, HDR, RightLight 3, Noise-canceling mics',
    image: 'images/Logitech Brio 4K.webp'
  },
  {
    id: '27',
    name: 'NZXT Kraken Elite 360',
    category: ProductCategory.COMPONENT,
    price: 1199,
    description: 'Refrigeración líquida AIO con pantalla LCD personalizable para monitoreo.',
    specs: '360mm Radiator, 2.36" LCD Screen, F120P Static Pressure Fans',
    image: 'images/NZXT Kraken Elite 360.webp'
  },
  {
    id: '28',
    name: 'Microsoft Surface Pro 9',
    category: ProductCategory.LAPTOP,
    price: 5999,
    description: 'La versatilidad de una tablet con la potencia de una laptop. Ideal para movilidad.',
    specs: 'Intel Evo i7, 16GB RAM, 256GB SSD, 13" PixelSense Flow 120Hz',
    image: 'images/Microsoft Surface Pro 9.webp'
  },
  {
    id: '29',
    name: 'ASUS ROG Rapture GT-AX11000',
    category: ProductCategory.ACCESSORY,
    price: 1899,
    description: 'Router gaming Wi-Fi 6 de tres bandas para una red sin latencia.',
    specs: 'Wi-Fi 6, Tri-Band, 2.5G Port, Aura RGB, AiMesh Compatible',
    image: 'images/ASUS ROG Rapture GT-AX11000.webp'
  },
  {
    id: '30',
    name: 'WD_BLACK SN850X 4TB',
    category: ProductCategory.COMPONENT,
    price: 1599,
    description: 'Almacenamiento masivo de alto rendimiento para bibliotecas de juegos extensas.',
    specs: '4TB, PCIe Gen4 NVMe, Game Mode 2.0, Up to 7300 MB/s',
    image: 'images/WD_BLACK SN850X 4TB.webp'
  },
  {
    id: '31',
    name: 'MSI Raider GE78 HX',
    category: ProductCategory.LAPTOP,
    price: 11299,
    description: 'Rendimiento de escritorio en un chasis portátil con iluminación RGB matricial.',
    specs: 'Intel Core i9-13980HX, RTX 4090 Laptop, 64GB RAM, 2TB SSD, 240Hz QHD+',
    image: 'images/MSI Raider GE78 HX.webp'
  },
  {
    id: '32',
    name: 'Intel Core i5-13600K',
    category: ProductCategory.COMPONENT,
    price: 1399,
    description: 'El rey de la gama media, ideal para gaming y productividad balanceada.',
    specs: '14 Cores (6P+8E), 20 Threads, up to 5.1GHz, Unlocked',
    image: 'images/Intel Core i5-13600K.webp'
  },
  {
    id: '33',
    name: 'Alienware AW3423DWF',
    category: ProductCategory.MONITOR,
    price: 3999,
    description: 'Monitor Ultrawide QD-OLED. Negros perfectos y colores vibrantes sin igual.',
    specs: '34 inch, QD-OLED, 165Hz, 0.1ms, 1800R Curve, True Black 400',
    image: 'images/Alienware AW3423DWF.webp'
  },
  {
    id: '34',
    name: 'Hyte Y60 Red',
    category: ProductCategory.COMPONENT,
    price: 899,
    description: 'Gabinete panorámico de 3 piezas de vidrio, diseñado para exhibir tu GPU verticalmente.',
    specs: 'ATX Case, Panoramic Glass, Vertical GPU Mount Included, PCIe 4.0 Riser',
    image: 'images/Hyte Y60 Red.webp'
  },
  {
    id: '35',
    name: 'Rode PodMic',
    category: ProductCategory.ACCESSORY,
    price: 459,
    description: 'Micrófono dinámico con calidad de transmisión, construido como un tanque.',
    specs: 'Dynamic Capsule, Cardioid Pattern, Integrated Pop Filter, XLR',
    image: 'images/Rode PodMic.webp'
  },
  {
    id: '36',
    name: 'MacBook Pro 16 M3 Max',
    category: ProductCategory.LAPTOP,
    price: 12499,
    description: 'La herramienta definitiva para profesionales del video y desarrolladores de software.',
    specs: 'M3 Max (16-core CPU, 40-core GPU), 48GB RAM, 1TB SSD, Liquid Retina XDR',
    image: 'images/MacBook Pro 16 M3 Max.webp'
  },
  {
    id: '37',
    name: 'Gigabyte B650 AORUS ELITE',
    category: ProductCategory.COMPONENT,
    price: 949,
    description: 'Placa base sólida para la plataforma AM5 de AMD con excelente disipación térmica.',
    specs: 'Socket AM5, DDR5, PCIe 5.0 M.2, 2.5GbE LAN, Wi-Fi 6E',
    image: 'images/Gigabyte B650 AORUS ELITE.webp'
  },
  {
    id: '38',
    name: 'Xbox Elite Wireless Controller 2',
    category: ProductCategory.ACCESSORY,
    price: 749,
    description: 'El control más avanzado del mundo, con palancas de tensión ajustable y componentes intercambiables.',
    specs: '40hr Battery, Rubberized Grip, Adjustable triggers, Custom Profiles',
    image: 'images/Xbox Elite Wireless Controller 2.webp'
  },
  {
    id: '39',
    name: 'Corsair Dominator Titanium',
    category: ProductCategory.COMPONENT,
    price: 899,
    description: 'Memoria DDR5 premium con iluminación CAPELLIX LED y módulos superiores reemplazables.',
    specs: '32GB (2x16GB), DDR5-6600, CL32, Intel XMP 3.0',
    image: 'images/Corsair Dominator Titanium.webp'
  },
  {
    id: '40',
    name: 'ASUS TUF Gaming VG28UQL1A',
    category: ProductCategory.MONITOR,
    price: 2699,
    description: 'Monitor 4K de alta tasa de refresco, compatible con consolas de nueva generación.',
    specs: '28 inch, 4K UHD, 144Hz, HDMI 2.1, IPS, HDR 400',
    image: 'images/ASUS TUF Gaming VG28UQL1A.webp'
  },
  {
    id: '41',
    name: 'Secretlab TITAN Evo',
    category: ProductCategory.ACCESSORY,
    price: 2199,
    description: 'Silla ergonómica de gama alta, diseñada para soporte durante largas sesiones.',
    specs: 'SoftWeave Plus Fabric, 4-way L-ADAPT Lumbar Support, Magnetic Head Pillow',
    image: 'images/Secretlab TITAN Evo.webp'
  },
  {
    id: '42',
    name: 'Seagate IronWolf 8TB',
    category: ProductCategory.COMPONENT,
    price: 1159,
    description: 'Disco duro robusto diseñado específicamente para sistemas NAS y servidores caseros.',
    specs: '8TB, 7200 RPM, 256MB Cache, SATA 6Gb/s, 24/7 Reliability',
    image: 'images/Seagate IronWolf 8TB.webp'
  },
  {
    id: '43',
    name: 'HP Spectre x360 14',
    category: ProductCategory.LAPTOP,
    price: 6899,
    description: 'Convertible 2 en 1 con diseño de joya y pantalla OLED impresionante.',
    specs: 'Intel Core Ultra 7, 16GB RAM, 1TB SSD, 2.8K OLED Touch, Stylus Pen',
    image: 'images/HP Spectre x360 14.webp'
  },
  {
    id: '44',
    name: 'Oculus Meta Quest 3',
    category: ProductCategory.ACCESSORY,
    price: 2499,
    description: 'Gafas de realidad mixta todo en uno. Juega, entrena y crea sin cables.',
    specs: '128GB, 4K+ Infinite Display, Snapdragon XR2 Gen 2, Color Passthrough',
    image: 'images/Oculus Meta Quest 3.webp'
  },
  {
    id: '45',
    name: 'Thermal Grizzly Kryonaut',
    category: ProductCategory.COMPONENT,
    price: 49,
    description: 'Pasta térmica de alto rendimiento para overclockers y entusiastas.',
    specs: '1g Syringe, 12.5 W/mk Thermal Conductivity, Non-conductive',
    image: 'images/Thermal Grizzly Kryonaut.webp'
  },
  {
    id: '46',
    name: 'Logitech G203 Lightsync',
    category: ProductCategory.ACCESSORY,
    price: 119,
    description: 'El rey de los mouse económicos. Fiable, duradero y con iluminación RGB personalizable.',
    specs: '8000 DPI, 6 botones programables, RGB Lightsync, Diseño clásico',
    image: 'images/Logitech G203 Lightsync.webp'
  },
  {
    id: '47',
    name: 'AMD Ryzen 5 5600G',
    category: ProductCategory.COMPONENT,
    price: 649,
    description: 'La mejor opción para jugar sin tarjeta gráfica dedicada gracias a sus gráficos Radeon integrados.',
    specs: '6 Cores, 12 Threads, Radeon Vega 7 Graphics, AM4 Socket',
    image: 'images/AMD Ryzen 5 5600G.webp'
  },
  {
    id: '48',
    name: 'HP Laptop 15-fd000',
    category: ProductCategory.LAPTOP,
    price: 1899,
    description: 'Laptop esencial para estudiantes y oficina en casa. Cumple con todo lo básico sin gastar de más.',
    specs: 'Intel Core i3-N305, 8GB RAM, 512GB SSD, 15.6" FHD',
    image: 'images/HP Laptop 15-fd000.webp'
  },
  {
    id: '49',
    name: 'Kingston NV2 1TB',
    category: ProductCategory.COMPONENT,
    price: 259,
    description: 'Actualiza tu PC con velocidades NVMe a precio de disco SATA. Ideal para almacenamiento secundario.',
    specs: '1TB, PCIe 4.0 NVMe M.2, Up to 3500MB/s Read',
    image: 'images/Kingston NV2 1TB.webp'
  },
  {
    id: '50',
    name: 'Redragon Kumara K552',
    category: ProductCategory.ACCESSORY,
    price: 189,
    description: 'Teclado mecánico TKL indestructible. La puerta de entrada al mundo de los teclados custom.',
    specs: 'Mechanical Outemu Blue Switches, Red LED, Metal Construction, Tenkeyless',
    image: 'images/Redragon Kumara K552.webp'
  },
  {
    id: '51',
    name: 'LG 24GQ50F-B',
    category: ProductCategory.MONITOR,
    price: 599,
    description: 'Monitor gaming 1080p con alta tasa de refresco. Fluidez total para shooters competitivos.',
    specs: '24 inch, 165Hz, 1ms MBR, AMD FreeSync Premium, VA Panel',
    image: 'images/LG 24GQ50F-B.webp'
  },
  {
    id: '52',
    name: 'Sapphire Pulse RX 6600',
    category: ProductCategory.COMPONENT,
    price: 1099,
    description: 'La campeona indiscutible del rendimiento por dólar en 1080p.',
    specs: '8GB GDDR6, 1080p Gaming, RDNA 2 Architecture, Dual Fan',
    image: 'images/Sapphire Pulse RX 6600.webp'
  },
  {
    id: '53',
    name: 'Lenovo IdeaPad Slim 3',
    category: ProductCategory.LAPTOP,
    price: 1699,
    description: 'Diseño delgado y moderno para tareas cotidianas. Ligera para llevar a la universidad.',
    specs: 'AMD Ryzen 3 7320U, 8GB LPDDR5, 256GB SSD, 15.6" FHD',
    image: 'images/Lenovo IdeaPad Slim 3.webp'
  },
  {
    id: '54',
    name: 'HyperX Cloud Stinger 2',
    category: ProductCategory.ACCESSORY,
    price: 199,
    description: 'Comodidad ligera y buena calidad de audio sin romper la alcancía.',
    specs: 'DTS Headphone:X, 50mm Drivers, Rotating Earcups, lightweight',
    image: 'images/HyperX Cloud Stinger 2.webp'
  },
  {
    id: '55',
    name: 'Xiaomi Mi Desktop Monitor 1C',
    category: ProductCategory.MONITOR,
    price: 449,
    description: 'Estética minimalista con bordes ultra delgados. Perfecto para configuraciones de doble monitor económicas.',
    specs: '23.8 inch, IPS, 60Hz, Low Blue Light, Slim Body',
    image: 'images/Xiaomi Mi Desktop Monitor 1C.webp'
  },
  {
    id: '56',
    name: 'Corsair Vengeance LPX 16GB',
    category: ProductCategory.COMPONENT,
    price: 179,
    description: 'El estándar de oro en memoria RAM DDR4 confiable y compatible.',
    specs: '16GB (2x8GB), DDR4-3200MHz, CL16, Low Profile Heatspreader',
    image: 'images/Corsair Vengeance LPX 16GB.webp'
  },
  {
    id: '57',
    name: 'Acer Aspire 5',
    category: ProductCategory.LAPTOP,
    price: 2199,
    description: 'Caballo de batalla todo terreno con amplia conectividad y posibilidad de expansión.',
    specs: 'Intel Core i5-1335U, 8GB RAM (expandible), 512GB SSD, Thunderbolt 4',
    image: 'images/Acer Aspire 5.webp'
  },
  {
    id: '58',
    name: 'Logitech C270 HD',
    category: ProductCategory.ACCESSORY,
    price: 99,
    description: 'La webcam básica por excelencia. Suficiente para clases virtuales y videollamadas familiares.',
    specs: '720p/30fps, Built-in Mic, Noise Reduction, Universal Clip',
    image: 'https://picsum.photos/400/300?random=58'
  },
  {
    id: '59',
    name: 'Gigabyte B550M DS3H',
    category: ProductCategory.COMPONENT,
    price: 429,
    description: 'Placa madre micro-ATX con todo lo necesario para armar una PC gamer económica.',
    specs: 'AM4 Socket, PCIe 4.0, Dual M.2, RGB Fusion 2.0',
    image: 'images/Gigabyte B550M DS3H.webp'
  },
  {
    id: '60',
    name: 'Krups Dolce Gusto Mini Me',
    category: ProductCategory.ACCESSORY,
    price: 349,
    description: 'Porque ningún setup de programación está completo sin café rápido y fácil.',
    specs: 'Automatic, 15 Bars Pressure, Hot & Cold Beverages, Compact Design',
    image: 'https://picsum.photos/400/300?random=60'
  }
];
