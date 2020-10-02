**Models**

**`Question` Model**

_________

- `questionText`(text)
  - Validations:
- `answerId`(integer) references`"Answers".id`
- **Associations:**
  - A Question belongsTo a User(`models.User`)
  - A Question hasMany Answers(`models.Answer`)
  - A Question hasMany tags(?)

________

**`User` Model**


- `username`(text)
  - Validations:
- `email`(text)
  - Validations:
- `hashedPassword`(text)
  - Validations:
- `questionId` references`"Questions".id`
- **Associations:**
  - A User hasMany Questions(`models.Question`)

**`Answer` model**

- `message`(text)
  - Validations:
- **Associations**:
  - An Answer belongsTo a Question(`models.Question`)

**`VotesQuestion` Model**

- `userId` references user.id
- `questionId` references`"Questions".id`
- `type`(boolean) - upvote/downvote
