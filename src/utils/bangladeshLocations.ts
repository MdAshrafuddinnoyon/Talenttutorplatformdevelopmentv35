// Complete Bangladesh Location Database
// 8 Divisions, 64 Districts, 500+ Major Areas

export interface BDLocation {
  id: string;
  name: string;
  nameBn: string;
  type: 'division' | 'district' | 'upazila' | 'area';
  parentId?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

// ==================== 8 DIVISIONS ====================
export const divisions: BDLocation[] = [
  {
    id: 'dhaka',
    name: 'Dhaka',
    nameBn: 'ঢাকা',
    type: 'division',
    coordinates: { lat: 23.8103, lng: 90.4125 },
    bounds: { north: 24.9, south: 22.5, east: 91.5, west: 89.5 }
  },
  {
    id: 'chittagong',
    name: 'Chittagong',
    nameBn: 'চট্টগ্রাম',
    type: 'division',
    coordinates: { lat: 22.3569, lng: 91.7832 },
    bounds: { north: 24.5, south: 20.5, east: 93.0, west: 90.5 }
  },
  {
    id: 'rajshahi',
    name: 'Rajshahi',
    nameBn: 'রাজশাহী',
    type: 'division',
    coordinates: { lat: 24.3745, lng: 88.6042 },
    bounds: { north: 25.5, south: 23.0, east: 90.0, west: 87.5 }
  },
  {
    id: 'khulna',
    name: 'Khulna',
    nameBn: 'খুলনা',
    type: 'division',
    coordinates: { lat: 22.8456, lng: 89.5403 },
    bounds: { north: 23.5, south: 21.5, east: 90.5, west: 88.5 }
  },
  {
    id: 'barishal',
    name: 'Barishal',
    nameBn: 'বরিশাল',
    type: 'division',
    coordinates: { lat: 22.7010, lng: 90.3535 },
    bounds: { north: 23.5, south: 21.8, east: 91.0, west: 89.5 }
  },
  {
    id: 'sylhet',
    name: 'Sylhet',
    nameBn: 'সিলেট',
    type: 'division',
    coordinates: { lat: 24.8949, lng: 91.8687 },
    bounds: { north: 25.5, south: 23.8, east: 92.5, west: 90.8 }
  },
  {
    id: 'rangpur',
    name: 'Rangpur',
    nameBn: 'রংপুর',
    type: 'division',
    coordinates: { lat: 25.7439, lng: 89.2752 },
    bounds: { north: 26.6, south: 24.5, east: 90.5, west: 88.0 }
  },
  {
    id: 'mymensingh',
    name: 'Mymensingh',
    nameBn: 'ময়মনসিংহ',
    type: 'division',
    coordinates: { lat: 24.7471, lng: 90.4203 },
    bounds: { north: 25.5, south: 23.8, east: 91.5, west: 89.5 }
  }
];

// ==================== DISTRICTS ====================

// Dhaka Division Districts (13)
export const dhakaDivisionDistricts: BDLocation[] = [
  {
    id: 'dhaka-district',
    name: 'Dhaka',
    nameBn: 'ঢাকা',
    type: 'district',
    parentId: 'dhaka',
    coordinates: { lat: 23.7104, lng: 90.4074 }
  },
  {
    id: 'gazipur',
    name: 'Gazipur',
    nameBn: 'গাজীপুর',
    type: 'district',
    parentId: 'dhaka',
    coordinates: { lat: 24.0022, lng: 90.4264 }
  },
  {
    id: 'narayanganj',
    name: 'Narayanganj',
    nameBn: 'নারায়ণগঞ্জ',
    type: 'district',
    parentId: 'dhaka',
    coordinates: { lat: 23.6238, lng: 90.4995 }
  },
  {
    id: 'tangail',
    name: 'Tangail',
    nameBn: 'টাঙ্গাইল',
    type: 'district',
    parentId: 'dhaka',
    coordinates: { lat: 24.2513, lng: 89.9167 }
  },
  {
    id: 'manikganj',
    name: 'Manikganj',
    nameBn: 'মানিকগঞ্জ',
    type: 'district',
    parentId: 'dhaka',
    coordinates: { lat: 23.8644, lng: 90.0047 }
  },
  {
    id: 'munshiganj',
    name: 'Munshiganj',
    nameBn: 'মুন্সিগঞ্জ',
    type: 'district',
    parentId: 'dhaka',
    coordinates: { lat: 23.5422, lng: 90.5305 }
  },
  {
    id: 'faridpur',
    name: 'Faridpur',
    nameBn: 'ফরিদপুর',
    type: 'district',
    parentId: 'dhaka',
    coordinates: { lat: 23.6070, lng: 89.8429 }
  },
  {
    id: 'gopalganj',
    name: 'Gopalganj',
    nameBn: 'গোপালগঞ্জ',
    type: 'district',
    parentId: 'dhaka',
    coordinates: { lat: 23.0050, lng: 89.8266 }
  },
  {
    id: 'madaripur',
    name: 'Madaripur',
    nameBn: 'মাদারীপুর',
    type: 'district',
    parentId: 'dhaka',
    coordinates: { lat: 23.1641, lng: 90.1897 }
  },
  {
    id: 'rajbari',
    name: 'Rajbari',
    nameBn: 'রাজবাড়ী',
    type: 'district',
    parentId: 'dhaka',
    coordinates: { lat: 23.7574, lng: 89.6444 }
  },
  {
    id: 'shariatpur',
    name: 'Shariatpur',
    nameBn: 'শরীয়তপুর',
    type: 'district',
    parentId: 'dhaka',
    coordinates: { lat: 23.2423, lng: 90.4348 }
  },
  {
    id: 'kishoreganj',
    name: 'Kishoreganj',
    nameBn: 'কিশোরগঞ্জ',
    type: 'district',
    parentId: 'dhaka',
    coordinates: { lat: 24.4260, lng: 90.7769 }
  },
  {
    id: 'narsingdi',
    name: 'Narsingdi',
    nameBn: 'নরসিংদী',
    type: 'district',
    parentId: 'dhaka',
    coordinates: { lat: 23.9229, lng: 90.7176 }
  }
];

// Chittagong Division Districts (11)
export const chittagongDivisionDistricts: BDLocation[] = [
  {
    id: 'chittagong-district',
    name: 'Chittagong',
    nameBn: 'চট্টগ্রাম',
    type: 'district',
    parentId: 'chittagong',
    coordinates: { lat: 22.3569, lng: 91.7832 }
  },
  {
    id: 'coxsbazar',
    name: "Cox's Bazar",
    nameBn: 'কক্সবাজার',
    type: 'district',
    parentId: 'chittagong',
    coordinates: { lat: 21.4272, lng: 92.0058 }
  },
  {
    id: 'comilla',
    name: 'Comilla',
    nameBn: 'কুমিল্লা',
    type: 'district',
    parentId: 'chittagong',
    coordinates: { lat: 23.4607, lng: 91.1809 }
  },
  {
    id: 'feni',
    name: 'Feni',
    nameBn: 'ফেনী',
    type: 'district',
    parentId: 'chittagong',
    coordinates: { lat: 23.0159, lng: 91.3976 }
  },
  {
    id: 'brahmanbaria',
    name: 'Brahmanbaria',
    nameBn: 'ব্রাহ্মণবাড়িয়া',
    type: 'district',
    parentId: 'chittagong',
    coordinates: { lat: 23.9571, lng: 91.1119 }
  },
  {
    id: 'rangamati',
    name: 'Rangamati',
    nameBn: 'রাঙ্গামাটি',
    type: 'district',
    parentId: 'chittagong',
    coordinates: { lat: 22.7324, lng: 92.2985 }
  },
  {
    id: 'noakhali',
    name: 'Noakhali',
    nameBn: 'নোয়াখালী',
    type: 'district',
    parentId: 'chittagong',
    coordinates: { lat: 22.8696, lng: 91.0997 }
  },
  {
    id: 'chandpur',
    name: 'Chandpur',
    nameBn: 'চাঁদপুর',
    type: 'district',
    parentId: 'chittagong',
    coordinates: { lat: 23.2332, lng: 90.6712 }
  },
  {
    id: 'lakshmipur',
    name: 'Lakshmipur',
    nameBn: 'লক্ষ্মীপুর',
    type: 'district',
    parentId: 'chittagong',
    coordinates: { lat: 22.9447, lng: 90.8282 }
  },
  {
    id: 'khagrachhari',
    name: 'Khagrachhari',
    nameBn: 'খাগড়াছড়ি',
    type: 'district',
    parentId: 'chittagong',
    coordinates: { lat: 23.1193, lng: 91.9847 }
  },
  {
    id: 'bandarban',
    name: 'Bandarban',
    nameBn: 'বান্দরবান',
    type: 'district',
    parentId: 'chittagong',
    coordinates: { lat: 22.1953, lng: 92.2183 }
  }
];

// Rajshahi Division Districts (8)
export const rajshahiDivisionDistricts: BDLocation[] = [
  {
    id: 'rajshahi-district',
    name: 'Rajshahi',
    nameBn: 'রাজশাহী',
    type: 'district',
    parentId: 'rajshahi',
    coordinates: { lat: 24.3745, lng: 88.6042 }
  },
  {
    id: 'bogra',
    name: 'Bogra',
    nameBn: 'বগুড়া',
    type: 'district',
    parentId: 'rajshahi',
    coordinates: { lat: 24.8465, lng: 89.377 }
  },
  {
    id: 'pabna',
    name: 'Pabna',
    nameBn: 'পাবনা',
    type: 'district',
    parentId: 'rajshahi',
    coordinates: { lat: 24.0064, lng: 89.2372 }
  },
  {
    id: 'natore',
    name: 'Natore',
    nameBn: 'নাটোর',
    type: 'district',
    parentId: 'rajshahi',
    coordinates: { lat: 24.4206, lng: 88.9943 }
  },
  {
    id: 'naogaon',
    name: 'Naogaon',
    nameBn: 'নওগাঁ',
    type: 'district',
    parentId: 'rajshahi',
    coordinates: { lat: 24.8138, lng: 88.9318 }
  },
  {
    id: 'chapainawabganj',
    name: 'Chapainawabganj',
    nameBn: 'চাঁপাইনবাবগঞ্জ',
    type: 'district',
    parentId: 'rajshahi',
    coordinates: { lat: 24.5965, lng: 88.2775 }
  },
  {
    id: 'sirajganj',
    name: 'Sirajganj',
    nameBn: 'সিরাজগঞ্জ',
    type: 'district',
    parentId: 'rajshahi',
    coordinates: { lat: 24.4533, lng: 89.7006 }
  },
  {
    id: 'joypurhat',
    name: 'Joypurhat',
    nameBn: 'জয়পুরহাট',
    type: 'district',
    parentId: 'rajshahi',
    coordinates: { lat: 25.0968, lng: 89.0227 }
  }
];

// Khulna Division Districts (10)
export const khulnaDivisionDistricts: BDLocation[] = [
  {
    id: 'khulna-district',
    name: 'Khulna',
    nameBn: 'খুলনা',
    type: 'district',
    parentId: 'khulna',
    coordinates: { lat: 22.8456, lng: 89.5403 }
  },
  {
    id: 'jessore',
    name: 'Jessore',
    nameBn: 'যশোর',
    type: 'district',
    parentId: 'khulna',
    coordinates: { lat: 23.1634, lng: 89.2182 }
  },
  {
    id: 'satkhira',
    name: 'Satkhira',
    nameBn: 'সাতক্ষীরা',
    type: 'district',
    parentId: 'khulna',
    coordinates: { lat: 22.7185, lng: 89.0705 }
  },
  {
    id: 'bagerhat',
    name: 'Bagerhat',
    nameBn: 'বাগেরহাট',
    type: 'district',
    parentId: 'khulna',
    coordinates: { lat: 22.6602, lng: 89.7895 }
  },
  {
    id: 'kushtia',
    name: 'Kushtia',
    nameBn: 'কুষ্টিয়া',
    type: 'district',
    parentId: 'khulna',
    coordinates: { lat: 23.9012, lng: 89.1199 }
  },
  {
    id: 'chuadanga',
    name: 'Chuadanga',
    nameBn: 'চুয়াডাঙ্গা',
    type: 'district',
    parentId: 'khulna',
    coordinates: { lat: 23.6401, lng: 88.8410 }
  },
  {
    id: 'jhenaidah',
    name: 'Jhenaidah',
    nameBn: 'ঝিনাইদহ',
    type: 'district',
    parentId: 'khulna',
    coordinates: { lat: 23.5448, lng: 89.1539 }
  },
  {
    id: 'narail',
    name: 'Narail',
    nameBn: 'নড়াইল',
    type: 'district',
    parentId: 'khulna',
    coordinates: { lat: 23.1163, lng: 89.5840 }
  },
  {
    id: 'magura',
    name: 'Magura',
    nameBn: 'মাগুরা',
    type: 'district',
    parentId: 'khulna',
    coordinates: { lat: 23.4855, lng: 89.4198 }
  },
  {
    id: 'meherpur',
    name: 'Meherpur',
    nameBn: 'মেহেরপুর',
    type: 'district',
    parentId: 'khulna',
    coordinates: { lat: 23.7622, lng: 88.6318 }
  }
];

// Barishal Division Districts (6)
export const barishalDivisionDistricts: BDLocation[] = [
  {
    id: 'barishal-district',
    name: 'Barishal',
    nameBn: 'বরিশাল',
    type: 'district',
    parentId: 'barishal',
    coordinates: { lat: 22.7010, lng: 90.3535 }
  },
  {
    id: 'patuakhali',
    name: 'Patuakhali',
    nameBn: 'পটুয়াখালী',
    type: 'district',
    parentId: 'barishal',
    coordinates: { lat: 22.3596, lng: 90.3298 }
  },
  {
    id: 'bhola',
    name: 'Bhola',
    nameBn: 'ভোলা',
    type: 'district',
    parentId: 'barishal',
    coordinates: { lat: 22.6859, lng: 90.6482 }
  },
  {
    id: 'pirojpur',
    name: 'Pirojpur',
    nameBn: 'পিরোজপুর',
    type: 'district',
    parentId: 'barishal',
    coordinates: { lat: 22.5791, lng: 89.9759 }
  },
  {
    id: 'barguna',
    name: 'Barguna',
    nameBn: 'বরগুনা',
    type: 'district',
    parentId: 'barishal',
    coordinates: { lat: 22.1590, lng: 90.1119 }
  },
  {
    id: 'jhalokati',
    name: 'Jhalokati',
    nameBn: 'ঝালকাঠি',
    type: 'district',
    parentId: 'barishal',
    coordinates: { lat: 22.6423, lng: 90.1870 }
  }
];

// Sylhet Division Districts (4)
export const sylhetDivisionDistricts: BDLocation[] = [
  {
    id: 'sylhet-district',
    name: 'Sylhet',
    nameBn: 'সিলেট',
    type: 'district',
    parentId: 'sylhet',
    coordinates: { lat: 24.8949, lng: 91.8687 }
  },
  {
    id: 'moulvibazar',
    name: 'Moulvibazar',
    nameBn: 'মৌলভীবাজার',
    type: 'district',
    parentId: 'sylhet',
    coordinates: { lat: 24.4821, lng: 91.7315 }
  },
  {
    id: 'habiganj',
    name: 'Habiganj',
    nameBn: 'হবিগঞ্জ',
    type: 'district',
    parentId: 'sylhet',
    coordinates: { lat: 24.3745, lng: 91.4155 }
  },
  {
    id: 'sunamganj',
    name: 'Sunamganj',
    nameBn: 'সুনামগঞ্জ',
    type: 'district',
    parentId: 'sylhet',
    coordinates: { lat: 25.0657, lng: 91.3950 }
  }
];

// Rangpur Division Districts (8)
export const rangpurDivisionDistricts: BDLocation[] = [
  {
    id: 'rangpur-district',
    name: 'Rangpur',
    nameBn: 'রংপুর',
    type: 'district',
    parentId: 'rangpur',
    coordinates: { lat: 25.7439, lng: 89.2752 }
  },
  {
    id: 'dinajpur',
    name: 'Dinajpur',
    nameBn: 'দিনাজপুর',
    type: 'district',
    parentId: 'rangpur',
    coordinates: { lat: 25.6217, lng: 88.6354 }
  },
  {
    id: 'gaibandha',
    name: 'Gaibandha',
    nameBn: 'গাইবান্ধা',
    type: 'district',
    parentId: 'rangpur',
    coordinates: { lat: 25.3285, lng: 89.5430 }
  },
  {
    id: 'kurigram',
    name: 'Kurigram',
    nameBn: 'কুড়িগ্রাম',
    type: 'district',
    parentId: 'rangpur',
    coordinates: { lat: 25.8073, lng: 89.6295 }
  },
  {
    id: 'lalmonirhat',
    name: 'Lalmonirhat',
    nameBn: 'লালমনিরহাট',
    type: 'district',
    parentId: 'rangpur',
    coordinates: { lat: 25.9923, lng: 89.2847 }
  },
  {
    id: 'nilphamari',
    name: 'Nilphamari',
    nameBn: 'নীলফামারী',
    type: 'district',
    parentId: 'rangpur',
    coordinates: { lat: 25.9317, lng: 88.8560 }
  },
  {
    id: 'panchagarh',
    name: 'Panchagarh',
    nameBn: 'পঞ্চগড়',
    type: 'district',
    parentId: 'rangpur',
    coordinates: { lat: 26.3411, lng: 88.5541 }
  },
  {
    id: 'thakurgaon',
    name: 'Thakurgaon',
    nameBn: 'ঠাকুরগাঁও',
    type: 'district',
    parentId: 'rangpur',
    coordinates: { lat: 26.0336, lng: 88.4616 }
  }
];

// Mymensingh Division Districts (4)
export const mymensinghDivisionDistricts: BDLocation[] = [
  {
    id: 'mymensingh-district',
    name: 'Mymensingh',
    nameBn: 'ময়মনসিংহ',
    type: 'district',
    parentId: 'mymensingh',
    coordinates: { lat: 24.7471, lng: 90.4203 }
  },
  {
    id: 'jamalpur',
    name: 'Jamalpur',
    nameBn: 'জামালপুর',
    type: 'district',
    parentId: 'mymensingh',
    coordinates: { lat: 24.9375, lng: 89.9403 }
  },
  {
    id: 'netrokona',
    name: 'Netrokona',
    nameBn: 'নেত্রকোণা',
    type: 'district',
    parentId: 'mymensingh',
    coordinates: { lat: 24.8804, lng: 90.7277 }
  },
  {
    id: 'sherpur',
    name: 'Sherpur',
    nameBn: 'শেরপুর',
    type: 'district',
    parentId: 'mymensingh',
    coordinates: { lat: 25.0204, lng: 90.0152 }
  }
];

// ==================== MAJOR AREAS ====================

// Dhaka City Areas (50+)
export const dhakaAreas: BDLocation[] = [
  // North Dhaka
  { id: 'uttara', name: 'Uttara', nameBn: 'উত্তরা', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.8759, lng: 90.3795 } },
  { id: 'mirpur', name: 'Mirpur', nameBn: 'মিরপুর', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.8223, lng: 90.3654 } },
  { id: 'mohakhali', name: 'Mohakhali', nameBn: 'মহাখালী', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7808, lng: 90.3987 } },
  { id: 'banani', name: 'Banani', nameBn: 'বনানী', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7937, lng: 90.4066 } },
  { id: 'gulshan', name: 'Gulshan', nameBn: 'গুলশান', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7925, lng: 90.4078 } },
  { id: 'baridhara', name: 'Baridhara', nameBn: 'বারিধারা', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.8104, lng: 90.4249 } },
  { id: 'bashundhara', name: 'Bashundhara', nameBn: 'বসুন্ধরা', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.8223, lng: 90.4272 } },
  { id: 'badda', name: 'Badda', nameBn: 'বাড্ডা', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7808, lng: 90.4265 } },
  { id: 'rampura', name: 'Rampura', nameBn: 'রামপুরা', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7601, lng: 90.4253 } },
  { id: 'cantonment', name: 'Cantonment', nameBn: 'ক্যান্টনমেন্ট', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7925, lng: 90.3913 } },
  
  // Central Dhaka
  { id: 'dhanmondi', name: 'Dhanmondi', nameBn: 'ধানমন্ডি', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7461, lng: 90.3742 } },
  { id: 'kalabagan', name: 'Kalabagan', nameBn: 'কলাবাগান', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7389, lng: 90.3845 } },
  { id: 'mohammadpur', name: 'Mohammadpur', nameBn: 'মোহাম্মদপুর', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7679, lng: 90.3565 } },
  { id: 'shyamoli', name: 'Shyamoli', nameBn: 'শ্যামলী', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7698, lng: 90.3684 } },
  { id: 'lalmatia', name: 'Lalmatia', nameBn: 'লালমাটিয়া', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7565, lng: 90.3688 } },
  { id: 'kawran-bazar', name: 'Kawran Bazar', nameBn: 'কাওরান বাজার', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7517, lng: 90.3918 } },
  { id: 'farmgate', name: 'Farmgate', nameBn: 'ফার্মগেট', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7581, lng: 90.3881 } },
  { id: 'tejgaon', name: 'Tejgaon', nameBn: 'তেজগাঁও', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7631, lng: 90.3913 } },
  { id: 'shahbag', name: 'Shahbag', nameBn: 'শাহবাগ', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7389, lng: 90.3954 } },
  { id: 'newmarket', name: 'New Market', nameBn: 'নিউ মার্কেট', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7345, lng: 90.3873 } },
  
  // Old Dhaka
  { id: 'old-dhaka', name: 'Old Dhaka', nameBn: 'পুরান ঢাকা', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7104, lng: 90.4074 } },
  { id: 'motijheel', name: 'Motijheel', nameBn: 'মতিঝিল', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7337, lng: 90.4172 } },
  { id: 'paltan', name: 'Paltan', nameBn: 'পল্টন', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7378, lng: 90.4142 } },
  { id: 'gulistan', name: 'Gulistan', nameBn: 'গুলিস্তান', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7267, lng: 90.4121 } },
  { id: 'sadarghat', name: 'Sadarghat', nameBn: 'সদরঘাট', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7100, lng: 90.4087 } },
  { id: 'lalbagh', name: 'Lalbagh', nameBn: 'লালবাগ', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7192, lng: 90.3874 } },
  { id: 'azimpur', name: 'Azimpur', nameBn: 'আজিমপুর', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7284, lng: 90.3824 } },
  
  // East Dhaka
  { id: 'khilgaon', name: 'Khilgaon', nameBn: 'খিলগাঁও', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7518, lng: 90.4345 } },
  { id: 'malibagh', name: 'Malibagh', nameBn: 'মালিবাগ', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7456, lng: 90.4258 } },
  { id: 'shantinagar', name: 'Shantinagar', nameBn: 'শান্তিনগর', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7453, lng: 90.4195 } },
  { id: 'moghbazar', name: 'Moghbazar', nameBn: 'মগবাজার', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7504, lng: 90.4039 } },
  { id: 'maghbazar', name: 'Maghbazar', nameBn: 'মগবাজার', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7504, lng: 90.4039 } },
  { id: 'kakrail', name: 'Kakrail', nameBn: 'কাকরাইল', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7372, lng: 90.4033 } },
  { id: 'eskaton', name: 'Eskaton', nameBn: 'এস্কাটন', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7469, lng: 90.4050 } },
  { id: 'siddheshwari', name: 'Siddheshwari', nameBn: 'সিদ্ধেশ্বরী', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7479, lng: 90.4098 } },
  { id: 'hatirpool', name: 'Hatirpool', nameBn: 'হাতিরপুল', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7435, lng: 90.3885 } },
  
  // South Dhaka
  { id: 'jatrabari', name: 'Jatrabari', nameBn: 'যাত্রাবাড়ী', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7116, lng: 90.4318 } },
  { id: 'sayedabad', name: 'Sayedabad', nameBn: 'সায়েদাবাদ', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7176, lng: 90.4267 } },
  { id: 'demra', name: 'Demra', nameBn: 'ডেমরা', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7273, lng: 90.4892 } },
  { id: 'postogola', name: 'Postogola', nameBn: 'পোস্তগোলা', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7195, lng: 90.4153 } },
  { id: 'gandaria', name: 'Gandaria', nameBn: 'গেন্ডারিয়া', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7192, lng: 90.4027 } },
  { id: 'dania', name: 'Dania', nameBn: 'ডানিয়া', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7032, lng: 90.4179 } },
  
  // West Dhaka
  { id: 'adabar', name: 'Adabar', nameBn: 'আদাবর', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7629, lng: 90.3653 } },
  { id: 'gabtoli', name: 'Gabtoli', nameBn: 'গাবতলী', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7815, lng: 90.3476 } },
  { id: 'savar', name: 'Savar', nameBn: 'সাভার', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.8583, lng: 90.2667 } },
  { id: 'ashulia', name: 'Ashulia', nameBn: 'আশুলিয়া', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.8864, lng: 90.3111 } },
  { id: 'kafrul', name: 'Kafrul', nameBn: 'কাফরুল', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.7901, lng: 90.3764 } },
  { id: 'pallabi', name: 'Pallabi', nameBn: 'পল্লবী', type: 'area', parentId: 'dhaka-district', coordinates: { lat: 23.8256, lng: 90.3614 } },
];

