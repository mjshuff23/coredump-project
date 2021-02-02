document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelector(".burger").addEventListener("click", (eve) => {
    // console.log(eve);
    document.querySelector(".leftbar").classList.toggle("hidden");
    document.querySelector(".xmark").classList.remove("hidden");
  });

  document.querySelector(".xmark").addEventListener("click", (eve) => {
    // console.log(eve);
    document.querySelector(".leftbar").classList.add("hidden");
  });

  document.querySelector(".authorlist").addEventListener("click", (eve) => {
    // console.log(eve);
    document.querySelector(".authorlist").classList.remove("hidden");
    document.querySelector(".authorlist").classList.add("hidden");
  });
});
