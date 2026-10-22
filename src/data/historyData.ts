import { ForeignNation, BattleEvent, MilestoneEvent, TimelineEntry } from '../types/history';

export const FOREIGN_NATIONS: ForeignNation[] = [
  {
    id: 'portugis',
    name: 'Portugis (Portugal)',
    flag: '🇵🇹',
    originCountry: 'Portugal',
    originCity: 'Pintu Masuk Selat Malaka',
    originCoords: { lat: 5.2, lng: 97.5 }, // Pintu masuk maritim barat laut perairan Indonesia
    landingPort: 'Malaka (1511) & Maluku / Ternate (1512)',
    landingCoords: { lat: 0.7719, lng: 127.3204 }, // Ternate
    firstArrivalYear: '1511 (Malaka) / 1512 (Ternate)',
    expeditionLeaders: ['Afonso de Albuquerque', 'Francisco Serrão', 'Antonio de Abreu'],
    shipNames: ['Flor de la Mar', 'Nau Portuguesa', 'Frol de la Mar'],
    motive: '3G (Gold, Glory, Gospel) — Menguasai jalur rempah (pala & cengkih) dan memonopoli perniagaan di Asia Tenggara.',
    color: '#059669', // Emerald green
    routeWaypoints: [
      { name: 'Pintu Masuk Selat Malaka (Perairan Sumatra)', lat: 5.2, lng: 97.5, description: '1511: Masuk melalui pintu perairan barat laut Nusantara' },
      { name: 'Selat Malaka', lat: 2.196, lng: 102.2405, description: '1511: Menaklukkan pusat pelayaran rempah Kesultanan Melaka' },
      { name: 'Selat Karimata & Perairan Bangka', lat: -1.5, lng: 106.8, description: 'Menyusuri perairan timur Sumatra menuju Laut Jawa' },
      { name: 'Laut Jawa (Utara Cirebon/Jepara)', lat: -5.8, lng: 110.5, description: 'Berlayar melintasi perairan utara Pulau Jawa' },
      { name: 'Laut Flores (Kepulauan Selayar)', lat: -6.5, lng: 120.5, description: 'Menembus jalur rempah menuju kepulauan timur' },
      { name: 'Hitu & Ambon (Maluku)', lat: -3.7, lng: 128.18, description: '1512: Francisco Serrão tiba di Ambon mencari pala' },
      { name: 'Pulau Ternate (Maluku Utara)', lat: 0.7719, lng: 127.3204, description: 'Pendaratan utama & benteng São João Baptista' }
    ],
    arrivalStory: {
      summary: 'Portugis adalah bangsa Barat pertama yang berhasil mencapai perairan Nusantara setelah menaklukkan Malaka pada tahun 1511.',
      whyTheyCame: 'Jatuhnya Konstantinopel ke Dinasti Utsmaniyah (1453) memutus jalur perdagangan darat Eropa. Bangsa Portugis berlayar mencari "Kepulauan Rempah" (Spice Islands) demi cengkih dan pala yang berharga laksana emas batangan di Eropa.',
      howTheyArrived: 'Dipimpin Afonso de Albuquerque, armada Portugis menaklukkan Malaka pada Agustus 1511. Selanjutnya, Albuquerque mengirim ekspedisi tiga kapal di bawah pimpinan Francisco Serrão dan Antonio de Abreu menembus perairan Laut Jawa, Laut Flores, Ambon, hingga tiba di Ternate pada 1512.',
      firstIslandEncounter: 'Pulau Ternate & Hitu (Maluku). Sultan Abu Lais dari Ternate awalnya menyambut Portugis untuk membantu melawan rivalnya, Kesultanan Tidore.'
    },
    colonizationSteps: [
      {
        year: '1511',
        title: 'Penaklukan Kesultanan Malaka',
        locationName: 'Malaka',
        coordinates: { lat: 2.196, lng: 102.2405 },
        description: 'Afonso de Albuquerque merebut Malaka, pintu gerbang perniagaan laut internasional di Nusantara barat.',
        impact: 'Memicu perlawanan dari Kesultanan Demak (Pati Unus / Pangeran Sabrang Lor) dan memindahkan poros dagang ke Aceh dan Banten.'
      },
      {
        year: '1512–1522',
        title: 'Pendaratan di Ternate & Benteng São João Baptista',
        locationName: 'Kastela, Ternate',
        coordinates: { lat: 0.7719, lng: 127.3204 },
        description: 'Francisco Serrão diterima di Ternate. Portugis mulai membangun Benteng Nostra Senhora de Rosario / São João Baptista (Benteng Kastela) dan memaksakan perjanjian monopoli cengkih.',
        impact: 'Portugis mulai ikut campur dalam suksesi politik internal Kesultanan Ternate.'
      },
      {
        year: '1570',
        title: 'Pembunuhan Khianat Sultan Hairun',
        locationName: 'Benteng Kastela, Ternate',
        coordinates: { lat: 0.7719, lng: 127.3204 },
        description: 'Gubernur Portugis Lopez de Mesquita mengundang Sultan Hairun ke dalam benteng untuk berunding damai, namun membunuhnya secara licik.',
        impact: 'Membangkitkan amarah rakyat Maluku secara menyeluruh.'
      },
      {
        year: '1570–1575',
        title: 'Perlawanan Raya Sultan Baabullah & Pengusiran Portugis',
        locationName: 'Ternate',
        coordinates: { lat: 0.7719, lng: 127.3204 },
        description: 'Putra Sultan Hairun, Sultan Baabullah, memimpin perang suci jihad mengurung benteng Portugis selama 5 tahun tanpa kompromi hingga Portugis menyerah dan diusir dari Ternate pada 1575.',
        impact: 'Portugis hengkang dari Maluku Utara dan menyingkir ke Ambon dan Solor (Timor).'
      }
    ]
  },
  {
    id: 'spanyol',
    name: 'Spanyol (Espana)',
    flag: '🇪🇸',
    originCountry: 'Spanyol',
    originCity: 'Pintu Masuk Pasifik (Talaud)',
    originCoords: { lat: 4.2, lng: 127.0 }, // Pintu masuk maritim Pasifik Utara Maluku
    landingPort: 'Pulau Tidore, Maluku (8 November 1521)',
    landingCoords: { lat: 0.6868, lng: 127.4082 },
    firstArrivalYear: '1521',
    expeditionLeaders: ['Ferdinand Magellan (Magalhaes)', 'Juan Sebastian Elcano'],
    shipNames: ['Victoria', 'Trinidad'],
    motive: 'Membuktikan bumi bulat dengan berlayar ke barat dan mengklaim Maluku sebagai milik Spanyol berdasarkan Perjanjian Tordesillas.',
    color: '#dc2626', // Red
    routeWaypoints: [
      { name: 'Pintu Masuk Perairan Pasifik Utara Indonesia (Talaud)', lat: 4.2, lng: 127.0, description: '1521: Masuk dari perairan timur laut Nusantara' },
      { name: 'Laut Maluku Utara', lat: 2.2, lng: 127.6, description: 'Menuju perairan kepulauan rempah Halmahera' },
      { name: 'Perairan Morotai / Halmahera', lat: 1.4, lng: 127.9, description: 'Berlayar mendekati pusat Kesultanan Tidore' },
      { name: 'Pulau Tidore, Maluku', lat: 0.6868, lng: 127.4082, description: '8 November 1521: Kapal Victoria & Trinidad mendarat disambut Sultan Al-Mansur' }
    ],
    arrivalStory: {
      summary: 'Spanyol tiba di Maluku melalui pelayaran mengelilingi dunia dari arah barat melalui Samudra Pasifik.',
      whyTheyCame: 'Spanyol bersaing keras dengan Portugis dalam menguasai sumber rempah-rempah bernilai tinggi.',
      howTheyArrived: 'Setelah Magellan tewas di Filipina, komando ekspedisi diambil alih oleh Juan Sebastian Elcano. Dengan dua kapal tersisa (Victoria dan Trinidad), mereka berlayar ke selatan dan mendarat di Pulau Tidore pada 8 November 1521.',
      firstIslandEncounter: 'Pulau Tidore (Maluku). Sultan Al-Mansur menerima Spanyol dengan hangat untuk mengimbangi Ternate yang bersekutu dengan Portugis.'
    },
    colonizationSteps: [
      {
        year: '1521',
        title: 'Aliansi Dagang dengan Tidore',
        locationName: 'Tidore',
        coordinates: { lat: 0.6868, lng: 127.4082 },
        description: 'Spanyol memborong cengkih berlimpah dan membangun persekutuan pertahanan dengan Kesultanan Tidore.',
        impact: 'Memicu gesekan tajam antara Portugis (di Ternate) dan Spanyol (di Tidore).'
      },
      {
        year: '1529',
        title: 'Perjanjian Saragosa (Dampak di Maluku)',
        locationName: 'Tidore & Maluku',
        coordinates: { lat: 0.6868, lng: 127.4082 },
        description: 'Paus membagi garis demarkasi baru: Spanyol harus keluar dari Kepulauan Maluku dan memusatkan kekuasaannya di Filipina, sementara Maluku menjadi hak Portugis.',
        impact: 'Spanyol secara formal melepaskan klaim atas Nusantara demi menduduki Filipina.'
      }
    ]
  },
  {
    id: 'belanda',
    name: 'Belanda & VOC (Vereenigde Oostindische Compagnie)',
    flag: '🇳🇱',
    originCountry: 'Belanda (Nederland)',
    originCity: 'Pintu Masuk Samudra Hindia (Selat Sunda)',
    originCoords: { lat: -7.5, lng: 104.5 }, // Pintu Masuk Samudra Hindia Selat Sunda
    landingPort: 'Pelabuhan Banten (27 Juni 1596)',
    landingCoords: { lat: -6.0333, lng: 106.15 }, // Banten
    firstArrivalYear: '1596',
    expeditionLeaders: ['Cornelis de Houtman', 'Jacob van Neck', 'Jan Pieterszoon Coen'],
    shipNames: ['Mauritius', 'Hollandia', 'Amsterdam', 'Duyfken'],
    motive: 'Memonopoli perdagangan rempah dunia dengan hak istimewa (Octrooi) VOC, mendirikan benteng kolonial, dan menjajah wilayah Nusantara.',
    color: '#ea580c', // Orange-amber
    routeWaypoints: [
      { name: 'Pintu Masuk Samudra Hindia Barat Daya', lat: -7.5, lng: 104.5, description: '1596: Masuk dari jalur barat daya menghindari patroli Portugis' },
      { name: 'Selat Sunda (Pulau Panaitan / Krakatau)', lat: -6.4, lng: 105.4, description: 'Menembus Selat Sunda menuju perairan Banten' },
      { name: 'Pelabuhan Karangantu Banten', lat: -6.0333, lng: 106.15, description: '27 Juni 1596: Pendaratan perdana armada Cornelis de Houtman' },
      { name: 'Jayakarta / Batavia', lat: -6.1352, lng: 106.8133, description: '1619: J.P. Coen menaklukkan Jayakarta dan mendirikan Batavia' },
      { name: 'Kepulauan Banda & Maluku', lat: -4.5269, lng: 129.9044, description: '1621: Ekspedisi monopoli mutlak pala dan cengkih' }
    ],
    arrivalStory: {
      summary: 'Belanda adalah bangsa kolonial yang paling lama menancapkan cengkeraman penjajahan di Indonesia, berlangsung lebih dari 3 abad.',
      whyTheyCame: 'Pelabuhan Lisabon ditutup bagi kapal Belanda setelah Raja Spanyol Felipe II menyatukan takhta Spanyol-Portugal (1580). Belanda terpaksa berlayar langsung ke sumber rempah bermodal buku petunjuk rahasia Jan Huygen van Linschoten (*Itinerario*).',
      howTheyArrived: 'Armada Cornelis de Houtman dengan 4 kapal tiba di Banten pada 27 Juni 1596. Awalnya diterima baik, namun karena sikap congkak dan kasar Houtman, mereka diusir oleh penguasa Banten. Pada 1598, ekspedisi kedua pimpinan Jacob van Neck bersikap lebih santun dan berhasil membawa pulang rempah dengan keuntungan berlipat ganda.',
      firstIslandEncounter: 'Pelabuhan Karangantu, Kesultanan Banten (Jawa Barat/Banten).'
    },
    colonizationSteps: [
      {
        year: '1602',
        title: 'Pembentukan Kongsi Dagang VOC di Nusantara',
        locationName: 'Banten & Batavia',
        coordinates: { lat: -6.0333, lng: 106.15 },
        description: 'Belanda mendirikan VOC (Vereenigde Oostindische Compagnie) dengan Hak Oktroi (hak monopoli dagang, mencetak mata uang sendiri, memelihara angkatan perang, membangun benteng pertahanan, dan menyatakan perang).',
        impact: 'VOC bertindak sebagai "negara di dalam negara" yang sangat agresif menindas penguasa lokal.'
      },
      {
        year: '1619',
        title: 'Penaklukan Jayakarta & Berdirinya Batavia',
        locationName: 'Jayakarta / Jakarta',
        coordinates: { lat: -6.1352, lng: 106.8133 },
        description: 'Gubernur Jenderal Jan Pieterszoon Coen membumihanguskan Jayakarta dan mendirikan Batavia sebagai markas besar permanen VOC di Asia.',
        impact: 'Menjadi episentrum penjajahan kolonial dan pusat eksploitasi ekonomi Nusantara.'
      },
      {
        year: '1621',
        title: 'Ekstirpasi & Pembantaian Rakyat Banda',
        locationName: 'Kepulauan Banda, Maluku',
        coordinates: { lat: -4.5269, lng: 129.9044 },
        description: 'J.P. Coen membantai hampir seluruh penduduk asli Banda demi memonopoli komoditas pala dunia dan menggantinya dengan budak perkebunan.',
        impact: 'Salah satu genosida kolonial paling kejam dalam sejarah dunia maritim.'
      },
      {
        year: '1667–1669',
        title: 'Penundukan Kesultanan Gowa di Makassar',
        locationName: 'Makassar, Sulawesi Selatan',
        coordinates: { lat: -5.1477, lng: 119.4327 },
        description: 'VOC bersekutu dengan Arung Palakka dari Bone memaksa Sultan Hasanuddin menandatangani Perjanjian Bongaya.',
        impact: 'Pintu gerbang niaga maritim Indonesia Timur jatuh ke kendali VOC.'
      },
      {
        year: '1799–1800',
        title: 'Kebangkrutan VOC & Peralihan ke Pemerintah Hindia Belanda',
        locationName: 'Batavia',
        coordinates: { lat: -6.1352, lng: 106.8133 },
        description: 'Akibat korupsi membabi buta, penyelundupan, dan utang menumpuk, VOC dibubarkan pada 31 Desember 1799. Kekuasaan diambil alih langsung oleh Kerajaan Belanda menjadi Pemerintah Kolonial Hindia Belanda.',
        impact: 'Penjajahan beralih dari korporasi dagang menjadi kekuasaan imperialistis negara Hindia Belanda.'
      },
      {
        year: '1800–1900-an',
        title: 'Pax Neerlandica: Perang Penaklukan Nusantara Abad 19',
        locationName: 'Seantero Indonesia (Sumatra, Jawa, Maluku, Kalimantan, Bali, Aceh)',
        coordinates: { lat: -2.5489, lng: 118.0149 },
        description: 'Belanda melancarkan ekspedisi militer besar-besaran untuk menundukkan perlawanan rakyat: Perang Padri (1803-1837), Perang Diponegoro (1825-1830), Perang Pattimura (1817), Perang Banjar (1859-1905), Puputan Bali (1846-1908), dan Perang Aceh (1873-1904).',
        impact: 'Menyatukan wilayah administratif Hindia Belanda yang kelak menjadi tapak batas geografis Republik Indonesia.'
      }
    ]
  },
  {
    id: 'inggris',
    name: 'Inggris (British Empire / EIC)',
    flag: '🇬🇧',
    originCountry: 'Inggris (United Kingdom)',
    originCity: 'Pintu Masuk Sabang / Selat Malaka',
    originCoords: { lat: 5.9, lng: 94.8 }, // Pintu Masuk Maritim Sabang/Selat Malaka
    landingPort: 'Aceh & Banten (1602) / Bengkulu (1685)',
    landingCoords: { lat: -3.7928, lng: 102.2608 }, // Bengkulu
    firstArrivalYear: '1602',
    expeditionLeaders: ['Sir James Lancaster', 'Sir Henry Middleton', 'Thomas Stamford Raffles'],
    shipNames: ['Red Dragon', 'Hector', 'Ascension', 'Susan'],
    motive: 'Mendirikan kongsi dagang EIC (East India Company), bersaing dengan Belanda dalam komoditas lada dan rempah.',
    color: '#2563eb', // Royal Blue
    routeWaypoints: [
      { name: 'Pintu Masuk Perairan Sabang / Aceh', lat: 5.9, lng: 94.8, description: '1602: Armada James Lancaster tiba membawa surat Ratu Elizabeth I' },
      { name: 'Kesultanan Aceh', lat: 5.5536, lng: 95.3198, description: 'Menjalin hubungan persahabatan dengan Sultan Iskandar Muda' },
      { name: 'Pesisir Barat Sumatra (Fort Marlborough Bengkulu)', lat: -3.7928, lng: 102.2608, description: '1685: Pusat pos lada terbesar Inggris di Sumatra' },
      { name: 'Selat Sunda & Loji Dagang Banten', lat: -6.0333, lng: 106.15, description: '1602: Mendirikan kantor dagang loji EIC pertama di Jawa' }
    ],
    arrivalStory: {
      summary: 'Inggris masuk ke Nusantara melalui kongsi EIC dan sempat memerintah Jawa di bawah Letnan Gubernur Thomas Stamford Raffles (1811–1816).',
      whyTheyCame: 'Inggris ingin mematahkan hegemoni Spanyol, Portugis, dan Belanda dalam perdagangan rempah dunia.',
      howTheyArrived: 'Sir James Lancaster tiba di Aceh pada 1602 membawa sepucuk surat persahabatan dari Ratu Elizabeth I kepada Sultan Iskandar Muda, lalu melanjutkan perjalanan ke Banten.',
      firstIslandEncounter: 'Pulau Sumatra (Aceh) dan Pulau Jawa (Banten).'
    },
    colonizationSteps: [
      {
        year: '1602–1682',
        title: 'Pos Dagang Banten & Benturan dengan VOC',
        locationName: 'Banten',
        coordinates: { lat: -6.0333, lng: 106.15 },
        description: 'EIC mendirikan loji dagang di Banten sampai akhirnya diusir oleh Sultan Haji yang bersekongkol dengan VOC pada 1682.',
        impact: 'Inggris terlempar dari Jawa dan mencari basis baru di pesisir barat Sumatra.'
      },
      {
        year: '1685–1824',
        title: 'Pembangunan Fort Marlborough di Bengkulu',
        locationName: 'Bengkulu',
        coordinates: { lat: -3.7928, lng: 102.2608 },
        description: 'Inggris mendirikan Fort Marlborough, benteng Inggris terbesar kedua di Asia Tenggara, untuk mengamankan jalur lada.',
        impact: 'Bengkulu menjadi koloni protektorat Inggris selama lebih dari 130 tahun.'
      },
      {
        year: '1811–1816',
        title: 'Interregnum Inggris: Pemerintahan Thomas Stamford Raffles',
        locationName: 'Batavia & Buitenzorg (Bogor)',
        coordinates: { lat: -6.5971, lng: 106.806 },
        description: 'Pasukan Inggris di bawah Lord Minto merebut Jawa dari tangan Belanda-Prancis (Gubernur Jenderal Janssens). Raffles diangkat menjadi Letnan Gubernur.',
        impact: 'Memperkenalkan sistem Sewa Tanah (Landrent System), menghapus perbudakan secara formal, menemukan kembali Candi Borobudur, menulis karya monumental *The History of Java*, dan mendirikan Kebun Raya Bogor.'
      },
      {
        year: '1824',
        title: 'Traktat London (Penyelesaian Wilayah Bengkulu & Melaka)',
        locationName: 'Bengkulu & Selat Malaka',
        coordinates: { lat: -3.7928, lng: 102.2608 },
        description: 'Inggris menukar koloninya di Bengkulu kepada Belanda dengan imbalan Melaka dan Singapura.',
        impact: 'Mematok batas permanen: kawasan Semenanjung Melayu untuk Inggris, sedangkan seluruh kepulauan Nusantara untuk Belanda.'
      }
    ]
  },
  {
    id: 'jepang',
    name: 'Kekaisaran Jepang (Dai Nippon)',
    flag: '🇯🇵',
    originCountry: 'Kekaisaran Jepang',
    originCity: 'Pintu Masuk Laut Sulawesi Utara',
    originCoords: { lat: 4.5, lng: 119.0 }, // Pintu Masuk Maritim Laut Sulawesi Utara
    landingPort: 'Tarakan, Kalimantan Timur (11 Januari 1942)',
    landingCoords: { lat: 3.3276, lng: 117.5855 }, // Tarakan
    firstArrivalYear: '1942',
    expeditionLeaders: ['Jenderal Hitoshi Imamura', 'Letjen Tomoyuki Yamashita', 'Laksamana Chuichi Nagumo'],
    shipNames: ['Kapal Induk Akagi', 'Kapal Tempur Haruna', 'Armada Selatan Tentara Ke-16'],
    motive: 'Mengamankan sumber minyak bumi, karet, dan bahan baku strategis demi perang Pasifik Raya, serta propaganda "Saudara Tua" pembebas Asia.',
    color: '#7c3aed', // Purple/Violet
    routeWaypoints: [
      { name: 'Pintu Masuk Perairan Laut Sulawesi Utara', lat: 4.5, lng: 119.0, description: '1942: Armada invasi selatan memasuki perairan maritim Kalimantan' },
      { name: 'Pulau Tarakan (Kalimantan Timur)', lat: 3.3276, lng: 117.5855, description: '11 Januari 1942: Pendaratan perdana merebut kilang minyak' },
      { name: 'Selat Makassar & Balikpapan', lat: -1.2654, lng: 116.8312, description: 'Januari-Februari 1942: Mengamankan kilang minyak Shell/BPM' },
      { name: 'Laut Jawa (Pesisir Kragan & Indramayu)', lat: -6.2, lng: 108.3, description: '1 Maret 1942: Pendaratan serentak Tentara Ke-16 di Jawa' },
      { name: 'Kalijati, Subang (Jawa Barat)', lat: -6.5319, lng: 107.6744, description: '8 Maret 1942: Penyerahan tanpa syarat Belanda kepada Jepang' }
    ],
    arrivalStory: {
      summary: 'Jepang masuk secara kilat pada Perang Dunia II menghancurkan kekuasaan 350 tahun Belanda hanya dalam hitungan minggu.',
      whyTheyCame: 'Jepang terkena embargo minyak dan baja oleh Amerika Serikat dan Sekutu. Indonesia (terutama Tarakan dan Palembang) adalah lumbung minyak mentah berkualitas terbaik yang mutlak dibutuhkan mesin perang Jepang.',
      howTheyArrived: 'Dipimpin Jenderal Hitoshi Imamura, angkatan perang Jepang melancarkan blitzkrieg amfibi. Pada 11 Januari 1942 mendarat di Tarakan, kemudian Palembang, dan mendarat di Pulau Jawa pada 1 Maret 1942.',
      firstIslandEncounter: 'Pulau Tarakan, Kalimantan Timur.'
    },
    colonizationSteps: [
      {
        year: '11 Januari 1942',
        title: 'Pendaratan Kilat di Tarakan',
        locationName: 'Tarakan, Kalimantan Timur',
        coordinates: { lat: 3.3276, lng: 117.5855 },
        description: 'Pasukan Detasemen Sayap Kanan Jepang mendarat di Tarakan dan merebut ladang minyak dari KNIL.',
        impact: 'Membuka pintu invasi ke seluruh Nusantara.'
      },
      {
        year: '8 Maret 1942',
        title: 'Perjanjian Kalijati: Belanda Menyerah Tanpa Syarat',
        locationName: 'Kalijati, Subang',
        coordinates: { lat: -6.5319, lng: 107.6744 },
        description: 'Gubernur Jenderal Tjarda van Starkenborgh Stachouwer dan Panglima KNIL Letjen Hein ter Poorten menandatangani penyerahan kepada Jenderal Hitoshi Imamura.',
        impact: 'Berakhirnya secara resmi masa penjajahan kolonial Hindia Belanda di Indonesia.'
      },
      {
        year: '1942–1945',
        title: 'Masa Tirani: Romusha, Jugun Ianfu & Eksploitasi Total',
        locationName: 'Jawa & Seluruh Nusantara',
        coordinates: { lat: -7.2504, lng: 112.7688 },
        description: 'Meskipun awalnya propaganda "Gerakan 3A" menarik simpati, Jepang memeras beras rakyat, mewajibkan kerja paksa Romusha hingga ratusan ribu tewas di jalur kereta maut Burma dan Saketi-Bayah, serta menindas kebebasan berpendapat.',
        impact: 'Kemiskinan dan penderitaan fisik ekstrem, namun mengobarkan api revolusi dan kebencian rakyat terhadap penjajah.'
      },
      {
        year: '3 Oktober 1943',
        title: 'Pembentukan Pasukan PETA (Pembela Tanah Air)',
        locationName: 'Bogor & Jawa-Bali',
        coordinates: { lat: -6.5971, lng: 106.806 },
        description: 'Jepang melatih militer ribuan pemuda pribumi untuk menghadapi serangan balik Sekutu.',
        impact: 'Menjadi cikal bakal perwira militer Angkatan Darat Republik Indonesia (TNI).'
      },
      {
        year: '14 Februari 1945',
        title: 'Pemberontakan PETA di Blitar',
        locationName: 'Blitar, Jawa Timur',
        coordinates: { lat: -8.0983, lng: 112.1681 },
        description: 'Shodanco Supriyadi memimpin anak buahnya memberontak menentang kekejaman Jepang terhadap rakyat jelata.',
        impact: 'Bukti tegas bahwa tentara bentukan Jepang berjiwa patriotik membela rakyat sendiri.'
      }
    ]
  }
];