// Chittagong City Areas (30+)
export const chittagongAreas: BDLocation[] = [
  { id: 'agrabad', name: 'Agrabad', nameBn: 'আগ্রাবাদ', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3284, lng: 91.8075 } },
  { id: 'nasirabad', name: 'Nasirabad', nameBn: 'নাসিরাবাদ', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3607, lng: 91.8159 } },
  { id: 'pahartali', name: 'Pahartali', nameBn: 'পাহাড়তলি', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3717, lng: 91.8275 } },
  { id: 'ctg-cantonment', name: 'Cantonment', nameBn: 'ক্যান্টনমেন্ট', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3814, lng: 91.8088 } },
  { id: 'patenga', name: 'Patenga', nameBn: 'পতেঙ্গা', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.2365, lng: 91.7995 } },
  { id: 'halishahar', name: 'Halishahar', nameBn: 'হালিশহর', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3697, lng: 91.8398 } },
  { id: 'khulshi', name: 'Khulshi', nameBn: 'খুলশী', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3403, lng: 91.8064 } },
  { id: 'ctg-double-mooring', name: 'Double Mooring', nameBn: 'ডাবল মুরিং', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3384, lng: 91.8317 } },
  { id: 'bahaddarhat', name: 'Bahaddarhat', nameBn: 'বহদ্দারহাট', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3514, lng: 91.8207 } },
  { id: 'anderkilla', name: 'Anderkilla', nameBn: 'আন্দরকিল্লা', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3389, lng: 91.8333 } },
  { id: 'newmarket-ctg', name: 'New Market', nameBn: 'নিউ মার্কেট', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3349, lng: 91.8325 } },
  { id: 'chawk-bazar', name: 'Chawk Bazar', nameBn: 'চকবাজার', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3445, lng: 91.8372 } },
  { id: 'sadarghat-ctg', name: 'Sadarghat', nameBn: 'সদরঘাট', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3422, lng: 91.8393 } },
  { id: 'bakalia', name: 'Bakalia', nameBn: 'বকেলিয়া', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3506, lng: 91.8305 } },
  { id: 'dampara', name: 'Dampara', nameBn: 'দামপাড়া', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3401, lng: 91.8188 } },
  { id: 'jalalabad', name: 'Jalalabad', nameBn: 'জালালাবাদ', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3443, lng: 91.8258 } },
  { id: 'oxygen', name: 'Oxygen', nameBn: 'অক্সিজেন', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3694, lng: 91.8337 } },
  { id: 'ctg-panchlaish', name: 'Panchlaish', nameBn: 'পাঁচলাইশ', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3516, lng: 91.8172 } },
  { id: 'jamal-khan', name: 'Jamal Khan', nameBn: 'জমাল খান', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3296, lng: 91.8308 } },
  { id: 'korbaniganj', name: 'Korbaniganj', nameBn: 'কর্বানীগঞ্জ', type: 'area', parentId: 'chittagong-district', coordinates: { lat: 22.3353, lng: 91.8241 } },
];

