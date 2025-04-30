# MongoDB Schemas and CRUD Operations

This document summarizes all Mongoose schemas (ER), models, and controller functions used for CRUD operations in the Eco-Connect Backend.

---

## Entity-Relationship Overview

```
User (1) --- (N) Post          // author relationship
User (N) --- (N) Post.likes    // like relationship
User (1) --- (N) Post.comments // comment relationship (via comments.user)
User (1) --- (N) Event         // organizer relationship
User (N) --- (N) Event.attendees
```

---

## Schemas & Models

### User
```js
const UserSchema = new Schema({
  name: String, email: String, password: String,
  bio: String, location: String, avatar: String,
  ecoPoints: Number, interests: [String], role: String
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);
```

### Post
```js
const PostSchema = new Schema({
  title: String, content: String,
  author: ObjectId (ref User), image: String,
  category: String, likes: [ObjectId],
  comments: [{ user: ObjectId, text: String, date: Date }],
  tags: [String]
}, { timestamps: true });
module.exports = mongoose.model('Post', PostSchema);
```

### Event
```js
const EventSchema = new Schema({
  title: String, description: String, date: Date,
  location: String, organizer: ObjectId (ref User),
  image: String, category: String,
  attendees: [ObjectId], maxAttendees: Number,
  ecoPointsReward: Number
}, { timestamps: true });
module.exports = mongoose.model('Event', EventSchema);
```

---

## Controller Functions & Mappings

### Auth (User)
| Route         | Controller Function     | Mongoose Methods                        |
|---------------|-------------------------|-----------------------------------------|
| POST /api/auth/register | `register`         | `User.findOne`, `new User()`, `user.save()` |
| POST /api/auth/login    | `login`            | `User.findOne`, `user.comparePassword`     |
| GET /api/auth/me        | `getCurrentUser`   | `User.findById`                            |

### Posts
| Route                           | Function         | CRUD Action                        |
|---------------------------------|------------------|------------------------------------|
| GET /api/posts                  | `getPosts`       | `Post.find()`                     |
| GET /api/posts/:id              | `getPostById`    | `Post.findById()`                 |
| POST /api/posts                 | `createPost`     | `new Post()`, `post.save()`       |
| PUT /api/posts/:id              | `updatePost`     | `Post.findByIdAndUpdate()`        |
| DELETE /api/posts/:id           | `deletePost`     | `Post.findByIdAndDelete()`        |
| PUT /api/posts/:id/like         | `likePost`       | `Post.findById()`, `post.likes.push()`, `post.save()` |
| PUT /api/posts/:id/unlike       | `unlikePost`     | `post.likes.pull()`, `post.save()`|
| POST /api/posts/:id/comment     | `commentPost`    | `post.comments.push()`, `post.save()`|
| DELETE /api/posts/:id/comment/:commentId | `deleteComment` | filter `post.comments`, `post.save()` |

### Events
| Route                            | Function         | CRUD Action                         |
|----------------------------------|------------------|-------------------------------------|
| GET /api/events                  | `getEvents`      | `Event.find()`                     |
| GET /api/events/:id              | `getEventById`   | `Event.findById()`                 |
| POST /api/events                 | `createEvent`    | `new Event()`, `event.save()`      |
| PUT /api/events/:id              | `updateEvent`    | `Event.findByIdAndUpdate()`        |
| DELETE /api/events/:id           | `deleteEvent`    | `Event.findByIdAndDelete()`        |
| POST /api/events/:id/join        | `joinEvent`      | `Event.findById()`, `event.attendees.push()`, `event.save()` |
| POST /api/events/:id/leave       | `leaveEvent`     | `event.attendees.pull()`, `event.save()` |

---

## Notes
- All schemas use timestamps (`createdAt`, `updatedAt`).
- Reference relations use `ref: 'User'` for population.
- Password hashing and comparison are handled via `bcrypt` in `UserSchema` methods.
- JWT tokens generated in auth controller use `process.env.JWT_SECRET`.

---

*End of mongo.md*
