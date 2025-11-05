use huntaTalk_db
db.users.updateMany(
  { nativLanguage: { $exists: true } },
  { $unset: { nativLanguage: "" } }
);