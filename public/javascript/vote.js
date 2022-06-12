async function voteDownHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const countEl = document.getElementById("vote-num");
  let vote_count = Number(countEl.dataset.indexNumber);

  if (vote_count > 0) {
    vote_count -= 1;
  }

  const response = await fetch(`/api/posts/${id}/vote`, {
    method: "PUT",
    body: JSON.stringify({
      vote_count,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

async function voteUpHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const countEl = document.getElementById("vote-num");
  let vote_count = Number(countEl.dataset.indexNumber);

  vote_count += 1;

  const response = await fetch(`/api/posts/${id}/vote`, {
    method: "PUT",
    body: JSON.stringify({
      vote_count,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#vote-up").addEventListener("submit", voteUpHandler);
document
  .querySelector("#vote-down")
  .addEventListener("submit", voteDownHandler);
