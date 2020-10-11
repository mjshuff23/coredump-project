document.addEventListener('DOMContentLoaded', (e) => {



    document.querySelectorAll('.question.fa-caret-up').forEach( (item) => {
        item.addEventListener( 'click',  async (e) => {
            const questionElt = document.querySelector(`[data-questionid]`);
            const userId = localStorage.getItem("COREDUMP_CURRENT_USER_ID");
            const questionId = questionElt.dataset.questionid;
            console.log("Clicked question upVote");
            const route = "/questions/voteQuestion";
            const body = { vote: true, userId, questionId };
            await postVote(body, route, "add", questionElt.querySelector('.score') );
        }
        )});

    document.querySelectorAll('.question.fa-caret-down').forEach ( (item) => {
        const questionElt = document.querySelector(`[data-questionid]`);
        const userId = localStorage.getItem("COREDUMP_CURRENT_USER_ID");
        const questionId = questionElt.dataset.questionid;
            item.addEventListener('click', async (e) => {
            console.log("Clicked question downVote");
            const route = "/questions/voteQuestion";
            const body = { vote: false, userId, questionId };
            await postVote(body, route, "subtract", questionElt.querySelector('.score'));
        })
    });

    const answerEltUpVote = document.querySelectorAll('.questionAnswer.fa-caret-up');
    console.log("Value of answerEltUpVote: ", answerEltUpVote);
    if (answerEltUpVote) {
        answerEltUpVote.forEach ( (item) => {
            item.addEventListener('click', async (e) => {
            const userId = localStorage.getItem("COREDUMP_CURRENT_USER_ID");

            const  answerElt = document.querySelector(`[data-answerid]`);

            const  answerId = answerElt.dataset.answerid;
            console.log("Clicked answer upVote, answerId: ", answerId);
            route = "/questions/voteAnswer";
            const body = { vote: true, userId, answerId };
            console.log(`answerId: ${answerId}`);
            await postVote(body, route, "add", answerElt.querySelector('.score'));
        })
    })};

    const answerEltDownVote = document.querySelectorAll('.questionAnswer.fa-caret-down');
    console.log("Value of answerEltDownVote: ", answerEltDownVote);
    if (answerEltDownVote) {
        answerEltDownVote.forEach ( (item) => {
            item.addEventListener('click', async (e) => {
            const userId = localStorage.getItem("COREDUMP_CURRENT_USER_ID");
            const  answerElt = document.querySelector(`[data-answerid]`);
            const  answerId = answerElt.dataset.answerid;
            console.log("Clicked answer downVote, answerId: ", answerId);
            const route = "/questions/voteAnswer";
            const body = { vote: false, userId, answerId };
            await postVote(body, route, "subtract", answerElt.querySelector('.score'));
            })
        });
    }
});



async function postVote(body,route, op, scoreElt) {
    try {
        const res = await fetch(route, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Returned from fetch... and res.ok is:  ", res.ok);
        if (res.ok) {
            const scoreJSON = await res.json();
            //let newScore = parseInt(scoreElt.innerHTML);
            console.log("new score:  ", scoreJSON.voteCount, " and scoreJSON: ", scoreJSON);
            //op === "add" ? newScore += 1 : newScore -= 1;
            scoreElt.innerHTML = scoreJSON.voteCount;
        }
        if (!res.ok) {
            throw res;
        }
        return res;
    }
    catch (res)  {
        console.log("Response object:  *******************************************", res);
        const errorJSON = await res.json();
        console.log("ErrorJSON:  ", errorJSON);

        if (errorJSON) {
            let errorsContainer = document.querySelector(".main-box");
            let errorsHTML = `<li>${errorJSON.error}</li>`;
            errorsContainer.innerHTML = `<ul width="40px"; style="color:red; background-color:white">${errorsHTML}</ul>`;
            await setTimeout(function() {errorsContainer.innerHTML = ``;}, 5000);
        }
    }
}
