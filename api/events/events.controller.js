
const Event = require("./events.model");

exports.index = async (req, res) => {
  await Event.find({}).then((response) => {
    res.send(response)
  });
};

exports.getById = async (req, res) => {
  const id = req.body.userId
  const name = req.body.profileName
  console.log(id)
  await Event.find({ userId: id, profileName: name }).then((result) => {
    res.json(result)
  });
};

exports.getByProfileName = async (req, res) => {
  const userId = req.body.userId
  const profileName = req.body.profileName
  await Event.find({ userId: userId, profileName: profileName }).then(
    (result) => {
      res.json(result[0].events);
    }
  );
};

exports.updateEventList = async (req, res) => {
  const userId = req.body.userId
  const profileName = req.body.profileName
  const events = req.body.events
  var data = { userId: userId, profileName: profileName , events:  JSON.parse(events)}
  console.log(data)
  await Event.updateOne(
    { userId: userId, profileName: profileName },
    { $set: data },
    () => {
      res.send("ok!");
    }
  );
};



