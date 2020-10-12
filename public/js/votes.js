function createIds(qOrA, upOrDown,  attribute) {
    ids = document.querySelectorAll(`${attribute}`);
    let idsArr = [];
    let scoresArr = []
     for (let i=0; i < ids.length; i++) {
         let id = '';
         if (qOrA === 'question') {
            id = ids[i].dataset.questionid;
            scoresArr.push(`score-${qOrA}-${id}`)
         } else if (qOrA === 'answer') {
            id = ids[i].dataset.answerid;
            scoresArr.push(`score-${qOrA}-${id}`)
         }
        idsArr.push(`${qOrA}${upOrDown}-${id}`);
     }

     return [ idsArr, scoresArr ];
}


document.addEventListener('DOMContentLoaded', (e) => {
    const userId = localStorage.getItem("COREDUMP_CURRENT_USER_ID");

    let questionVoteUpArrs = createIds("question", "VoteUp", "[data-questionid]");
    let questionVoteDownArrs = createIds("question", "VoteDown", "[data-questionid]");
    let answerVoteUpArrs = createIds("answer", "VoteUp", "[data-answerid]");
    let answerVoteDownArrs = createIds("answer", "VoteDown", "[data-answerid]");

    // for (let i = 0; i < questionVoteUpArrs[0].length; i++) {
    //     console.log("QuestionVoteUp ids:  ", questionVoteUpArrs[0][i]);
    // }
    // for (let i = 0; i < questionVoteDownArrs[0].length; i++) {
    //     console.log("QuestionVoteDown ids:  ", questionVoteDownArrs[0][i]);
    // }

    // for (let i = 0; i< answerVoteUpArrs[0].length; i++) {
    //     console.log("AnswerVoteUp ids: ", answerVoteUpArrs[0][i]);
    // }

    // for (let i = 0; i< answerVoteDownArrs[0].length; i++) {
    //     console.log("AnswerVoteDown ids: ", answerVoteDownArrs[0][i]);
    // }

    // for(let i = 0; i < questionVoteUpArrs[1].length; i++) {
    //     console.log("Score ids: ", questionVoteUpArrs[1][i]);
    // }

    questionVoteUpArrs[0].forEach( (item) => {
        document.getElementById(item).addEventListener ( 'click', async (e) => {
            console.log("Set event listener on item id:  ", item);
            console.log("Clicked question upVote");
            const route = "/questions/voteQuestion";
            let questionId = item.split('-')[1];
            let vote = true;
            const body = { vote, userId, questionId};
            console.log("Voting for questionId: ", questionId, " vote: ", vote, " userId: ", userId);
            await postVote(body, route, "add", document.getElementById(questionVoteUpArrs[1]));
        });
    });

    questionVoteDownArrs[0].forEach( (item) => {
        document.getElementById(item).addEventListener( 'click', async (e) => {
            console.log("Set event listener on item id:  ", item);
            console.log("Clicked question downVote");
            const route = "/questions/voteQuestion";
            let questionId = item.split('-')[1];
            let vote = false;
            const body = { vote, userId, questionId};
            console.log("Voting for questionId: ", questionId, " vote: ", vote, " userId: ", userId);
            await postVote(body, route, "subtract", document.getElementById(questionVoteDownArrs[1]));
        });
    });

    answerVoteUpArrs[0].forEach( (item) => {
        document.getElementById(item).addEventListener( 'click', async (e) => {
            console.log("Set event listener on item id:  ", item);
            console.log("Clicked answer upVote");
            const route="/questions/voteAnswer";
            let answerId = item.split('-')[1];
            let vote = true;
            const body = { vote, userId, answerId};
            console.log("Voting for answerId: ", answerId, " vote: ", vote, " userId: ", userId);
            await postVote(body, route, "add", document.getElementById(answerVoteUpArrs[1]));
        });
    });

    answerVoteDownArrs[0].forEach( (item) => {
        document.getElementById(item).addEventListener( 'click', async (e) => {
            console.log("Set event listener on item id:  ", item);
            console.log("Clicked answer downVote");
            const route="/questions/voteAnswer";
            let answerId = item.split('-')[1];
            let vote = false;
            const body = { vote, userId, answerId};
            console.log("Voting for answerId: ", answerId, " vote: ", vote, " userId: ", userId);
            await postVote(body, route, "subtract", document.getElementById(answerVoteDownArrs[1]));
        })
    });




    // questionVoteUpArr = votesIds.forEach( voteId => {
    //     return `questionVoteUp-${voteId.dataset.questionid}`;
    // });
    // questionVoteDownArr = votesIds.forEach( voteId => {
    //     return `questionVoteDown-${voteId.dataset.questionid}`;
    // });
    // console.log("voteUpArr:  ", questionVoteUpArr);
    // console.log("voteDownArr: ", questionVoteDownArr);




    // const questionElt = document.querySelector(`[data-questionid]`);
    //
    // const questionId = questionElt.dataset.questionid;


    // document.querySelector('.question.fa-caret-up').addEventListener( 'click',  async (e) => {
    //


    // });

    // document.querySelector('.question.fa-caret-down').addEventListener('click', async (e) => {
    //     console.log("Clicked question downVote");
    //     const route = "/questions/voteQuestion";
    //     const body = { vote: false, userId, questionId };
    //     await postVote(body, route, "subtract", questionElt.querySelector('.score'));
    // });

    // const answerEltUpVote = document.querySelector('.questionAnswer.fa-caret-up');
    // if (answerEltUpVote) {
    //     answerEltUpVote.addEventListener('click', async (e) => {
    //         console.log("Clicked answer upVote");
    //         const  answerElt = document.querySelector(`[data-answerid]`);
    //         const  answerId = answerElt.dataset.questionid;
    //         route = "/questions/voteAnswer";
    //         const body = { vote: true, userId, answerId };
    //         await postVote(body, route, "add", answerElt.querySelector('.score'));
    //     });
    // }

    // const answerEltDownVote = document.querySelector('.questionAnswer.fa-caret-down');
    // if (answerEltDownVote) {
    //     document.querySelector('.questionAnswer.fa-caret-down').addEventListener('click', async (e) => {
    //         console.log("Clicked answer downVote");
    //         const  answerElt = document.querySelector(`[data-answerid]`);
    //         const  answerId = answerElt.dataset.questionid;
    //         const route = "/questions/voteAnswer";
    //         const body = { vote: false, userId, answerId };
    //         await postVote(body, route, "subtract", answerElt.querySelector('.score'));
    //     });
    // }
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
        console.log("Returned from fetch...");
        if (res.ok) {
            const retVal = await res.json();
            console.log("Return value:  ", retVal);
            let newScore = parseInt(scoreElt.innerHTML);
            op === "add" ? newScore += 1 : newScore -= 1;
            scoreElt.innerHTML = newScore
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