export const BATTLE_EVENTS: BattleEvent[] = [
  {
    id: 'ternate-portugis',
    title: 'Perlawanan Kesultanan Ternate terhadap Portugis',
    year: '1570–1575',
    era: 'daerah',
    location: 'Benteng São João Baptista (Kastela), Pulau Ternate, Maluku Utara',
    coordinates: { lat: 0.7719, lng: 127.3204 },
    opponents: {
      nusantara: 'Kesultanan Ternate & Rakyat Maluku',
      foreign: 'Gubernur & Pasukan Portugis'
    },
    leaders: {
      nusantara: ['Sultan Hairun', 'Sultan Baabullah (Penguasa 72 Pulau)'],
      foreign: ['Diogo Lopes de Mesquita']
    },
    whatHappened: 'Sultan Hairun dibunuh secara licik oleh pihak Portugis di dalam benteng pada tahun 1570. Putranya, Sultan Baabullah, bersumpah membalas kematian ayahnya dan memimpin perang suci rakyat Ternate.',
    causes: 'Konflik kekuasaan, monopoli perdagangan rempah yang mencekik, penghinaan terhadap kedaulatan istana, serta pembunuhan berencana Sultan Hairun oleh Portugis.',
    purpose: 'Mengusir Portugis dari Ternate dan memulihkan kedaulatan, martabat, serta kemerdekaan Kesultanan Ternate.',
    impactAndResult: 'Benteng Portugis dikepung rapat selama 5 tahun tanpa pasokan logistik. Pada 1575, Portugis menyerah dan diusir secara hina dari Ternate. Baabullah memperluas pengaruh Ternate hingga mencakup 72 pulau berpenghuni di Nusantara timur.',
    keyDate: '1570–1575'
  },
  {
    id: 'sultan-agung-batavia',
    title: 'Serangan Akbar Sultan Agung Mataram ke Batavia',
    year: '1628–1629',
    era: 'daerah',
    location: 'Batavia (Kota Tua Jakarta & Muara Ciliwung)',
    coordinates: { lat: -6.1352, lng: 106.8133 },
    opponents: {
      nusantara: 'Kesultanan Mataram Islam',
      foreign: 'VOC (Vereenigde Oostindische Compagnie)'
    },
    leaders: {
      nusantara: ['Sultan Agung Hanyokrokusumo', 'Tumenggung Baurekso', 'Pangeran Mandurareja', 'Adipati Ukur'],
      foreign: ['Jan Pieterszoon Coen (Gubernur Jenderal VOC)', 'Jacques Specx']
    },
    whatHappened: 'Kesultanan Mataram mengerahkan puluhan ribu laskar terlatih, gajah perang, dan armada kapal ke muara Ciliwung dalam dua gelombang serangan dahsyat (1628 dan 1629) untuk mengepung benteng Kasteel Batavia.',
    causes: 'Sultan Agung menentang ekspansi politik dan hegemoni dagang VOC yang mengancam kedaulatan Mataram di tanah Jawa, serta penolakan VOC untuk mengakui kepemimpinan Mataram.',
    purpose: 'Mengusir VOC dari tanah Batavia dan menyatukan seluruh Pulau Jawa di bawah panji kedaulatan Mataram.',
    impactAndResult: 'Serangan gagal merebut benteng karena lumbung-lumbung padi Mataram di Karawang dan Cirebon dibakar intelijen VOC, serta wabah kolera melanda tentara. Gubernur Jenderal J.P. Coen tewas di Batavia pada 21 September 1629. Meski gagal merebut kota, pertempuran ini membuktikan kegigihan Mataram melawan imperialisme Eropa.',
    keyDate: 'Agustus 1628 & Mei–Oktober 1629'
  },
  {
    id: 'perang-makassar',
    title: 'Perang Makassar (Kesultanan Gowa vs VOC)',
    year: '1666–1669',
    era: 'daerah',
    location: 'Benteng Somba Opu & Ujung Pandang, Makassar, Sulawesi Selatan',
    coordinates: { lat: -5.1906, lng: 119.3976 },
    opponents: {
      nusantara: 'Kesultanan Gowa-Tallo didukung laskar pelaut Bugis-Makassar',
      foreign: 'VOC bersekutu dengan Arung Palakka dari Kesultanan Bone'
    },
    leaders: {
      nusantara: ['Sultan Hasanuddin ("Ayam Jantan dari Timur")', 'Karaeng Karunrung'],
      foreign: ['Cornelis Speelman', 'Arung Palakka']
    },
    whatHappened: 'Perang laut dan darat terbesar di kawasan timur Nusantara. VOC mengerahkan armada meriam kapal perang mengepung Benteng Somba Opu, benteng bata merah terkuat milik Kesultanan Gowa.',
    causes: 'VOC ingin memonopoli perniagaan rempah di gerbang Indonesia Timur, sementara Sultan Hasanuddin berpegang teguh pada prinsip "Tuhan menciptakan laut untuk semua manusia" (kebebasan bernavigasi dan berdagang).',
    purpose: 'Mempertahankan kedaulatan maritim Kesultanan Gowa dan menolak monopoli perniagaan VOC.',
    impactAndResult: 'Setelah perlawanan sengit yang menelan ribuan korban, Sultan Hasanuddin dipaksa menandatangani Perjanjian Bongaya (1667). Perlawanan berlanjut hingga Benteng Somba Opu dihancurkan pada 1669. Gowa kehilangan monopoli, Benteng Ujung Pandang direbut dan dinamai Fort Rotterdam oleh VOC.',
    keyDate: '18 November 1667 (Perjanjian Bongaya) & Juni 1669 (Jatuhnya Somba Opu)'
  },
  {
    id: 'pemberontakan-trunajaya',
    title: 'Perlawanan Pangeran Trunajaya terhadap Mataram & VOC',
    year: '1674–1680',
    era: 'daerah',
    location: 'Madura, Kediri, Surabaya, Plered (Jawa Timur & Tengah)',
    coordinates: { lat: -7.8631, lng: 112.0125 },
    opponents: {
      nusantara: 'Laskar Trunajaya (Madura) bersekutu dengan Karaeng Galesong (Makassar)',
      foreign: 'Aliansi Susuhunan Mataram (Amangkurat I & II) dan Tentara VOC'
    },
    leaders: {
      nusantara: ['Raden Trunajaya', 'Karaeng Galesong'],
      foreign: ['Amangkurat II', 'Kapten François Tack', 'Cornelis Speelman']
    },
    whatHappened: 'Pangeran Trunajaya dari Madura memimpin pemberontakan besar-besaran, menyerbu dan merebut keraton Plered Mataram pada 1677 hingga Sunan Amangkurat I melarikan diri dan wafat di Tegalwangi.',
    causes: 'Ketidakpuasan mendalam terhadap kediktatoran Amangkurat I yang kejam, pembantaian para ulama, serta kedekatan keraton dengan kongsi dagang VOC.',
    purpose: 'Menggulingkan tatanan kekuasaan tirani Mataram dan mendirikan hegemoni baru yang berdaulat di Jawa dan Madura.',
    impactAndResult: 'Pemberontakan akhirnya dipadamkan setelah Amangkurat II bersekutu penuh dengan VOC dan menandatangani perjanjian yang menggadaikan pelabuhan-pelabuhan pesisir Jawa. Trunajaya ditangkap dan dihukum mati pada awal 1680. Ketergantungan Mataram terhadap VOC semakin mengakar.',
    keyDate: '1674–1680'
  },
  {
    id: 'untung-suropati',
    title: 'Perlawanan Untung Suropati di Jawa Timur',
    year: '1686–1706',
    era: 'daerah',
    location: 'Kartasura, Pasuruan, dan Bangil (Jawa Timur)',
    coordinates: { lat: -7.6469, lng: 112.9077 },
    opponents: {
      nusantara: 'Kadipaten Pasuruan pimpinan Untung Suropati',
      foreign: 'Kompeni VOC dan tentara bayaran kolonial'
    },
    leaders: {
      nusantara: ['Untung Suropati (Adipati Wiranegara)'],
      foreign: ['Kapten François Tack', 'Gubernur Joan van Hoorn']
    },
    whatHappened: 'Mantan budak VOC di Batavia yang memberontak, Untung Suropati menewaskan Kapten Tack dalam pertempuran sengit di alun-alun Kartasura (1686), kemudian mendirikan kadipaten merdeka di Pasuruan.',
    causes: 'Kebencian terhadap penindasan perbudakan VOC, campur tangan kompeni dalam suksesi tahta Mataram, dan keinginan menegakkan kedaulatan rakyat Jawa.',
    purpose: 'Membangun kekuatan politik merdeka di Jawa Timur dan mengikis dominasi VOC.',
    impactAndResult: 'Suropati berhasil mempertahankan kerajaannya selama dua dekade sebelum akhirnya gugur sebagai pahlawan dalam pertempuran mempertahankan benteng Bangil pada Oktober 1706.',
    keyDate: 'Februari 1686 & Oktober 1706'
  },
  {
    id: 'geger-pacinan',
    title: 'Geger Pacinan & Perlawanan Tionghoa-Jawa terhadap VOC',
    year: '1740–1743',
    era: 'daerah',
    location: 'Batavia, Lasem, Kudus, Kartasura (Jawa)',
    coordinates: { lat: -6.1214, lng: 106.8208 },
    opponents: {
      nusantara: 'Aliansi Pejuang Etnis Tionghoa dan Bangsawan/Laskar Jawa (Sunan Kuning)',
      foreign: 'Pemerintah Kolonial VOC'
    },
    leaders: {
      nusantara: ['Kapitan Sepanjang (Khe Panjang)', 'Raden Mas Garendi (Sunan Kuning)'],
      foreign: ['Adriaan Valckenier (Gubernur Jenderal VOC)']
    },
    whatHappened: 'Menyusul pembantaian brutal lebih dari 10.000 warga etnis Tionghoa di Batavia oleh VOC pada Oktober 1740, para penyintas melarikan diri ke pedalaman Jawa dan membentuk aliansi militer dengan kaum bangsawan serta rakyat Jawa melawan VOC.',
    causes: 'Kebijakan deportasi zalim VOC terhadap komunitas Tionghoa, depresi harga gula, kekerasan militer kolonial, dan kebencian bersama terhadap hegemoni VOC.',
    purpose: 'Menghancurkan loji-loji militer VOC di pesisir utara Jawa dan merebut takhta Kartasura dari tangan raja boneka VOC.',
    impactAndResult: 'Laskar gabungan berhasil merebut Keraton Kartasura pada 1742. Namun VOC dengan bantuan pasukan Madura Cakraningrat IV memukul balik. Pemberontakan berakhir pada 1743, mengakibatkan Keraton Kartasura hancur dan dipindahkan ke Surakarta.',
    keyDate: '9–10 Oktober 1740 (Tragedi Angke) – 1743'
  },
  {
    id: 'perang-pattimura',
    title: 'Perlawanan Kapitan Pattimura di Maluku',
    year: '1817',
    era: 'daerah',
    location: 'Benteng Duurstede, Saparua, Kepulauan Maluku',
    coordinates: { lat: -3.5764, lng: 128.6608 },
    opponents: {
      nusantara: 'Rakyat Maluku (Saparua, Haruku, Nusalaut, Hitu)',
      foreign: 'Pemerintah Kolonial Hindia Belanda'
    },
    leaders: {
      nusantara: ['Thomas Matulessy (Kapitan Pattimura)', 'Christina Martha Tiahahu', 'Anthony Reebok', 'Philip Latumahina'],
      foreign: ['Residen Van den Berg', 'Mayor Beetjes']
    },
    whatHappened: 'Pada 15 Mei 1817, rakyat Saparua di bawah pimpinan Pattimura menyerbu dan merebut Benteng Duurstede, menewaskan Residen Van den Berg. Ekspedisi militer Belanda berkekuatan 200 tentara yang dikirim kemudian dihancurkan dalam pertempuran pantai.',
    causes: 'Kembalinya kekuasaan Belanda dari tangan Inggris (1816) membawa kembali beban kerja paksa (rodi), penyerahan wajib ikan asin/kayu, pelayaran Hongi, dan penolakan Belanda membayar upah guru serta perahu sewaan.',
    purpose: 'Mengakhiri penindasan keji kolonial Belanda dan memulihkan hak-hak kemerdekaan rakyat Maluku.',
    impactAndResult: 'Belanda mendatangkan bala tentara besar dari Ambon dan Batavia. Pattimura dikhianati dan ditangkap pada November 1817. Pada 16 Desember 1817, Kapitan Pattimura dihukum gantung di depan Benteng Victoria, Ambon. Christina Martha Tiahahu dibuang ke Jawa dan wafat di kapal.',
    keyDate: '15 Mei 1817 (Rebut Benteng) & 16 Desember 1817 (Eksekusi)'
  },
  {
    id: 'perang-padri',
    title: 'Perang Padri di Sumatra Barat',
    year: '1803–1837',
    era: 'daerah',
    location: 'Bonjol, Bukit Tinggi, Lembah Harau, Luhak Nan Tigo (Sumatra Barat)',
    coordinates: { lat: -0.0076, lng: 100.2225 },
    opponents: {
      nusantara: 'Kaum Padri kemudian bersatu dengan Kaum Adat Minangkabau',
      foreign: 'Pemerintah Kolonial Hindia Belanda'
    },
    leaders: {
      nusantara: ['Tuanku Imam Bonjol (Muhammad Syahab)', 'Tuanku Tambusai', 'Tuanku Pasaman', 'Tuanku Nan Renceh'],
      foreign: ['Jenderal De Kock', 'Kolonel Elout', 'Letkol Raaff']
    },
    whatHappened: 'Konflik internal antara Kaum Padri (pemurni ajaran Islam) dan Kaum Adat dimanfaatkan Belanda untuk menguasai Minangkabau. Menyadari musuh bersama adalah penjajah, Kaum Padri dan Kaum Adat berdamai melalui Plakat Puncak Pato dan bersatu melawan tentara Belanda.',
    causes: 'Campur tangan militer kolonial Belanda atas undangan Kaum Adat (1821), pembangunan Benteng Fort de Kock, dan eksploitasi perdagangan kopi Sumatra Barat.',
    purpose: 'Mengusir penjajah kafir Belanda dari tanah Minangkabau dan menegakkan tatanan masyarakat bersendi syarak ("Adat Basandi Syarak, Syarak Basandi Kitabullah").',
    impactAndResult: 'Perang berlangsung sangat alot selama 3 dekade karena taktik gerilya pegunungan. Benteng Bonjol baru jatuh pada 16 Agustus 1837 setelah digempur meriam berbulan-bulan. Tuanku Imam Bonjol ditipu dalam perundingan damai, ditangkap, dan diasingkan hingga wafat di Manado (1864).',
    keyDate: '1803–1837 (Puncak 1821–1837)'
  },
  {
    id: 'perang-diponegoro',
    title: 'Perang Diponegoro (Perang Jawa / De Java Oorlog)',
    year: '1825–1830',
    era: 'daerah',
    location: 'Tegalrejo, Gua Selarong, Yogyakarta, Surakarta, Magelang (Jawa Tengah & DIY)',
    coordinates: { lat: -7.7828, lng: 110.3606 },
    opponents: {
      nusantara: 'Pangeran Diponegoro, bangsawan Mataram, kyai/santri, dan rakyat jelata Jawa',
      foreign: 'Pemerintah Kolonial Hindia Belanda & Pasukan Bantuan Keraton boneka'
    },
    leaders: {
      nusantara: ['Pangeran Diponegoro (Bendara Raden Mas Antawirya)', 'Kyai Mojo', 'Sentot Alibasya Prawirodirjo', 'Nyi Ageng Serang'],
      foreign: ['Jenderal Hendrik Merkus de Kock', 'Residen A.H. Smissaert']
    },
    whatHappened: 'Perang terbesar dan paling mematikan di tanah Jawa. Diponegoro memimpin Perang Sabil dengan taktik perang gerilya kilat yang memporak-porandakan pos-pos pertahanan Belanda dari Banyumas hingga Madiun.',
    causes: 'Pemasangan patok jalan secara sewenang-wenang oleh Belanda melintasi makam leluhur Diponegoro di Tegalrejo (Juli 1825), campur tangan Belanda dalam suksesi Keraton Yogyakarta, pajak sewa tanah yang memiskinkan rakyat jelata, dan keresahan spiritual.',
    purpose: 'Menghancurkan kekuasaan kafir kolonial Belanda dan memulihkan tatanan moral-keagamaan serta keadilan di tanah Jawa.',
    impactAndResult: 'Belanda kewalahan hingga menerapkan taktik Benteng Stelsel (mendirikan ratusan benteng terkoneksi). Perang menelan korban 200.000 jiwa rakyat Jawa dan 15.000 tentara Belanda, serta membangkrutkan kas Hindia Belanda (memicu tanam paksa Cultuurstelsel). Pada 28 Maret 1830 di Magelang, Diponegoro dijebak dalam perundingan pura-pura oleh De Kock, lalu diasingkan ke Manado dan Makassar hingga wafat pada 1855.',
    keyDate: '20 Juli 1825 (Insiden Tegalrejo) – 28 Maret 1830 (Penangkapan di Magelang)'
  },
  {
    id: 'perang-banjar',
    title: 'Perang Banjar (Kalimantan Selatan)',
    year: '1859–1905',
    era: 'daerah',
    location: 'Martapura, Banjarmasin, Barito, Hulu Sungai (Kalimantan Selatan & Tengah)',
    coordinates: { lat: -3.4167, lng: 114.85 },
    opponents: {
      nusantara: 'Rakyat dan Bangsawan Pejuang Kesultanan Banjar serta suku Dayak',
      foreign: 'Pemerintah Kolonial Hindia Belanda'
    },
    leaders: {
      nusantara: ['Pangeran Antasari ("Haram Manyarah Waja Sampai Kaputing")', 'Pangeran Hidayatullah II', 'Tumenggung Surapati', 'Panglima Batur'],
      foreign: ['Kolonel Andresen', 'Letkol Verspyck']
    },
    whatHappened: 'Pada April 1859, Pangeran Antasari bersama 300 laskar menyerang tambang batu bara milik Belanda (Oranje Nassau) di Pengaron. Perang membara di sepanjang daerah aliran Sungai Barito selama lebih dari 40 tahun.',
    causes: 'Belanda secara sepihak mengangkat Pangeran Tamjidillah yang tidak disukai rakyat menjadi Sultan Banjar, mencopot Kesultanan Banjar (1860), serta mengincar penguasaan tambang batu bara dan perkebunan.',
    purpose: 'Mempertahankan kedaulatan Kesultanan Banjar, mengusir dominasi kolonial Belanda, dan menolak campur tangan imperialisme.',
    impactAndResult: 'Pangeran Hidayatullah ditangkap dan dibuang ke Cianjur. Pangeran Antasari dinobatkan sebagai pemimpin tertinggi dan wafat karena penyakit cacar di medan gerilya pada 1862. Perlawanan gerilya dilanjutkan oleh para putranya dan pejuang Dayak hingga Panglima Batur gugur di tiang gantung pada 1905.',
    keyDate: '28 April 1859 (Serangan Pengaron) – 1905'
  },
  {
    id: 'perang-aceh',
    title: 'Perang Aceh (Perang Sabil Terpanjang)',
    year: '1873–1904 (gerilya hingga 1914)',
    era: 'daerah',
    location: 'Masjid Raya Baiturrahman, Banda Aceh, Pidie, Meulaboh, Aceh Barat',
    coordinates: { lat: 5.5536, lng: 95.3198 },
    opponents: {
      nusantara: 'Rakyat dan Kesultanan Aceh Darussalam',
      foreign: 'Tentara Kerajaan Hindia Belanda (KNIL)'
    },
    leaders: {
      nusantara: ['Teuku Umar', 'Cut Nyak Dhien', 'Teungku Chik di Tiro', 'Cut Meutia', 'Panglima Polim', 'Sultan Muhammad Daud Syah'],
      foreign: ['Jenderal J.H.R. Köhler (tewas tertembak)', 'Jenderal Van Heutsz', 'Dr. Snouck Hurgronje']
    },
    whatHappened: 'Pada 26 Maret 1873, Belanda secara resmi menyatakan perang kepada Aceh. Jenderal Köhler tewas tertembak di pelataran Masjid Raya Baiturrahman. Rakyat Aceh melancarkan Perang Sabil gerilya total yang paling ditakuti militer Belanda.',
    causes: 'Traktat Sumatra 1871 antara Belanda dan Inggris membatalkan jaminan kemerdekaan Aceh. Belanda berambisi menguasai Aceh karena letaknya yang teramat strategis di pintu Selat Malaka setelah dibukanya Terusan Suez (1869).',
    purpose: 'Mempertahankan kedaulatan satu-satunya kerajaan Islam merdeka di Nusantara yang belum pernah ditaklukkan bangsa Barat.',
    impactAndResult: 'Belanda menelan kerugian puluhan ribu nyawa dan biaya raksasa. Menghadapi jalan buntu, Belanda memakai nasihat orientalis Dr. Snouck Hurgronje dan membentuk korps marsose pimpinan Van Heutsz yang bertindak sangat bengis membakar desa-desa. Teuku Umar gugur di Meulaboh (1899), Cut Nyak Dhien terus bergerilya meski buta hingga ditangkap (1905). Perlawanan rakyat Aceh tidak pernah benar-benar padam sampai masa proklamasi kemerdekaan.',
    keyDate: '26 Maret 1873 (Maklumat Perang) & 14 April 1873 (Tewasnya Jenderal Köhler)'
  },
  {
    id: 'perang-bali',
    title: 'Perang Jagaraga & Serangkaian Puputan di Bali',
    year: '1846–1908',
    era: 'daerah',
    location: 'Buleleng, Benteng Jagaraga, Badung, Klungkung, Pulau Bali',
    coordinates: { lat: -8.5369, lng: 115.405 },
    opponents: {
      nusantara: 'Kerajaan-kerajaan Berdaulat di Bali (Buleleng, Badung, Klungkung, Karangasem)',
      foreign: 'Pemerintah Kolonial Hindia Belanda (KNIL)'
    },
    leaders: {
      nusantara: ['I Gusti Ketut Jelantik (Patih Buleleng)', 'I Dewa Agung Istri Kanya', 'Raja Badung I Gusti Ngurah Made Agung'],
      foreign: ['Mayor Jenderal Michiels', 'Jenderal Van Swieten']
    },
    whatHappened: 'Belanda melancarkan beberapa kali ekspedisi militer ke Bali. Menghadapi meriam modern, para ksatria, raja, permaisuri, dan rakyat Bali memilih jalan *Puputan* — bertempur habis-habisan berbusana putih suci hingga tetes darah terakhir demi kehormatan tanah air.',
    causes: 'Sengketa hak Tawan Karang (tradisi kerajaan Bali menyita kapal karam di perairannya), penolakan raja-raja Bali mengakui kedaulatan Hindia Belanda, dan ekspansi politik kolonial.',
    purpose: 'Mempertahankan kedaulatan, martabat kehormatan (*dharmaning kshatriya*), dan tradisi luhur kerajaan-kerajaan Bali dari penjajahan bangsa asing.',
    impactAndResult: 'Benteng Jagaraga jatuh pada 1849 setelah perlawanan sengit I Gusti Ketut Jelantik. Disusul Puputan Badung pada 20 September 1906 dan Puputan Klungkung pada 28 April 1908 di mana Raja Klungkung beserta segenap kerabat keraton gugur syahid di medan laga. Seluruh Bali akhirnya jatuh ke administrasi Hindia Belanda.',
    keyDate: '1849 (Perang Jagaraga), 1906 (Puputan Badung), 1908 (Puputan Klungkung)'
  },
  {
    id: 'pemberontakan-peta-blitar',
    title: 'Pemberontakan Pasukan PETA di Blitar',
    year: '1945',
    era: 'kemerdekaan',
    location: 'Blitar, Jawa Timur',
    coordinates: { lat: -8.0983, lng: 112.1681 },
    opponents: {
      nusantara: 'Batalyon (Daidan) PETA Blitar',
      foreign: 'Tentara Pendudukan Militer Jepang (Dai Nippon)'
    },
    leaders: {
      nusantara: ['Shodanco Supriyadi', 'Chudancho Muradi', 'Shodanco Halir Mangkudijoyo'],
      foreign: ['Katamura (Komandan Pasukan Jepang)']
    },
    whatHappened: 'Pada dini hari 14 Februari 1945, pasukan PETA Blitar menembakkan mortir ke markas tentara Jepang di Hotel Blitar dan mengibarkan bendera Merah Putih di lapangan monumen Blitar, lalu bergerak ke lereng Gunung Kelud.',
    causes: 'Kemarahan mendalam melihat penderitaan rakyat akibat kerja paksa Romusha yang kurus kering mati kelaparan, penyerahan padi paksa yang merampas nafkah petani, dan pemaksaan gadis-gadis pribumi.',
    purpose: 'Melawan kediktatoran militer Jepang, menuntut keadilan bagi rakyat yang ditindas, dan menyalakan lentera revolusi kemerdekaan Indonesia.',
    impactAndResult: 'Pemberontakan dapat dipadamkan Jepang dengan tipu muslihat perundingan. Tokoh-tokoh utama seperti Chudancho Muradi dihukum mati di Pantai Ancol, sedangkan Shodanco Supriyadi menghilang secara misterius. Peristiwa ini mengguncang mental Jepang dan membuktikan tentara lokal tidak tunduk pada penjajah.',
    keyDate: '14 Februari 1945'
  }
];

