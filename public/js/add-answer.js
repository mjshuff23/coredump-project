document.addEventListener("DOMContentLoaded", () => {
  tinymce.init({
    selector: "#questionText",
    plugins: "autolink lists media table ",
    // toolbar:
    //   "a11ycheck addcomment showcomments casechange checklist code formatpainter pageembed permanentpen table",
    toolbar_mode: "floating",
    tinycomments_mode: "embedded",
    tinycomments_author: "Author name",
    allow_html_in_named_anchor: true,
  });

  let postAnswerButton = document.getElementById("postAnswer");
  postAnswerButton.addEventListener("click", (e) => {
    e.preventDefault();
    const questionEle = document.querySelector("[data-questionid]");
    const questionId = questionEle.dataset.questionid;
    let answerText2 = tinymce.activeEditor.getContent();
    let userId = localStorage.getItem("COREDUMP_CURRENT_USER_ID");

    const answerText = answerText2.substr(3, answerText2.length - 4);

    const body = { answerText, userId, questionId };

    postAnswer(body, questionId);
  });
});

async function postAnswer(body, questionId) {
  try {
    //Relative to the URL we're currently in
    const res = await fetch("/answers/new", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw res;
    }
    window.location.href = `/questions/${questionId}`;
  } catch (res) {
    console.log("err:  ", res.status);
    if (res.status >= 400 && res.status < 600) {
      const errorJSON = await res.json();
      const { errors } = errorJSON;

      answerText = body.answerText;

      if (errors && Array.isArray(errors)) {
        let errorsContainer = document.querySelector(".mceErrors");
        errorsContainer.innerHTML = ``;
        let errorsHTML = ``;
        for (let i = 0; i < errors.length; i++) {
          errorsHTML += `<li>${errors[i]}</li>`;
        }
        errorsContainer.innerHTML = `<ul style="color:red; background-color:white">${errorsHTML}</ul>`;
      }
    } else {
      alert(
        "Something went wrong. Please check your internet connection and try again!"
      );
    }
  }
}
