/* PeopleOS — a local-first employee management demo.
   All records are stored in this browser's localStorage so the interactions persist on refresh. */

const ROOT = document.getElementById('root');
const MODAL_ROOT = document.getElementById('modal-root');
const DB_KEY = 'peopleos_demo_db_v1';
const SESSION_KEY = 'peopleos_demo_session_v1';

const ICONS = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-5 5"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1a1.8 1.8 0 1 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3 .8v.2a1.8 1.8 0 1 1-3.6 0v-.2a1.8 1.8 0 0 0-3-.8l-.1.1a1.8 1.8 0 1 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-.8-3h-.2a1.8 1.8 0 1 1 0-3.6h.2a1.8 1.8 0 0 0 .8-3l-.1-.1a1.8 1.8 0 1 1 2.5-2.5l.1.1a1.8 1.8 0 0 0 3-.8v-.2a1.8 1.8 0 1 1 3.6 0v.2a1.8 1.8 0 0 0 3 .8l.1-.1a1.8 1.8 0 1 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 .8 3h.2a1.8 1.8 0 1 1 0 3.6h-.2a1.8 1.8 0 0 0-.8 3Z"/>',
  moon: '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  arrowUp: '<path d="M7 17 17 7M7 7h10v10"/>',
  arrowRight: '<path d="M5 12h14m-7-7 7 7-7 7"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  x: '<path d="m18 6-12 12M6 6l12 12"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
  filter: '<path d="M4 7h16M7 12h10m-7 5h4"/>',
  briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18m-11 0v2h4v-2"/>',
  map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15m6-12v15"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.7L7.7 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 1.7-.6l3 .5a2 2 0 0 1 1.7 2.6Z"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8m-8 4h8"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  sparkles: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14ZM5 2l.8 2.2L8 5l-2.2.8L5 8l-.8-2.2L2 5l2.2-.8L5 2Z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  logout: '<path d="M10 17l5-5-5-5m5 5H3"/><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/>',
  keyboard: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M8 13h.01M12 13h.01M16 13h.01M7 16h10"/>',
  building: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 21V9h6v12M7 7h.01M11 7h.01M15 7h.01M7 11h.01M7 15h.01M17 11h.01M17 15h.01"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  circleCheck: '<path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="m9 11 3 3L22 4"/>',
  alert: '<path d="M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  calendarPlus: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m9 4v6m-3-3h6"/>',
  refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.6 9A7 7 0 0 1 18 6.5L20 12M4 12l2 5.5A7 7 0 0 0 18.4 15"/>',
  chevronDown: '<path d="m7 10 5 5 5-5"/>',
  pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>'
};

