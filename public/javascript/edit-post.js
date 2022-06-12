async function editFormHandler(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const image_url = document.getElementById("image-url").value;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const categoryEl = document.getElementById("category-dropdown");
  const category_id = categoryEl.options[categoryEl.selectedIndex].value;

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
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
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);