export const MILESTONE_EVENTS: MilestoneEvent[] = [
  {
    id: 'budi-utomo',
    title: 'Berdirinya Budi Utomo (Tonggak Kebangkitan Nasional)',
    date: '20 Mei 1908',
    year: '1908',
    era: 'nasional',
    location: 'Gedung STOVIA (Museum Kebangkitan Nasional), Weltevreden, Batavia',
    coordinates: { lat: -6.1754, lng: 106.8436 },
    figures: ['dr. Soetomo', 'dr. Wahidin Sudirohusodo', 'Goenawan Mangoenkoesoemo', 'Soeradji Tirtonegoro'],
    whatHappened: 'Para pelajar sekolah dokter bumiputra STOVIA di Batavia mendeklarasikan pendirian organisasi modern pertama bernama Budi Utomo dengan tujuan memajukan pendidikan, kebudayaan, dan pengajaran bagi bangsa pribumi.',
    causes: 'Pendidikan diskriminatif zaman kolonial dan kesadaran bahwa perjuangan bersenjata yang bersifat kedaerahan selalu mudah dipatahkan politik pecah belah (*devide et impera*). Diperlukan wadah modern persatuan nasional.',
    importance: 'Menjadi fajar Kebangkitan Nasional Indonesia. Sejak saat itu perjuangan beralih dari senjata ke diplomasi, pena, organisasi modern, dan penyatuan kesadaran berbangsa. Tanggal 20 Mei diabadikan sebagai Hari Kebangkitan Nasional.',
    outcomes: 'Memicu lahirnya berbagai organisasi pergerakan pemuda dan politik berikutnya di seantero Nusantara.'
  },
  {
    id: 'sarekat-islam',
    title: 'Berkembangnya Sarekat Islam (Gerakan Massa Pertama)',
    date: '1911–1912',
    year: '1911–1912',
    era: 'nasional',
    location: 'Surakarta & Surabaya',
    coordinates: { lat: -7.5666, lng: 110.8293 },
    figures: ['H.O.S. Tjokroaminoto ("Guru Para Pendiri Bangsa")', 'Haji Samanhudi', 'Agus Salim', 'Abdul Muis'],
    whatHappened: 'Sarekat Dagang Islam (SDI) didirikan Samanhudi di Solo (1911) kemudian ditransformasikan oleh H.O.S. Tjokroaminoto menjadi Sarekat Islam (SI) di Surabaya (1912). SI berkembang pesat menjadi organisasi massa pertama dengan ratusan ribu anggota lintas daerah.',
    causes: 'Persaingan dagang batik dengan pedagang Tionghoa yang diistimewakan Belanda, serta kebutuhan rakyat jelata akan wadah pembela hak-hak ekonomi, sosial, dan agama.',
    importance: 'Membangkitkan kesadaran politik rakyat jelata akar rumput dan menentang imperialisme serta ketidakadilan kolonial secara terang-terangan.',
    outcomes: 'Melahirkan tokoh-tokoh besar pergerakan nasional termasuk Soekarno, Semaoen, dan Kartosoewirjo yang pernah berguru di rumah Tjokroaminoto.'
  },
  {
    id: 'indische-partij',
    title: 'Berdirinya Indische Partij (Partai Politik Kebangsaan Pertama)',
    date: '25 Desember 1912',
    year: '1912',
    era: 'nasional',
    location: 'Bandung, Jawa Barat',
    coordinates: { lat: -6.9175, lng: 107.6191 },
    figures: ['E.F.E. Douwes Dekker (Danudirja Setiabudi)', 'dr. Tjipto Mangoenkoesoemo', 'Suwardi Suryaningrat (Ki Hadjar Dewantara)'],
    whatHappened: 'Tiga Serangkai mendirikan partai politik modern pertama di Hindia Belanda yang secara tegas dan radikal mencanangkan kemerdekaan (*Indie los van Holland* / Hindia lepas dari Belanda).',
    causes: 'Diskriminasi sosial-politik pemerintah kolonial dan keyakinan bahwa seluruh penduduk Hindia (bumiputra, Indo, Tionghoa, Arab) adalah satu kesatuan bangsa yang berhak memerintah tanah airnya sendiri.',
    importance: 'Organisasi pertama yang secara terbuka menuntut kemerdekaan politik dan pemerintahan sendiri bagi bangsa Hindia (Indonesia).',
    outcomes: 'Partai dilarang oleh pemerintah kolonial pada 1913 dan ketiga tokohnya diasingkan ke Belanda setelah tulisan tajam Suwardi *"Als ik eens Nederlander was"* (Seandainya Aku Seorang Belanda).'
  },
  {
    id: 'pni-soekarno',
    title: 'Berdirinya Partai Nasional Indonesia (PNI)',
    date: '4 Juli 1927',
    year: '1927',
    era: 'nasional',
    location: 'Bandung, Jawa Barat',
    coordinates: { lat: -6.92, lng: 107.61 },
    figures: ['Ir. Soekarno', 'Mr. Iskaq Tjokrohadisoerjo', 'Mr. Sunario', 'dr. Cipto Mangunkusumo'],
    whatHappened: 'Ir. Soekarno bersama kawan-kawan Algemeene Studieclub mendirikan Perserikatan Nasional Indonesia (kelak Partai Nasional Indonesia) berasas non-kooperasi radikal dengan pemerintah kolonial.',
    causes: 'Kegagalan pemberontakan PKI 1926 menyisakan kekosongan politik pergerakan. Diperlukan partai berideologi nasionalisme murni yang menghimpun massa rakyat (Marhaen) menuju satu sasaran bulat: Indonesia Merdeka.',
    importance: 'Mengkristalisasikan cita-cita kemerdekaan Indonesia tanpa kompromi melalui doktrin kekuatan mandiri (*self-reliance*) dan persatuan nasional.',
    outcomes: 'Soekarno ditangkap pada Desember 1929 dan diadili di Landraad Bandung, di mana ia membacakan pledoi legendaris *"Indonesia Menggugat!"*.'
  },
  {
    id: 'sumpah-pemuda',
    title: 'Kongres Pemuda II & Ikrar Sumpah Pemuda',
    date: '27–28 Oktober 1928',
    year: '1928',
    era: 'nasional',
    location: 'Gedung Kramat 106 (Museum Sumpah Pemuda), Jakarta',
    coordinates: { lat: -6.1856, lng: 106.8441 },
    figures: ['Soegondo Djojopoespito (Ketua)', 'Mohammad Yamin (Sekretaris/Konseptor)', 'Wage Rudolf Supratman', 'Amir Sjarifoeddin', 'Djohan Mohammad Cai'],
    whatHappened: 'Ribuan wakil pemuda dari seluruh perhimpunan pemuda kedaerahan (Jong Java, Jong Sumatranen Bond, Jong Bataks Bond, Jong Islamieten Bond, Jong Celebes, Jong Ambon, Pemuda Kaum Betawi) mengikrarkan satu tanah air, satu bangsa, dan satu bahasa persatuan: Indonesia. Pada malam penutupan, W.R. Supratman untuk pertama kali memperdengarkan lagu kebangsaan "Indonesia Raya" dengan gesekan biolanya.',
    causes: 'Perlunya melebur sekat-sekat etnisitas, suku, agama, dan kedaerahan yang selama ini dimanfaatkan Belanda untuk memecah belah bangsa.',
    importance: 'Lahirnya identitas dan kesadaran resmi satu bangsa bernama "Indonesia". Ikrar ini menjadi pondasi sakral integrasi nasional menuju proklamasi 1945.',
    outcomes: 'Bahasa Melayu yang berkembang menjadi Bahasa Indonesia diakui sebagai bahasa pemersatu, mempercepat komunikasi dan solidaritas revolusi kemerdekaan.'
  },
  {
    id: 'kapitulasi-kalijati',
    title: 'Penyerahan Tanpa Syarat Belanda kepada Jepang di Kalijati',
    date: '8 Maret 1942',
    year: '1942',
    era: 'kemerdekaan',
    location: 'Pangkalan Udara Kalijati, Subang, Jawa Barat',
    coordinates: { lat: -6.5319, lng: 107.6744 },
    figures: ['Letjen Hein ter Poorten (Panglima KNIL)', 'Tjarda van Starkenborgh (Gubernur Jenderal)', 'Jenderal Hitoshi Imamura (Panglima Tentara Ke-16 Jepang)'],
    whatHappened: 'Pemerintah kolonial Hindia Belanda menyerah tanpa syarat kepada tentara pendudukan militer Kekaisaran Jepang melalui perundingan di Kalijati, Subang.',
    causes: 'Serangan kilat (blitzkrieg) angkatan perang Jepang yang meremukkan benteng pertahanan Sekutu dan Belanda di Laut Jawa serta daratan Nusantara.',
    importance: 'Meruntuhkan mitos kekal kekuasaan bangsa kulit putih (Belanda) di Indonesia selama lebih dari 3 abad dalam tempo kurang dari 3 bulan.',
    outcomes: 'Dimulainya era pendudukan militer Dai Nippon, membawa dinamika politik baru yang membuka jalan pembentukan militer lokal dan badan persiapan kemerdekaan.'
  },
  {
    id: 'pembentukan-peta',
    title: 'Pembentukan PETA (Tentara Sukarela Pembela Tanah Air)',
    date: '3 Oktober 1943',
    year: '1943',
    era: 'kemerdekaan',
    location: 'Bogor & Jawa-Bali',
    coordinates: { lat: -6.5971, lng: 106.806 },
    figures: ['Gatot Mangkupraja', 'Letjen Kumakichi Harada', 'Kyai Zaenal Mustafa'],
    whatHappened: 'Jepang secara resmi mengeluarkan Osamu Seirei No. 44 tentang pembentukan Tentara Sukarela Pembela Tanah Air (PETA) untuk membantu pertahanan menghadapi Sekutu.',
    causes: 'Jepang terdesak dalam Perang Pasifik dan membutuhkan dukungan tenaga militer lokal Nusantara.',
    importance: 'Mendidik puluhan ribu pemuda Indonesia dengan disiplin taktik tempur modern, kepemimpinan komando, dan keberanian militer.',
    outcomes: 'Para perwira lulusan PETA (seperti Jenderal Soedirman, Ahmad Yani, Soeharto, Supriyadi) kelak menjadi tulang punggung Tentara Nasional Indonesia (TNI) mempertahankan kemerdekaan.'
  },
  {
    id: 'bpupki-dibentuk',
    title: 'Pengumuman & Pembentukan Resmi BPUPKI (Dokuritsu Junbi Cosakai)',
    date: '29 April 1945',
    year: '1945',
    era: 'kemerdekaan',
    location: 'Gedung Chuo Sangi-in (Gedung Pancasila, Pejambon), Jakarta',
    coordinates: { lat: -6.1706, lng: 106.8329 },
    figures: ['dr. K.R.T. Radjiman Wedyodiningrat (Ketua)', 'Ichibangase Yosio (Wakil)', 'R.P. Soeroso (Wakil)', '67 Anggota Tokoh Bangsa'],
    whatHappened: 'Letjen Kumakichi Harada meresmikan pembentukan Badan Penyelidik Usaha-Usaha Persiapan Kemerdekaan Indonesia (BPUPKI) bertepatan hari ulang tahun Kaisar Hirohito.',
    causes: 'Posisi militer Jepang di Asia-Pasifik makin terdesak dan membutuhkan simpati serta partisipasi aktif rakyat Indonesia dengan janji kemerdekaan.',
    importance: 'Lembaga formal pertama tempat para bapak pendiri bangsa merumuskan dasar negara, batas wilayah, dan konstitusi negara Indonesia berdaulat.',
    outcomes: 'Menyelenggarakan dua sidang bersejarah yang melahirkan Pancasila dan rancangan UUD 1945.'
  },
  {
    id: 'hari-lahir-pancasila',
    title: 'Sidang I BPUPKI: Pidato Lahirnya Pancasila Bung Karno',
    date: '29 Mei – 1 Juni 1945',
    year: '1945',
    era: 'kemerdekaan',
    location: 'Gedung Chuo Sangi-in (Gedung Pancasila), Jakarta',
    coordinates: { lat: -6.1706, lng: 106.8329 },
    figures: ['Ir. Soekarno', 'Prof. Mohammad Yamin', 'Prof. Dr. Soepomo', 'dr. Radjiman Wedyodiningrat'],
    whatHappened: 'Setelah mendengarkan gagasan dasar negara dari Moh. Yamin dan Soepomo, pada hari terakhir sidang (1 Juni 1945), Ir. Soekarno menyampaikan pidato berapi-api tanpa naskah mengajukan lima prinsip dasar negara yang ia beri nama "Pancasila": Kebangsaan Indonesia, Internasionalisme atau Perikemanusiaan, Mufakat atau Demokrasi, Kesejahteraan Sosial, dan Ketuhanan yang Berkebudayaan.',
    causes: 'Negara merdeka yang akan lahir memerlukan *Philosophische Grondslag* (dasar filsafat) dan *Weltanschauung* (pandangan dunia) yang kokoh dan menyatukan seluruh suku dan agama.',
    importance: 'Lahirnya lima sila falsafah bangsa yang menjadi perekat abadi persatuan Indonesia. Tanggal 1 Juni ditetapkan sebagai Hari Lahir Pancasila.',
    outcomes: 'Dibentuknya Panitia Delapan dan Panitia Sembilan untuk menampung dan menyempurnakan usulan dasar negara.'
  },
  {
    id: 'piagam-jakarta',
    title: 'Perumusan Piagam Jakarta (Jakarta Charter)',
    date: '22 Juni 1945',
    year: '1945',
    era: 'kemerdekaan',
    location: 'Kediaman Bung Karno, Jl. Pegangsaan Timur 56, Jakarta',
    coordinates: { lat: -6.2008, lng: 106.8488 },
    figures: ['Panitia Sembilan: Soekarno, Hatta, Maramis, Abikoesno, Kahar Muzakkir, Agus Salim, Subardjo, Wahid Hasjim, Moh. Yamin'],
    whatHappened: 'Panitia Sembilan berhasil mencapai kompromi luhur antara golongan kebangsaan dan golongan Islam, merumuskan rancangan naskah Pembukaan Undang-Undang Dasar yang dinamai Moh. Yamin sebagai "Piagam Jakarta".',
    causes: 'Perlunya menjembatani aspirasi negara sekuler dan negara Islam dalam sebuah kompromi nasional yang adil.',
    importance: 'Menjadi naskah Pembukaan UUD 1945 (Preambule) yang memuat rumusan sila-sila dasar negara.',
    outcomes: 'Kalimat sila pertama kelak disepakati diubah pada 18 Agustus 1945 menjadi "Ketuhanan Yang Maha Esa" demi menjaga keutuhan Negara Kesatuan Republik Indonesia bersama saudara dari Indonesia Timur.'
  },
  {
    id: 'sidang-ii-bpupki',
    title: 'Sidang II BPUPKI: Rancangan UUD & Batas Wilayah Negara',
    date: '10–17 Juli 1945',
    year: '1945',
    era: 'kemerdekaan',
    location: 'Gedung Gedung Pancasila, Pejambon Jakarta',
    coordinates: { lat: -6.1706, lng: 106.8329 },
    figures: ['Soekarno', 'Hatta', 'Soepomo', 'Radjiman'],
    whatHappened: 'Sidang kedua membahas bentuk negara (disepakati Republik), wilayah negara (seluruh bekas wilayah Hindia Belanda), rancangan UUD, kewarganegaraan, dan sistem ekonomi.',
    causes: 'Mempersiapkan instrumen konstitusional yuridis lengkap sebelum pelaksanaan kemerdekaan.',
    importance: 'Melahirkan draf utuh konstitusi negara yang mengutamakan kedaulatan rakyat dan kesejahteraan sosial.',
    outcomes: 'Tugas BPUPKI selesai dengan tuntas dan badan ini dibubarkan pada 7 Agustus 1945.'
  },
  {
    id: 'pembentukan-ppki',
    title: 'Pembentukan PPKI (Dokuritsu Junbi Inkai)',
    date: '7 Agustus 1945',
    year: '1945',
    era: 'kemerdekaan',
    location: 'Jakarta',
    coordinates: { lat: -6.1706, lng: 106.8329 },
    figures: ['Ir. Soekarno (Ketua)', 'Drs. Mohammad Hatta (Wakil Ketua)', '21 Anggota Perwakilan Daerah se-Indonesia'],
    whatHappened: 'Panglima Tentara Wilayah Selatan Marsekal Terauchi menyetujui pembentukan Panitia Persiapan Kemerdekaan Indonesia (PPKI) yang beranggotakan murni tokoh-tokoh dari segenap suku bangsa di Nusantara.',
    causes: 'Persiapan akhir transfer kekuasaan pemerintahan dari penguasa militer Jepang kepada bangsa Indonesia.',
    importance: 'Badan representatif yang secara sah mewakili seluruh rakyat Indonesia mengesahkan konstitusi dan mengangkat pemimpin pertama Republik Indonesia.',
    outcomes: 'Pada 9 Agustus 1945, Soekarno, Hatta, dan Radjiman bertolak ke Dalat, Vietnam menemui Terauchi.'
  },
  {
    id: 'bom-atom-jepang-menyerah',
    title: 'Bom Atom Hiroshima-Nagasaki & Kapitulasi Jepang',
    date: '6, 9 & 15 Agustus 1945',
    year: '1945',
    era: 'kemerdekaan',
    location: 'Hiroshima & Nagasaki (Jepang)',
    coordinates: { lat: 34.3853, lng: 132.4553 },
    figures: ['Kaisar Hirohito', 'Sutan Sjahrir (Penyadap Siaran Radio Sekutu)'],
    whatHappened: 'Amerika Serikat menjatuhkan bom atom di Hiroshima (6 Agustus) dan Nagasaki (9 Agustus). Pada 14-15 Agustus 1945, Kaisar Hirohito mengumumkan siaran radio menyerah tanpa syarat kepada Sekutu (*Gyokuon-hoso*).',
    causes: 'Kehancuran fatal infrastruktur dan moral militer Kekaisaran Jepang dalam Perang Dunia II.',
    importance: 'Terjadinya "Vacuum of Power" (kekosongan kekuasaan politik) di tanah air Indonesia, di mana tentara Jepang kehilangan legitimasi, sementara tentara Sekutu/Belanda belum tiba.',
    outcomes: 'Sutan Sjahrir dan golongan pemuda segera mendesak Bung Karno dan Bung Hatta untuk memproklamasikan kemerdekaan secepat mungkin sebelum Sekutu mendarat.'
  },
  {
    id: 'peristiwa-rengasdengklok',
    title: 'Peristiwa Rengasdengklok: Desakan Golongan Muda',
    date: '16 Agustus 1945 (Dini Hari)',
    year: '1945',
    era: 'kemerdekaan',
    location: 'Rumah Djiaw Kie Siong, Rengasdengklok, Karawang, Jawa Barat',
    coordinates: { lat: -6.1583, lng: 107.2975 },
    figures: ['Sukarni', 'Wikana', 'Chaerul Saleh', 'Jusuf Kunto', 'Ir. Soekarno & Fatmawati (serta Guntur)', 'Drs. Mohammad Hatta', 'Mr. Ahmad Soebardjo'],
    whatHappened: 'Golongan pemuda membawa Soekarno dan Mohammad Hatta ke Rengasdengklok pada pukul 04.00 WIB. Mereka ingin menjauhkan kedua pemimpin dari tekanan militer Jepang dan mendesak proklamasi dilaksanakan atas nama bangsa Indonesia, bukan hadiah Jepang.',
    causes: 'Perbedaan pandangan: Pemuda menghendaki proklamasi segera tanggal 16 Agustus, sedangkan Soekarno-Hatta ingin berunding dengan anggota PPKI demi menghindari pertumpahan darah dengan tentara Jepang.',
    importance: 'Menegaskan bahwa kemerdekaan Indonesia adalah perjuangan murni hasil keringat dan darah bangsa sendiri, bukan titipan fasis Jepang.',
    outcomes: 'Mr. Ahmad Soebardjo tiba di Rengasdengklok memberi jaminan nyawa bahwa Proklamasi akan dikumandangkan di Jakarta paling lambat tanggal 17 Agustus 1945 pukul 12.00 WIB. Soekarno-Hatta diantar kembali ke Jakarta.'
  },
  {
    id: 'perumusan-naskah-proklamasi',
    title: 'Malam Bersejarah: Perumusan Teks Proklamasi di Rumah Laksamana Maeda',
    date: '16–17 Agustus 1945 (Dini Hari)',
    year: '1945',
    era: 'kemerdekaan',
    location: 'Rumah Laksamana Tadashi Maeda (Museum Perumusan Naskah Proklamasi), Jl. Imam Bonjol No. 1, Menteng, Jakarta',
    coordinates: { lat: -6.1989, lng: 106.8317 },
    figures: ['Ir. Soekarno', 'Drs. Mohammad Hatta', 'Mr. Ahmad Soebardjo', 'Sayuti Melik', 'B.M. Diah', 'Sukarni', 'Laksamana Tadashi Maeda'],
    whatHappened: 'Di ruang makan rumah perwira penghubung AL Jepang Laksamana Maeda, Soekarno menuliskan konsep naskah dengan tangan beralaskan secarik kertas, dibantu pemikiran Hatta dan Soebardjo. Sukarni mengusulkan teks ditandatangani oleh Soekarno dan Hatta "Atas nama bangsa Indonesia". Naskah kemudian diketik rapi dengan mesin tik oleh Sayuti Melik didampingi wartawan B.M. Diah.',
    causes: 'Kebutuhan mendesak akan pernyataan proklamasi tertulis yang padat, singkat, lugas, dan memiliki kepastian hukum internasional.',
    importance: 'Lahirnya naskah Proklamasi otentik yang mengubah nasib ratusan juta rakyat jajahan menjadi bangsa merdeka.',
    outcomes: 'Disepakati pembacaan proklamasi dilaksanakan pada hari Jumat legi, 17 Agustus 1945 pukul 10.00 WIB di halaman rumah Bung Karno, Jl. Pegangsaan Timur 56 Jakarta.'
  },
  {
    id: 'hari-proklamasi-17-agustus',
    title: 'PROKLAMASI KEMERDEKAAN REPUBLIK INDONESIA',
    date: '17 Agustus 1945 (Pukul 10.00 WIB)',
    year: '1945',
    era: 'kemerdekaan',
    location: 'Kediaman Bung Karno, Jalan Pegangsaan Timur No. 56, Jakarta Pusat',
    coordinates: { lat: -6.2008, lng: 106.8488 },
    figures: ['Ir. Soekarno', 'Drs. Mohammad Hatta', 'Ibu Fatmawati (Penjahit Bendera Pusaka)', 'Latief Hendraningrat & Suhud Sastro Kusumo (Pengibar Bendera)', 'S.K. Trimurti', 'dr. Muwardi', 'Suwiryo (Walikota Jakarta)'],
    whatHappened: 'Di hadapan ratusan tokoh pemuda dan rakyat yang berkumpul dalam suasana khidmat dan tegang, Ir. Soekarno didampingi Mohammad Hatta membacakan Teks Proklamasi Kemerdekaan Indonesia. Sang Merah Putih yang dijahit tangan oleh Ibu Fatmawati dikibarkan diiringi lagu kebangsaan Indonesia Raya tanpa musik orkes.',
    causes: 'Puncak kulminasi perjuangan berdarah ratusan tahun rakyat Nusantara mengusir imperialisme Portugis, VOC, Hindia Belanda, Inggris, dan Jepang.',
    importance: 'Momen paling suci dan monumental dalam sejarah Indonesia: Lahirnya Negara Kesatuan Republik Indonesia yang merdeka, bersatu, berdaulat, adil, dan makmur!',
    outcomes: 'Berita proklamasi disebarkan melalui kantor berita Domei oleh Jusuf Ronodipuro, telegram, pamflet, dan coretan gerbong kereta api ke seluruh penjuru dunia.',
    proclamationText: true
  },
  {
    id: 'pengesahan-uud-presiden',
    title: 'Sidang I PPKI: Pengesahan UUD 1945 & Pemilihan Presiden/Wapres',
    date: '18 Agustus 1945',
    year: '1945',
    era: 'kemerdekaan',
    location: 'Gedung Kesenian Jakarta / Pejambon, Jakarta',
    coordinates: { lat: -6.1706, lng: 106.8329 },
    figures: ['Ir. Soekarno', 'Drs. Mohammad Hatta', 'Otto Iskandardinata', 'Kasman Singodimedjo'],
    whatHappened: 'Sidang pertama PPKI mengambil 3 keputusan bersejarah: 1) Mengesahkan UUD 1945 sebagai konstitusi negara setelah menyempurnakan sila pertama menjadi "Ketuhanan Yang Maha Esa"; 2) Memilih Ir. Soekarno sebagai Presiden dan Drs. Mohammad Hatta sebagai Wakil Presiden RI secara aklamasi atas usulan Otto Iskandardinata; 3) Memutuskan Presiden untuk sementara waktu dibantu oleh sebuah Komite Nasional.',
    causes: 'Negara yang baru merdeka membutuhkan landasan hukum dasar (konstitusi) dan kepala pemerintahan sah untuk menjalankan kedaulatan.',
    importance: 'Resminya struktur tata negara Republik Indonesia modern berdasar hukum.',
    outcomes: 'Indonesia memiliki konstitusi tertulis, Presiden, dan Wakil Presiden pertama.'
  },
  {
    id: 'pembagian-provinsi-kabinet',
    title: 'Pembentukan Pemerintahan: 8 Provinsi & Kabinet Pertama RI',
    date: '19 Agustus 1945',
    year: '1945',
    era: 'kemerdekaan',
    location: 'Jakarta',
    coordinates: { lat: -6.1706, lng: 106.8329 },
    figures: ['Soekarno', 'Hatta', 'Mr. Kasman Singodimedjo', '8 Gubernur Pertama'],
    whatHappened: 'Sidang PPKI kedua menetapkan pembagian wilayah Indonesia menjadi 8 Provinsi (Sumatra, Jawa Barat, Jawa Tengah, Jawa Timur, Sunda Kecil/Bali-Nusa Tenggara, Maluku, Sulawesi, dan Kalimantan) beserta pengangkatan para gubernurnya, serta pembentukan 12 kementerian kabinet departemen.',
    causes: 'Pentingnya menegakkan tata kelola pemerintahan dan administrasi publik di seluruh pulau nusantara.',
    importance: 'Menghubungkan pusat dan daerah dalam satu kesatuan kedaulatan administratif Republik.',
    outcomes: 'Pemerintahan sipil daerah mulai bekerja mengambil alih kantor-kantor dari tangan Jepang.'
  },
  {
    id: 'knip-bkr-dilantik',
    title: 'Pembentukan BKR & Pelantikan KNIP',
    date: '22 & 29 Agustus 1945',
    year: '1945',
    era: 'kemerdekaan',
    location: 'Gedung Komedi / Kesenian Pasar Baru, Jakarta',
    coordinates: { lat: -6.1664, lng: 106.8344 },
    figures: ['Mr. Kasman Singodimedjo (Ketua KNIP)', 'M. Soetardjo Kartohadikoesoemo', 'Mr. J. Latuharhary', 'Adam Malik'],
    whatHappened: 'Pada 22 Agustus dibentuk Badan Keamanan Rakyat (BKR) untuk menjaga ketertiban umum dan menampung bekas prajurit PETA, Heiho, KNIL. Pada 29 Agustus 1945, Komite Nasional Indonesia Pusat (KNIP) dengan 137 anggota resmi dilantik sebagai parlemen/badan perwakilan rakyat perdana.',
    causes: 'Kebutuhan mendesak akan lembaga perwakilan rakyat dan aparatur pertahanan keamanan sebelum tentara Sekutu mendarat.',
    importance: 'Kelengkapan organ negara demokrasi: legislatif (KNIP) dan embrio angkatan bersenjata republik (BKR -> TKR -> TRI -> TNI).',
    outcomes: 'Republik Indonesia telah utuh memiliki segenap syarat negara merdeka menurut hukum internasional (wilayah, rakyat, kedaulatan pemerintahan, dan kemampuan membina pertahanan).'
  }
];

