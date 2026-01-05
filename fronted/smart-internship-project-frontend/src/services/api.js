const BASE_URL = "http://localhost:8080/api";

export const apiGet = async (url) => {
  const res = await fetch(BASE_URL + url);

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const apiPost = async (url, data) => {
  const res = await fetch(BASE_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data),
  });

  const result = await res.json(); // ✅ always parse JSON

  if (!res.ok) {
    throw new Error(result.message || "Request failed");
  }

  return result;
};
