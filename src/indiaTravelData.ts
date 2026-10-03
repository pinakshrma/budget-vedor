
export const INDIA_TRAVEL_DATA = {
  "meta": {
    "title": "India Travel Guide",
    "version": "1.0",
    "total_cities": 26,
    "days_available": [3, 5, 7],
    "last_updated": "2025"
  },
  "cities": [
    {
      "id": "jaipur",
      "name": "Jaipur",
      "state": "Rajasthan",
      "nickname": "The Pink City",
      "best_season": "October to March",
      "tags": ["heritage", "food", "royalty", "shopping", "art"],
      "images": {
        "hero": "amber_fort_jaipur.jpg",
        "food": "dal_baati_churma.jpg",
        "sunset": "nahargarh_sunset.jpg"
      },
      "must_try_foods": [
        { "name": "Dal Baati Churma", "where": "Laxmi Mishthan Bhandar, 1135 AD" },
        { "name": "Pyaaz Kachori", "where": "Rawat Mishthan Bhandar" },
        { "name": "Ghewar", "where": "LMB, Old City sweets shops" },
        { "name": "Laal Maas", "where": "Padao Restaurant, Spice Court" },
        { "name": "Lassi", "where": "Lassiwala on MI Road" },
        { "name": "Mirchi Bada", "where": "Masala Chowk" }
      ],
      "hotels": {
        "budget": [
          { "name": "Zostel Jaipur", "area": "Old City", "note": "Best hostel for solo travellers" }
        ],
        "mid_range": [
          { "name": "Alsisar Haveli", "area": "Sansar Chandra Road", "note": "Heritage haveli with courtyard" },
          { "name": "Shahpura House", "area": "Devi Nagar", "note": "Beautiful murals and gardens" }
        ],
        "luxury": [
          { "name": "Rambagh Palace", "area": "Bhawani Singh Road", "note": "Former royal residence, Taj property" },
          { "name": "Jai Mahal Palace", "area": "Jacob Road", "note": "Mughal-style architecture, stunning gardens" }
        ]
      },
      "itineraries": {
        "3_days": [
          {
            "day": 1,
            "title": "Forts, Royal Views & Sunset Experience",
            "morning": {
              "time": "7:00 AM – 12:30 PM",
              "places": [
                {
                  "name": "Amber Fort",
                  "highlight": "Sheesh Mahal, Diwan-e-Aam, Diwan-e-Khas",
                  "duration": "2-3 hours",
                  "tip": "Reach early before 8 AM to avoid crowds. Take a guide or audio guide.",
                  "entry_fee": "INR 100 (Indian), INR 500 (Foreigner)"
                },
                {
                  "name": "Panna Meena Ka Kund",
                  "highlight": "Hidden stepwell near Amer Fort",
                  "duration": "30 mins",
                  "tip": "Best for photography, geometric stepwell architecture"
                }
              ],
              "breakfast": {
                "options": ["Anokhi Cafe", "Tapri Central"],
                "must_try": "Masala chai, sandwiches, pancakes"
              }
            },
            "afternoon": {
              "time": "1:00 PM – 5:00 PM",
              "places": [
                {
                  "name": "Jaigarh Fort",
                  "highlight": "World's largest cannon Jaivana, panoramic views",
                  "duration": "1.5 hours",
                  "tip": "Connected to Amber Fort via path, get combo ticket"
                },
                {
                  "name": "Jal Mahal",
                  "highlight": "Palace in the middle of Man Sagar Lake",
                  "duration": "30 mins",
                  "tip": "No entry inside. Best photo stop. Visit around golden hour."
                }
              ],
              "lunch": {
                "options": ["Hotel Kesar", "Peacock Rooftop Restaurant"],
                "must_try": "Rajasthani Thali"
              }
            },
            "evening": {
              "time": "5:30 PM – 8:30 PM",
              "places": [
                {
                  "name": "Nahargarh Fort",
                  "highlight": "Best sunset viewpoint in Jaipur",
                  "duration": "2 hours",
                  "tip": "Reach by 5:30 PM to get a good spot for sunset"
                }
              ],
              "dinner": {
                "options": [
                  { "name": "Padao Restaurant", "note": "Inside Nahargarh, sunset view, rooftop seating" },
                  { "name": "1135 AD", "note": "Royal fine dining experience near Amber Fort" }
                ],
                "must_try": "Laal Maas, Dal Baati Churma"
              }
            }
          },
          {
            "day": 2,
            "title": "Pink City, Heritage & Food Crawl",
            "morning": {
              "time": "8:00 AM – 12:30 PM",
              "places": [
                {
                  "name": "Hawa Mahal",
                  "highlight": "Iconic 5-storey pink façade, 953 windows",
                  "duration": "1 hour",
                  "tip": "Go early for best photography light. View from outside is the iconic shot."
                },
                {
                  "name": "City Palace Jaipur",
                  "highlight": "Royal residence + museum, Peacock Gate",
                  "duration": "1.5 hours",
                  "tip": "Peacock Gate and Diwan-e-Khas are highlights. Dress modestly."
                },
                {
                  "name": "Jantar Mantar",
                  "highlight": "UNESCO World Heritage Site, astronomical instruments",
                  "duration": "45 mins",
                  "tip": "Take a guide to understand the instruments. Samrat Yantra is the world's largest sundial."
                }
              ],
              "breakfast": {
                "options": ["Laxmi Mishthan Bhandar (LMB)", "Rawat Mishthan Bhandar"],
                "must_try": "Kachori, Jalebi, Lassi"
              }
            },
            "afternoon": {
              "time": "2:30 PM – 6:30 PM",
              "shopping_markets": [
                { "name": "Johari Bazaar", "famous_for": "Jewelry, Kundan, Meenakari" },
                { "name": "Bapu Bazaar", "famous_for": "Clothes, Mojris, Textiles" },
                { "name": "Tripolia Bazaar", "famous_for": "Bangles, Lac jewelry, Utensils" }
              ],
              "lunch": {
                "options": [
                  { "name": "Laxmi Mishthan Bhandar", "must_try": "Dal Baati Churma" },
                  { "name": "Rawat Mishthan Bhandar", "must_try": "Pyaaz Kachori" },
                  { "name": "Natraj Restaurant", "must_try": "Authentic Rajasthani Thali" }
                ]
              }
            },
            "evening": {
              "time": "7:00 PM onwards",
              "places": [
                {
                  "name": "Chokhi Dhani",
                  "highlight": "Village theme resort with folk dance, camel rides, cultural shows",
                  "duration": "3-4 hours",
                  "tip": "Entry includes dinner. Book in advance on weekends."
                }
              ],
              "dinner": {
                "options": [
                  { "name": "Chokhi Dhani", "note": "Best immersive Rajasthani dinner experience" },
                  { "name": "Bar Palladio", "note": "Italian-Indian fusion, luxury vibe, great cocktails" }
                ]
              }
            }
          },
          {
            "day": 3,
            "title": "Relax, Hidden Gems & Nature",
            "morning": {
              "time": "6:30 AM – 11:00 AM",
              "places": [
                {
                  "name": "Galta Ji Temple (Monkey Temple)",
                  "highlight": "Ancient temple complex, natural spring kunds, sunrise hike",
                  "duration": "2 hours",
                  "tip": "Wear old clothes - monkeys are friendly but playful. Sunrise is magical."
                },
                {
                  "name": "Jhalana Leopard Safari Park (Alternative)",
                  "highlight": "Wildlife safari, leopard sightings possible",
                  "duration": "2.5 hours",
                  "tip": "Book morning slot (6:30 AM), best chance for leopard sightings"
                }
              ]
            },
            "late_morning": {
              "time": "11:00 AM – 1:00 PM",
              "places": [
                {
                  "name": "Albert Hall Museum",
                  "highlight": "Oldest museum in Rajasthan, Indo-Saracenic architecture",
                  "duration": "1.5 hours",
                  "tip": "Egyptian mummy and textile collection are highlights"
                }
              ]
            },
            "afternoon": {
              "time": "2:00 PM – 5:00 PM",
              "places": [
                {
                  "name": "Birla Mandir",
                  "highlight": "White marble temple, panoramic city views",
                  "duration": "45 mins",
                  "tip": "Peaceful and calm. Best visited on weekday afternoon."
                }
              ],
              "lunch": {
                "options": [
                  { "name": "Masala Chowk", "note": "Food court with all Jaipur street food under one roof" }
                ],
                "must_try": "Mirchi Bada, Kachori, Ghewar, Gatte ki Sabzi"
              }
            },
            "evening": {
              "time": "5:00 PM – 8:00 PM",
              "optional": [
                "Hot air balloon ride over the city (book in advance)",
                "Café hopping in C-Scheme area",
                "Farewell dinner at Suvarna Mahal, Rambagh Palace"
              ]
            }
          }
        ],
        "5_days": {
          "note": "3-day itinerary + 2 extra days",
          "day_4": {
            "title": "Day Trips \u2014 Abhaneri & Pushkar",
            "places": [
              {
                "name": "Chand Baori, Abhaneri",
                "highlight": "One of the deepest and largest stepwells in the world",
                "distance_from_jaipur": "95 km, 1.5 hrs",
                "tip": "Start early by 7 AM, combine with Pushkar visit"
              },
              {
                "name": "Pushkar",
                "highlight": "Holy lake, Brahma Temple (only one in India), camel fair in Nov",
                "distance_from_jaipur": "145 km, 2.5 hrs"
              }
            ]
          },
          "day_5": {
            "title": "Art, Craft & Deeper Heritage",
            "places": [
              {
                "name": "Block Printing Workshop, Sanganer",
                "highlight": "Learn traditional block printing and buy fabric",
                "distance_from_jaipur": "16 km"
              },
              {
                "name": "Sisodia Rani Garden",
                "highlight": "Mughal-style garden, frescoes of Krishna-Radha stories",
                "tip": "Quiet and underrated, perfect for morning walk"
              },
              {
                "name": "Sunset at Amber Fort Light & Sound Show",
                "highlight": "Spectacular evening light and sound show",
                "tip": "Book tickets online in advance"
              }
            ]
          }
        },
        "7_days": {
          "note": "5-day itinerary + 2 extra days",
          "day_6": {
            "title": "Shekhawati Heritage Circuit",
            "places": [
              {
                "name": "Mandawa",
                "highlight": "Open-air art gallery, painted havelis with frescoes",
                "distance_from_jaipur": "190 km"
              },
              {
                "name": "Nawalgarh",
                "highlight": "Rich merchants' havelis, Poddar Haveli Museum",
                "distance_from_jaipur": "165 km"
              }
            ]
          },
          "day_7": {
            "title": "Luxury Jaipur + Shopping Finale",
            "places": [
              { "name": "Spa day at Rambagh Palace", "highlight": "Royal Ayurvedic treatments" },
              { "name": "Gem & Jewellery Museum", "highlight": "Exquisite Jaipur gemstone heritage" },
              { "name": "MI Road Shopping", "highlight": "Tie-dye fabrics, blue pottery, gemstones" }
            ]
          }
        }
      }
    },
    {
      "id": "varanasi",
      "name": "Varanasi",
      "state": "Uttar Pradesh",
      "nickname": "The City of Light",
      "best_season": "October to March",
      "tags": ["spiritual", "heritage", "food", "culture"],
      "must_try_foods": [
        { "name": "Banarasi Kachori Sabzi", "where": "Deena Chat Bhandar" },
        { "name": "Tamatar Chaat", "where": "Shree Cafe, Kashi Chaat Bhandar" },
        { "name": "Malaiyo", "where": "Seasonal, old city lanes \u2014 only in winter" },
        { "name": "Banarasi Paan", "where": "Keshav Paan Bhandar" },
        { "name": "Lassi", "where": "Blue Lassi Shop, Godowlia" },
        { "name": "Thandai", "where": "Pehelwan Tea & Lassi" }
      ],
      "hotels": {
        "budget": [{ "name": "Stops Hostel", "area": "Assi Ghat", "note": "Best location near ghats" }],
        "mid_range": [{ "name": "BrijRama Palace", "area": "Munshi Ghat", "note": "Heritage palace on the ghat itself" }],
        "luxury": [{ "name": "Taj Ganges", "area": "Nadesar", "note": "Sprawling lawns, serene Banarasi experience" }]
      },
      "itineraries": {
        "3_days": [
          {
            "day": 1,
            "title": "Ganga Aarti & Sacred Ghats",
            "morning": {
              "time": "5:00 AM \u2013 10:00 AM",
              "places": [
                { "name": "Dashashwamedh Ghat", "highlight": "Main ghat, sunrise boat ride on Ganga", "tip": "Book a boat the evening before" },
                { "name": "Manikarnika Ghat", "highlight": "Sacred cremation ghat, burning 24/7", "tip": "Be respectful, no photography" }
              ],
              "breakfast": { "options": ["Deena Chat Bhandar", "Shivay Lassi"], "must_try": "Kachori sabzi, jalebi" }
            },
            "afternoon": {
              "time": "10:30 AM \u2013 4:00 PM",
              "places": [
                { "name": "Kashi Vishwanath Temple", "highlight": "One of 12 Jyotirlingas, newly built corridor", "tip": "Deposit phone outside, queues can be long" },
                { "name": "Gyanvapi Mosque area", "highlight": "Historical significance next to temple" },
                { "name": "Ramnagar Fort", "highlight": "Old fort across the river, museum inside", "tip": "Take a boat to cross the Ganga" }
              ]
            },
            "evening": {
              "time": "6:00 PM \u2013 9:00 PM",
              "places": [{ "name": "Ganga Aarti at Dashashwamedh Ghat", "highlight": "Grand 7-priest fire aarti ceremony", "tip": "Reach by 5:30 PM for a front row spot" }]
            }
          },
          {
            "day": 2,
            "title": "Ghats Walk & Banarasi Culture",
            "morning": {
              "time": "6:00 AM \u2013 12:00 PM",
              "places": [
                { "name": "Walking tour of 84 Ghats", "highlight": "Scindia, Panchganga, Trilochan, Assi ghats", "tip": "Walk from Assi to Raj Ghat along the river bank" },
                { "name": "Silk Weaving Workshop", "highlight": "Watch Banarasi silk saris being woven", "tip": "Visit Peeli Kothi or cooperative societies in Madanpura" }
              ]
            },
            "afternoon": {
              "time": "2:00 PM \u2013 6:00 PM",
              "places": [
                { "name": "Sarnath", "highlight": "Where Buddha gave his first sermon, Dhamek Stupa", "distance": "10 km from city", "tip": "Museum has original Ashoka capital (National Emblem)" }
              ]
            }
          },
          {
            "day": 3,
            "title": "Hidden Temples & Departure",
            "morning": {
              "time": "6:00 AM \u2013 11:00 AM",
              "places": [
                { "name": "Tulsi Manas Temple", "highlight": "Built where Tulsidas wrote Ramcharitmanas" },
                { "name": "Durga Kund Mandir", "highlight": "Temple surrounded by a tank, sacred atmosphere" },
                { "name": "Assi Ghat morning rituals", "highlight": "Yoga, meditation, local fishermen, peaceful vibe" }
              ]
            }
          }
        ],
        "5_days": {
          "day_4": { "title": "Vindhyachal & Chunar", "places": [{ "name": "Vindhyachal Devi Temple", "distance": "65 km" }, { "name": "Chunar Fort", "highlight": "16th century Mughal fort, river views" }] },
          "day_5": { "title": "Classical Music & Art", "places": [{ "name": "Banaras Hindu University (BHU) campus + museum" }, { "name": "Sankat Mochan Music Festival visit (if in season)" }] }
        },
        "7_days": {
          "day_6": { "title": "Allahabad (Prayagraj) Day Trip", "places": [{ "name": "Triveni Sangam \u2014 confluence of Ganga, Yamuna, Saraswati" }, { "name": "Allahabad Fort" }] },
          "day_7": { "title": "Final Ganga Experience", "places": [{ "name": "Pre-dawn boat ride & final aarti" }, { "name": "Shopping: Vishwanath Gali for Banarasi silk, paan masala" }] }
        }
      }
    },
    {
      "id": "goa",
      "name": "Goa",
      "state": "Goa",
      "nickname": "The Pearl of the Orient",
      "best_season": "November to February",
      "tags": ["beach", "food", "heritage", "nightlife", "nature"],
      "must_try_foods": [
        { "name": "Goan Fish Curry Rice", "where": "Fisherman's Wharf, Ritz Classic" },
        { "name": "Prawn Balch\u00e3o", "where": "Martin's Corner, Baga" },
        { "name": "Bebinca", "where": "Confeitaria 31 de Janeiro" },
        { "name": "Sorpotel", "where": "Any local Goan home-style restaurant" },
        { "name": "Feni cocktails", "where": "Any beach shack" },
        { "name": "Xacuti Chicken", "where": "Venite Restaurant, Panaji" }
      ],
      "hotels": {
        "budget": [{ "name": "Jungle by studs Hostel", "area": "Vagator", "note": "Stunning cliff views" }],
        "mid_range": [{ "name": "Vivanta Panaji", "area": "Panaji", "note": "Colonial charm in state capital" }],
        "luxury": [{ "name": "Taj Exotica", "area": "Benaulim, South Goa", "note": "Beachfront luxury, top-rated spa" }]
      },
      "itineraries": {
        "3_days": [
          {
            "day": 1,
            "title": "North Goa Beaches & Nightlife",
            "morning": { "time": "9:00 AM \u2013 1:00 PM", "places": [{ "name": "Baga & Calangute Beach", "highlight": "Water sports: parasailing, jet ski", "tip": "Book water sports before 11 AM" }, { "name": "Anjuna Beach", "highlight": "Iconic flea market on Wednesdays" }] },
            "afternoon": { "time": "3:00 PM \u2013 7:00 PM", "places": [{ "name": "Vagator & Chapora Fort", "highlight": "Famous DDLJ fort, sunset views", "tip": "The Dil Chahta Hai fort view is worth every step" }] },
            "evening": { "time": "9:00 PM \u2013 Late", "places": [{ "name": "Tito's Street, Baga", "highlight": "Goa's most iconic nightlife strip" }, { "name": "Curlies, Anjuna", "highlight": "Cliff-side club, trance music heritage" }] }
          },
          {
            "day": 2,
            "title": "Old Goa Heritage & South Goa Beaches",
            "morning": { "time": "9:00 AM \u2013 1:00 PM", "places": [{ "name": "Basilica of Bom Jesus", "highlight": "UNESCO site, St. Francis Xavier's remains", "tip": "UNESCO World Heritage, arrive by 9 AM" }, { "name": "Se Cathedral", "highlight": "Largest church in Asia" }] },
            "afternoon": { "time": "2:00 PM \u2013 7:00 PM", "places": [{ "name": "Palolem Beach", "highlight": "Crescent-shaped paradise, calm waters", "tip": "2-hour drive south, worth it" }, { "name": "Agonda Beach", "highlight": "Quieter, turtle nesting site" }] }
          },
          {
            "day": 3,
            "title": "Waterfalls, Spice Farms & Departure",
            "morning": { "time": "8:00 AM \u2013 1:00 PM", "places": [{ "name": "Dudhsagar Waterfalls", "highlight": "Tallest waterfall in India, 310m", "tip": "Only accessible Jun\u2013Oct. Jeep safari from Mollem." }, { "name": "Spice Farm Tour (Sahakari, Tropical)", "highlight": "Spice plantation tour + Goan lunch" }] }
          }
        ],
        "5_days": {
          "day_4": { "title": "Divar Island & Village Goa", "places": [{ "name": "Divar Island ferry trip" }, { "name": "Fontainhas Latin Quarter, Panaji", "highlight": "Portugal-era coloured houses, art galleries" }] },
          "day_5": { "title": "Hidden Beaches", "places": [{ "name": "Butterfly Beach (boat only)" }, { "name": "Cabo de Rama Fort" }, { "name": "Cotigao Wildlife Sanctuary" }] }
        },
        "7_days": {
          "day_6": { "title": "Hampi Day Trip", "places": [{ "name": "Hampi ruins day trip (4.5 hrs from Goa)" }] },
          "day_7": { "title": "Surf & Wellness", "places": [{ "name": "Surfing at Ashwem Beach" }, { "name": "Yoga and Ayurveda at Mandrem" }] }
        }
      }
    },
    {
      "id": "agra",
      "name": "Agra",
      "state": "Uttar Pradesh",
      "nickname": "City of the Taj",
      "best_season": "October to March",
      "tags": ["heritage", "art", "food"],
      "must_try_foods": [
        { "name": "Petha", "where": "Panchhi Petha, Noori Gate" },
        { "name": "Bedai with Jalebi", "where": "Deviram Sweets" },
        { "name": "Mughlai Biryani", "where": "Pinch of Spice, Peshawri at Trident" },
        { "name": "Dalmoth", "where": "Bikanervala & local snack shops" }
      ],
      "hotels": {
        "budget": [{ "name": "Zostel Agra", "area": "Taj Ganj", "note": "Walking distance to Taj" }],
        "mid_range": [{ "name": "Hotel Mansingh Palace", "area": "Fatehabad Road", "note": "Pool, good Taj views" }],
        "luxury": [{ "name": "The Oberoi Amarvilas", "area": "Taj East Gate", "note": "Every room has a Taj Mahal view" }]
      },
      "itineraries": {
        "3_days": [
          {
            "day": 1,
            "title": "Taj Mahal \u2014 Sunrise, Sunset & Full Experience",
            "morning": { "time": "6:00 AM \u2013 9:00 AM", "places": [{ "name": "Taj Mahal (Sunrise)", "highlight": "World's most beautiful building, sunrise view", "tip": "Entry opens at 6 AM. Get the composite ticket for Agra Fort too." }] },
            "afternoon": { "time": "1:00 PM \u2013 5:00 PM", "places": [{ "name": "Agra Fort", "highlight": "UNESCO site, Mughal architecture, where Shah Jahan was imprisoned" }, { "name": "Mehtab Bagh", "highlight": "Garden opposite Taj, best sunset view of Taj without crowds" }] }
          },
          {
            "day": 2,
            "title": "Fatehpur Sikri & Itmad-ud-Daulah",
            "morning": { "time": "8:00 AM \u2013 1:00 PM", "places": [{ "name": "Fatehpur Sikri", "highlight": "Akbar's abandoned capital, Buland Darwaza", "distance": "37 km from Agra", "tip": "UNESCO World Heritage Site, hire guide" }] },
            "afternoon": { "time": "2:00 PM \u2013 5:00 PM", "places": [{ "name": "Itmad-ud-Daulah (Baby Taj)", "highlight": "First Mughal structure in white marble, intricate inlay work" }, { "name": "Sikandra (Akbar's Tomb)", "highlight": "Akbar's grand mausoleum" }] }
          },
          { "day": 3, "title": "Vrindavan & Mathura Day Trip", "morning": { "time": "7:00 AM \u2013 2:00 PM", "places": [{ "name": "Vrindavan \u2014 ISKCON Temple, Banke Bihari Temple", "distance": "60 km" }, { "name": "Mathura \u2014 Krishna Janmabhoomi", "distance": "55 km" }] } }
        ],
        "5_days": {
          "day_4": { "title": "Marble Inlay Craft & Local Markets", "places": [{ "name": "Marble inlay workshop visit, Taj Ganj area" }, { "name": "Kinari Bazaar, Sadar Bazaar shopping" }] },
          "day_5": { "title": "Chambal Safari", "places": [{ "name": "Chambal River Safari", "highlight": "Ghariyals, Gangetic dolphins, crocodiles", "distance": "70 km from Agra" }] }
        },
        "7_days": {
          "day_6": { "title": "Gwalior Day Trip", "places": [{ "name": "Gwalior Fort \u2014 Man Singh Palace" }, { "name": "Jai Vilas Palace Museum" }] },
          "day_7": { "title": "Orchha & Datia", "places": [{ "name": "Orchha \u2014 Jahangir Mahal, Ram Raja Temple" }, { "name": "Datia Palace (Bir Singh Palace)" }] }
        }
      }
    },
    {
      "id": "kerala_munnar",
      "name": "Munnar",
      "state": "Kerala",
      "nickname": "Scotland of India",
      "best_season": "September to May",
      "tags": ["nature", "tea", "trekking", "wildlife", "honeymoon"],
      "must_try_foods": [
        { "name": "Kerala Sadya", "where": "Any local restaurant on banana leaf" },
        { "name": "Appam with Stew", "where": "Hotel Isaacs Residency" },
        { "name": "Parotta with beef curry", "where": "Local tea shops" },
        { "name": "Fresh tea at plantation", "where": "Tata Tea Museum cafe" }
      ],
      "hotels": {
        "budget": [{ "name": "YHA Munnar Hostel", "area": "Town center", "note": "Budget with tea garden views" }],
        "mid_range": [{ "name": "Windermere Estate", "area": "Pothamedu", "note": "Plantation bungalow experience" }],
        "luxury": [{ "name": "Spice Tree Munnar", "area": "Devikulam", "note": "Infinity pool, forest canopy views" }]
      },
      "itineraries": {
        "3_days": [
          {
            "day": 1,
            "title": "Tea Plantations & Viewpoints",
            "morning": { "time": "7:00 AM \u2013 12:00 PM", "places": [{ "name": "Tata Tea Museum", "highlight": "History of tea, plantation tour, tea tasting" }, { "name": "Mattupetty Dam & Echo Point", "highlight": "Boating, scenic reservoir, echo point" }] },
            "afternoon": { "time": "2:00 PM \u2013 6:00 PM", "places": [{ "name": "Top Station", "highlight": "Highest point in Munnar, Tamil Nadu border views", "tip": "Neelakurinji blooms only once in 12 years \u2014 next in 2030" }] }
          },
          {
            "day": 2,
            "title": "Eravikulam National Park & Waterfalls",
            "morning": { "time": "7:00 AM \u2013 1:00 PM", "places": [{ "name": "Eravikulam National Park", "highlight": "Nilgiri Tahr sightings, Rajamala peak", "tip": "Book tickets online \u2014 gets full fast" }] },
            "afternoon": { "time": "2:00 PM \u2013 6:00 PM", "places": [{ "name": "Attukal Waterfalls", "highlight": "Beautiful cascading waterfalls" }, { "name": "Lakkam Waterfalls", "highlight": "Less crowded, trek through tea gardens" }] }
          },
          { "day": 3, "title": "Kolukumalai Sunrise & Tea Trail", "morning": { "time": "3:30 AM \u2013 10:00 AM", "places": [{ "name": "Kolukumalai Sunrise Trek", "highlight": "World's highest organic tea plantation, above clouds sunrise", "tip": "4WD jeep needed, book a night before" }] } }
        ],
        "5_days": {
          "day_4": { "title": "Thekkady Wildlife", "places": [{ "name": "Periyar Wildlife Sanctuary boat safari", "distance": "90 km from Munnar" }, { "name": "Spice plantation walk, Kumily" }] },
          "day_5": { "title": "Wayanad Extension", "places": [{ "name": "Soochipara Falls, Wayanad" }, { "name": "Edakkal Caves \u2014 prehistoric rock art" }] }
        },
        "7_days": {
          "day_6": { "title": "Vagamon & Paragliding", "places": [{ "name": "Vagamon meadows and pine forests" }, { "name": "Paragliding at Vagamon" }] },
          "day_7": { "title": "Alleppey Houseboat", "places": [{ "name": "Kerala houseboat stay on backwaters, Alleppey" }] }
        }
      }
    }
  ]
}