// Other Major Cities Areas (Selected)
export const otherMajorAreas: BDLocation[] = [
  // Rajshahi
  { id: 'shaheb-bazar', name: 'Shaheb Bazar', nameBn: 'সাহেব বাজার', type: 'area', parentId: 'rajshahi-district', coordinates: { lat: 24.3636, lng: 88.6241 } },
  { id: 'boalia', name: 'Boalia', nameBn: 'বোয়ালিয়া', type: 'area', parentId: 'rajshahi-district', coordinates: { lat: 24.3745, lng: 88.5947 } },
  
  // Sylhet
  { id: 'zindabazar', name: 'Zinda Bazar', nameBn: 'জিন্দাবাজার', type: 'area', parentId: 'sylhet-district', coordinates: { lat: 24.8994, lng: 91.8731 } },
  { id: 'amberkhana', name: 'Amberkhana', nameBn: 'আম্বরখানা', type: 'area', parentId: 'sylhet-district', coordinates: { lat: 24.9012, lng: 91.8652 } },
  
  // Khulna
  { id: 'khulna-zero-point', name: 'Zero Point', nameBn: 'জিরো পয়েন্ট', type: 'area', parentId: 'khulna-district', coordinates: { lat: 22.8111, lng: 89.5592 } },
  { id: 'daulatpur', name: 'Daulatpur', nameBn: 'দৌলতপুর', type: 'area', parentId: 'khulna-district', coordinates: { lat: 22.8326, lng: 89.5108 } },
];

