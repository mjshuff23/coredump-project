CREATE TABLE "Users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar,
  "email" varchar,
  "bio" text,
  "hashedPassword" varchar
);

CREATE TABLE "AnswerVotes" (
  "id" SERIAL PRIMARY KEY,
  "vote" boolean,
  "userId" int,
  "answerId" int
);

CREATE TABLE "QuestionVotes" (
  "id" SERIAL PRIMARY KEY,
  "vote" boolean,
  "userId" int,
  "questionsId" int
);

CREATE TABLE "Questions" (
  "id" SERIAL PRIMARY KEY,
  "questionSubject" varchar,
  "questionText" text,
  "userId" int,
  "created_at" timestamp
);

CREATE TABLE "Answers" (
  "id" SERIAL PRIMARY KEY,
  "answerText" text,
  "questionId" int,
  "userId" int,
  "created_at" timestamp
);

ALTER TABLE "AnswerVotes" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("id");

ALTER TABLE "AnswerVotes" ADD FOREIGN KEY ("answerId") REFERENCES "Answers" ("id");

ALTER TABLE "QuestionVotes" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("id");

ALTER TABLE "QuestionVotes" ADD FOREIGN KEY ("questionsId") REFERENCES "Questions" ("id");

ALTER TABLE "Questions" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("id");

ALTER TABLE "Answers" ADD FOREIGN KEY ("questionId") REFERENCES "Questions" ("id");

ALTER TABLE "Answers" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("id");