function icon(name, size = 18) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.sparkles}</svg>`;
}
function logoMark() {
  return `<span class="brand-mark"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 18.5V5.5h5.3c3 0 4.8 1.45 4.8 3.7 0 1.65-.95 2.8-2.45 3.25l4.55 6.05h-4.45l-3.8-5.2H8.4v5.2H5Zm3.4-8h1.8c1.05 0 1.6-.4 1.6-1.2s-.55-1.2-1.6-1.2H8.4v2.4Z" fill="white"/><path d="M17.7 5.5h2.9v13h-2.9z" fill="#C8C1FF"/></svg></span>`;
}
function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}
function localISO(date = new Date()) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function addDays(iso, count) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + count);
  return localISO(d);
}
function formatDate(iso, options = {}) {
  if (!iso) return '—';
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', ...options }).format(date);
}
function formatLongDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}
function currentTime() {
  return new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
}
function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(part => part[0] || '').join('').toUpperCase() || 'P';
}
function colorFor(name = '') {
  const colors = ['linear-gradient(145deg,#8b7af0,#594bd4)', 'linear-gradient(145deg,#55c9ac,#229c7e)', 'linear-gradient(145deg,#f0b768,#d78041)', 'linear-gradient(145deg,#68a4f0,#4568d0)', 'linear-gradient(145deg,#e683a0,#bd557a)', 'linear-gradient(145deg,#39bbb8,#168a9e)'];
  const n = [...name].reduce((sum, c) => sum + c.charCodeAt(0), 0);
  return colors[n % colors.length];
}
function avatar(name, size = '', color) {
  return `<span class="avatar ${size}" style="background:${color || colorFor(name)}">${escapeHtml(initials(name))}</span>`;
}
function fullNameById(id) {
  if (id === 'admin') return db.adminProfile.name;
  return db.employees.find(person => person.id === id)?.name || 'Former employee';
}
function byId(id) { return db.employees.find(person => person.id === id); }
function getCurrentUser() { return session?.role === 'admin' ? db.adminProfile : byId(session?.id) || db.employees[0]; }
function isAdmin() { return session?.role === 'admin'; }
function currentGreeting() {
  const hour = new Date().getHours();
  return hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
}
function statusClass(value = '') {
  const s = value.toLowerCase().replace(/\s+/g, '-');
  if (['active', 'present', 'approved'].includes(s)) return 'pill-active';
  if (['pending', 'late'].includes(s)) return 'pill-pending';
  if (['remote'].includes(s)) return 'pill-remote';
  if (['rejected', 'absent', 'inactive'].includes(s)) return 'pill-rejected';
  return 'pill-neutral';
}
function statusPill(value) {
  return `<span class="pill ${statusClass(value)}">${escapeHtml(value || 'Unknown')}</span>`;
}
function getTodayAttendance() { return db.attendance.filter(record => record.date === localISO()); }
function getAttendanceFor(employeeId, date = localISO()) { return db.attendance.find(record => record.employeeId === employeeId && record.date === date); }
function currentDateRecords(date = localISO()) { return db.attendance.filter(record => record.date === date); }
function calcLeaveDays(start, end) {
  if (!start || !end) return 1;
  const a = new Date(`${start}T12:00:00`), b = new Date(`${end}T12:00:00`);
  return Math.max(1, Math.round((b - a) / 86400000) + 1);
}
function timeAgo(value) {
  const then = new Date(value).getTime();
  if (!Number.isFinite(then)) return 'Recently';
  const minutes = Math.max(0, Math.floor((Date.now() - then) / 60000));
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}
function saveDB() {
  try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch (error) { console.warn('Could not persist PeopleOS demo data', error); }
}
function buildAttendanceSeed(employees) {
  const rows = [];
  const today = localISO();
  const weekdayOffsets = [];
  for (let offset = 0; weekdayOffsets.length < 10 && offset < 18; offset++) {
    const date = addDays(today, -offset);
    const day = new Date(`${date}T12:00:00`).getDay();
    if (day !== 0 && day !== 6) weekdayOffsets.push({ date, offset });
  }
  weekdayOffsets.forEach(({ date, offset }) => {
    employees.forEach((person, index) => {
      let status;
      if (offset === 0) {
        status = ['Present', 'Present', 'Late', 'Remote', 'Present', 'Absent', 'Present', 'On leave'][index % 8];
      } else {
        const n = (index * 3 + offset) % 13;
        status = n === 2 ? 'Remote' : n === 5 ? 'Late' : n === 11 ? 'Absent' : 'Present';
      }
      const hour = 8 + ((index + offset) % 2);
      const min = [8, 17, 24, 32, 41][(index + offset) % 5];
      const checkIn = ['Absent', 'On leave'].includes(status) ? '' : `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
      const checkOut = offset === 0 && index === 0 ? '' : (checkIn ? '17:32' : '');
      rows.push({ employeeId: person.id, date, status, checkIn, checkOut, location: status === 'Remote' ? 'Home' : status === 'On leave' ? '—' : 'Office' });
    });
  });
  return rows;
}
function createSeedDB() {
  const employees = [
    { id: 'emp-001', name: 'Aarav Sharma', email: 'aarav@peopleos.in', title: 'Software Engineer', department: 'Engineering', location: 'Bengaluru', phone: '+91 98765 41001', startDate: '2023-08-14', status: 'Active', salary: 1250000 },
    { id: 'emp-002', name: 'Priya Mehta', email: 'priya@peopleos.in', title: 'Senior Product Designer', department: 'Design', location: 'Mumbai', phone: '+91 98765 41002', startDate: '2022-11-07', status: 'Active', salary: 1480000 },
    { id: 'emp-003', name: 'Rohan Kapoor', email: 'rohan@peopleos.in', title: 'Growth Marketing Lead', department: 'Marketing', location: 'Delhi', phone: '+91 98765 41003', startDate: '2024-02-19', status: 'Active', salary: 1320000 },
    { id: 'emp-004', name: 'Ananya Iyer', email: 'ananya@peopleos.in', title: 'People Partner', department: 'People & Culture', location: 'Bengaluru', phone: '+91 98765 41004', startDate: '2021-06-21', status: 'Active', salary: 1150000 },
    { id: 'emp-005', name: 'Kabir Malhotra', email: 'kabir@peopleos.in', title: 'QA Engineer', department: 'Engineering', location: 'Hyderabad', phone: '+91 98765 41005', startDate: '2024-07-01', status: 'Active', salary: 980000 },
    { id: 'emp-006', name: 'Sara Khan', email: 'sara@peopleos.in', title: 'Account Executive', department: 'Sales', location: 'Remote', phone: '+91 98765 41006', startDate: '2023-04-10', status: 'Active', salary: 1080000 },
    { id: 'emp-007', name: 'Ishaan Gupta', email: 'ishaan@peopleos.in', title: 'Financial Analyst', department: 'Finance', location: 'Mumbai', phone: '+91 98765 41007', startDate: '2020-09-28', status: 'Active', salary: 1260000 },
    { id: 'emp-008', name: 'Meera Joshi', email: 'meera@peopleos.in', title: 'Customer Success Specialist', department: 'Customer Success', location: 'Pune', phone: '+91 98765 41008', startDate: '2025-01-13', status: 'Active', salary: 890000 }
  ];
  const today = localISO();
  const leaves = [
    { id: 'lv-101', employeeId: 'emp-001', type: 'Casual leave', startDate: addDays(today, 3), endDate: addDays(today, 4), days: 2, reason: 'Family commitment', status: 'Pending', submittedAt: `${today}T09:20:00` },
    { id: 'lv-102', employeeId: 'emp-004', type: 'Annual leave', startDate: addDays(today, 8), endDate: addDays(today, 10), days: 3, reason: 'Planned personal time', status: 'Pending', submittedAt: `${today}T08:45:00` },
    { id: 'lv-103', employeeId: 'emp-002', type: 'Sick leave', startDate: addDays(today, -8), endDate: addDays(today, -8), days: 1, reason: 'Not feeling well', status: 'Approved', submittedAt: `${addDays(today, -9)}T08:12:00` },
    { id: 'lv-104', employeeId: 'emp-006', type: 'Annual leave', startDate: addDays(today, -16), endDate: addDays(today, -14), days: 3, reason: 'Family trip', status: 'Approved', submittedAt: `${addDays(today, -22)}T11:05:00` }
  ];
  return {
    employees,
    leaves,
    attendance: buildAttendanceSeed(employees),
    credentials: { admin: 'Admin@123', employees: Object.fromEntries(employees.map(person => [person.id, 'Employee@123'])) },
    adminProfile: { name: 'Neha Kapoor', email: 'neha@peopleos.in', title: 'Head of People', department: 'People & Culture', location: 'Mumbai', phone: '+91 98765 42000', timezone: 'Asia/Kolkata' },
    activities: [
      { actor: 'Priya Mehta', verb: 'submitted a', target: 'Sick leave request', at: `${today}T10:42:00`, kind: 'leave' },
      { actor: 'Neha Kapoor', verb: 'added', target: 'Ananya Iyer to the team', at: `${today}T09:55:00`, kind: 'user' },
      { actor: 'Aarav Sharma', verb: 'checked in at', target: '09:02 AM', at: `${today}T09:02:00`, kind: 'clock' },
      { actor: 'Rohan Kapoor', verb: 'updated their', target: 'profile information', at: `${addDays(today, -1)}T15:10:00`, kind: 'profile' }
    ],
    preferences: { productUpdates: true, leaveAlerts: true, attendanceReminders: false },
    theme: 'light'
  };
}
function loadDB() {
  try {
    const saved = localStorage.getItem(DB_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.employees) && Array.isArray(parsed.attendance)) {
        parsed.leaves ||= [];
        parsed.activities ||= [];
        parsed.preferences ||= { productUpdates: true, leaveAlerts: true, attendanceReminders: false };
        parsed.credentials ||= { admin: 'Admin@123', employees: {} };
        parsed.credentials.employees ||= {};
        parsed.credentials.admin ||= 'Admin@123';
        parsed.employees.forEach(person => { parsed.credentials.employees[person.id] ||= 'Employee@123'; });
        parsed.adminProfile ||= createSeedDB().adminProfile;
        parsed.theme ||= 'light';
        if (!parsed.attendance.some(record => record.date === localISO())) {
          parsed.attendance.push(...buildAttendanceSeed(parsed.employees).filter(record => record.date === localISO()));
        }
        return parsed;
      }
    }
  } catch (error) { console.warn('Using a fresh PeopleOS demo database', error); }
  return createSeedDB();
}
let db = loadDB();
saveDB();
let session = null;
try { session = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch { session = null; }
if (session && session.role === 'employee' && !db.employees.some(person => person.id === session.id)) session = null;
let page = 'dashboard';
let loginRole = 'admin';
let employeeSearch = '';
let employeeStatusFilter = 'All statuses';
let leaveSearch = '';
let leaveStatusFilter = 'All requests';
let attendanceDate = localISO();
let attendanceSearch = '';
let settingsTab = 'profile';

function getDateText() { return formatLongDate(new Date()); }
function getNavTitle() {
  return ({ dashboard: 'Overview', employees: 'People directory', attendance: isAdmin() ? 'Attendance' : 'My attendance', leaves: isAdmin() ? 'Leave requests' : 'My time off', reports: 'Visual reports', settings: 'Profile & settings' })[page] || 'Overview';
}
function navItem(name, label, ico, count = '') {
  return `<button class="nav-link ${page === name ? 'active' : ''}" data-page="${name}">${icon(ico, 16)}<span>${label}</span>${count ? `<span class="nav-count">${count}</span>` : ''}</button>`;
}
function renderSidebar() {
  const pending = db.leaves.filter(leave => leave.status === 'Pending').length;
  const user = getCurrentUser();
  const roleLabel = isAdmin() ? 'Administrator' : (user?.title || 'Employee');
  return `<aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">${logoMark()}<span><span class="brand-name">PeopleOS</span><span class="brand-caption">People, working better</span></span></div>
    <div class="org-switcher"><span class="org-icon">${icon('building', 16)}</span><span class="org-details"><strong>Northstar Studio</strong><small>Workspace</small></span>${icon('down', 14)}</div>
    <nav aria-label="Main navigation">
      <div class="nav-group"><div class="nav-label">Workspace</div>${navItem('dashboard', 'Overview', 'grid')}</div>
      <div class="nav-group"><div class="nav-label">People</div>${isAdmin() ? navItem('employees', 'Directory', 'users') : ''}${navItem('attendance', isAdmin() ? 'Attendance' : 'My attendance', 'clock')}${navItem('leaves', isAdmin() ? 'Leave requests' : 'My time off', 'calendar', isAdmin() && pending ? pending : '')}</div>
      <div class="nav-group"><div class="nav-label">Insights</div>${navItem('reports', 'Visual reports', 'chart')}</div>
      <div class="nav-group"><div class="nav-label">Account</div>${navItem('settings', 'Profile & settings', 'settings')}</div>
    </nav>
    <div class="sidebar-spacer"></div>
    <div class="sidebar-help"><strong>Need a hand?</strong><p>Find shortcuts and tips to get more from PeopleOS.</p><button data-open-shortcuts>Keyboard shortcuts ${icon('arrowRight', 12)}</button></div>
    <div class="sidebar-bottom">
      <button class="theme-toggle" data-theme-toggle>${icon(db.theme === 'dark' ? 'sun' : 'moon', 15)}<span class="theme-label">${db.theme === 'dark' ? 'Switch to light mode' : 'Dark appearance'}</span><span class="theme-track"></span></button>
      <div class="sidebar-user" data-page="settings">${avatar(user?.name || 'PeopleOS', 'avatar-sm')}<span class="sidebar-user-info"><strong>${escapeHtml(user?.name || '')}</strong><small>${escapeHtml(roleLabel)}</small></span>${icon('more', 16)}</div>
    </div>
  </aside>`;
}
function renderTopbar() {
  const user = getCurrentUser();
  return `<header class="topbar">
    <button class="icon-btn mobile-menu-toggle" data-sidebar-toggle aria-label="Open navigation">${icon('menu', 18)}</button>
    <div class="breadcrumb"><span>Workspace</span><span class="breadcrumb-sep">/</span><strong>${escapeHtml(getNavTitle())}</strong></div>
    <div class="topbar-spacer"></div>
    <button class="search-trigger" data-open-command aria-label="Search or jump to"><span>${icon('search', 15)}</span><span>Search or jump to...</span><kbd>Ctrl K</kbd></button>
    <button class="icon-btn" data-notifications aria-label="Notifications">${icon('bell', 17)}${isAdmin() && db.leaves.some(leave => leave.status === 'Pending') ? '<span class="notification-dot"></span>' : ''}</button>
    <span class="topbar-date">${icon('calendar', 14)}${escapeHtml(new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(new Date()))}</span>
    <div class="topbar-profile">
      <button class="topbar-user" data-profile-toggle aria-label="Open profile menu">${avatar(user?.name || '', 'avatar-sm')}<span class="top-user-copy"><strong>${escapeHtml(user?.name || '')}</strong><small>${isAdmin() ? 'Administrator' : 'Employee'}</small></span>${icon('down', 13)}</button>
      <div class="profile-menu" id="profile-menu"><button data-page="settings">${icon('user', 15)}Profile & settings</button><button data-open-shortcuts>${icon('keyboard', 15)}Keyboard shortcuts <kbd>?</kbd></button><hr><button class="logout" data-logout>${icon('logout', 15)}Sign out</button></div>
    </div>
  </header>`;
}
function renderMobileNav() {
  const items = isAdmin()
    ? [{ page: 'dashboard', label: 'Home', icon: 'grid' }, { page: 'employees', label: 'Team', icon: 'users' }, { page: 'attendance', label: 'Time', icon: 'clock' }, { page: 'leaves', label: 'Leave', icon: 'calendar' }, { page: 'reports', label: 'Reports', icon: 'chart' }]
    : [{ page: 'dashboard', label: 'Home', icon: 'grid' }, { page: 'attendance', label: 'Attendance', icon: 'clock' }, { page: 'leaves', label: 'Time off', icon: 'calendar' }, { page: 'reports', label: 'Reports', icon: 'chart' }, { page: 'settings', label: 'Profile', icon: 'user' }];
  return `<nav class="mobile-bottom-nav" aria-label="Mobile navigation">${items.map(item => `<button class="mobile-nav-item ${page === item.page ? 'active' : ''}" data-page="${item.page}">${icon(item.icon,17)}<span>${item.label}</span>${item.page === 'leaves' && isAdmin() && db.leaves.some(leave=>leave.status==='Pending') ? '<i></i>' : ''}</button>`).join('')}</nav>`;
}
function renderApp() {
  document.body.dataset.theme = db.theme || 'light';
  ROOT.innerHTML = `<div class="app-shell">${renderSidebar()}<main class="main-area">${renderTopbar()}<div class="content-wrap">${renderPage()}</div></main></div>${renderMobileNav()}<div class="mobile-sidebar-backdrop" data-sidebar-backdrop></div><div class="toast-stack" id="toast-stack" aria-live="polite"></div>`;
}
function render() {
  document.body.dataset.theme = db.theme || 'light';
  if (!session) renderLogin();
  else {
    if (!isAdmin() && page === 'employees') page = 'dashboard';
    renderApp();
  }
}

function renderLogin() {
  document.body.dataset.theme = db.theme || 'light';
  const admin = loginRole === 'admin';
  const demoEmployee = db.employees.find(person => person.id === 'emp-001') || db.employees[0];
  const email = admin ? 'admin@peopleos.in' : (demoEmployee?.email || 'aarav@peopleos.in');
  const password = admin ? db.credentials.admin : (db.credentials.employees[demoEmployee?.id] || 'Employee@123');
  ROOT.innerHTML = `<main class="login-shell">
    <section class="login-hero"><div class="hero-grid"></div>
      <div class="brand-lockup">${logoMark()}<span>PeopleOS<small>People, working better</small></span></div>
      <div class="hero-copy"><div class="hero-kicker"><span></span> THE PEOPLE PLATFORM FOR MODERN TEAMS</div><h1>Make work feel a little more <em>human.</em></h1><p>One clear place to support your people, grow your team and keep every workday moving forward.</p>
        <div class="hero-proof"><div class="avatar-stack">${avatar('Aarav Sharma')}${avatar('Priya Mehta')}${avatar('Sara Khan')}${avatar('Neha Kapoor')}</div><div class="proof-copy"><strong>Built for people-first teams</strong><span>One connected view of your workplace</span></div></div>
      </div>
      <div class="hero-bottom"><span>© 2026 PeopleOS</span><span>People operations, simplified</span></div>
    </section>
    <section class="login-panel"><div class="login-card">
      <div class="mobile-brand">${logoMark()}<span>PeopleOS</span></div>
      <div class="eyebrow">WELCOME BACK</div><h2>Sign in to your workspace</h2><p class="login-subtitle">Choose your account type to continue to your dashboard.</p>
      <div class="login-role-switch" role="tablist"><button type="button" data-role-choice="admin" class="${admin ? 'selected' : ''}">${icon('shield', 15)}Administrator</button><button type="button" data-role-choice="employee" class="${!admin ? 'selected' : ''}">${icon('user', 15)}Employee</button></div>
      <form id="login-form" novalidate>
        <div class="login-error" id="login-error" role="alert"></div>
        <div class="form-field"><label for="login-email">Work email</label><input id="login-email" name="email" type="email" autocomplete="username" value="${email}" placeholder="you@company.com" required /></div>
        <div class="form-field"><label for="login-password">Password</label><div class="password-wrap"><input id="login-password" name="password" type="password" autocomplete="current-password" value="${password}" placeholder="Enter your password" required /><button class="password-toggle" type="button" data-password-toggle aria-label="Show password">${icon('eye', 16)}</button></div></div>
        <div class="login-extras"><label class="remember-label"><input type="checkbox" checked /> Keep me signed in</label><button class="text-link" type="button" data-forgot>Forgot ID or password?</button></div>
        <button class="btn btn-primary login-submit" type="submit">Sign in to PeopleOS ${icon('arrowRight', 15)}</button>
      </form>
      <div class="demo-box"><div class="demo-box-head"><strong>Demo accounts</strong><span>One-click sign in</span></div><div class="demo-accounts"><button class="demo-account" type="button" data-demo-role="admin"><strong>Administrator</strong><small>admin@peopleos.in</small></button><button class="demo-account" type="button" data-demo-role="employee"><strong>Employee</strong><small>aarav@peopleos.in</small></button></div></div>
      <div class="login-footnote">Secure workspace access · Your demo data stays in this browser</div>
    </div></section>
  </main><div class="toast-stack" id="toast-stack" aria-live="polite"></div>`;
}

function statCard(label, value, ico, color, trend, foot) {
  return `<article class="stat-card"><div class="stat-top"><span class="stat-label">${label}</span><span class="stat-icon ${color}">${icon(ico, 16)}</span></div><div class="stat-value-row"><strong class="stat-value">${value}</strong>${trend ? `<span class="stat-trend">${icon('arrowUp', 11)}${trend}</span>` : ''}</div><div class="stat-foot">${foot || ''}</div></article>`;
}
function renderWorkforceChart() {
  const n = Math.max(3, db.employees.filter(p => p.status === 'Active').length);
  const vals = [Math.max(1, n - 4), Math.max(1, n - 3), Math.max(1, n - 3), Math.max(1, n - 2), Math.max(1, n - 1), n];
  const dates = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) { const d = new Date(now.getFullYear(), now.getMonth() - i, 1); dates.push(new Intl.DateTimeFormat('en-IN', { month: 'short' }).format(d)); }
  const W = 720, H = 230, L = 42, R = 15, T = 10, B = 30;
  const max = Math.max(...vals) + Math.max(1, Math.round(n * .18));
  const points = vals.map((v, i) => ({ x: L + i * (W - L - R) / (vals.length - 1), y: T + (H - T - B) * (1 - v / max), v }));
  const line = points.map(p => `${p.x},${p.y}`).join(' ');
  const area = `${points[0].x},${H - B} ${line} ${points[points.length - 1].x},${H - B}`;
  const grid = [0, 1, 2, 3].map(i => {
    const y = T + i * (H - T - B) / 3;
    const label = Math.round(max - i * max / 3);
    return `<line class="gridline" x1="${L}" y1="${y}" x2="${W - R}" y2="${y}"/><text x="${L - 10}" y="${y + 3}" text-anchor="end">${label}</text>`;
  }).join('');
  const xlabels = points.map((p, i) => `<text x="${p.x}" y="${H - 7}" text-anchor="middle">${dates[i]}</text>`).join('');
  const dots = points.map((p, i) => `<circle class="point" cx="${p.x}" cy="${p.y}" r="4"/><title>${dates[i]}: ${p.v} team members</title>`).join('');
  return `<svg class="line-chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Team growth across six months"><defs><linearGradient id="team-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#7567ef" stop-opacity=".22"/><stop offset="100%" stop-color="#7567ef" stop-opacity="0"/></linearGradient></defs>${grid}<polygon points="${area}" fill="url(#team-area)"/><polyline class="line-one" points="${line}"/>${dots}${xlabels}</svg>`;
}
function getTodayCounts(records = getTodayAttendance()) {
  const present = records.filter(r => ['Present', 'Late'].includes(r.status)).length;
  const remote = records.filter(r => r.status === 'Remote').length;
  const absent = records.filter(r => ['Absent', 'On leave'].includes(r.status)).length;
  const total = records.length || 1;
  return { present, remote, absent, total, presentPct: Math.round(present / total * 100), remotePct: Math.round(remote / total * 100), absentPct: Math.max(0, 100 - Math.round(present / total * 100) - Math.round(remote / total * 100)) };
}
function renderDonut(present, remote, away, label = 'On track today') {
  let total = present + remote + away;
  if (!total) { total = 1; away = 1; }
  const p1 = present / total * 100, p2 = (present + remote) / total * 100;
  const pct = Math.round((present + remote) / total * 100);
  return `<div class="donut-layout"><div class="donut-chart" style="background:conic-gradient(#7567ef 0% ${p1}%,#38caa1 ${p1}% ${p2}%,#dfe3ec ${p2}% 100%)"><div class="donut-center"><strong>${pct}%</strong><small>${label}</small></div></div><div class="donut-legend"><div class="donut-legend-item"><span class="dot purple"></span>In office<strong>${present}</strong></div><div class="donut-legend-item"><span class="dot teal"></span>Remote<strong>${remote}</strong></div><div class="donut-legend-item"><span class="dot gray"></span>Away<strong>${away}</strong></div><div class="donut-legend-item"><span class="dot amber"></span>Total team<strong>${total}</strong></div></div></div>`;
}
function activityMark(kind) {
  const lookup = { leave: ['calendar', 'amber'], user: ['users', ''], clock: ['clock', 'green'], profile: ['user', ''] };
  const [ico, color] = lookup[kind] || ['activity', ''];
  return `<span class="activity-mark ${color}">${icon(ico, 14)}</span>`;
}
function renderActivities(limit = 4, employeeId = null) {
  const items = [...db.activities].filter(item => !employeeId || item.actorId === employeeId || item.actor === fullNameById(employeeId)).sort((a, b) => new Date(b.at) - new Date(a.at)).slice(0, limit);
  if (!items.length) return `<div class="empty-state">No recent activity yet.</div>`;
  return `<div class="activity-list">${items.map(item => `<div class="activity-item">${activityMark(item.kind)}<div class="activity-copy"><p><strong>${escapeHtml(item.actor)}</strong> ${escapeHtml(item.verb)} <strong>${escapeHtml(item.target)}</strong></p><small>${timeAgo(item.at)}</small></div></div>`).join('')}</div>`;
}
function renderPendingMini() {
  const pending = db.leaves.filter(leave => leave.status === 'Pending').slice(0, 4);
  if (!pending.length) return `<div class="empty-state">${icon('circleCheck', 22)}<div>You're all caught up. No approvals waiting.</div></div>`;
  return pending.map(leave => {
    const person = byId(leave.employeeId);
    return `<div class="approval-row">${avatar(person?.name || '', 'avatar-sm')}<span class="approval-person"><strong>${escapeHtml(person?.name || 'Former employee')}</strong><small>${escapeHtml(leave.type)} · ${leave.days} day${leave.days === 1 ? '' : 's'}</small></span><span class="approval-actions"><button class="icon-btn" data-leave-action="approve" data-leave-id="${leave.id}" aria-label="Approve request">${icon('check', 14)}</button><button class="icon-btn" data-leave-action="reject" data-leave-id="${leave.id}" aria-label="Reject request">${icon('x', 14)}</button></span></div>`;
  }).join('');
}
function renderAdminDashboard() {
  const active = db.employees.filter(person => person.status === 'Active').length;
  const counts = getTodayCounts();
  const pending = db.leaves.filter(leave => leave.status === 'Pending').length;
  const joinedThisMonth = db.employees.filter(person => {
    const d = new Date(`${person.startDate}T12:00:00`), now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  return `<div class="page-intro"><div><div class="eyebrow">${escapeHtml(getDateText())}</div><h1>${currentGreeting()}, ${escapeHtml(db.adminProfile.name.split(' ')[0])} <span aria-hidden="true">✦</span></h1><p>Here’s what’s happening across your team today.</p></div><div class="intro-actions"><button class="btn" data-page="reports">${icon('chart', 15)}View reports</button><button class="btn btn-primary" data-open-add>${icon('plus', 15)}Add employee</button></div></div>
    <div class="stats-grid">${statCard('Active employees', active, 'users', 'purple', '+12.8%', 'vs. last quarter')}${statCard('Attendance today', `${counts.present + counts.remote}<small style="font-size:13px;color:var(--muted);font-weight:600">/${counts.total}</small>`, 'clock', 'green', `${counts.presentPct}%`, 'present or working remotely')}${statCard('Pending approvals', pending, 'calendar', 'amber', '', 'leave requests need your review')}${statCard('New this month', joinedThisMonth, 'sparkles', 'blue', joinedThisMonth ? '+1' : '', 'new team members')}
    </div>
    <div class="dashboard-grid"><section class="card card-pad"><div class="card-head"><div><h2>Workforce growth</h2><p>Active team members over the last 6 months</p></div><span class="chart-legend"><span class="legend-item"><i class="legend-dot"></i>Team size</span></span></div><div class="chart-wrap">${renderWorkforceChart()}</div></section>
      <section class="card card-pad"><div class="card-head"><div><h2>Today's attendance</h2><p>Live snapshot across your team</p></div><button class="card-menu" data-page="attendance" aria-label="View attendance">${icon('arrowUp', 15)}</button></div>${renderDonut(counts.present, counts.remote, counts.absent)}</section>
    </div>
    <div class="dashboard-grid equal"><section class="card card-pad"><div class="card-head"><div><h2>Recent activity</h2><p>A pulse on what your team is doing</p></div><button class="card-menu" data-page="attendance" aria-label="View activity">${icon('arrowUp', 15)}</button></div>${renderActivities(4)}</section><section class="card card-pad"><div class="card-head"><div><h2>Needs your attention</h2><p>${pending ? `${pending} leave request${pending === 1 ? '' : 's'} waiting for review` : 'No pending requests'}</p></div><button class="btn btn-sm btn-quiet" data-page="leaves">View all ${icon('chevron', 13)}</button></div>${renderPendingMini()}</section></div>
    <section class="card card-pad"><div class="card-head"><div><h2>Quick actions</h2><p>Common people operations, one click away</p></div></div><div class="quick-actions-grid"><button class="quick-action" data-open-add><span class="quick-icon">${icon('user', 16)}</span><strong>Add a teammate</strong><small>Grow your directory</small></button><button class="quick-action" data-page="attendance"><span class="quick-icon">${icon('clock', 16)}</span><strong>Review attendance</strong><small>See who's in today</small></button><button class="quick-action" data-page="leaves"><span class="quick-icon">${icon('calendar', 16)}</span><strong>Review time off</strong><small>${pending} awaiting approval</small></button><button class="quick-action" data-page="reports"><span class="quick-icon">${icon('chart', 16)}</span><strong>Open reports</strong><small>Explore team insights</small></button></div></section>`;
}
function getLeaveBalance(employeeId) {
  const used = db.leaves.filter(leave => leave.employeeId === employeeId && leave.status === 'Approved' && !leave.type.toLowerCase().includes('sick')).reduce((n, leave) => n + Number(leave.days || 0), 0);
  return Math.max(0, 18 - used);
}
function renderWeekBars() {
  const now = new Date();
  const mondayOffset = (now.getDay() + 6) % 7;
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - mondayOffset);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const heights = [86, 92, 70, 100, 82];
  return `<div class="week-bars">${days.map((label, i) => {
    const d = new Date(start); d.setDate(start.getDate() + i);
    const isToday = localISO(d) === localISO();
    const off = d.getDay() === 0 || d.getDay() === 6;
    const cls = isToday ? 'today' : off ? 'missed' : '';
    return `<div class="week-bar-col"><span class="week-bar ${cls}" style="height:${heights[i]}%" title="${label}: ${isToday ? 'Today' : 'Present'}"></span><small>${label}</small></div>`;
  }).join('')}</div>`;
}
function employeeLeaveCards(employeeId, limit = 3) {
  const list = db.leaves.filter(leave => leave.employeeId === employeeId).sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)).slice(0, limit);
  if (!list.length) return `<div class="empty-state">No time-off requests yet.</div>`;
  return list.map(leave => `<div class="approval-row">${icon('calendar', 15)}<span class="approval-person"><strong>${escapeHtml(leave.type)}</strong><small>${formatDate(leave.startDate)}${leave.endDate !== leave.startDate ? ` – ${formatDate(leave.endDate)}` : ''} · ${leave.days} day${leave.days === 1 ? '' : 's'}</small></span>${statusPill(leave.status)}</div>`).join('');
}
function renderEmployeeDashboard() {
  const employee = getCurrentUser();
  const balance = getLeaveBalance(employee.id);
  const record = getAttendanceFor(employee.id);
  const active = Boolean(record?.checkIn && !record?.checkOut);
  const complete = Boolean(record?.checkIn && record?.checkOut);
  const checkText = active ? `Checked in at <strong>${escapeHtml(record.checkIn)}</strong>` : complete ? `Shift completed · <strong>${escapeHtml(record.checkIn)} – ${escapeHtml(record.checkOut)}</strong>` : 'Your workday is ready when you are.';
  const buttonText = active ? 'Clock out' : complete ? 'Day complete' : 'Clock in';
  const buttonClass = active ? 'btn btn-danger-soft' : complete ? 'btn' : 'btn btn-primary';
  const disabled = complete ? 'disabled' : '';
  const first = employee.name.split(' ')[0];
  const payDay = new Date();
  payDay.setDate(31);
  if (payDay.getMonth() !== new Date().getMonth()) payDay.setDate(0);
  return `<div class="welcome-banner"><div><div class="eyebrow" style="color:rgba(255,255,255,.7)">${escapeHtml(getDateText())}</div><h2>${currentGreeting()}, ${escapeHtml(first)} <span aria-hidden="true">✦</span></h2><p>Here's your personal workspace. Make today a good one.</p></div><button class="btn" data-open-shortcuts>${icon('keyboard', 15)}Your shortcuts</button></div>
    <div class="stats-grid">${statCard('Attendance this month', '96%', 'clock', 'green', '+2.4%', 'you are doing great')}${statCard('Leave balance', `${balance}<small style="font-size:13px;color:var(--muted);font-weight:600"> days</small>`, 'calendar', 'purple', '', 'available paid time off')}${statCard('Next payday', formatDate(localISO(payDay), { month: 'short' }), 'briefcase', 'blue', '', 'monthly payroll')}${statCard('Your department', escapeHtml(employee.department), 'users', 'amber', '', escapeHtml(employee.title))}</div>
    <div class="dashboard-grid"><section class="card card-pad"><div class="card-head"><div><h2>Your week at a glance</h2><p>Attendance rhythm for this work week</p></div><span class="pill pill-active">On track</span></div>${renderWeekBars()}<div style="display:flex;justify-content:space-between;margin-top:12px;color:var(--muted);font-size:10px"><span>${icon('circleCheck', 12)} 4 days attended</span><button class="text-link" data-page="attendance">View attendance history ${icon('chevron', 12)}</button></div></section>
      <section class="card card-pad"><div class="card-head"><div><h2>Time off requests</h2><p>Your latest request updates</p></div><button class="btn btn-sm btn-soft" data-open-leave>${icon('plus', 13)}Request leave</button></div><div class="activity-list">${employeeLeaveCards(employee.id, 3)}</div></section>
    </div>
    <div class="dashboard-grid equal"><section class="card card-pad"><div class="card-head"><div><h2>Time clock</h2><p>Keep your attendance up to date</p></div><span class="pill ${active ? 'pill-present' : complete ? 'pill-neutral' : 'pill-pending'}">${complete ? 'Complete' : active ? 'Clocked in' : 'Not checked in'}</span></div><div class="employee-punch"><div class="punch-left"><span class="punch-clock">${icon('clock', 19)}</span><span><strong>${active ? "You're on the clock" : complete ? 'Nice work today' : 'Start your day'}</strong><small>${checkText}</small></span></div><span class="punch-times">${record?.checkOut ? `Out <strong>${escapeHtml(record.checkOut)}</strong>` : ''}</span><button class="${buttonClass}" data-checkin ${disabled}>${icon(active ? 'logout' : complete ? 'check' : 'clock', 14)}${buttonText}</button></div></section>
      <section class="card card-pad"><div class="card-head"><div><h2>Coming up</h2><p>A little planning goes a long way</p></div>${icon('calendar', 16)}</div><div class="schedule-list"><div class="schedule-item"><span class="schedule-date"><strong>${new Date().getDate()}</strong><small>${new Intl.DateTimeFormat('en-IN',{month:'short'}).format(new Date())}</small></span><span class="schedule-copy"><strong>Team stand-up</strong><small>10:30 AM · Engineering team</small></span></div><div class="schedule-item"><span class="schedule-date"><strong>${new Date().getDate()+1}</strong><small>${new Intl.DateTimeFormat('en-IN',{month:'short'}).format(new Date())}</small></span><span class="schedule-copy"><strong>Focus time</strong><small>Keep your calendar clear</small></span></div><div class="schedule-item"><span class="schedule-date"><strong>31</strong><small>${new Intl.DateTimeFormat('en-IN',{month:'short'}).format(new Date())}</small></span><span class="schedule-copy"><strong>Monthly payday</strong><small>Payroll is on its way</small></span></div></div></section>
    </div>
    <section class="card card-pad"><div class="card-head"><div><h2>Quick actions</h2><p>Your everyday tools, right here</p></div></div><div class="quick-actions-grid"><button class="quick-action" data-checkin><span class="quick-icon">${icon('clock', 16)}</span><strong>Clock ${active ? 'out' : 'in'}</strong><small>Track today's hours</small></button><button class="quick-action" data-open-leave><span class="quick-icon">${icon('calendarPlus', 16)}</span><strong>Request time off</strong><small>Plan a day away</small></button><button class="quick-action" data-page="attendance"><span class="quick-icon">${icon('activity', 16)}</span><strong>My attendance</strong><small>Review your history</small></button><button class="quick-action" data-page="settings"><span class="quick-icon">${icon('settings', 16)}</span><strong>Update profile</strong><small>Keep your details current</small></button></div></section>`;
}
function renderDirectoryTable() {
  const query = employeeSearch.trim().toLowerCase();
  const rows = db.employees.filter(person => {
    const matches = !query || [person.name, person.email, person.department, person.title, person.location].some(value => String(value || '').toLowerCase().includes(query));
    const statusMatches = employeeStatusFilter === 'All statuses' || person.status === employeeStatusFilter;
    return matches && statusMatches;
  });
  const body = rows.length ? rows.map(person => `<tr><td><div class="person-cell">${avatar(person.name, 'avatar-sm')}<span><strong>${escapeHtml(person.name)}</strong><small>${escapeHtml(person.email)}</small></span></div></td><td>${escapeHtml(person.department)}</td><td>${escapeHtml(person.title)}</td><td>${escapeHtml(person.location)}</td><td>${formatDate(person.startDate, { year: 'numeric' })}</td><td>${statusPill(person.status)}</td><td><div class="row-actions"><button class="icon-btn" data-edit-employee="${person.id}" aria-label="Edit ${escapeHtml(person.name)}">${icon('edit', 14)}</button><button class="icon-btn delete" data-delete-employee="${person.id}" aria-label="Remove ${escapeHtml(person.name)}">${icon('trash', 14)}</button></div></td></tr>`).join('') : `<tr><td colspan="7"><div class="empty-state">No team members match your search.</div></td></tr>`;
  return { body, count: rows.length, total: db.employees.length };
}
function renderEmployeesPage() {
  const data = renderDirectoryTable();
  return `<div class="page-intro"><div><div class="eyebrow">PEOPLE OPERATIONS</div><h1>People directory</h1><p>Manage your team, roles and employee details in one place.</p></div><div class="intro-actions"><button class="btn" data-export="employees">${icon('download', 14)}Export CSV</button><button class="btn btn-primary" data-open-add>${icon('plus', 15)}Add employee</button></div></div>
    <section class="card"><div class="filter-bar" style="padding:15px 17px 0;margin:0"><div class="filter-search">${icon('search', 14)}<input id="employee-search" type="search" placeholder="Search name, email or team..." value="${escapeHtml(employeeSearch)}" /></div><select id="employee-status-filter" class="filter-select"><option ${employeeStatusFilter === 'All statuses' ? 'selected' : ''}>All statuses</option><option ${employeeStatusFilter === 'Active' ? 'selected' : ''}>Active</option><option ${employeeStatusFilter === 'On leave' ? 'selected' : ''}>On leave</option><option ${employeeStatusFilter === 'Inactive' ? 'selected' : ''}>Inactive</option></select><span class="filter-spacer"></span><span class="table-meta" id="employee-count">${data.count} of ${data.total} teammates</span></div><div class="table-wrap"><table><thead><tr><th>Employee</th><th>Department</th><th>Job title</th><th>Location</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead><tbody id="employee-rows">${data.body}</tbody></table></div><div class="table-footer"><span>Showing ${data.count} of ${data.total} teammates</span><span>Changes save automatically in this browser</span></div></section>`;
}
function renderAttendanceAdmin() {
  const records = currentDateRecords(attendanceDate).filter(record => {
    const person = byId(record.employeeId);
    return !attendanceSearch || [person?.name, person?.department, record.status].some(value => String(value || '').toLowerCase().includes(attendanceSearch.toLowerCase()));
  });
  const all = currentDateRecords(attendanceDate);
  const counts = getTodayCounts(all);
  const tableRows = records.map(record => {
    const person = byId(record.employeeId);
    if (!person) return '';
    return `<tr><td><div class="person-cell">${avatar(person.name,'avatar-sm')}<span><strong>${escapeHtml(person.name)}</strong><small>${escapeHtml(person.department)}</small></span></div></td><td><select class="simple-select" data-attendance-status="${record.employeeId}" data-attendance-date="${record.date}">${['Present','Late','Remote','Absent','On leave'].map(status => `<option ${record.status === status ? 'selected' : ''}>${status}</option>`).join('')}</select></td><td>${record.checkIn ? escapeHtml(record.checkIn) : '—'}</td><td>${record.checkOut ? escapeHtml(record.checkOut) : '—'}</td><td>${escapeHtml(record.location || '—')}</td><td>${record.checkIn && record.checkOut ? '8h 30m' : record.checkIn ? 'In progress' : '—'}</td></tr>`;
  }).join('');
  return `<div class="page-intro"><div><div class="eyebrow">TIME & PRESENCE</div><h1>Attendance</h1><p>See who's working and keep attendance records up to date.</p></div><div class="intro-actions"><button class="btn" data-export="attendance">${icon('download', 14)}Export CSV</button></div></div>
    <div class="stats-grid">${statCard('On-site', counts.present, 'building', 'purple', '', 'checked in at the office')}${statCard('Working remotely', counts.remote, 'globe', 'blue', '', 'checked in from home')}${statCard('Away today', counts.absent, 'calendar', 'amber', '', 'absent or on approved leave')}${statCard('Team attendance', `${counts.presentPct + counts.remotePct}%`, 'activity', 'green', '', 'present or working remotely')}</div>
    <section class="card"><div class="filter-bar" style="padding:15px 17px 0;margin:0"><div class="filter-search">${icon('search', 14)}<input id="attendance-search" type="search" placeholder="Search teammate..." value="${escapeHtml(attendanceSearch)}" /></div><input type="date" class="filter-select" id="attendance-date" value="${escapeHtml(attendanceDate)}"/><span class="filter-spacer"></span><span class="table-meta">${records.length} records · edit status inline</span></div><div class="table-wrap"><table><thead><tr><th>Employee</th><th>Status</th><th>Clock in</th><th>Clock out</th><th>Work location</th><th>Hours</th></tr></thead><tbody>${tableRows || `<tr><td colspan="6"><div class="empty-state">No attendance records found for this date.</div></td></tr>`}</tbody></table></div><div class="table-footer"><span>Showing ${records.length} of ${all.length} records</span><span>Attendance changes are saved locally</span></div></section>`;
}
function renderAttendanceEmployee() {
  const employee = getCurrentUser();
  const records = db.attendance.filter(record => record.employeeId === employee.id).sort((a,b) => b.date.localeCompare(a.date));
  const counted = records.filter(record => ['Present','Late','Remote'].includes(record.status)).length;
  const rate = records.length ? Math.round(counted / records.length * 100) : 0;
  const today = getAttendanceFor(employee.id);
  const isClocked = Boolean(today?.checkIn && !today?.checkOut);
  const history = records.slice(0, 9).map(record => `<tr><td>${formatDate(record.date, { weekday: 'short', year: 'numeric' })}</td><td>${statusPill(record.status)}</td><td>${record.checkIn || '—'}</td><td>${record.checkOut || '—'}</td><td>${record.checkIn && record.checkOut ? '8h 30m' : record.checkIn ? 'In progress' : '—'}</td></tr>`).join('');
  return `<div class="page-intro"><div><div class="eyebrow">YOUR WORK RHYTHM</div><h1>My attendance</h1><p>A clear view of your check-ins, hours and work patterns.</p></div><div class="intro-actions"><button class="btn btn-primary" data-checkin>${icon(isClocked ? 'logout' : 'clock', 15)}${isClocked ? 'Clock out' : 'Clock in'}</button></div></div>
    <div class="stats-grid">${statCard('Attendance rate', `${rate}%`, 'activity', 'green', '', 'based on recent workdays')}${statCard('Days recorded', records.length, 'calendar', 'purple', '', 'attendance history')}${statCard('Current status', escapeHtml(today?.status || 'Not checked in'), 'clock', 'blue', '', today?.checkIn ? `Clocked in at ${escapeHtml(today.checkIn)}` : 'No check-in yet today')}${statCard('This month', records.filter(record => record.date.slice(0,7) === localISO().slice(0,7) && ['Present','Late','Remote'].includes(record.status)).length, 'target', 'amber', '', 'days present or remote')}</div>
    <section class="card"><div class="card-head" style="padding:17px 18px 0"><div><h2>Recent attendance</h2><p>Your latest check-ins and workday status</p></div><span class="pill pill-info">Personal view</span></div><div class="table-wrap"><table style="min-width:560px"><thead><tr><th>Date</th><th>Status</th><th>Clock in</th><th>Clock out</th><th>Hours</th></tr></thead><tbody>${history}</tbody></table></div><div class="table-footer"><span>Showing your last ${records.length} recorded workdays</span><span>Need a correction? Contact your administrator.</span></div></section>`;
}
function renderAttendancePage() { return isAdmin() ? renderAttendanceAdmin() : renderAttendanceEmployee(); }
function renderLeaveCard(leave, admin) {
  const person = byId(leave.employeeId);
  return `<article class="leave-card"><div class="leave-card-head">${avatar(person?.name || 'Former employee', 'avatar-sm')}<span class="person-cell"><span><strong>${escapeHtml(person?.name || 'Former employee')}</strong><small>${escapeHtml(person?.department || '')}</small></span></span>${statusPill(leave.status)}</div><div class="leave-card-type">${escapeHtml(leave.type)} <span class="text-muted">· ${leave.days} day${leave.days === 1 ? '' : 's'}</span></div><div class="leave-card-dates">${icon('calendar', 13)}${formatDate(leave.startDate, { year: 'numeric' })}${leave.endDate !== leave.startDate ? ` – ${formatDate(leave.endDate, { year: 'numeric' })}` : ''}<span>· Submitted ${timeAgo(leave.submittedAt)}</span></div><p class="leave-card-reason">${escapeHtml(leave.reason || 'No note added.')}</p>${admin && leave.status === 'Pending' ? `<div class="leave-card-actions"><button class="btn btn-sm btn-danger-soft" data-leave-action="reject" data-leave-id="${leave.id}">${icon('x', 13)}Decline</button><button class="btn btn-sm btn-primary" data-leave-action="approve" data-leave-id="${leave.id}">${icon('check', 13)}Approve request</button></div>` : `<div class="leave-card-actions"><span class="text-muted tiny">Request ID ${escapeHtml(leave.id)}</span><span class="filter-spacer"></span>${admin ? '<span class="tiny text-muted">Reviewed</span>' : ''}</div>`}</article>`;
}
function renderLeavesPage() {
  let leaves = isAdmin() ? [...db.leaves] : db.leaves.filter(leave => leave.employeeId === session.id);
  const query = leaveSearch.trim().toLowerCase();
  if (query) leaves = leaves.filter(leave => [leave.type, leave.reason, fullNameById(leave.employeeId)].some(value => String(value || '').toLowerCase().includes(query)));
  if (leaveStatusFilter !== 'All requests') leaves = leaves.filter(leave => leave.status === leaveStatusFilter);
  leaves.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  const pendingCount = db.leaves.filter(leave => leave.status === 'Pending').length;
  const introText = isAdmin() ? 'Review requests, keep schedules in sync and support your team.' : 'Plan time away and track your request status.';
  return `<div class="page-intro"><div><div class="eyebrow">TIME OFF & WELLBEING</div><h1>${isAdmin() ? 'Leave requests' : 'My time off'}</h1><p>${introText}</p></div><div class="intro-actions">${isAdmin() ? `<button class="btn" data-export="leaves">${icon('download',14)}Export CSV</button>` : ''}<button class="btn btn-primary" data-open-leave>${icon('plus',15)}${isAdmin() ? 'New request' : 'Request time off'}</button></div></div>
    ${isAdmin() ? `<div class="stats-grid">${statCard('Awaiting review', pendingCount, 'calendar', 'amber', '', 'requests need a decision')}${statCard('Approved this month', db.leaves.filter(leave => leave.status === 'Approved' && leave.submittedAt.slice(0,7) === localISO().slice(0,7)).length, 'circleCheck', 'green', '', 'approved requests')}${statCard('People on leave today', db.attendance.filter(record => record.date === localISO() && record.status === 'On leave').length, 'users', 'purple', '', 'planned time away')}${statCard('All requests', db.leaves.length, 'file', 'blue', '', 'across your workspace')}</div>` : `<div class="welcome-banner" style="margin-bottom:17px"><div><h2>${getLeaveBalance(session.id)} paid days available</h2><p>Annual and casual leave balance · Sick leave is tracked separately</p></div><button class="btn" data-open-leave>${icon('plus',14)}Plan time off</button></div>`}
    <div class="filter-bar"><div class="filter-search">${icon('search',14)}<input id="leave-search" type="search" placeholder="Search requests..." value="${escapeHtml(leaveSearch)}" /></div><select class="filter-select" id="leave-status-filter"><option ${leaveStatusFilter === 'All requests' ? 'selected' : ''}>All requests</option><option ${leaveStatusFilter === 'Pending' ? 'selected' : ''}>Pending</option><option ${leaveStatusFilter === 'Approved' ? 'selected' : ''}>Approved</option><option ${leaveStatusFilter === 'Rejected' ? 'selected' : ''}>Rejected</option></select><span class="filter-spacer"></span><span class="table-meta">${leaves.length} request${leaves.length === 1 ? '' : 's'}</span></div>
    ${leaves.length ? `<div class="leave-card-list">${leaves.map(leave => renderLeaveCard(leave, isAdmin())).join('')}</div>` : `<section class="card"><div class="empty-state">${icon('calendar',22)}<div>No requests found. Try another filter or create a request.</div></div></section>`}`;
}
function renderDepartments() {
  const counts = {};
  db.employees.forEach(person => { const key = person.department || 'Other'; counts[key] = (counts[key] || 0) + 1; });
  return Object.entries(counts).sort((a,b) => b[1] - a[1]).map(([name,count]) => `<div class="department-line"><span>${escapeHtml(name)}</span><div class="progress-track"><div class="progress-fill" style="width:${Math.max(6, count / Math.max(db.employees.length,1) * 100)}%"></div></div><strong>${count}</strong></div>`).join('');
}
function renderReportsPage() {
  if (!isAdmin()) {
    const employee = getCurrentUser();
    const own = db.attendance.filter(record => record.employeeId === employee.id);
    const present = own.filter(record => ['Present','Late','Remote'].includes(record.status)).length;
    const rate = own.length ? Math.round(present / own.length * 100) : 0;
    const approved = db.leaves.filter(leave => leave.employeeId === employee.id && leave.status === 'Approved').reduce((n, leave) => n + leave.days, 0);
    return `<div class="page-intro"><div><div class="eyebrow">YOUR INSIGHTS</div><h1>Personal reports</h1><p>Understand your attendance and time off at a glance.</p></div><div class="intro-actions"><button class="btn" data-export="my-attendance">${icon('download',14)}Export my data</button></div></div>
      <div class="stats-grid">${statCard('Attendance rate', `${rate}%`, 'activity', 'green', '', 'recent workdays')}${statCard('Workdays recorded', own.length, 'calendar', 'purple', '', 'in this demo history')}${statCard('Paid time off used', `${approved} days`, 'calendar', 'amber', '', 'approved requests')}${statCard('Requests submitted', db.leaves.filter(leave => leave.employeeId === employee.id).length, 'file', 'blue', '', 'all request statuses')}</div>
      <div class="dashboard-grid"><section class="card card-pad"><div class="card-head"><div><h2>Team growth overview</h2><p>Workspace headcount over recent months</p></div><span class="pill pill-info">Read only</span></div>${renderWorkforceChart()}</section><section class="card card-pad"><div class="card-head"><div><h2>Your attendance mix</h2><p>Recent recorded workdays</p></div></div>${renderDonut(own.filter(r=>r.status==='Present'||r.status==='Late').length, own.filter(r=>r.status==='Remote').length, own.filter(r=>r.status==='Absent'||r.status==='On leave').length, 'recorded days')}</section></div>
      <section class="card card-pad"><div class="card-head"><div><h2>Time-off summary</h2><p>Recent leave requests and their status</p></div><button class="btn btn-sm btn-soft" data-page="leaves">View requests ${icon('chevron',13)}</button></div><div class="activity-list">${employeeLeaveCards(employee.id, 5)}</div></section>`;
  }
  const counts = getTodayCounts();
  return `<div class="page-intro"><div><div class="eyebrow">PEOPLE ANALYTICS</div><h1>Visual reports</h1><p>Useful signals to help you make people-first decisions.</p></div><div class="intro-actions"><button class="btn" data-export="employees">${icon('download',14)}Export team CSV</button></div></div>
    <div class="stats-grid">${statCard('Headcount', db.employees.length, 'users', 'purple', '+12.8%', 'active team members')}${statCard('Attendance today', `${counts.presentPct + counts.remotePct}%`, 'activity', 'green', '', 'present or working remotely')}${statCard('Departments', new Set(db.employees.map(p=>p.department)).size, 'building', 'blue', '', 'represented in your team')}${statCard('Time-off requests', db.leaves.length, 'calendar', 'amber', '', `${db.leaves.filter(l=>l.status==='Pending').length} awaiting review`)}</div>
    <div class="dashboard-grid"><section class="card card-pad"><div class="card-head"><div><h2>Workforce growth</h2><p>Active team members · last 6 months</p></div><span class="chart-legend"><span class="legend-item"><i class="legend-dot"></i>Headcount</span></span></div>${renderWorkforceChart()}</section><section class="card card-pad"><div class="card-head"><div><h2>Attendance today</h2><p>Team presence distribution</p></div></div>${renderDonut(counts.present, counts.remote, counts.absent, 'on track')}</section></div>
    <div class="dashboard-grid equal"><section class="card card-pad"><div class="card-head"><div><h2>Team by department</h2><p>Current employee distribution</p></div></div><div class="department-list">${renderDepartments()}</div></section><section class="card card-pad"><div class="card-head"><div><h2>People operations</h2><p>Live operational snapshot</p></div>${icon('sparkles',16)}</div><div class="activity-list"><div class="activity-item">${activityMark('user')}<div class="activity-copy"><p><strong>${db.employees.length} team members</strong> are in the directory</p><small>Active employee records</small></div></div><div class="activity-item">${activityMark('leave')}<div class="activity-copy"><p><strong>${db.leaves.filter(l=>l.status==='Pending').length} requests</strong> need a review</p><small>Time-off approvals</small></div></div><div class="activity-item">${activityMark('clock')}<div class="activity-copy"><p><strong>${counts.present + counts.remote} people</strong> are working today</p><small>Office and remote attendance</small></div></div></div></section></div>`;
}
function renderProfileSettings() {
  const user = getCurrentUser();
  const name = user.name || '';
  const email = user.email || '';
  const title = user.title || (isAdmin() ? 'Administrator' : 'Employee');
  const department = user.department || '';
  const location = user.location || '';
  const phone = user.phone || '';
  if (settingsTab === 'notifications') {
    const p = db.preferences || {};
    return `<div class="settings-grid"><div class="card settings-nav"><button data-settings-tab="profile">${icon('user',15)}Personal information</button><button class="active" data-settings-tab="notifications">${icon('bell',15)}Notifications</button></div><section class="card card-pad"><div class="card-head"><div><h2>Notification preferences</h2><p>Choose what you’d like PeopleOS to keep you informed about.</p></div></div><div class="setting-toggle-row"><span><strong>Product updates</strong><small>Tips and updates about new PeopleOS features.</small></span><label class="switch"><input type="checkbox" data-preference="productUpdates" ${p.productUpdates ? 'checked' : ''}><span></span></label></div><div class="setting-toggle-row"><span><strong>Leave request updates</strong><small>Get notified when a request is submitted or reviewed.</small></span><label class="switch"><input type="checkbox" data-preference="leaveAlerts" ${p.leaveAlerts ? 'checked' : ''}><span></span></label></div><div class="setting-toggle-row"><span><strong>Attendance reminders</strong><small>A gentle reminder if you forget to clock in or out.</small></span><label class="switch"><input type="checkbox" data-preference="attendanceReminders" ${p.attendanceReminders ? 'checked' : ''}><span></span></label></div><div style="margin-top:17px"><span class="pill pill-info">Preferences save automatically</span></div></section></div>`;
  }
  return `<div class="page-intro"><div><div class="eyebrow">YOUR ACCOUNT</div><h1>Profile & settings</h1><p>Keep your information current and personalize your workspace.</p></div></div>
    <div class="settings-grid"><div class="card settings-nav"><button class="active" data-settings-tab="profile">${icon('user',15)}Personal information</button><button data-settings-tab="notifications">${icon('bell',15)}Notifications</button><button data-theme-toggle>${icon(db.theme === 'dark' ? 'sun' : 'moon',15)}Appearance: ${db.theme === 'dark' ? 'Dark' : 'Light'}</button></div>
    <section class="card card-pad"><div class="settings-profile-head">${avatar(name,'avatar-lg')}<span><h3>${escapeHtml(name)}</h3><p>${escapeHtml(title)} · ${escapeHtml(department)}</p></span></div><form id="profile-form"><div class="form-grid"><div class="form-field"><label for="profile-name">Full name</label><input id="profile-name" name="name" value="${escapeHtml(name)}" required /></div><div class="form-field"><label for="profile-email">Work email</label><input id="profile-email" name="email" type="email" value="${escapeHtml(email)}" required /></div><div class="form-field"><label for="profile-title">Job title</label><input id="profile-title" name="title" value="${escapeHtml(title)}" required /></div><div class="form-field"><label for="profile-department">Department</label><input id="profile-department" name="department" value="${escapeHtml(department)}" required /></div><div class="form-field"><label for="profile-phone">Phone number</label><input id="profile-phone" name="phone" value="${escapeHtml(phone)}" placeholder="+91 ..." /></div><div class="form-field"><label for="profile-location">Location</label><input id="profile-location" name="location" value="${escapeHtml(location)}" /></div><div class="form-field full"><label for="profile-timezone">Timezone</label><select id="profile-timezone" name="timezone"><option value="Asia/Kolkata" ${(user.timezone || 'Asia/Kolkata') === 'Asia/Kolkata' ? 'selected' : ''}>India Standard Time (Asia/Kolkata)</option><option value="Asia/Dubai" ${user.timezone === 'Asia/Dubai' ? 'selected' : ''}>Gulf Standard Time (Asia/Dubai)</option><option value="Europe/London" ${user.timezone === 'Europe/London' ? 'selected' : ''}>Greenwich Mean Time (Europe/London)</option><option value="America/New_York" ${user.timezone === 'America/New_York' ? 'selected' : ''}>Eastern Time (America/New_York)</option></select></div></div><div style="display:flex;justify-content:flex-end;padding-top:5px"><button class="btn btn-primary" type="submit">${icon('check',14)}Save profile</button></div></form></section></div>`;
}
function renderPage() {
  if (page === 'dashboard') return isAdmin() ? renderAdminDashboard() : renderEmployeeDashboard();
  if (page === 'employees') return renderEmployeesPage();
  if (page === 'attendance') return renderAttendancePage();
  if (page === 'leaves') return renderLeavesPage();
  if (page === 'reports') return renderReportsPage();
  if (page === 'settings') return renderProfileSettings();
  return renderAdminDashboard();
}

function openModal(content, wide = false) {
  MODAL_ROOT.innerHTML = `<div class="modal-overlay" data-modal-overlay><section class="modal ${wide ? 'modal-wide' : ''}" role="dialog" aria-modal="true">${content}</section></div>`;
  const first = MODAL_ROOT.querySelector('input:not([type="hidden"]),select,textarea,button');
  setTimeout(() => first?.focus(), 30);
}
function closeModal() { MODAL_ROOT.innerHTML = ''; }
function modalHead(title, subtitle = '') {
  return `<div class="modal-head"><div><h2>${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ''}</div><button class="modal-close" type="button" data-modal-close aria-label="Close">${icon('x',15)}</button></div>`;
}
function openEmployeeModal(id = '') {
  if (!isAdmin()) return;
  const person = id ? byId(id) : null;
  const isEdit = Boolean(person);
  const departments = ['Engineering','Design','Marketing','People & Culture','Sales','Finance','Customer Success','Operations','Product'];
  const selectedDepartment = person?.department || 'Engineering';
  const form = `<form id="employee-form" data-employee-id="${person?.id || ''}"><div class="form-grid"><div class="form-field"><label for="employee-name">Full name *</label><input id="employee-name" name="name" value="${escapeHtml(person?.name || '')}" required placeholder="e.g. Anika Verma" /></div><div class="form-field"><label for="employee-email">Work email *</label><input id="employee-email" name="email" type="email" value="${escapeHtml(person?.email || '')}" required placeholder="name@company.com" /></div><div class="form-field"><label for="employee-title">Job title *</label><input id="employee-title" name="title" value="${escapeHtml(person?.title || '')}" required placeholder="e.g. Product Designer" /></div><div class="form-field"><label for="employee-department">Department *</label><select id="employee-department" name="department">${departments.map(dept=>`<option ${dept === selectedDepartment ? 'selected' : ''}>${dept}</option>`).join('')}${person && !departments.includes(person.department) ? `<option selected>${escapeHtml(person.department)}</option>` : ''}</select></div><div class="form-field"><label for="employee-location">Location</label><input id="employee-location" name="location" value="${escapeHtml(person?.location || '')}" placeholder="City or remote" /></div><div class="form-field"><label for="employee-phone">Phone number</label><input id="employee-phone" name="phone" value="${escapeHtml(person?.phone || '')}" placeholder="+91 ..." /></div><div class="form-field"><label for="employee-date">Start date</label><input id="employee-date" name="startDate" type="date" value="${escapeHtml(person?.startDate || localISO())}" /></div><div class="form-field"><label for="employee-status">Employment status</label><select id="employee-status" name="status">${['Active','On leave','Inactive'].map(s=>`<option ${s === (person?.status || 'Active') ? 'selected' : ''}>${s}</option>`).join('')}</select></div><div class="form-field full"><label for="employee-salary">Annual salary (INR, optional)</label><input id="employee-salary" name="salary" type="number" min="0" step="1000" value="${person?.salary || ''}" placeholder="e.g. 1200000" /></div></div><div class="modal-foot"><button type="button" class="btn" data-modal-close>Cancel</button><button type="submit" class="btn btn-primary">${icon(isEdit ? 'check' : 'plus',14)}${isEdit ? 'Save changes' : 'Add employee'}</button></div></form>`;
  openModal(`${modalHead(isEdit ? 'Edit employee' : 'Add a team member', isEdit ? 'Update their team information.' : 'Create a new employee record in your directory.')}${form}`, true);
}
function openLeaveModal() {
  const today = localISO();
  const start = addDays(today, 1);
  const end = addDays(today, 1);
  const type = `<select id="leave-type" name="type"><option>Casual leave</option><option>Annual leave</option><option>Sick leave</option><option>Personal leave</option></select>`;
  const employeePicker = isAdmin() ? `<div class="form-field full"><label for="leave-employee">Employee *</label><select id="leave-employee" name="employeeId">${db.employees.map(person => `<option value="${person.id}">${escapeHtml(person.name)} · ${escapeHtml(person.department)}</option>`).join('')}</select></div>` : '';
  const form = `<form id="leave-form"><div class="form-grid">${employeePicker}<div class="form-field"><label for="leave-type">Leave type *</label>${type}</div><div class="form-field"><label for="leave-start">From *</label><input id="leave-start" name="startDate" type="date" value="${start}" min="${today}" required /></div><div class="form-field"><label for="leave-end">Through *</label><input id="leave-end" name="endDate" type="date" value="${end}" min="${start}" required /></div><div class="form-field"><label>Duration</label><input id="leave-duration" value="1 day" readonly /></div><div class="form-field full"><label for="leave-reason">Note for your manager *</label><textarea id="leave-reason" name="reason" required placeholder="Share a little context for your request..."></textarea></div></div><p class="tiny text-muted" style="margin:0">Your request will be sent to the administrator for review.</p><div class="modal-foot"><button type="button" class="btn" data-modal-close>Cancel</button><button type="submit" class="btn btn-primary">${icon('send',14)}Submit request</button></div></form>`;
  openModal(`${modalHead('Request time off', 'Add a few details and we’ll send your request for approval.')}${form}`);
}
function openDeleteConfirm(id) {
  const person = byId(id);
  if (!person) return;
  openModal(`${modalHead('Remove employee', 'This action can’t be undone.')}
    <div class="confirm-body"><div class="confirm-icon">${icon('trash',19)}</div><h3>Remove ${escapeHtml(person.name)}?</h3><p>The employee will be removed from the directory. Existing time-off and attendance history will remain saved.</p></div><div class="modal-foot"><button class="btn" data-modal-close>Keep employee</button><button class="btn btn-danger-soft" data-confirm-delete="${person.id}">${icon('trash',14)}Remove employee</button></div>`);
}
function openNotifications() {
  let items;
  if (isAdmin()) {
    const pending = db.leaves.filter(leave => leave.status === 'Pending').slice(0, 5);
    items = pending.map(leave => `<div class="notification-item">${activityMark('leave')}<p><strong>${escapeHtml(fullNameById(leave.employeeId))}</strong> requested ${escapeHtml(leave.type.toLowerCase())}.<small>${timeAgo(leave.submittedAt)} · ${leave.days} day${leave.days === 1 ? '' : 's'}</small></p></div>`).join('');
  } else {
    const own = db.leaves.filter(leave => leave.employeeId === session.id).slice(0, 5);
    items = own.map(leave => `<div class="notification-item">${activityMark('leave')}<p>Your <strong>${escapeHtml(leave.type.toLowerCase())}</strong> request is ${escapeHtml(leave.status.toLowerCase())}.<small>${timeAgo(leave.submittedAt)} · ${formatDate(leave.startDate)}</small></p></div>`).join('');
  }
  openModal(`${modalHead('Notifications', 'Updates from your PeopleOS workspace.')}${items || '<div class="empty-state">You’re all caught up. No new notifications.</div>'}<div class="modal-foot"><button class="btn btn-primary" data-page="leaves" data-modal-close>Go to requests ${icon('arrowRight',14)}</button></div>`);
}
function findRecoveryAccount(lookup) {
  const value = String(lookup || '').trim().toLowerCase();
  if (!value) return null;
  const admin = db.adminProfile;
  if (['admin@peopleos.in', String(admin.email || '').toLowerCase(), String(admin.name || '').toLowerCase()].includes(value)) {
    return { role: 'admin', id: 'admin', name: admin.name, loginId: 'admin@peopleos.in' };
  }
  const person = db.employees.find(item => item.email.toLowerCase() === value || item.name.toLowerCase() === value);
  return person ? { role: 'employee', id: person.id, name: person.name, loginId: person.email } : null;
}
function openForgotAccount() {
  const body = `<form id="recovery-lookup-form"><div class="modal-body"><p class="text-muted" style="font-size:11px;line-height:1.65;margin:0 0 14px">Enter your full name or work email. We’ll find your login ID and let you set a new password for this browser demo.</p><div class="login-error" id="recovery-error" role="alert"></div><div class="form-field" style="margin-bottom:4px"><label for="recovery-lookup">Full name or work email</label><input id="recovery-lookup" name="lookup" autocomplete="email" required placeholder="e.g. Aarav Sharma or aarav@peopleos.in" /></div><p class="tiny text-muted" style="margin:9px 0 0">No email is sent. This recovery flow only works with accounts saved in this browser.</p></div><div class="modal-foot"><button type="button" class="btn" data-modal-close>Cancel</button><button type="submit" class="btn btn-primary">Find my account ${icon('arrowRight',14)}</button></div></form>`;
  openModal(`${modalHead('Recover your account', 'Forgot your login ID or password? Start here.')}${body}`);
}
function openPasswordReset(account) {
  const body = `<div class="modal-body"><div class="recovery-account">${avatar(account.name, 'avatar-sm')}<div><small>Your login ID</small><strong>${escapeHtml(account.loginId)}</strong><span>${escapeHtml(account.name)} · ${account.role === 'admin' ? 'Administrator' : 'Employee'}</span></div></div><form id="recovery-reset-form" data-role="${account.role}" data-account-id="${escapeHtml(account.id)}" data-login-id="${escapeHtml(account.loginId)}"><div class="login-error" id="recovery-error" role="alert"></div><div class="form-field"><label for="new-password">New password</label><input id="new-password" name="password" type="password" minlength="8" autocomplete="new-password" required placeholder="At least 8 characters" /></div><div class="form-field" style="margin-bottom:0"><label for="confirm-password">Confirm new password</label><input id="confirm-password" name="confirmPassword" type="password" minlength="8" autocomplete="new-password" required placeholder="Enter it once more" /></div><p class="tiny text-muted" style="margin:11px 0 0">For this demo, the new password is saved only in this browser.</p><div class="modal-foot" style="margin:15px -21px -18px"><button type="button" class="btn" data-recovery-back>Back</button><button type="submit" class="btn btn-primary">Save new password ${icon('check',14)}</button></div></form></div>`;
  openModal(`${modalHead('Set a new password', 'Your account was found. Your login ID is shown below.')}${body}`);
}
function openShortcuts() {
  const body = `<div class="modal-body"><div class="shortcut-table"><span>Open command palette</span><kbd>Ctrl K</kbd><span>Focus search</span><kbd>/</kbd><span>Show keyboard shortcuts</span><kbd>?</kbd>${isAdmin() ? '<span>Add a team member</span><kbd>Ctrl ⇧ A</kbd>' : ''}<span>Close dialog or menu</span><kbd>Esc</kbd></div></div><div class="modal-foot"><button class="btn btn-primary" data-modal-close>Got it</button></div>`;
  openModal(`${modalHead('Keyboard shortcuts', 'Move around your workspace a little faster.')}${body}`);
}
function commandItems() {
  const items = [
    { label: 'Go to Overview', detail: 'Workspace', icon: 'grid', command: 'page-dashboard', shortcut: 'G O' },
    ...(isAdmin() ? [{ label: 'Go to People directory', detail: 'People', icon: 'users', command: 'page-employees' }] : []),
    { label: isAdmin() ? 'Go to Attendance' : 'Go to My attendance', detail: 'People', icon: 'clock', command: 'page-attendance' },
    { label: isAdmin() ? 'Go to Leave requests' : 'Go to My time off', detail: 'People', icon: 'calendar', command: 'page-leaves' },
    { label: 'Go to Visual reports', detail: 'Insights', icon: 'chart', command: 'page-reports' },
    { label: 'Go to Profile & settings', detail: 'Account', icon: 'settings', command: 'page-settings' },
    ...(isAdmin() ? [{ label: 'Add employee', detail: 'Quick action', icon: 'plus', command: 'add-employee', shortcut: 'Ctrl ⇧ A' }] : [{ label: 'Request time off', detail: 'Quick action', icon: 'calendarPlus', command: 'request-leave' }]),
    { label: `Switch to ${db.theme === 'dark' ? 'light' : 'dark'} appearance`, detail: 'Appearance', icon: db.theme === 'dark' ? 'sun' : 'moon', command: 'toggle-theme' },
    { label: 'Keyboard shortcuts', detail: 'Help', icon: 'keyboard', command: 'shortcuts', shortcut: '?' }
  ];
  return items;
}
function openCommandPalette() {
  const items = commandItems();
  const body = `<div class="modal command-modal"><div class="command-input-wrap">${icon('search',17)}<input id="command-input" placeholder="Search pages or actions..." autocomplete="off" /><kbd>ESC</kbd></div><div class="command-list" id="command-list"><div class="command-group-label">Suggestions</div>${items.map(item => `<button class="command-item" data-command="${item.command}" data-command-item><span class="activity-mark">${icon(item.icon,14)}</span><span>${escapeHtml(item.label)}</span><small>${escapeHtml(item.detail)}</small>${item.shortcut ? `<kbd class="command-shortcut">${item.shortcut}</kbd>` : ''}</button>`).join('')}</div></div>`;
  MODAL_ROOT.innerHTML = `<div class="modal-overlay" data-modal-overlay>${body}</div>`;
  setTimeout(() => MODAL_ROOT.querySelector('#command-input')?.focus(), 30);
}
function showToast(message, error = false) {
  let stack = document.getElementById('toast-stack');
  if (!stack) {
    stack = document.createElement('div'); stack.id = 'toast-stack'; stack.className = 'toast-stack'; document.body.appendChild(stack);
  }
  const item = document.createElement('div');
  item.className = `toast ${error ? 'error' : ''}`;
  item.innerHTML = `${icon(error ? 'alert' : 'circleCheck',16)}<span>${escapeHtml(message)}</span>`;
  stack.appendChild(item);
  setTimeout(() => item.remove(), 3200);
}
function logActivity(actor, verb, target, kind = 'profile', actorId = '') {
  db.activities.unshift({ actor, verb, target, kind, actorId, at: new Date().toISOString() });
  db.activities = db.activities.slice(0, 40);
  saveDB();
}
function updateLeaveStatus(id, status) {
  const leave = db.leaves.find(item => item.id === id);
  if (!leave) return;
  leave.status = status;
  leave.reviewedAt = new Date().toISOString();
  logActivity(getCurrentUser().name, status === 'Approved' ? 'approved' : 'declined', `${fullNameById(leave.employeeId)}’s ${leave.type.toLowerCase()}`, 'leave', session?.id);
  saveDB(); render();
  showToast(`Request ${status.toLowerCase()}.`);
}
function clockInOut() {
  if (isAdmin()) return;
  const id = session.id, date = localISO();
  let record = getAttendanceFor(id, date);
  if (!record) {
    record = { employeeId: id, date, status: 'Present', checkIn: '', checkOut: '', location: 'Office' };
    db.attendance.push(record);
  }
  if (!record.checkIn) {
    record.checkIn = currentTime(); record.status = 'Present'; record.location = 'Office';
    logActivity(getCurrentUser().name, 'checked in at', record.checkIn, 'clock', id);
    saveDB(); render(); showToast(`Checked in at ${record.checkIn}. Have a great day!`);
  } else if (!record.checkOut) {
    record.checkOut = currentTime();
    logActivity(getCurrentUser().name, 'checked out at', record.checkOut, 'clock', id);
    saveDB(); render(); showToast(`Checked out at ${record.checkOut}. Nice work today!`);
  } else {
    showToast('Your workday is already complete.');
  }
}
function csvCell(value) { return `"${String(value ?? '').replace(/"/g, '""')}"`; }
function downloadCSV(filename, rows) {
  const csv = rows.map(row => row.map(csvCell).join(',')).join('\r\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob); link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}
function exportData(type) {
  if (type === 'employees') {
    downloadCSV('peopleos-employees.csv', [['Name','Email','Department','Job title','Location','Phone','Start date','Status','Annual salary'], ...db.employees.map(p => [p.name,p.email,p.department,p.title,p.location,p.phone,p.startDate,p.status,p.salary])]);
  } else if (type === 'attendance') {
    downloadCSV(`peopleos-attendance-${attendanceDate}.csv`, [['Employee','Department','Date','Status','Clock in','Clock out','Location'], ...currentDateRecords(attendanceDate).map(r => { const p=byId(r.employeeId); return [p?.name,p?.department,r.date,r.status,r.checkIn,r.checkOut,r.location]; })]);
  } else if (type === 'leaves') {
    downloadCSV('peopleos-leave-requests.csv', [['Employee','Type','Start date','End date','Days','Reason','Status'], ...db.leaves.map(l=>[fullNameById(l.employeeId),l.type,l.startDate,l.endDate,l.days,l.reason,l.status])]);
  } else if (type === 'my-attendance') {
    const own = db.attendance.filter(r=>r.employeeId===session.id);
    downloadCSV('my-peopleos-attendance.csv', [['Date','Status','Clock in','Clock out','Location'], ...own.map(r=>[r.date,r.status,r.checkIn,r.checkOut,r.location])]);
  }
  showToast('Your CSV export is ready.');
}
function handleCommand(command) {
  closeModal();
  if (command.startsWith('page-')) { page = command.slice(5); render(); return; }
  if (command === 'add-employee') { openEmployeeModal(); return; }
  if (command === 'request-leave') { openLeaveModal(); return; }
  if (command === 'toggle-theme') { toggleTheme(); return; }
  if (command === 'shortcuts') { openShortcuts(); return; }
}
function toggleTheme() {
  db.theme = db.theme === 'dark' ? 'light' : 'dark';
  saveDB(); document.body.dataset.theme = db.theme;
  if (session) render();
}
function goToPage(nextPage) {
  page = nextPage;
  if (!isAdmin() && page === 'employees') page = 'dashboard';
  render();
  document.getElementById('sidebar')?.classList.remove('mobile-open');
  document.querySelector('.mobile-sidebar-backdrop')?.classList.remove('show');
}
function setLoginError(message) {
  const el = document.getElementById('login-error');
  if (el) { el.textContent = message; el.classList.add('show'); }
}
function authenticate(form) {
  const values = new FormData(form);
  const email = String(values.get('email') || '').trim().toLowerCase();
  const password = String(values.get('password') || '');
  if (loginRole === 'admin') {
    if (email === 'admin@peopleos.in' && password === db.credentials.admin) session = { role: 'admin', id: 'admin' };
    else { setLoginError('That administrator email or password does not match the demo account.'); return; }
  } else {
    const person = db.employees.find(item => item.email.toLowerCase() === email);
    if (person && password === db.credentials.employees[person.id]) session = { role: 'employee', id: person.id };
    else { setLoginError('Use a team member email and the employee demo password shown below.'); return; }
  }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  page = 'dashboard'; render();
}
function handleClick(event) {
  const target = event.target;
  const roleButton = target.closest('[data-role-choice]');
  if (roleButton) {
    loginRole = roleButton.dataset.roleChoice;
    renderLogin();
    return;
  }
  const demo = target.closest('[data-demo-role]');
  if (demo) {
    loginRole = demo.dataset.demoRole;
    renderLogin();
    const email = document.getElementById('login-email');
    const pass = document.getElementById('login-password');
    const demoEmployee = db.employees.find(person => person.id === 'emp-001') || db.employees[0];
    if (email) email.value = loginRole === 'admin' ? 'admin@peopleos.in' : (demoEmployee?.email || 'aarav@peopleos.in');
    if (pass) pass.value = loginRole === 'admin' ? db.credentials.admin : (db.credentials.employees[demoEmployee?.id] || 'Employee@123');
    showToast(`${loginRole === 'admin' ? 'Administrator' : 'Employee'} demo account selected.`);
    return;
  }
  if (target.closest('[data-password-toggle]')) {
    const input = document.getElementById('login-password');
    if (input) { input.type = input.type === 'password' ? 'text' : 'password'; target.closest('[data-password-toggle]').setAttribute('aria-label', input.type === 'password' ? 'Show password' : 'Hide password'); }
    return;
  }
  if (target.closest('[data-forgot]')) { openForgotAccount(); return; }
  if (target.closest('[data-recovery-back]')) { openForgotAccount(); return; }
  if (target.closest('[data-open-command]')) { openCommandPalette(); return; }
  if (target.closest('[data-open-shortcuts]')) { openShortcuts(); return; }
  if (target.closest('[data-notifications]')) { openNotifications(); return; }
  if (target.closest('[data-profile-toggle]')) { document.getElementById('profile-menu')?.classList.toggle('open'); return; }
  if (target.closest('[data-logout]')) {
    sessionStorage.removeItem(SESSION_KEY); session = null; page = 'dashboard'; closeModal(); render(); showToast('You have signed out.'); return;
  }
  const nav = target.closest('[data-page]');
  if (nav) { if (nav.hasAttribute('data-modal-close')) closeModal(); goToPage(nav.dataset.page); return; }
  if (target.closest('[data-theme-toggle]')) { toggleTheme(); return; }
  if (target.closest('[data-sidebar-toggle]')) {
    document.getElementById('sidebar')?.classList.add('mobile-open');
    document.querySelector('.mobile-sidebar-backdrop')?.classList.add('show'); return;
  }
  if (target.closest('[data-sidebar-backdrop]')) {
    document.getElementById('sidebar')?.classList.remove('mobile-open');
    target.closest('[data-sidebar-backdrop]')?.classList.remove('show'); return;
  }
  if (target.closest('[data-modal-close]')) { closeModal(); return; }
  if (target.classList.contains('modal-overlay')) { closeModal(); return; }
  if (target.closest('[data-open-add]')) { openEmployeeModal(); return; }
  if (target.closest('[data-open-leave]')) { openLeaveModal(); return; }
  const edit = target.closest('[data-edit-employee]');
  if (edit) { openEmployeeModal(edit.dataset.editEmployee); return; }
  const del = target.closest('[data-delete-employee]');
  if (del) { openDeleteConfirm(del.dataset.deleteEmployee); return; }
  const confirmDelete = target.closest('[data-confirm-delete]');
  if (confirmDelete) {
    const id = confirmDelete.dataset.confirmDelete;
    const person = byId(id);
    db.employees = db.employees.filter(item => item.id !== id);
    db.attendance = db.attendance.filter(item => item.employeeId !== id);
    delete db.credentials.employees[id];
    logActivity(getCurrentUser().name, 'removed', `${person?.name || 'an employee'} from the directory`, 'user', session.id);
    closeModal(); saveDB(); render(); showToast('Employee removed from the directory.'); return;
  }
  const leaveAction = target.closest('[data-leave-action]');
  if (leaveAction) { updateLeaveStatus(leaveAction.dataset.leaveId, leaveAction.dataset.leaveAction === 'approve' ? 'Approved' : 'Rejected'); return; }
  if (target.closest('[data-checkin]')) { clockInOut(); return; }
  const exportBtn = target.closest('[data-export]');
  if (exportBtn) { exportData(exportBtn.dataset.export); return; }
  const settingTab = target.closest('[data-settings-tab]');
  if (settingTab) { settingsTab = settingTab.dataset.settingsTab; render(); return; }
  const command = target.closest('[data-command]');
  if (command) { handleCommand(command.dataset.command); return; }
  if (!target.closest('.topbar-profile')) document.getElementById('profile-menu')?.classList.remove('open');
}
function handleInput(event) {
  const target = event.target;
  if (target.id === 'employee-search') {
    employeeSearch = target.value;
    const data = renderDirectoryTable();
    const body = document.getElementById('employee-rows');
    if (body) body.innerHTML = data.body;
    const count = document.getElementById('employee-count');
    if (count) count.textContent = `${data.count} of ${data.total} teammates`;
  }
  if (target.id === 'leave-search') {
    leaveSearch = target.value;
    // Keep focus and cursor by replacing only the results section.
    refreshLeavesContent();
  }
  if (target.id === 'attendance-search') {
    attendanceSearch = target.value;
    render();
    const input = document.getElementById('attendance-search');
    input?.focus(); input?.setSelectionRange(attendanceSearch.length, attendanceSearch.length);
  }
  if (target.id === 'command-input') {
    const q = target.value.toLowerCase();
    document.querySelectorAll('[data-command-item]').forEach(item => { item.style.display = item.textContent.toLowerCase().includes(q) ? 'flex' : 'none'; });
  }
  if (target.id === 'leave-start' || target.id === 'leave-end') {
    const start = document.getElementById('leave-start')?.value;
    const end = document.getElementById('leave-end')?.value;
    const endInput = document.getElementById('leave-end');
    if (target.id === 'leave-start' && endInput) { endInput.min = start; if (endInput.value < start) endInput.value = start; }
    const duration = document.getElementById('leave-duration');
    if (duration && start && endInput?.value) duration.value = `${calcLeaveDays(start, endInput.value)} day${calcLeaveDays(start, endInput.value) === 1 ? '' : 's'}`;
  }
}
function refreshLeavesContent() {
  const intro = document.querySelector('.page-intro');
  if (!intro || page !== 'leaves') return;
  // Re-render only the dynamic leave cards and count so the search field does not lose focus.
  const current = document.getElementById('leave-search');
  const value = current?.value || leaveSearch;
  const status = document.getElementById('leave-status-filter')?.value || leaveStatusFilter;
  const html = renderLeavesPage();
  const wrapper = document.querySelector('.content-wrap');
  if (wrapper) {
    wrapper.innerHTML = html;
    const newInput = document.getElementById('leave-search');
    if (newInput) { newInput.value = value; newInput.focus(); newInput.setSelectionRange(value.length, value.length); }
    const statusInput = document.getElementById('leave-status-filter');
    if (statusInput) statusInput.value = status;
  }
}
function handleChange(event) {
  const target = event.target;
  if (target.id === 'employee-status-filter') { employeeStatusFilter = target.value; const data = renderDirectoryTable(); document.getElementById('employee-rows').innerHTML = data.body; document.getElementById('employee-count').textContent = `${data.count} of ${data.total} teammates`; }
  if (target.id === 'leave-status-filter') { leaveStatusFilter = target.value; render(); }
  if (target.id === 'attendance-date') { attendanceDate = target.value || localISO(); render(); }
  if (target.id === 'attendance-search') { attendanceSearch = target.value; render(); }
  if (target.matches('[data-attendance-status]')) {
    const record = getAttendanceFor(target.dataset.attendanceStatus, target.dataset.attendanceDate);
    if (record) {
      record.status = target.value;
      if (target.value === 'Remote') record.location = 'Home';
      else if (target.value === 'Present' || target.value === 'Late') { record.location = 'Office'; if (!record.checkIn) record.checkIn = currentTime(); }
      else { record.location = '—'; if (target.value === 'Absent' || target.value === 'On leave') { record.checkIn = ''; record.checkOut = ''; } }
      saveDB(); logActivity(getCurrentUser().name, 'updated attendance for', fullNameById(record.employeeId), 'clock', session.id); render(); showToast('Attendance status updated.');
    }
  }
  if (target.matches('[data-preference]')) { db.preferences[target.dataset.preference] = target.checked; saveDB(); showToast('Notification preference saved.'); }
}
function handleSubmit(event) {
  const form = event.target;
  if (form.id === 'login-form') { event.preventDefault(); authenticate(form); return; }
  if (form.id === 'recovery-lookup-form') {
    event.preventDefault();
    const values = new FormData(form);
    const account = findRecoveryAccount(values.get('lookup'));
    if (!account) {
      const error = document.getElementById('recovery-error');
      if (error) { error.textContent = 'We couldn’t find that account. Try the full name or work email used in this workspace.'; error.classList.add('show'); }
      return;
    }
    openPasswordReset(account); return;
  }
  if (form.id === 'recovery-reset-form') {
    event.preventDefault();
    const values = new FormData(form);
    const password = String(values.get('password') || '');
    const confirmPassword = String(values.get('confirmPassword') || '');
    const error = document.getElementById('recovery-error');
    if (password.length < 8) {
      if (error) { error.textContent = 'Choose a password with at least 8 characters.'; error.classList.add('show'); }
      return;
    }
    if (password !== confirmPassword) {
      if (error) { error.textContent = 'The passwords don’t match. Please try again.'; error.classList.add('show'); }
      return;
    }
    const role = form.dataset.role;
    if (role === 'admin') db.credentials.admin = password;
    else db.credentials.employees[form.dataset.accountId] = password;
    const loginId = form.dataset.loginId;
    saveDB(); closeModal(); loginRole = role; renderLogin();
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    if (emailInput) emailInput.value = loginId;
    if (passwordInput) passwordInput.value = '';
    showToast(`Login ID found. Your new password is saved in this browser.`);
    return;
  }
  if (form.id === 'employee-form') {
    event.preventDefault();
    if (!isAdmin()) return;
    const values = Object.fromEntries(new FormData(form).entries());
    const id = form.dataset.employeeId;
    const duplicate = db.employees.find(person => person.email.toLowerCase() === values.email.toLowerCase() && person.id !== id);
    if (duplicate) { showToast('That email address is already in the directory.', true); return; }
    const record = { ...values, salary: values.salary ? Number(values.salary) : 0 };
    if (id) {
      const existing = byId(id);
      Object.assign(existing, record);
      logActivity(getCurrentUser().name, 'updated the profile for', existing.name, 'user', session.id);
    } else {
      record.id = `emp-${Date.now().toString(36)}`;
      db.employees.unshift(record);
      db.credentials.employees[record.id] = 'Employee@123';
      const todayRecord = { employeeId: record.id, date: localISO(), status: 'Absent', checkIn: '', checkOut: '', location: '—' };
      db.attendance.push(todayRecord);
      logActivity(getCurrentUser().name, 'added', `${record.name} to the team`, 'user', session.id);
    }
    closeModal(); saveDB(); render(); showToast(id ? 'Employee details updated.' : 'Employee added to your directory.'); return;
  }
  if (form.id === 'leave-form') {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form).entries());
    if (values.endDate < values.startDate) { showToast('The end date must be on or after the start date.', true); return; }
    const record = { id: `lv-${Date.now().toString(36)}`, employeeId: isAdmin() ? values.employeeId : session.id, type: values.type, startDate: values.startDate, endDate: values.endDate, days: calcLeaveDays(values.startDate, values.endDate), reason: values.reason.trim(), status: 'Pending', submittedAt: new Date().toISOString() };
    db.leaves.unshift(record);
    logActivity(getCurrentUser().name, 'submitted a', `${record.type} request`, 'leave', session.id);
    closeModal(); saveDB(); render(); showToast('Your time-off request has been sent.'); return;
  }
  if (form.id === 'profile-form') {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form).entries());
    const user = getCurrentUser();
    Object.assign(user, values);
    if (isAdmin()) db.adminProfile = user;
    logActivity(user.name, 'updated their', 'profile information', 'profile', session.id);
    saveDB(); render(); showToast('Profile details saved.'); return;
  }
}

// Delegated events keep the app interactive even when a screen is re-rendered.
document.addEventListener('click', handleClick);
document.addEventListener('input', handleInput);
document.addEventListener('change', handleChange);
document.addEventListener('submit', handleSubmit);
document.addEventListener('keydown', event => {
  const typing = ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openCommandPalette(); return; }
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'a' && session && isAdmin()) { event.preventDefault(); openEmployeeModal(); return; }
  if (event.key === '/' && !typing && session) { event.preventDefault(); openCommandPalette(); return; }
  if (event.key === '?' && !typing && session) { event.preventDefault(); openShortcuts(); return; }
  if (event.key === 'Escape') {
    if (MODAL_ROOT.innerHTML) closeModal();
    document.getElementById('profile-menu')?.classList.remove('open');
    document.getElementById('sidebar')?.classList.remove('mobile-open');
    document.querySelector('.mobile-sidebar-backdrop')?.classList.remove('show');
  }
  if (event.key === 'Enter' && event.target.id === 'command-input') {
    event.preventDefault();
    document.querySelector('[data-command-item]:not([style*="display: none"])')?.click();
  }
});

render();
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
