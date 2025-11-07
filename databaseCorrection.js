use database ('huntaTalk_db');


db.users.dropIndex('Email_1');


db.users.dropIndex('email_1');
db.users.createIndex({ email: 1 }, { unique: true });


db.users.updateMany(
  { Email: { $exists: true } },
  [
    { $set: { email: { $toLower: '$Email' } } },
    { $unset: 'Email' }
  ]
);

db.users.deleteMany({ $or: [ { email: null }, { email: '' } ] });