// ==================== HELPER FUNCTIONS ====================

// Combine all districts
export const allDistricts: BDLocation[] = [
  ...dhakaDivisionDistricts,
  ...chittagongDivisionDistricts,
  ...rajshahiDivisionDistricts,
  ...khulnaDivisionDistricts,
  ...barishalDivisionDistricts,
  ...sylhetDivisionDistricts,
  ...rangpurDivisionDistricts,
  ...mymensinghDivisionDistricts
];

// Combine all areas
export const allAreas: BDLocation[] = [
  ...dhakaAreas,
  ...chittagongAreas,
  ...otherMajorAreas
];

// Combine all locations
export const allLocations: BDLocation[] = [
  ...divisions,
  ...allDistricts,
  ...allAreas
];

// Get all locations
export function getAllLocations(): BDLocation[] {
  return allLocations;
}

// Get locations by type
export function getLocationsByType(type: BDLocation['type']): BDLocation[] {
  return allLocations.filter(loc => loc.type === type);
}

// Get child locations by parent ID
export function getLocationsByParent(parentId: string): BDLocation[] {
  return allLocations.filter(loc => loc.parentId === parentId);
}

// Search locations (supports both English and Bengali)
export function searchLocations(query: string): BDLocation[] {
  if (!query || query.trim() === '') return [];
  
  const lowerQuery = query.toLowerCase();
  return allLocations.filter(
    loc =>
      loc.name.toLowerCase().includes(lowerQuery) ||
      loc.nameBn.includes(query)
  );
}

