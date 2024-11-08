

// Sample Data (Simulating ML Model Outputs)
const beaches = [
  {
      name: "Goa",
      waterQuality: 85,
      safety: 90,
      weather: 80,
      amenities: 75,
      score: 85,
  },
  {
      name: "Varkala",
      waterQuality: 80,
      safety: 85,
      weather: 78,
      amenities: 80,
      score: 81,
  },
  {
      name: "Rishikonda",
      waterQuality: 88,
      safety: 92,
      weather: 85,
      amenities: 70,
      score: 86,
  },
  {
      name: "Kovalam",
      waterQuality: 75,
      safety: 80,
      weather: 82,
      amenities: 85,
      score: 80,
  },
];


const beachGrid = document.getElementById("beach-grid");
let currentExpandedBeach = null; 

function displayPopularBeaches() {
  beachGrid.innerHTML = "";
  beaches.forEach((beach) => {
      const beachCard = document.createElement("div");
      beachCard.className = `beach-card ${beach.name.toLowerCase()}`;

      beachCard.innerHTML = `
          <h3>${beach.name}</h3>
          <p>Suitability Score: ${beach.score}%</p>
          <button onclick="viewDetails('${beach.name}')">More Details</button>
      `;
      beachGrid.appendChild(beachCard);
  });
}

function viewDetails(beachName) {
  const beach = beaches.find((b) => b.name === beachName);
  
  
  if (currentExpandedBeach && currentExpandedBeach !== beachName) {
      toggleLessDetails(currentExpandedBeach);
  }
  
 
  const beachD = document.getElementsByClassName(beachName.toLowerCase());
  beachD[0].innerHTML = `
      <h2>${beach.name}</h2>
      <p><strong>Water Quality:</strong> ${beach.waterQuality}%</p>
      <p><strong>Safety:</strong> ${beach.safety}%</p>
      <p><strong>Weather Conditions:</strong> ${beach.weather}%</p>
      <p><strong>Amenities:</strong> ${beach.amenities}%</p>
      <p><strong>Overall Suitability Score:</strong> ${beach.score}%</p>
      <button onclick="toggleLessDetails('${beach.name}')">Less Details</button>
      <button onclick="viewMap('${beach.name}')">View on Map</button>
  `;
  
  currentExpandedBeach = beachName;
}

function toggleLessDetails(beachName) {
  const beach = beaches.find((b) => b.name === beachName);
  
  const beachD = document.getElementsByClassName(beachName.toLowerCase());
  beachD[0].innerHTML = `
      <h3>${beach.name}</h3>
      <p>Suitability Score: ${beach.score}%</p>
      <button onclick="viewDetails('${beach.name}')">More Details</button>
  `;
  
  currentExpandedBeach = null;
}

const searchBar = document.getElementById("searchBar");
const searchSuggestions = document.getElementById("searchSuggestions");

searchBar.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  searchSuggestions.innerHTML = "";
  if (query) {
      const matches = beaches.filter((beach) =>
          beach.name.toLowerCase().includes(query)
      );
      searchSuggestions.style.display = matches.length ? "block" : "none";
      matches.forEach((match) => {
          const suggestion = document.createElement("p");
          suggestion.textContent = match.name;
          suggestion.onclick = () => {
              searchBar.value = match.name;
              viewDetails(match.name);
              searchSuggestions.style.display = "none";
          };
          searchSuggestions.appendChild(suggestion);
      });
  } else {
      searchSuggestions.style.display = "none";
  }
});

// Placeholder for Map Viewing (for later integration)
function viewMap(beachName) {
  
  url = "https://www.google.com/maps/search/" + beachName + " beach";
  window.open(url);
}

displayPopularBeaches();