export const FULL_TIMELINE: TimelineEntry[] = [
  { id: 't1', year: '1511', title: 'Portugis merebut Malaka', category: 'pelayaran', stage: 1, summary: 'Afonso de Albuquerque menaklukkan Malaka sebagai kunci jalur perniagaan rempah.' },
  { id: 't2', year: '1512', title: 'Portugis tiba di Ternate & Ambon', category: 'pelayaran', stage: 1, summary: 'Francisco Serrão mendarat di Ternate dan menjalin hubungan dagang cengkih.' },
  { id: 't3', year: '1521', title: 'Spanyol mendarat di Tidore', category: 'pelayaran', stage: 1, summary: 'Armada sisa Magellan pimpinan Juan Sebastian Elcano tiba di Tidore Maluku.' },
  { id: 't4', year: '1570–1575', title: 'Sultan Baabullah mengusir Portugis dari Ternate', category: 'peperangan', stage: 1, summary: 'Pembalasan atas pembunuhan Sultan Hairun, benteng Portugis dikepung 5 tahun hingga terusir.' },
  { id: 't5', year: '1596', title: 'Cornelis de Houtman mendarat di Banten', category: 'pelayaran', stage: 1, summary: 'Pendaratan perdana ekspedisi 4 kapal dagang Belanda di tanah Jawa.' },
  { id: 't6', year: '1602', title: 'Kongsi Dagang VOC didirikan', category: 'pelayaran', stage: 1, summary: 'Belanda memberi hak istimewa (Octrooi) kepada VOC untuk memonopoli perniagaan.' },
  { id: 't7', year: '1602', title: 'Inggris (EIC) tiba di Aceh & Banten', category: 'pelayaran', stage: 1, summary: 'Sir James Lancaster mendirikan loji dagang EIC pertama di Banten.' },
  { id: 't8', year: '1619', title: 'J.P. Coen mendirikan Batavia', category: 'pelayaran', stage: 1, summary: 'VOC menghancurkan Jayakarta dan menjadikannya markas pusat kolonial.' },
  { id: 't9', year: '1628–1629', title: 'Serangan Sultan Agung Mataram ke Batavia', category: 'peperangan', stage: 1, summary: 'Puluhan ribu laskar Mataram mengepung Batavia mengikis hegemoni VOC.' },
  { id: 't10', year: '1666–1669', title: 'Perang Makassar (Sultan Hasanuddin vs VOC)', category: 'peperangan', stage: 1, summary: 'Perang kedaulatan maritim Indonesia Timur berakhir dengan Perjanjian Bongaya.' },
  { id: 't11', year: '1674–1680', title: 'Pemberontakan Trunajaya', category: 'peperangan', stage: 1, summary: 'Perlawanan bangsawan Madura terhadap tirani Mataram dan campur tangan VOC.' },
  { id: 't12', year: '1686–1706', title: 'Perlawanan Untung Suropati di Pasuruan', category: 'peperangan', stage: 1, summary: 'Untung Suropati menewaskan Kapten Tack dan mempertahankan kadipaten berdaulat.' },
  { id: 't13', year: '1741–1743', title: 'Geger Pacinan & Perlawanan Tionghoa-Jawa', category: 'peperangan', stage: 1, summary: 'Aliansi pejuang Tionghoa dan laskar Jawa menyerbu pos-pos VOC pasca pembantaian Batavia.' },
  { id: 't14', year: '1799–1800', title: 'VOC bangkrut, beralih ke Pemerintah Hindia Belanda', category: 'pelayaran', stage: 1, summary: 'Korupsi akut mengakhiri VOC; pemerintah Kerajaan Belanda mengambil alih jajahan.' },
  { id: 't15', year: '1803–1837', title: 'Perang Padri di Sumatra Barat', category: 'peperangan', stage: 1, summary: 'Tuanku Imam Bonjol memimpin perlawanan Minangkabau mengusir tentara Belanda.' },
  { id: 't16', year: '1811–1816', title: 'Pemerintahan Thomas Stamford Raffles (Inggris)', category: 'pelayaran', stage: 1, summary: 'Inggris menguasai Jawa, memprakarsai sistem sewa tanah, dan menulis Sejarah Jawa.' },
  { id: 't17', year: '1817', title: 'Perlawanan Kapitan Pattimura di Maluku', category: 'peperangan', stage: 1, summary: 'Rakyat Saparua merebut Benteng Duurstede menentang kembalinya penindasan Belanda.' },
  { id: 't18', year: '1825–1830', title: 'Perang Diponegoro (Perang Jawa)', category: 'peperangan', stage: 1, summary: 'Pangeran Diponegoro memimpin perang suci yang membangkrutkan kas kolonial Belanda.' },
  { id: 't19', year: '1846–1908', title: 'Perang Jagaraga & Serangkaian Puputan di Bali', category: 'peperangan', stage: 1, summary: 'Ksatria dan rakyat Bali bertempur hingga titik darah penghabisan mempertahankan kehormatan.' },
  { id: 't20', year: '1859–1905', title: 'Perang Banjar', category: 'peperangan', stage: 1, summary: 'Pangeran Antasari dan laskar Banjar-Dayak mengobarkan perlawanan puluhan tahun di Barito.' },
  { id: 't21', year: '1873–1904', title: 'Perang Aceh', category: 'peperangan', stage: 1, summary: 'Belanda menyatakan perang terhadap Aceh; perlawanan gerilya Perang Sabil paling gigih.' },
  { id: 't22', year: '20 Mei 1908', title: 'Budi Utomo berdiri', category: 'pergerakan', stage: 2, summary: 'Pelajar STOVIA memelopori era Kebangkitan Nasional melalui pendidikan dan organisasi.' },
  { id: 't23', year: '1911–1912', title: 'Sarekat Islam berkembang pesat', category: 'pergerakan', stage: 2, summary: 'H.O.S. Tjokroaminoto menggalang gerakan massa pertama rakyat jelata memperjuangkan hak.' },
  { id: 't24', year: '25 Des 1912', title: 'Indische Partij didirikan', category: 'pergerakan', stage: 2, summary: 'Tiga Serangkai secara terbuka menuntut kemerdekaan Hindia dari penjajahan Belanda.' },
  { id: 't25', year: '4 Juli 1927', title: 'PNI didirikan oleh Bung Karno', category: 'pergerakan', stage: 2, summary: 'Partai Nasional Indonesia memelopori gerakan non-kooperasi radikal menuju Indonesia Merdeka.' },
  { id: 't26', year: '28 Okt 1928', title: 'Kongres Pemuda II & Sumpah Pemuda', category: 'pergerakan', stage: 2, summary: 'Ikrar Satu Tanah Air, Satu Bangsa, Satu Bahasa Indonesia; lagu Indonesia Raya berkumandang.' },
  { id: 't27', year: '8 Maret 1942', title: 'Belanda menyerah tanpa syarat kepada Jepang', category: 'persiapan', stage: 3, summary: 'Kapitulasi Kalijati mengakhiri 350 tahun penjajahan Belanda digantikan fasisme Jepang.' },
  { id: 't28', year: '3 Okt 1943', title: 'Pembentukan PETA', category: 'persiapan', stage: 3, summary: 'Tentara sukarela pribumi dibentuk untuk pertahanan; melahirkan cikal bakal TNI.' },
  { id: 't29', year: '14 Feb 1945', title: 'Pemberontakan PETA di Blitar', category: 'peperangan', stage: 3, summary: 'Shodanco Supriyadi memimpin pemberontakan bersenjata melawan perlakuan kejam tentara Jepang.' },
  { id: 't30', year: '1 Maret 1945', title: 'Pengumuman rencana pembentukan BPUPKI', category: 'persiapan', stage: 3, summary: 'Jepang terdesak dalam Perang Pasifik dan menjanjikan persiapan kemerdekaan Indonesia.' },
  { id: 't31', year: '29 April 1945', title: 'BPUPKI resmi dibentuk', category: 'persiapan', stage: 3, summary: 'Badan Penyelidik Usaha-Usaha Persiapan Kemerdekaan Indonesia mulai menyusun dasar negara.' },
  { id: 't32', year: '1 Juni 1945', title: 'Pidato Hari Lahir Pancasila', category: 'persiapan', stage: 3, summary: 'Bung Karno menyampaikan konsep lima prinsip dasar negara yang diberi nama Pancasila.' },
  { id: 't33', year: '22 Juni 1945', title: 'Piagam Jakarta dirumuskan', category: 'persiapan', stage: 3, summary: 'Panitia Sembilan merumuskan naskah mukadimah konstitusi dan kompromi dasar negara.' },
  { id: 't34', year: '10–17 Juli 1945', title: 'Sidang kedua BPUPKI', category: 'persiapan', stage: 3, summary: 'Membahas bentuk negara Republik, batas wilayah, dan rancangan Undang-Undang Dasar.' },
  { id: 't35', year: '7 Agustus 1945', title: 'BPUPKI dibubarkan & PPKI dibentuk', category: 'persiapan', stage: 3, summary: 'Panitia Persiapan Kemerdekaan Indonesia dipimpin Soekarno dan Mohammad Hatta.' },
  { id: 't36', year: '6 & 9 Ags 1945', title: 'Bom atom Hiroshima & Nagasaki', category: 'persiapan', stage: 3, summary: 'Dua kota utama Jepang luluh lantak oleh bom atom Sekutu; posisi Jepang runtuh total.' },
  { id: 't37', year: '14–15 Ags 1945', title: 'Jepang menyerah tanpa syarat kepada Sekutu', category: 'persiapan', stage: 3, summary: 'Kaisar Hirohito menyerah; terjadi kekosongan kekuasaan (vacuum of power) di Nusantara.' },
  { id: 't38', year: '15 Agustus 1945', title: 'Perbedaan pendapat Golongan Muda & Tua', category: 'persiapan', stage: 3, summary: 'Pemuda mendesak proklamasi segera tanpa persetujuan Jepang; Soekarno menimbang keselamatan.' },
  { id: 't39', year: '16 Agustus 1945', title: 'Peristiwa Rengasdengklok', category: 'persiapan', stage: 3, summary: 'Pemuda membawa Soekarno-Hatta ke Karawang demi mengamankan proklamasi mandiri.' },
  { id: 't40', year: '16–17 Ags (Malam)', title: 'Perumusan Teks Proklamasi di Rumah Maeda', category: 'persiapan', stage: 3, summary: 'Soekarno, Hatta, dan Subardjo merumuskan naskah proklamasi; diketik Sayuti Melik.' },
  { id: 't41', year: '17 Agustus 1945', title: 'PROKLAMASI KEMERDEKAAN INDONESIA', category: 'proklamasi', stage: 3, summary: 'Pukul 10.00 WIB di Pegangsaan Timur 56, Bung Karno membacakan teks Proklamasi Kemerdekaan.' },
  { id: 't42', year: '18 Agustus 1945', title: 'UUD 1945 disahkan & Presiden/Wapres terpilih', category: 'proklamasi', stage: 3, summary: 'PPKI mengesahkan konstitusi dan menetapkan Soekarno-Hatta sebagai pemimpin pertama RI.' },
  { id: 't43', year: '19 Agustus 1945', title: 'Pembentukan 8 Provinsi & Kabinet Pertama RI', category: 'proklamasi', stage: 3, summary: 'Struktur pemerintahan daerah dan 12 departemen kementerian mulai ditegakkan.' },
  { id: 't44', year: '22 Agustus 1945', title: 'Keputusan pembentukan BKR & KNIP', category: 'proklamasi', stage: 3, summary: 'Disiapkan badan keamanan rakyat dan komite perwakilan guna mendukung republik.' },
  { id: 't45', year: '29 Agustus 1945', title: 'KNIP resmi dilantik', category: 'proklamasi', stage: 3, summary: 'Komite Nasional Indonesia Pusat mulai bertugas membantu Presiden menjalankan fungsi legislatif.' }
];

