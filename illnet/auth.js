const SUPABASE_URL = 'https://cfdzcbeefuyxrtqfxprn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8uIxm9-fWrcTnIl3zyzVGA_bfXOd19g';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('illnet-theme', next);
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = next === 'dark' ? 'light' : 'dark';
}

function syncThemeBtn() {
  const btn = document.getElementById('theme-btn');
  if (!btn) return;
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  btn.textContent = current === 'dark' ? 'light' : 'dark';
}

async function requireAuth(onAuthed) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) { window.location.href = '/illnet/login.html'; return; }
  syncThemeBtn();
  onAuthed(session.user);
}

async function logout() {
  await client.auth.signOut();
  window.location.href = '/illnet/login.html';
}
