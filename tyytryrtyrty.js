async function savePaste() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value.trim();
  if (!content) return alert("Không được để trống!");

  const res = await fetch("/api/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  const data = await res.json();
  if (data.error) alert(data.error);
  else {
    document.getElementById("result").innerHTML = `
      <p><b>Paste link:</b> <a href="${data.url}" target="_blank">${data.url}</a></p>
      <p><b>Raw link:</b> <a href="${data.raw}" target="_blank">${data.raw}</a></p>
    `;
  }
}

async function searchPaste() {
  const q = document.getElementById("search").value;
  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  const list = await res.json();

  const ul = document.getElementById("searchResults");
  ul.innerHTML = "";
  list.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="/${item.id}" target="_blank">${item.title}</a> (${item.created_at})`;
    ul.appendChild(li);
  });
}
