document.addEventListener("DOMContentLoaded", () => {
  tinymce.init({
    selector: "#questionText",
    plugins: "autolink lists media table ",
    // toolbar:
    //   "a11ycheck addcomment showcomments casechange checklist code formatpainter pageembed permanentpen ",
    toolbar_mode: "floating",
    tinycomments_mode: "embedded",
    tinycomments_author: "Author name",
    allow_html_in_named_anchor: true,
  });

  let postQuestionButton = document.getElementById("postQuestion");
  postQuestionButton.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log("Prevented default");
    let subjectElt = document.getElementById("subject");

    let questionText2 = tinymce.activeEditor.getContent();
    let questionSubject = subjectElt.value;
    let userId = localStorage.getItem("COREDUMP_CURRENT_USER_ID");

    const questionText = questionText2.substr(3, questionText2.length - 4);
    // console.log("This is the questionText2:  ", questionText2);

    // console.log("Got form Text:  ", questionText);
    // console.log("Got the subject: ", questionSubject);
    // console.log("Got the userID:  ", userId);

    const body = { questionSubject, questionText, userId };

    postQuestion(body);
  });
});

async function postQuestion(body) {
  try {
    //Relative to the URL we're currently in
    const res = await fetch("/questions/new", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw res;
    }
    window.location.href = "/main";
  } catch (res) {
    // console.log("err:  ", res.status);
    if (res.status >= 400 && res.status < 600) {
      const errorJSON = await res.json();
      const { errors } = errorJSON;

      questionSubject = body.questionSubject;
      questionText = body.questionText;

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