export const PROCLAMATION_TEXT_AUTHENTIC = `P R O K L A M A S I

Kami bangsa Indonesia dengan ini menjatakan kemerdekaan Indonesia.

Hal-hal jang mengenai pemindahan kekoeasaan d.l.l., diselenggarakan dengan tjara seksama dan dalam tempo jang sesingkat-singkatnja.

Djakarta, hari 17 boelan 8 tahoen 05

Atas nama bangsa Indonesia
Soekarno / Hatta`;

export const PROCLAMATION_NOTES = {
  calendarNote: 'Tahun 05 merupakan penulisan tahun Jepang 2605 (Kōki), yang bertepatan dengan tahun 1945 dalam kalender Masehi.',
  significancePoints: [
    'Indonesia menyatakan kemerdekaannya secara sah dan berdaulat kepada seluruh rakyat dan dunia internasional.',
    'Bangsa Indonesia memegang hak penuh menentukan nasib, sistem pemerintahan, dan masa depan tanah airnya sendiri tanpa campur tangan bangsa asing.',
    'Pemindahan kekuasaan diselenggarakan dengan saksama dan dalam tempo sesingkat-singkatnya sebagai penegasan kedaulatan de facto dan de jure.'
  ],
  conclusionSummary: `Perjalanan menuju kemerdekaan terbagi dalam tiga tahap besar:
1. Tahap Perlawanan Daerah: Rakyat dan kerajaan melawan dominasi Portugis, VOC, serta kolonial Belanda demi mempertahankan wilayah, kehormatan, dan hak hidup.
2. Tahap Pergerakan Nasional: Perjuangan bermetamorfosis melalui organisasi modern, pendidikan, pers, kesadaran satu nusa bangsa, dan diplomasi politik.
3. Tahap Persiapan & Proklamasi: Runtuhnya militer Jepang, dialektika pemuda-tua di Rengasdengklok, hingga dikumandangkannya teks suci Proklamasi 17 Agustus 1945.

Proklamasi adalah deklarasi kemerdekaan, bukan akhir seluruh perjuangan. Setelah 17 Agustus 1945, bangsa Indonesia masih harus mempertahankan kemerdekaannya menghadapi agresi militer Belanda melalui diplomasi dan perjuangan bersenjata.`
};
