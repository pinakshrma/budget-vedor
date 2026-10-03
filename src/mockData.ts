
// Types for our Travel Ecosystem
export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  rating: number;
}

export interface Train {
  id: string;
  number: string;
  name: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  classes: string[];
  fare: Record<string, number>;
  availability: Record<string, string>;
}

export interface Bus {
  id: string;
  operator: string;
  type: string; // AC / Non-AC / Sleeper
  source: string;
  destination: string;
  departureTime: string;
  duration: string;
  price: number;
  rating: number;
  boardingPoints: string[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  images: string[];
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: "clothes" | "gadgets";
  price: number;
  image: string;
  tags: string[]; // e.g., ["Manali", "Cold", "Winter"]
  description: string;
}

export interface LocationBlog {
  id: string;
  name: string;
  overview: string;
  culture: string;
  food: { name: string; image: string; description: string; }[];
  places: { name: string; image: string; description: string; }[];
  personalities: { name: string; image: string; }[];
  hotels: { name: string; link: string; image: string; description: string; }[];
  shopping: { item: string; image: string; }[];
  bestTime: string;
  tips: string[];
  images: string[];
  weather: "Hot" | "Cold" | "Moderate" | "Beach";
}

const CITIES = [
  "Jaipur", "Delhi", "Mumbai", "Goa", "Manali", "Udaipur", "Bangalore", "Chennai", 
  "Kolkata", "Hyderabad", "Simla", "Rishikesh", "Varanasi", "Amritsar", "Agra",
  "Pune", "Srinagar", "Leh", "Alleppey", "Munnar", "Ooty", "Coorg", "Mysore",
  "Hampi", "Pondicherry", "Ahmedabad", "Jodhpur", "Jaisalmer", "Pushkar", "Nainital",
  "Mussoorie", "Dharamshala", "Dalhousie", "Khajuraho", "Dwarka", "Somnath", "Puri",
  "Konark", "Gaya", "Patna", "Lucknow", "Chandigarh", "Jammu", "Guwahati", "Gangtok",
  "Shillong", "Imphal", "Kohima", "Agartala", "Aizawl", "Itanagar", "Port Blair"
];

const AIRLINES = ["IndiGo", "Air India", "Vistara", "SpiceJet", "Akasa Air"];
const BUS_OPERATORS = ["Zingbus", "IntrCity SmartBus", "Orange Travels", "SRS Travels", "VRL Travels"];

// Helper to generate 50+ items
export const mockFlights: Flight[] = Array.from({ length: 60 }).map((_, i) => {
  const source = CITIES[i % CITIES.length];
  let dest = CITIES[(i + 1) % CITIES.length];
  if (source === dest) dest = CITIES[(i + 2) % CITIES.length];
  
  return {
    id: `F${i + 1}`,
    airline: AIRLINES[i % AIRLINES.length],
    airlineLogo: `https://picsum.photos/seed/airline${i}/100/100`,
    source,
    destination: dest,
    departureTime: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:00`,
    arrivalTime: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:00`,
    duration: `${Math.floor(Math.random() * 5) + 1}h ${Math.floor(Math.random() * 60)}m`,
    stops: Math.floor(Math.random() * 3),
    price: Math.floor(Math.random() * 8000) + 2500,
    rating: parseFloat((Math.random() * 5).toFixed(1))
  };
});

export const mockTrains: Train[] = Array.from({ length: 60 }).map((_, i) => {
  const source = CITIES[i % CITIES.length];
  let dest = CITIES[(i + 1) % CITIES.length];
  return {
    id: `T${i + 1}`,
    number: `12${Math.floor(Math.random() * 900) + 100}`,
    name: `${source}-${dest} Superfast`,
    source,
    destination: dest,
    departureTime: "20:00",
    arrivalTime: "08:00",
    classes: ["Sleeper", "3AC", "2AC", "1AC"],
    fare: { "Sleeper": 450, "3AC": 1200, "2AC": 1800, "1AC": 2500 },
    availability: { "Sleeper": "Available 50", "3AC": "RAC 10", "2AC": "Available 20", "1AC": "WL 5" }
  };
});

export const mockBuses: Bus[] = Array.from({ length: 60 }).map((_, i) => {
  const source = CITIES[i % CITIES.length];
  let dest = CITIES[(i + 1) % CITIES.length];
  return {
    id: `B${i + 1}`,
    operator: BUS_OPERATORS[i % BUS_OPERATORS.length],
    type: i % 2 === 0 ? "AC Sleeper" : "Non-AC Seater",
    source,
    destination: dest,
    departureTime: "21:30",
    duration: "10h 00m",
    price: Math.floor(Math.random() * 1500) + 500,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    boardingPoints: ["Majnu ka Tilla", "ISBT", "Sindhi Camp"]
  };
});

export const mockHotels: Hotel[] = [
  {
    id: "H1",
    name: "Hotel Jaipur Heritage",
    location: "Jaipur",
    city: "Jaipur",
    pricePerNight: 4599,
    rating: 4.5,
    amenities: ["Free WiFi", "Heritage Architecture", "Restaurant", "Room Service"],
    images: ["https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800"],
    description: "Heritage-style stay near Amer with traditional decor."
  },
  {
    id: "H2",
    name: "Umaid Bhawan Hotel",
    location: "Jaipur",
    city: "Jaipur",
    pricePerNight: 5200,
    rating: 4.7,
    amenities: ["Rooftop Restaurant", "Swimming Pool", "Cultural Shows", "Free WiFi"],
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"],
    description: "Boutique heritage hotel with royal ambiance."
  },
  {
    id: "H3",
    name: "Rambagh Palace",
    location: "Jaipur",
    city: "Jaipur",
    pricePerNight: 35000,
    rating: 5.0,
    amenities: ["Palatial Rooms", "Luxury Spa", "Polo Grounds", "Fine Dining"],
    images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800"],
    description: "Luxury palace hotel offering royal experience."
  },
  {
    id: "H4",
    name: "The Taj Mahal Palace",
    location: "Mumbai",
    city: "Mumbai",
    pricePerNight: 25000,
    rating: 5.0,
    amenities: ["Sea View", "Historic Heritage", "Signature Spa", "Multiple Cuisines"],
    images: ["https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800"],
    description: "Iconic sea-facing luxury hotel."
  },
  {
    id: "H5",
    name: "Trident Nariman Point",
    location: "Mumbai",
    city: "Mumbai",
    pricePerNight: 12000,
    rating: 4.6,
    amenities: ["Ocean Views", "Business Center", "Outdoor Pool", "Fitness Center"],
    images: ["https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?auto=format&fit=crop&q=80&w=800"],
    description: "Modern hotel with Marine Drive views."
  },
  {
    id: "H6",
    name: "The Oberoi Mumbai",
    location: "Mumbai",
    city: "Mumbai",
    pricePerNight: 28000,
    rating: 4.9,
    amenities: ["Butler Service", "Luxury Retail", "Silk Road Dining", "Floor-to-ceiling Windows"],
    images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=800"],
    description: "5-star hotel with world-class service."
  },
  {
    id: "H7",
    name: "The Leela Palace",
    location: "Delhi",
    city: "Delhi",
    pricePerNight: 28000,
    rating: 4.9,
    amenities: ["Royal Decor", "Rooftop Pool", "State Art Collection", "Butler Service"],
    images: ["https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800"],
    description: "Ultra luxury hotel with royal interiors."
  },
  {
    id: "H8",
    name: "ITC Maurya",
    location: "Delhi",
    city: "Delhi",
    pricePerNight: 15000,
    rating: 4.7,
    amenities: ["Bukhara Restaurant", "Ekaaya Spa", "Luxury Accomodation", "Elite Service"],
    images: ["https://images.unsplash.com/photo-1598335624134-406798020786?auto=format&fit=crop&q=80&w=800"],
    description: "Luxury hotel known for fine dining."
  },
  {
    id: "H9",
    name: "The Lalit New Delhi",
    location: "Delhi",
    city: "Delhi",
    pricePerNight: 10000,
    rating: 4.5,
    amenities: ["Central Location", "Nightclub", "Luxury Spa", "Modern Rooms"],
    images: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800"],
    description: "Central hotel with premium amenities."
  },
  {
    id: "H10",
    name: "Taj Exotica Resort",
    location: "Goa",
    city: "Goa",
    pricePerNight: 22000,
    rating: 4.8,
    amenities: ["Private Beach", "Portuguese Architecture", "Garden Villas", "Multiple Pools"],
    images: ["https://images.unsplash.com/photo-1512783514552-65825bc0d0ce?auto=format&fit=crop&q=80&w=800"],
    description: "Luxury beach resort."
  },
  {
    id: "H11",
    name: "W Goa",
    location: "Goa",
    city: "Goa",
    pricePerNight: 20000,
    rating: 4.6,
    amenities: ["Vibrant Nightlife", "Rockpool", "Modern Design", "Spa"],
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"],
    description: "Trendy luxury beach hotel."
  },
  {
    id: "H12",
    name: "Leela Goa",
    location: "Goa",
    city: "Goa",
    pricePerNight: 24000,
    rating: 4.9,
    amenities: ["Riverside & Beachside", "Golf Course", "Lagoon Suites", "Luxury Dining"],
    images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=800"],
    description: "Luxury resort with lagoons and beach access."
  },
  {
    id: "H13",
    name: "The Oberoi Udaivilas",
    location: "Udaipur",
    city: "Udaipur",
    pricePerNight: 45000,
    rating: 5.0,
    amenities: ["Lakeside Luxury", "Interconnected Pools", "Grand Architecture", "Spa"],
    images: ["https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&q=80&w=800"],
    description: "Luxury palace hotel by Lake Pichola."
  },
  {
    id: "H14",
    name: "Taj Lake Palace",
    location: "Udaipur",
    city: "Udaipur",
    pricePerNight: 50000,
    rating: 4.9,
    amenities: ["Floating Palace", "Boat Arrival", "Royal Butler", "Cultural Performances"],
    images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=800"],
    description: "Iconic floating palace hotel."
  },
  {
    id: "H15",
    name: "Trident Udaipur",
    location: "Udaipur",
    city: "Udaipur",
    pricePerNight: 12000,
    rating: 4.5,
    amenities: ["Lake Views", "Wildlife Safari nearby", "Kids Club", "Outdoor Pool"],
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"],
    description: "Affordable luxury near the lake."
  },
  {
    id: "H16",
    name: "Snow Valley Resort",
    location: "Manali",
    city: "Manali",
    pricePerNight: 6000,
    rating: 4.4,
    amenities: ["Mountain Balcony", "Central Heating", "Restaurant", "Gardens"],
    images: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800"],
    description: "Mountain-view hotel with scenic balconies."
  },
  {
    id: "H17",
    name: "Wildflower Hall",
    location: "Shimla",
    city: "Shimla",
    pricePerNight: 30000,
    rating: 4.9,
    amenities: ["Himalayan Views", "Indoor Heated Pool", "Open-air Jacuzzi", "Luxury Spa"],
    images: ["https://images.unsplash.com/photo-1597074866923-dc0589134511?auto=format&fit=crop&q=80&w=800"],
    description: "Luxury retreat in the Himalayas."
  },
  {
    id: "H18",
    name: "The Oberoi Bengaluru",
    location: "Bangalore",
    city: "Bangalore",
    pricePerNight: 15000,
    rating: 4.8,
    amenities: ["Garden Setting", "Outdoor Pool", "Award-winning Spa", "Central Location"],
    images: ["https://images.unsplash.com/photo-1596760411131-3b70ced6f64c?auto=format&fit=crop&q=80&w=800"],
    description: "Garden hotel in the IT hub of India."
  },
  {
    id: "H19",
    name: "Taj Falaknuma Palace",
    location: "Hyderabad",
    city: "Hyderabad",
    pricePerNight: 35000,
    rating: 4.9,
    amenities: ["Nizam Heritage", "High on Hill", "Royal Carriage", "Fine Dining"],
    images: ["https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800"],
    description: "Royal palace hotel with Nizam heritage."
  },
  {
    id: "H20",
    name: "JW Marriott Chandigarh",
    location: "Chandigarh",
    city: "Chandigarh",
    pricePerNight: 18000,
    rating: 4.7,
    amenities: ["Rooftop Pool", "Modern Design", "Business Center", "Luxury Spa"],
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"],
    description: "Premium luxury hotel with modern amenities."
  },
  {
    id: "H21",
    name: "ITC Royal Bengal",
    location: "Kolkata",
    city: "Kolkata",
    pricePerNight: 14000,
    rating: 4.8,
    amenities: ["Grand Architecture", "Bengali Cuisine", "Luxury Spa", "Sky Bar"],
    images: ["https://images.unsplash.com/photo-1558431382-bb7b38c290b0?auto=format&fit=crop&q=80&w=800"],
    description: "Grand luxury hotel with modern architecture."
  },
  {
    id: "H22",
    name: "Hyatt Regency Ahmedabad",
    location: "Ahmedabad",
    city: "Ahmedabad",
    pricePerNight: 9000,
    rating: 4.5,
    amenities: ["Riverfront View", "Contemporary Rooms", "Business Hub", "Gym"],
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"],
    description: "Riverfront hotel with contemporary design."
  },
  {
    id: "H23",
    name: "The Westin Pune",
    location: "Pune",
    city: "Pune",
    pricePerNight: 12000,
    rating: 4.6,
    amenities: ["Heavenly Bed", "Outdoor Pool", "Top-tier Dining", "Wellness Center"],
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"],
    description: "Luxury hotel with excellent dining options."
  },
  {
    id: "H24",
    name: "Brijrama Palace",
    location: "Varanasi",
    city: "Varanasi",
    pricePerNight: 18000,
    rating: 4.8,
    amenities: ["Ghat Access", "Historic Palace", "Traditional Music", "Elevator to Ghats"],
    images: ["https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800"],
    description: "Historic hotel on the ghats of Ganga."
  }
];

import { TECH_PRODUCTS, CLOTHING_PRODUCTS } from "./productsData";

export const mockProducts: Product[] = [...TECH_PRODUCTS, ...CLOTHING_PRODUCTS];

const DETAILED_BLOGS: Record<string, Partial<LocationBlog>> = {
  "Jaipur": {
    overview: "Jaipur, the Pink City, is Rajasthan’s capital known for royal palaces, forts, and vibrant bazaars. Built in 1727, it represents India’s royal heritage.",
    culture: "Rajasthani culture with Ghoomar dance, colorful attire, camel festivals, and handicrafts.",
    food: [
      {
        name: "Dal Baati Churma",
        image: "https://images.unsplash.com/photo-1604908176997-43184aefdfc1",
        description: "Traditional baked wheat balls served with lentils and churma."
      },
      {
        name: "Ghewar",
        image: "https://images.unsplash.com/photo-1625944525740-1b0b68c3b9b2",
        description: "Festival sweet dish popular in Rajasthan."
      }
    ],
    places: [
      {
        name: "Hawa Mahal",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41",
        description: "Palace of Winds with 953 windows."
      },
      {
        name: "Amber Fort",
        image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3",
        description: "Historic fort with Sheesh Mahal."
      }
    ],
    personalities: [
      {
        name: "Maharaja Sawai Jai Singh II",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Sawai_Jai_Singh_II.jpg"
      }
    ],
    hotels: [
      {
        name: "Rambagh Palace",
        link: "https://www.tajhotels.com/en-in/taj/rambagh-palace-jaipur/",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        description: "Luxury palace hotel."
      }
    ],
    shopping: [
      {
        item: "Blue Pottery",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
      }
    ],
    bestTime: "October to March",
    tips: ["Carry water", "Avoid peak heat"],
    images: ["https://images.unsplash.com/photo-1599661046289-e31897846e41"],
    weather: "Hot"
  },
  "Delhi": {
    overview: "Capital of India blending history and modern life.",
    culture: "Mughal + modern Indian mix, festivals like Diwali and Eid.",
    food: [
      {
        name: "Chole Bhature",
        image: "https://images.unsplash.com/photo-1617191519105-d07b98b10de6",
        description: "Popular North Indian dish."
      }
    ],
    places: [
      {
        name: "India Gate",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5",
        description: "War memorial."
      }
    ],
    personalities: [
      {
        name: "Shah Rukh Khan",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Shah_Rukh_Khan.jpg"
      }
    ],
    hotels: [
      {
        name: "The Leela Palace",
        link: "https://www.theleela.com/",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        description: "Luxury stay."
      }
    ],
    shopping: [
      {
        item: "Street Markets",
        image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53"
      }
    ],
    bestTime: "Oct–March",
    tips: ["Use metro"],
    images: ["https://images.unsplash.com/photo-1587474260584-136574528ed5"],
    weather: "Moderate"
  },
  "Mumbai": {
    overview: "Financial capital with Bollywood culture.",
    culture: "Fast-paced, diverse.",
    food: [
      {
        name: "Vada Pav",
        image: "https://images.unsplash.com/photo-1604908176997-43184aefdfc1",
        description: "Street food."
      }
    ],
    places: [
      {
        name: "Gateway of India",
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
        description: "Historic monument."
      }
    ],
    personalities: [
      {
        name: "Amitabh Bachchan",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Amitabh_Bachchan.jpg"
      }
    ],
    hotels: [
      {
        name: "Taj Mahal Palace",
        link: "https://www.tajhotels.com/",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        description: "Iconic hotel."
      }
    ],
    shopping: [
      {
        item: "Fashion Street",
        image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53"
      }
    ],
    bestTime: "Nov–Feb",
    tips: ["Avoid monsoon"],
    images: ["https://images.unsplash.com/photo-1570168007204-dfb528c6958f"],
    weather: "Moderate"
  },
  "Goa": {
    overview: "Beach destination with nightlife.",
    culture: "Portuguese + Indian.",
    food: [
      {
        name: "Fish Curry",
        image: "https://images.unsplash.com/photo-1604908554025-7e6d8c9c3d54",
        description: "Seafood dish."
      }
    ],
    places: [
      {
        name: "Baga Beach",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        description: "Famous beach."
      }
    ],
    personalities: [
      {
        name: "Remo Fernandes",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Remo_Fernandes.jpg"
      }
    ],
    hotels: [
      {
        name: "Taj Exotica",
        link: "https://www.tajhotels.com/",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        description: "Beach resort."
      }
    ],
    shopping: [
      {
        item: "Beachwear",
        image: "https://images.unsplash.com/photo-1520975916090-3105956dac38"
      }
    ],
    bestTime: "Nov–Feb",
    tips: ["Rent bike"],
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e"],
    weather: "Beach"
  },
  "Manali": {
    overview: "Snowy hill station.",
    culture: "Himachali traditions.",
    food: [
      {
        name: "Siddu",
        image: "https://images.unsplash.com/photo-1604908554025-7e6d8c9c3d54",
        description: "Local bread."
      }
    ],
    places: [
      {
        name: "Solang Valley",
        image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16",
        description: "Adventure spot."
      }
    ],
    personalities: [
      {
        name: "Kangana Ranaut",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Kangana_Ranaut.jpg"
      }
    ],
    hotels: [
      {
        name: "The Himalayan",
        link: "https://www.thehimalayan.com/",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        description: "Luxury stay."
      }
    ],
    shopping: [
      {
        item: "Woolens",
        image: "https://images.unsplash.com/photo-1520975916090-3105956dac38"
      }
    ],
    bestTime: "All year",
    tips: ["Carry warm clothes"],
    images: ["https://images.unsplash.com/photo-1609947017136-9daf32a5eb16"],
    weather: "Cold"
  },
  "Shimla": {
    overview: "Colonial hill station.",
    culture: "British + Himachali.",
    food: [
      {
        name: "Chana Madra",
        image: "https://images.unsplash.com/photo-1604908176997-43184aefdfc1",
        description: "Local dish."
      }
    ],
    places: [
      {
        name: "Mall Road",
        image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3",
        description: "Shopping street."
      }
    ],
    personalities: [
      {
        name: "Anupam Kher",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Anupam_Kher.jpg"
      }
    ],
    hotels: [
      {
        name: "Clarkes Hotel",
        link: "https://www.oberoihotels.com/",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        description: "Historic hotel."
      }
    ],
    shopping: [
      {
        item: "Wooden crafts",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
      }
    ],
    bestTime: "March–June",
    tips: ["Avoid peak season"],
    images: ["https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3"],
    weather: "Cold"
  },
  "Udaipur": {
    overview: "City of Lakes.",
    culture: "Rajput heritage.",
    food: [
      {
        name: "Dal Baati",
        image: "https://images.unsplash.com/photo-1604908176997-43184aefdfc1",
        description: "Traditional food."
      }
    ],
    places: [
      {
        name: "Lake Pichola",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        description: "Scenic lake."
      }
    ],
    personalities: [
      {
        name: "Maharana Pratap",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Maharana_Pratap.jpg"
      }
    ],
    hotels: [
      {
        name: "Oberoi Udaivilas",
        link: "https://www.oberoihotels.com/",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        description: "Luxury lake hotel."
      }
    ],
    shopping: [
      {
        item: "Miniature paintings",
        image: "https://images.unsplash.com/photo-1593032465175-481ac7f401b0"
      }
    ],
    bestTime: "Oct–March",
    tips: ["Take boat ride"],
    images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"],
    weather: "Hot"
  },
  "Bangalore": {
    overview: "Tech hub with pleasant climate.",
    culture: "Modern + South Indian.",
    food: [
      {
        name: "Dosa",
        image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
        description: "South Indian dish."
      }
    ],
    places: [
      {
        name: "Lalbagh",
        image: "https://images.unsplash.com/photo-1597047084897-51e81819a499",
        description: "Botanical garden."
      }
    ],
    personalities: [
      {
        name: "Narayana Murthy",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Narayana_Murthy.jpg"
      }
    ],
    hotels: [
      {
        name: "Taj West End",
        link: "https://www.tajhotels.com/",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        description: "Luxury hotel."
      }
    ],
    shopping: [
      {
        item: "Commercial Street",
        image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53"
      }
    ],
    bestTime: "Oct–Feb",
    tips: ["Traffic heavy"],
    images: ["https://images.unsplash.com/photo-1597047084897-51e81819a499"],
    weather: "Moderate"
  },
  "Hyderabad": {
    overview: "City of Nizams.",
    culture: "Mughal + Telugu mix.",
    food: [
      {
        name: "Hyderabadi Biryani",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
        description: "Famous rice dish."
      }
    ],
    places: [
      {
        name: "Charminar",
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1",
        description: "Historic monument."
      }
    ],
    personalities: [
      {
        name: "Sania Mirza",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Sania_Mirza.jpg"
      }
    ],
    hotels: [
      {
        name: "Taj Falaknuma Palace",
        link: "https://www.tajhotels.com/",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        description: "Royal palace hotel."
      }
    ],
    shopping: [
      {
        item: "Pearls",
        image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d"
      }
    ],
    bestTime: "Oct–Feb",
    tips: ["Try local food"],
    images: ["https://images.unsplash.com/photo-1590050752117-238cb0fb12b1"],
    weather: "Moderate"
  }
};

const CITY_IMAGES: Record<string, string> = {
  "Delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=1200",
  "Manali": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200",
  "Simla": "https://images.unsplash.com/photo-1597074866923-dc0589134511?auto=format&fit=crop&q=80&w=1200",
  "Udaipur": "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&q=80&w=1200",
  "Mumbai": "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=1200",
  "Goa": "https://images.unsplash.com/photo-1512783514552-65825bc0d0ce?auto=format&fit=crop&q=80&w=1200",
  "Varanasi": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=1200",
  "Agra": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200",
  "Amritsar": "https://images.unsplash.com/photo-1514222139-b786bb73c84f?auto=format&fit=crop&q=80&w=1200",
  "Rishikesh": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=1200",
  "Alleppey": "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=80&w=1200",
  "Leh": "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=1200",
  "Srinagar": "https://images.unsplash.com/photo-1598335624134-406798020786?auto=format&fit=crop&q=80&w=1200",
  "Bangalore": "https://images.unsplash.com/photo-1596760411131-3b70ced6f64c?auto=format&fit=crop&q=80&w=1200",
  "Kolkata": "https://images.unsplash.com/photo-1558431382-bb7b38c290b0?auto=format&fit=crop&q=80&w=1200",
  "Jaipur": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200"
};

export const GROUP_MEMBERS = [
  { id: "u1", name: "You", avatar: "👨‍💻", email: "p46106535@gmail.com", balance: 0 },
  { id: "u2", name: "Mukut", avatar: "🧔", email: "mukut@example.com", balance: 0 },
  { id: "u3", name: "Pinak", avatar: "🧑‍🦰", email: "pinak@example.com", balance: 0 },
  { id: "u4", name: "Nakul", avatar: "👦", email: "nakul@example.com", balance: 0 },
  { id: "u5", name: "Pinak", avatar: "👨", email: "pinaksharma1120@gmail.com", balance: 0 },
  { id: "u6", name: "Naman", avatar: "🧔‍♂️", email: "naman@example.com", balance: 0 },
  { id: "u7", name: "Rachit", avatar: "🧑‍🦳", email: "rachit@example.com", balance: 0 }
];

export type SplitType = "equal" | "exact" | "percentage" | "shares";

export interface ExpenseSplit {
  userId: string;
  amount: number;
  percentage?: number;
  shares?: number;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  currency: string;
  date: string;
  paidBy: string; // userId
  category: string;
  splitType: SplitType;
  splits: ExpenseSplit[];
  notes?: string;
  items?: { name: string; price: number }[];
}

export interface ExpenseGroup {
  id: string;
  name: string;
  type: "trip" | "home" | "couple" | "other";
  destination?: string;
  members: typeof GROUP_MEMBERS;
  totalBudget: number;
  currency: string;
  expenses: Expense[];
}

export const mockExpenseGroups: ExpenseGroup[] = [
  {
    id: "trip-jaipur",
    name: "Jaipur Heritage Retreat",
    type: "trip",
    destination: "Jaipur",
    members: GROUP_MEMBERS,
    totalBudget: 50000,
    currency: "INR",
    expenses: [
      { 
        id: "e1", 
        title: "Amber Fort Entry", 
        amount: 3500, 
        currency: "INR",
        paidBy: "u5", 
        category: "Sightseeing", 
        date: "2024-04-10",
        splitType: "equal",
        splits: GROUP_MEMBERS.map(m => ({ userId: m.id, amount: 3500 / GROUP_MEMBERS.length }))
      },
      { 
        id: "e2", 
        title: "Dinner at Rawat Mishthan Bhandar", 
        amount: 2200, 
        currency: "INR",
        paidBy: "u4", 
        category: "Food", 
        date: "2024-04-10",
        splitType: "equal",
        splits: GROUP_MEMBERS.map(m => ({ userId: m.id, amount: 2200 / GROUP_MEMBERS.length }))
      },
      { 
        id: "e3", 
        title: "Boutique Hotel Booking", 
        amount: 12000, 
        currency: "INR",
        paidBy: "u2", 
        category: "Stay", 
        date: "2024-04-09",
        splitType: "exact",
        splits: GROUP_MEMBERS.map(m => ({ userId: m.id, amount: 12000 / GROUP_MEMBERS.length }))
      }
    ]
  },
  {
    id: "trip-manali",
    name: "Manali Adventure Squad",
    type: "trip",
    destination: "Manali",
    members: GROUP_MEMBERS.slice(0, 4),
    totalBudget: 80000,
    currency: "INR",
    expenses: [
      { 
        id: "e4", 
        title: "River Rafting", 
        amount: 8000, 
        currency: "INR",
        paidBy: "u3", 
        category: "Adventure", 
        date: "2024-04-15",
        splitType: "equal",
        splits: GROUP_MEMBERS.slice(0, 4).map(m => ({ userId: m.id, amount: 2000 }))
      },
      { 
        id: "e5", 
        title: "Cafe 1947 Dinner", 
        amount: 4500, 
        currency: "INR",
        paidBy: "u1", 
        category: "Food", 
        date: "2024-04-16",
        splitType: "equal",
        splits: GROUP_MEMBERS.slice(0, 4).map(m => ({ userId: m.id, amount: 1125 }))
      }
    ]
  }
];

export const ITINERARY_DATA: Record<string, any> = {
  "Jaipur": {
    "3_days": {
      "day_1": {
        "theme": "Heritage Exploration",
        "places": ["Hawa Mahal", "City Palace", "Jantar Mantar"],
        "food": ["Dal Baati Churma", "Pyaaz Kachori"],
        "hotel": ["OYO Budget Stay", "Lemon Tree Premier"],
        "events": ["Evening Light & Sound Show at Amber Fort"],
        "culture": ["Rajasthani folk dance at Chokhi Dhani"],
        "shopping": ["Johari Bazaar - Jewelry"]
      },
      "day_2": {
        "theme": "Forts & Royalty",
        "places": ["Amber Fort", "Jaigarh Fort", "Nahargarh Fort"],
        "food": ["Laal Maas", "Ghewar"],
        "events": ["Sunset at Nahargarh"],
        "culture": ["Puppet show"]
      },
      "day_3": {
        "theme": "Markets & Leisure",
        "places": ["Albert Hall Museum", "Birla Temple"],
        "food": ["Lassi", "Mirchi Bada"],
        "shopping": ["Bapu Bazaar - Handicrafts"]
      }
    },
    "5_days": {
      "day_1": { "theme": "Heritage Exploration", "places": ["Hawa Mahal", "City Palace"], "food": ["Dal Baati Churma"] },
      "day_2": { "theme": "Forts & Royalty", "places": ["Amber Fort", "Jaigarh Fort"] },
      "day_3": { "theme": "Markets", "places": ["Albert Hall Museum"], "shopping": ["Johari Bazaar"] },
      "day_4": {
        "theme": "Village Experience",
        "places": ["Chokhi Dhani"],
        "culture": ["Camel ride", "Traditional meals"]
      },
      "day_5": {
        "theme": "Nearby Excursion",
        "places": ["Sambhar Lake"],
        "activity": ["Salt lake photography"]
      }
    },
    "7_days": {
      "day_1": { "theme": "Heritage Exploration" },
      "day_2": { "theme": "Forts" },
      "day_3": { "theme": "Markets" },
      "day_4": { "theme": "Village" },
      "day_5": { "theme": "Salt Lake" },
      "day_6": {
        "theme": "Luxury & Relaxation",
        "hotel": ["Rambagh Palace"],
        "activity": ["Spa", "Fine dining"]
      },
      "day_7": {
        "theme": "Hidden Gems",
        "places": ["Panna Meena Stepwell"],
        "shopping": ["Local artisan shops"]
      }
    }
  },
  "Manali": {
    "3_days": {
      "day_1": {
        "theme": "Local Sightseeing",
        "places": ["Hadimba Temple", "Mall Road"],
        "food": ["Trout Fish", "Maggi"],
        "hotel": ["Zostel", "Snow Valley Resort"],
        "culture": ["Himachali folk music"]
      },
      "day_2": {
        "theme": "Adventure",
        "places": ["Solang Valley"],
        "activity": ["Paragliding", "Skiing"],
        "food": ["Siddu"]
      },
      "day_3": {
        "theme": "Snow & Pass",
        "places": ["Rohtang Pass"],
        "tips": ["Carry warm clothes"]
      }
    },
    "5_days": {
      "day_1": { "theme": "Local" }, "day_2": { "theme": "Adventure" }, "day_3": { "theme": "Snow" },
      "day_4": {
        "theme": "Kasol Trip",
        "places": ["Parvati Valley"],
        "food": ["Israeli cuisine"]
      },
      "day_5": {
        "theme": "Relax",
        "activity": ["River side cafes"]
      }
    },
    "7_days": {
      "day_1": { "theme": "Local" }, "day_2": { "theme": "Adventure" }, "day_3": { "theme": "Snow" }, "day_4": { "theme": "Kasol" }, "day_5": { "theme": "Relax" },
      "day_6": {
        "theme": "Trekking",
        "places": ["Hampta Pass"]
      },
      "day_7": {
        "theme": "Spa & Chill",
        "hotel": ["Luxury mountain resort"]
      }
    }
  },
  "Shimla": {
    "3_days": {
      "day_1": { "places": ["Mall Road", "Christ Church"], "food": ["Chana Madra"] },
      "day_2": { "places": ["Kufri"], "activity": ["Horse riding", "Snow activities"] },
      "day_3": { "places": ["Jakhoo Temple"], "shopping": ["Lakkar Bazaar"] }
    }
  },
  "Udaipur": {
    "3_days": {
      "day_1": { "places": ["City Palace", "Lake Pichola"], "food": ["Dal Baati"] },
      "day_2": { "places": ["Sajjangarh Palace"], "event": ["Sunset view"] },
      "day_3": { "places": ["Fateh Sagar Lake"], "shopping": ["Hathi Pol Bazaar"] }
    }
  },
  "Chandigarh": {
    "3_days": {
      "day_1": { "places": ["Rock Garden", "Sukhna Lake"] },
      "day_2": { "places": ["Rose Garden"], "shopping": ["Sector 17"] },
      "day_3": { "food": ["Punjabi cuisine"] }
    }
  },
  "Mumbai": {
    "3_days": {
      "day_1": { "places": ["Gateway of India", "Marine Drive"], "food": ["Vada Pav", "Pav Bhaji"] },
      "day_2": { "places": ["Elephanta Caves"], "event": ["Ferry ride"] },
      "day_3": { "places": ["Juhu Beach"], "shopping": ["Colaba Causeway"] }
    }
  }
};

export const HOTEL_DEALS_MOCK: Record<string, any[]> = {
  "Jaipur": [
    { name: "Rambagh Palace", rating: "5.0", pricePerNight: 35000, deals: [{ site: "Booking.com", price: 35000 }, { site: "Agoda", price: 34200 }, { site: "MakeMyTrip", price: 36000 }], features: ["Ultra Luxury", "Private Pool", "Heritage"] },
    { name: "Umaid Bhawan Hotel", rating: "4.7", pricePerNight: 5200, deals: [{ site: "Booking.com", price: 5500 }, { site: "Agoda", price: 5100 }, { site: "Expedia", price: 5300 }], features: ["Central Location", "Great Food", "Spa"] },
    { name: "Hotel Jaipur Heritage", rating: "4.5", pricePerNight: 4599, deals: [{ site: "Booking.com", price: 4800 }, { site: "MMT", price: 4400 }, { site: "Goibibo", price: 4599 }], features: ["Heritage Stay", "Pool", "WiFi"] }
  ],
  "Manali": [
    { name: "Snow Valley Resort", rating: "4.4", pricePerNight: 6000, deals: [{ site: "MMT", price: 5800 }, { site: "Booking.com", price: 6200 }], features: ["Scenic View", "Restaurant", "Garden"] }
  ],
  "Delhi": [
    { name: "The Leela Palace", rating: "4.9", pricePerNight: 28000, deals: [{ site: "Booking.com", price: 28000 }, { site: "Agoda", price: 27500 }], features: ["Royal Stay", "Luxury Spa", "Lutyens Delhi"] },
    { name: "ITC Maurya", rating: "4.7", pricePerNight: 15000, deals: [{ site: "Expedia", price: 15800 }, { site: "MMT", price: 14200 }], features: ["Fine Dining", "Pool", "Business"] }
  ],
  "Mumbai": [
    { name: "The Taj Mahal Palace", rating: "5.0", pricePerNight: 25000, deals: [{ site: "Booking.com", price: 24500 }, { site: "Tata Neu", price: 23000 }], features: ["Historic", "Sea View", "Iconic"] },
    { name: "The Oberoi Mumbai", rating: "4.9", pricePerNight: 28000, deals: [{ site: "Oberoi", price: 27000 }, { site: "Agoda", price: 28500 }], features: ["Beachfront", "Celebrity Spot", "Luxury"] }
  ],
  "Goa": [
    { name: "Taj Exotica Resort", rating: "4.8", pricePerNight: 22000, deals: [{ site: "Booking.com", price: 22500 }, { site: "Agoda", price: 21000 }], features: ["Private Beach", "Golf", "Spa"] },
    { name: "Leela Goa", rating: "4.9", pricePerNight: 24000, deals: [{ site: "The Leela", price: 23000 }, { site: "MMT", price: 25000 }], features: ["Beachfront", "Luxury", "Trendsetting"] }
  ],
  "Udaipur": [
    { name: "Taj Lake Palace", rating: "4.9", pricePerNight: 50000, deals: [{ site: "Booking.com", price: 50000 }, { site: "Agoda", price: 49000 }], features: ["Floating Palace", "Lake Views", "Ultra Luxury"] },
    { name: "The Oberoi Udaivilas", rating: "5.0", pricePerNight: 45000, deals: [{ site: "Oberoi", price: 44000 }, { site: "Expedia", price: 46000 }], features: ["Palace Experience", "Lake Views", "Royal"] }
  ],
  "Bangalore": [
    { name: "The Oberoi Bengaluru", rating: "4.8", pricePerNight: 15000, deals: [{ site: "Booking.com", price: 15500 }, { site: "Agoda", price: 14800 }], features: ["Heritage Garden", "Pool", "Central"] }
  ],
  "Hyderabad": [
    { name: "Taj Falaknuma Palace", rating: "4.9", pricePerNight: 35000, deals: [{ site: "Tata Neu", price: 34000 }, { site: "Booking.com", price: 36000 }], features: ["Former Palace", "High on Hill", "Royal"] }
  ]
};

export const mockBlogs: LocationBlog[] = CITIES.map((city, i) => {
  const detailed = DETAILED_BLOGS[city] || {};
  return {
    id: `Blog${i + 1}`,
    name: city,
    overview: detailed.overview || `${city} is a one of the most vibrant cities in India, known for its rich history and heritage.`,
    culture: detailed.culture || "Rooted in traditions with a mix of modern influences, festivals are celebrated with great pomp.",
    food: detailed.food || [
      { name: "Special Thali", image: "https://images.unsplash.com/photo-1604908176997-43184aefdfc1", description: "A mix of local delicacies." }
    ],
    places: detailed.places || [
      { name: "Main Landmark", image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3", description: "Must visit spot." }
    ],
    personalities: detailed.personalities || [
      { name: "Local Hero", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d" }
    ],
    hotels: detailed.hotels || [
      { name: "Heritage Stay", link: "#", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945", description: "Boutique experience." }
    ],
    shopping: detailed.shopping || [
      { item: "Traditional Crafts", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" }
    ],
    bestTime: detailed.bestTime || "October to March",
    tips: detailed.tips || ["Carry water", "Respect local customs", "Use public transport"],
    images: detailed.images || [CITY_IMAGES[city] || `https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1200&sig=${city}`],
    weather: (detailed.weather as any) || (i % 4 === 0 ? "Hot" : i % 4 === 1 ? "Cold" : i % 4 === 2 ? "Beach" : "Moderate")
  };
});

