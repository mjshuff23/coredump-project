document.addEventListener('DOMContentLoaded', (e) => {

    document.querySelector('.question.fa-caret-up').addEventListener( 'click', (e) => {
        const questionElt = document.querySelector(`[data-questionid]`);
        const questionId = questionElt.dataset.questionid;
        const userId = localStorage.getItem("COREDUMP_CURRENT_USER_ID");
        const route = "/questions/voteQuestion";
        const body = { vote: true, userId, questionId };
        let res = postVote(body, route);
        if (res.ok) {
            let score = questionElt.querySelector('.score');
            let newScore = parseInt(score.innerHTML);
            newScore -= 1;
            score.innerHTML = newScore;
        } else {
            setErrorMessage(res);
        }
    });

    document.querySelector('.question.fa-caret-down').addEventListener('click', (e) => {
        const questionElt = document.querySelector(`[data-questionid]`);
        const questionId = questionElt.dataset.questionid;
        const userId = localStorage.getItem("COREDUMP_CURRENT_USER_ID");
        const route = "/questions/voteQuestion";
        const body = { vote: false, userId, questionId };
        let res = postVote(body, route);
        if (res.ok) {
            let score = questionElt.querySelector('.score');
            let newScore = parseInt(score.innerHTML);
            newScore -= 1;
            score.innerHTML = newScore;
        } else {
            setErrorMessage(res);
        }
    });

    document.querySelector('.questionAnswer.fa-caret-up').addEventListener('click', (e) => {
        const answerElt = document.querySelector(`[data-answerid]`);
        const answerId = answerElt.dataset.questionid;
        const questionElt = document.querySelector(`[data-questionid]`);
        const questionId = questionElt.dataset.questionid;
        const userId = localStorage.getItem("COREDUMP_CURRENT_USER_ID");
        route = "/questions/voteAnswer";
        const body = { vote: true, userId, answerId };
        let res = postVote(body, route);
        if (res.ok) {
            let score = answerElt.querySelector('.score');
            let newScore = parseInt(score.innerHTML);
            newScore += 1;
            score.innerHTML = newScore
        } else {
          setErrorMessage(res);
        }
    });

    document.querySelector('.questionAnswer.fa-caret-down').addEventListener('click', (e) => {
        const  answerElt = document.querySelector(`[data-answerid]`);
        const  answerId = answerElt.dataset.questionid;
        const  questionElt = document.querySelector(`[data-questionid]`);
        const  questionId = questionElt.dataset.questionid;
        const  userId = localStorage.getItem("COREDUMP_CURRENT_USER_ID");
        const route = "/questions/voteAnswer";
        const body = { vote: false, userId, answerId };
        let res = postVote(body, route);
        //look at results and if ok, then change p.score increasing or decreasing.
        if (res.ok) {
            let score = answerElt.querySelector('.score');
            let newScore = parseInt(score.innerHTML);
            newScore -= 1;
            score.innerHTML = newScore
        } else {
            setErrorMessage(res);
        }
    });
});

async function setErrorMessage(res) {
    const errorJSON = await res.json();
    const { errors } = errorJSON;

    if (errors && Array.isArray(errors)) {
        let errorsContainer = document.querySelector(".main-box");
        errorsContainer.innerHTML = ``;
        let errorsHTML = ``;
        for (let i = 0; i < errors.length; i++)
        {
            errorsHTML += `<li>${errors[i]}</li>`;
        }
        errorsContainer.innerHTML = `<ul style="color:red; background-color:white">${errorsHTML}</ul>`;

        await setTimeout(function() {errorsContainer.innerHTML = `<ul style="color:red; background-color:white">${errorsHTML}</ul>`;}, 5000);
        errorsContainer.innerHTML = ``;
    }
}

async function postVote(body,route) {
    try {
        const res = await fetch(route, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw res;
        }
        return res;
    }
    catch (res)  {
        console.log("err:  ", res.status);
        if (res.status >= 400 && res.status < 600) {
          const errorJSON = await res.json();
          const { errors } = errorJSON;

          //here display for 5 seconds the error message in the pug file
            //create a div, position absolute, put at top of page, then remove after timeout.

          alert("Received between a 400 and 600 error.  Need to finish error handling in votes.js");
          //questionSubject = body.questionSubject;
          //questionText = body.questionText;

          if (errors && Array.isArray(errors)) {
            alert("We need to process the errors array:  ", errors);
          }
        } else {
            alert("Something went wrong. Please check your internet connection and try again!");
        }
    }
}
