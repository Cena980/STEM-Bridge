// src/lib/auth.js
export async function signIn(email, password) {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  if (!res.ok) return { user: null, error: data.message };
  console.log(`Signed in user: ${data.user}`);

  // ✅ store user in localStorage
  localStorage.setItem("user", JSON.stringify(data.user));

  return { user: data.user, error: null };
}


export async function signUp(email, password, fullName, role) {
  const res = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, fullName, role }),
  });
  const data = await res.json();
  if (!res.ok) return { user: null, error: data.message };
  localStorage.setItem("user", JSON.stringify(data.user));
  return { user: data.user, error: null };
}

export function signOut() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}