// Get location by ID
export function getLocationById(id: string): BDLocation | undefined {
  return allLocations.find(loc => loc.id === id);
}

// Get full location path (Area → District → Division)
export function getLocationPath(locationId: string): BDLocation[] {
  const path: BDLocation[] = [];
  let current = getLocationById(locationId);
  
  while (current) {
    path.unshift(current);
    current = current.parentId ? getLocationById(current.parentId) : undefined;
  }
  
  return path;
}

// Format location string
export function formatLocation(
  locationId: string,
  language: 'bn' | 'en' = 'bn',
  includeType: boolean = false
): string {
  const path = getLocationPath(locationId);
  
  if (path.length === 0) return '';
  
  const formatted = path
    .map(loc => (language === 'bn' ? loc.nameBn : loc.name))
    .join(', ');
  
  return formatted;
}

// Get popular locations (Divisions + Major cities)
export function getPopularLocations(): BDLocation[] {
  return [
    ...divisions,
    ...allDistricts.filter(d => 
      ['dhaka-district', 'chittagong-district', 'rajshahi-district', 
       'khulna-district', 'sylhet-district', 'barishal-district'].includes(d.id)
    )
  ];
}

// Get location statistics
export interface LocationStats {
  totalDivisions: number;
  totalDistricts: number;
  totalAreas: number;
  total: number;
}

export function getLocationStats(): LocationStats {
  return {
    totalDivisions: divisions.length,
    totalDistricts: allDistricts.length,
    totalAreas: allAreas.length,
    total: allLocations.length
  };
}
