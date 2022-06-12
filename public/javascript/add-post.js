async function newFormHandler(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const image_url = document.getElementById("image-url").value;

  const categoryEl = document.getElementById("category-dropdown");
  const category_id = categoryEl.options[categoryEl.selectedIndex].value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
      category_id,
      image_url,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".create-form")
  .addEventListener("submit", newFormHandler);
