async function handler(req, res) {
    const { queueName, queueHost } = req.params;
    const jobData = req.body;
    console.log(queueName, queueHost, jobData);
    const {Queues} = req.app.locals;
    const queue = await Queues.get(queueName, queueHost);
    if (!queue) return res.status(404).send({error: 'queue not found'});
  
    queue.add(jobData);
    res.sendStatus(204);
  }
  
  module.exports = handler;
  