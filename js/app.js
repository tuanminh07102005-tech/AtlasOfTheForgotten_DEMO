// 1. Tạo mảng đối tượng JSON chứa dữ liệu các địa điểm Urbex
const urbexSites = [
  {
    id: 'buzludzha',
    title: 'Buzludzha Monument',
    location: 'Central Balkan Mountains, Bulgaria',
    description: 'An abandoned communist headquarters built in 1981, left to decay on a remote mountain peak. Characterized by its brutalist, UFO-like architecture.',
    safety: {
      access: 'Trespassing Risk (Danger)',
      integrity: 'Deteriorating Roof',
      security: 'Intermittent patrols'
    }
  },
  {
    id: 'hashima',
    title: 'Hashima Island',
    location: 'Nagasaki Prefecture, Japan',
    description: 'A completely abandoned island facility known for its undersea coal mines. Left entirely deserted in 1974.',
    safety: {
      access: 'Official Tours Only',
      integrity: 'Collapsing concrete',
      security: 'Strict'
    }
  },
  {
    id: 'battersea',
    title: 'Battersea Power Station (Historical)',
    location: 'London, UK',
    description: 'Before its modern renovation, this was one of the most famous abandoned industrial sites in Europe, featured in pop culture.',
    safety: {
      access: 'Now public/Commercial',
      integrity: 'Fully restored',
      security: 'Public area'
    }
  }
];

let currentSiteIndex = 0; // Biến lưu vị trí địa điểm đang được chọn

// Lấy các phần tử DOM cần thiết
const titleEl = document.getElementById('siteTitle');
const locationEl = document.getElementById('siteLocation');
const descEl = document.getElementById('siteDescription');
const safetyTracker = document.getElementById('safetyTracker');
const mapContainer = document.getElementById('map-container');
const wishlistBtn = document.getElementById('addWishlistBtn');
const wishlistContainer = document.getElementById('wishlist');

// 2. Giả lập bản đồ tương tác (Prototype Map)
// Tạo các nút bấm thay thế cho click trên bản đồ thực tế
mapContainer.innerHTML = `
    <div class="text-center">
        <p class="mb-3 text-light">Select a site on the map:</p>
        <button class="btn btn-sm btn-outline-light m-1" onclick="loadSite(0)">📍 Buzludzha</button>
        <button class="btn btn-sm btn-outline-light m-1" onclick="loadSite(1)">📍 Hashima</button>
        <button class="btn btn-sm btn-outline-light m-1" onclick="loadSite(2)">📍 Battersea</button>
    </div>
`;

// Hàm tải dữ liệu của một địa điểm và cập nhật lên giao diện HTML
window.loadSite = function(index) {
  currentSiteIndex = index;
  const site = urbexSites[index];

  // Cập nhật text thông tin cơ bản
  titleEl.textContent = site.title;
  locationEl.innerHTML = `<i class="bi bi-pin-map"></i> ${site.location}`;
  descEl.textContent = site.description;

  // Cập nhật bảng Safety Tracker
  safetyTracker.innerHTML = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Legal Access <span class="badge bg-danger rounded-pill">${site.safety.access}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Structural Integrity <span class="badge bg-warning text-dark rounded-pill">${site.safety.integrity}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Security Presence <span class="badge bg-secondary rounded-pill">${site.safety.security}</span>
        </li>
    `;
};

// 3. Hàm xử lý nút 'Add to Wishlist'
wishlistBtn.addEventListener('click', function() {
  const site = urbexSites[currentSiteIndex];

  // Tạo thẻ <li> mới bằng JavaScript
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';

  // Đổ dữ liệu vào thẻ <li>
  li.innerHTML = `
        ${site.title}
        <span class="badge bg-primary rounded-pill">Planned</span>
    `;

  // Thêm thẻ <li> mới vào cuối danh sách wishlist
  wishlistContainer.appendChild(li);
});
