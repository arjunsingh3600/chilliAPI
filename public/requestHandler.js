const port = 3001;

const baseUrl = window.location.origin.slice(0, -4) + port + "/chillies/";
const requestMap = {
  fetch: "GET",
  add: "POST",
  update: "PUT",
  remove: "DELETE",
};

const statusDisplay = document.querySelector(".response-status");
const bodyDisplay = document.querySelector(".response-body");

Object.values(document.forms).forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let formData = new FormData(form);

    let fetchOptions = {
      method: requestMap[form.id],
      mode: "cors",
    };
    let url = baseUrl + (formData.has("chId") ? formData.get("chId") : "");

    if (fetchOptions.method == "POST" || fetchOptions.method == "PUT") {
      // convert formData to JSON with appropriate keys
      let formObject = {};
      formData.forEach(
        (value, key) => (formObject[key.toLowerCase().substring(2)] = value)
      ); // remove 'ch'

      fetchOptions.body = JSON.stringify(formObject);
      fetchOptions.headers = { "Content-Type": "application/json" };
    }

    fetch(url, fetchOptions)
      .then((response) => {
        statusDisplay.innerHTML = `${response.status} ${response.statusText} `;

        return response.json();
      })
      .then((res) => (bodyDisplay.innerHTML = JSON.stringify(res)))
      .catch((error) => {
        bodyDisplay.innerHTML = "{}";
      });
  });
});
